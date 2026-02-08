<script lang="ts">
	import '@styles/theme.css';
	import '@styles/animations.css';
	import '@fontsource-variable/georama';
	import '@fontsource/germania-one';
	import '@fontsource-variable/unbounded';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { injectSpeedInsights } from '@vercel/speed-insights';
	import { inject } from '@vercel/analytics';
	import PlanetRings from '@components/PlanetRings/PlanetRings.svelte';
	import Header from '../atomic/layout/Header/Header.svelte';

	import type { PageData } from './$types';
	const { children }: PageData = $props();

	// Ring position based on current route
	const ringPosition = $derived.by(() => {
		const pathname = $page.url.pathname;
		if (pathname.startsWith('/projects')) {
			// /projects: bottom-left quadrant visible, center at upper-right off-screen
			return { centerX: 150, centerY: 15, tilt: 20 };
		}

		// Homepage and default: arc at bottom, centered
		return { centerX: 50, centerY: 110, tilt: 0 };
	});

	onMount(() => {
		injectSpeedInsights();
		inject();
	});
</script>

<Header />

<main>
	<div class="relative z-5">
		{@render children()}
	</div>
	<PlanetRings centerXPercent={ringPosition.centerX} centerYPercent={ringPosition.centerY} />
	<div class="dark-star fixed"></div>
</main>

<style>
	.dark-star {
		position: relative;

		&:after {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: radial-gradient(
				circle at 90% 10%,
				var(--color-background-blue, #0f172a),
				var(--color-background, #04020a) 30%
			);
			z-index: -1;
		}
	}
</style>
