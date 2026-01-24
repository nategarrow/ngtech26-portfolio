<script>
	import '@styles/theme.css';
	import '@styles/animations.css';
	import '@fontsource-variable/georama';
	import '@fontsource/germania-one';
	import '@fontsource-variable/unbounded';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { injectSpeedInsights } from '@vercel/speed-insights';
	import { inject } from '@vercel/analytics';
	import { PUBLIC_RESUME_FILENAME } from '$env/static/public';
	import PlanetRings from '@components/PlanetRings.svelte';

	let { children } = $props();

	// Ring position based on current route
	let ringPosition = $derived.by(() => {
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

	let activeNavItem = $state('home');

	// Reset activeNavItem when not on home page
	$effect(() => {
		console.log('🚀 ~ $page.url:', $page.url);
		if ($page.url.pathname !== '/') {
			activeNavItem = '';
		}
	});

	// Add event listener for <section> elements with an ID matching the href hash of the nav
	onMount(() => {
		const sections = document.querySelectorAll('section[id]');
		const navLinks = document.querySelectorAll('.nav-wrapper a');

		window.addEventListener('scroll', () => {
			const scrollPosition = window.scrollY + window.innerHeight;
			const pageHeight = document.documentElement.scrollHeight;

			// Only apply scroll-based active nav items on the home page
			if ($page.url.pathname === '/') {
				if (scrollPosition === 0) {
					const firstSection = [...sections].at(0);
					const firstId = firstSection?.id;
					if (firstId) {
						console.log('manually activating at top:', firstId);
						activeNavItem = firstId;
					}
				}
				if (scrollPosition >= pageHeight - 1) {
					const lastSection = [...sections].at(-1);
					console.log('🚀 ~ lastSection:', lastSection);
					const lastId = lastSection?.id;
					if (lastId) {
						console.log('manually activating at bottom:', lastId);
						activeNavItem = lastId;
					}
				}
			}
		});

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const id = entry.target.id;
						console.log('🚀 ~ id:', id, entry.target);

						// Only update activeNavItem based on intersection on the home page
						if ($page.url.pathname === '/') {
							console.log('intersecting');
							navLinks.forEach(link => {
								console.log('link', link.getAttribute('href'), id);
								if (link.getAttribute('href')?.includes(id)) {
									console.log('changing to ', id);
									activeNavItem = id;
								}
							});
						}
					}
				});
			},
			{ rootMargin: '-30% 0px -70% 0px' }
		);

		sections.forEach(section => {
			observer.observe(section);
		});
	});
</script>

<header class="fixed top-0 left-0 z-50 w-full backdrop-blur-xs">
	<div class="mx-auto max-w-7xl px-4 lg:px-6">
		<div class="mx-auto flex w-full items-center justify-center px-4 py-5 lg:justify-between">
			<span class="font-germania-one flex-1 text-xl font-medium text-white lg:text-3xl">NG</span>
			<div class="nav-wrapper hidden w-full flex-1 items-center justify-center gap-4 lg:flex">
				<div class="bg-card-background flex items-center gap-6 rounded-xl p-2">
					<nav>
						<ul class="flex w-fit flex-col gap-4 text-right text-sm text-white lg:flex-row lg:gap-2 lg:text-center">
							<li class="flex justify-end lg:justify-center">
								<a class:active={activeNavItem === 'home'} class="nav-item" href="/#home">Home</a>
							</li>
							<li class="flex justify-end lg:justify-center">
								<a class:active={activeNavItem === 'about-me'} class="nav-item" href="/#about-me">About Me</a>
							</li>
							<li class="flex justify-end lg:justify-center">
								<a class:active={activeNavItem === 'portfolio'} class="nav-item" href="/#portfolio"
									>Portfolio</a
								>
							</li>
							<li class="flex justify-end lg:justify-center">
								<a class:active={activeNavItem === 'success-stories'} class="nav-item" href="/#success-stories"
									>Success Stories</a
								>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="flex flex-1 justify-end gap-2">
				<a
					href={PUBLIC_RESUME_FILENAME}
					title="Resume"
					target="_blank"
					class="btn bg-violet font-subtitle text-offwhite text-xs hover:bg-violet-600 md:text-sm text-nowrap"
				>
					View Resume
				</a>
			</div>
		</div>
	</div>
</header>

<main>
	{@render children()}
	<PlanetRings centerXPercent={ringPosition.centerX} centerYPercent={ringPosition.centerY} />
	<div class="dark-star fixed"></div>
</main>

<style>
	.nav-wrapper a {
		color: var(--color-offwhite);
		transition: color 0.2s ease-in-out;

		&:hover,
		&:focus-visible {
			color: var(--color-blue-200);
		}
	}

	.nav-item {
		display: block;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		width: max-content;

		&.active {
			background: var(--color-violet);
		}
	}

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
