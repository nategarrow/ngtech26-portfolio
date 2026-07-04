/// <reference lib="webworker" />
import { getColorAtPosition } from './ringGradient';

export interface RingTextureRequest {
	requestId: number;
	size: number;
	particleCount: number;
}

export interface RingTextureResponse {
	requestId: number;
	bitmap: ImageBitmap;
}

// Same per-particle drawing as the original main-thread implementation - only difference is this
// now runs inside a worker, off the main thread, so it can't block first paint / Lighthouse TBT.
// The finished canvas is handed back as an ImageBitmap (transferToImageBitmap): OffscreenCanvas
// itself isn't transferable once it has a bound rendering context ("cannot clone canvas with
// context"), and going through getImageData/putImageData round-trips the pixels through
// unpremultiplied ImageData, which can visibly soften a canvas full of low-alpha particles.
const buildRingTexture = (size: number, particleCount: number): ImageBitmap => {
	const canvas = new OffscreenCanvas(size, size);
	const ctx = canvas.getContext('2d');

	if (ctx) {
		const center = size / 2;
		const maxRadius = size / 2;

		for (let i = 0; i < particleCount; i++) {
			// Distribute particles with bias toward outer rings (more visible area)
			const radiusNormalized = 0.3 + Math.pow(Math.random(), 0.7) * 0.7;
			const radius = radiusNormalized * maxRadius;
			const angle = Math.random() * Math.PI * 2;

			const x = center + Math.cos(angle) * radius;
			const y = center + Math.sin(angle) * radius;

			const color = getColorAtPosition(radiusNormalized);
			const brightness = 0.5 + Math.random() * 0.5;
			const alpha = color.a * brightness;

			const particleSize = 2 + Math.random() * 2.1;

			ctx.beginPath();
			ctx.arc(x, y, particleSize, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
			ctx.fill();
		}
	}

	return canvas.transferToImageBitmap();
};

self.onmessage = (event: MessageEvent<RingTextureRequest>) => {
	const { requestId, size, particleCount } = event.data;
	const bitmap = buildRingTexture(size, particleCount);
	const response: RingTextureResponse = { requestId, bitmap };
	self.postMessage(response, [bitmap]);
};
