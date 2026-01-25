<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		centerXPercent?: number; // Center X as percentage of viewport width (default 50)
		centerYPercent?: number; // Center Y as percentage of viewport height (default 80)
		tiltDegrees?: number; // Y-axis rotation in degrees (0 = face-on, 90 = edge-on)
		parallaxFactor?: number; // How much slower the canvas moves relative to scroll (0.5 = half speed)
	}

	let { centerXPercent = 50, centerYPercent = 80, tiltDegrees = 0, parallaxFactor = 0.25 }: Props = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let animationId: number;
	let cssWidth = 0;
	let cssHeight = 0;
	let rotation = 0;

	// Parallax scroll offset and fade
	let scrollY = $state(0);
	let scrollOpacity = $derived(Math.max(0.5, 1 - scrollY / 1000));

	// Animated position values (using bezier curve for arc motion)
	let animatedX = centerXPercent;
	let animatedY = centerYPercent;
	let animatedTilt = tiltDegrees;
	let targetX = centerXPercent;
	let targetY = centerYPercent;
	let targetTilt = tiltDegrees;
	let animationStartTime: number | null = null;
	let startTilt = 0;
	let endTilt = 0;
	const ANIMATION_DURATION = 1400; // ms

	// Dramatic easing - exponential out for snappy, dramatic feel
	function easeOutExpo(t: number): number {
		return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
	}

	// Quadratic bezier curve for smooth arc path
	// Returns point on curve at t (0-1)
	function bezierPoint(t: number, p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number) {
		const mt = 1 - t;
		return {
			x: mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x,
			y: mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y,
		};
	}

	// Calculate control point for arc that bulges in the desired direction
	function getControlPoint(startX: number, startY: number, endX: number, endY: number) {
		// Midpoint
		const midX = (startX + endX) / 2;
		const midY = (startY + endY) / 2;

		// Perpendicular offset for the arc bulge
		const dx = endX - startX;
		const dy = endY - startY;
		const len = Math.sqrt(dx * dx + dy * dy);

		// Base perpendicular direction
		let perpX = -dy / len;
		let perpY = dx / len;

		// Always bulge toward the right side of screen (shortest path)
		// When going right-to-left (dx < 0), flip perpendicular so arc still curves right
		if (dx < 0) {
			perpX = -perpX;
			perpY = -perpY;
		}

		// Arc intensity - how much the curve bulges
		const arcIntensity = len * 0.25;

		return {
			x: midX + perpX * arcIntensity,
			y: midY + perpY * arcIntensity,
		};
	}

	// Store bezier control point
	let controlX = 0;
	let controlY = 0;
	let startX = centerXPercent;
	let startY = centerYPercent;

	// Watch for prop changes and trigger animation
	$effect(() => {
		if (centerXPercent !== targetX || centerYPercent !== targetY || tiltDegrees !== targetTilt) {
			// Store start position
			startX = animatedX;
			startY = animatedY;
			startTilt = animatedTilt;

			// Calculate bezier control point for the arc
			const control = getControlPoint(animatedX, animatedY, centerXPercent, centerYPercent);
			controlX = control.x;
			controlY = control.y;

			endTilt = tiltDegrees;
			targetX = centerXPercent;
			targetY = centerYPercent;
			targetTilt = tiltDegrees;
			animationStartTime = performance.now();
		}
	});

	// Offscreen canvas for the pre-rendered ring texture
	let ringTexture: OffscreenCanvas | null = null;
	let textureSize = 0;

	// Gradient color stops (position 0-1, color)
	const gradientStops = [
		{ pos: 0.0, r: 30, g: 25, b: 45, a: 0.0 }, // transparent at center
		{ pos: 0.3, r: 30, g: 25, b: 45, a: 0.1 }, // faint background tint
		{ pos: 0.5, r: 30, g: 25, b: 45, a: 0.05 }, // fade out tint
		{ pos: 0.5, r: 70, g: 130, b: 220, a: 0.0 }, // blue starts transparent
		{ pos: 0.72, r: 70, g: 130, b: 220, a: 0.5 }, // blue peak
		{ pos: 0.85, r: 105, g: 105, b: 220, a: 0.35 }, // blue-violet transition
		{ pos: 0.95, r: 140, g: 80, b: 220, a: 0.3 }, // violet
		{ pos: 0.98, r: 180, g: 140, b: 235, a: 0.5 }, // light violet
		{ pos: 0.995, r: 250, g: 248, b: 255, a: 0.9 }, // white edge
		{ pos: 1.0, r: 250, g: 248, b: 255, a: 0.0 }, // fade out at edge
	];

	// Interpolate between gradient stops
	function getColorAtPosition(t: number): { r: number; g: number; b: number; a: number } {
		// Find the two stops to interpolate between
		let lowStop = gradientStops[0];
		let highStop = gradientStops[gradientStops.length - 1];

		for (let i = 0; i < gradientStops.length - 1; i++) {
			if (t >= gradientStops[i].pos && t <= gradientStops[i + 1].pos) {
				lowStop = gradientStops[i];
				highStop = gradientStops[i + 1];
				break;
			}
		}

		// Calculate interpolation factor
		const range = highStop.pos - lowStop.pos;
		const factor = range > 0 ? (t - lowStop.pos) / range : 0;

		return {
			r: Math.round(lowStop.r + (highStop.r - lowStop.r) * factor),
			g: Math.round(lowStop.g + (highStop.g - lowStop.g) * factor),
			b: Math.round(lowStop.b + (highStop.b - lowStop.b) * factor),
			a: lowStop.a + (highStop.a - lowStop.a) * factor,
		};
	}

	const PARTICLE_COUNT = 120000;
	const ROTATION_SPEED = 0.0001;

	function createRingTexture(size: number) {
		ringTexture = new OffscreenCanvas(size, size);
		const texCtx = ringTexture.getContext('2d');
		if (!texCtx) return;

		const center = size / 2;
		const maxRadius = size / 2;

		// Draw particles with smooth gradient coloring
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			// Distribute particles with bias toward outer rings (more visible area)
			const radiusNormalized = 0.3 + Math.pow(Math.random(), 0.7) * 0.7;
			const radius = radiusNormalized * maxRadius;
			const angle = Math.random() * Math.PI * 2;

			const x = center + Math.cos(angle) * radius;
			const y = center + Math.sin(angle) * radius;

			// Get interpolated color based on radius position
			const color = getColorAtPosition(radiusNormalized);
			const brightness = 0.5 + Math.random() * 0.5;
			const alpha = color.a * brightness;

			const particleSize = 2 + Math.random() * 2.1;

			texCtx.beginPath();
			texCtx.arc(x, y, particleSize, 0, Math.PI * 2);
			texCtx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
			texCtx.fill();
		}
	}

	function draw() {
		if (!ctx || !canvas || !ringTexture) return;

		// Animate position along bezier curve if animation is in progress
		if (animationStartTime !== null) {
			const elapsed = performance.now() - animationStartTime;
			const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
			const easedProgress = easeOutExpo(progress);

			// Get position on bezier curve
			const pos = bezierPoint(easedProgress, startX, startY, controlX, controlY, centerXPercent, centerYPercent);
			animatedX = pos.x;
			animatedY = pos.y;

			// Interpolate tilt
			animatedTilt = startTilt + (endTilt - startTilt) * easedProgress;

			if (progress >= 1) {
				animationStartTime = null;
				animatedX = centerXPercent;
				animatedY = centerYPercent;
				animatedTilt = tiltDegrees;
			}
		}

		// Calculate center position from animated percentages
		const centerX = (animatedX / 100) * cssWidth;
		const centerY = (animatedY / 100) * cssHeight;

		ctx.clearRect(0, 0, cssWidth, cssHeight);

		// Update rotation
		rotation += ROTATION_SPEED;

		// Draw the pre-rendered texture as a rotated, squashed ellipse
		// Order matters: translate -> scale (creates ellipse view) -> rotate (spins content in place)
		ctx.save();
		ctx.translate(centerX, centerY);

		// Apply Y-axis tilt (affects X scale) and X-axis viewing angle (affects Y scale)
		const tiltRadians = (animatedTilt * Math.PI) / 180;
		const xScale = Math.cos(tiltRadians); // Y-axis rotation compresses X
		const yScale = 0.3; // X-axis viewing angle (looking down at the rings)
		ctx.scale(xScale, yScale);

		ctx.rotate(rotation); // Then rotate the content within the ellipse

		// Draw the circular texture centered - 250% of viewport for flatter arc
		const drawSize = Math.max(cssWidth * 2.5, 2500);
		ctx.drawImage(ringTexture, -drawSize / 2, -drawSize / 2, drawSize, drawSize);

		ctx.restore();

		animationId = requestAnimationFrame(draw);
	}

	function handleResize() {
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;

		cssWidth = rect.width;
		cssHeight = rect.height;

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.scale(dpr, dpr);
		}

		// Only recreate texture if size changed significantly
		const newTextureSize = Math.ceil(Math.max(cssWidth * 2.5, 2500) * dpr);
		if (Math.abs(newTextureSize - textureSize) > 100) {
			textureSize = newTextureSize;
			createRingTexture(textureSize);
		}
	}

	function handleScroll() {
		scrollY = window.scrollY;
	}

	onMount(() => {
		handleResize();
		handleScroll();

		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll, { passive: true });
		animationId = requestAnimationFrame(draw);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(animationId);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="planet-rings"
	style="transform: translateY({scrollY * parallaxFactor}px); opacity: {scrollOpacity}"
></canvas>

<style>
	.planet-rings {
		position: absolute;
		will-change: transform;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 1;
		width: 100svw;
		height: 100svh;
		pointer-events: none;
	}
</style>
