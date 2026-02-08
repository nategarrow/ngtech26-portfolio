<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { page as statePage } from '$app/state';

	const resumeLink = $derived(statePage.data.resumeLink);

	let activeNavItem = $state($page.url.pathname === '/' ? 'home' : $page.url.pathname.replace('/', ''));
	const homePageSections = ['home', 'about-me', 'success-stories'];

	// Handle navigation changes
	$effect(() => {
		if ($page.url.pathname !== '/') {
			if ($page.url.pathname === '/projects') {
				activeNavItem = 'projects';

				return;
			}

			activeNavItem = '';
		} else {
			// When returning to home, check scroll position after a brief delay
			setTimeout(() => {
				checkActiveSection();
			}, 100);
		}
	});

	onMount(() => {
		// Set up scroll listener
		const handleScroll = () => {
			if ($page.url.pathname === '/') {
				checkActiveSection();
			}
		};

		// Set up intersection observer
		const observer = new IntersectionObserver(
			entries => {
				if ($page.url.pathname !== '/') return;

				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const id = entry.target.id;
						// Only update if the ID is in homePageSections
						if (homePageSections.includes(id)) {
							const navLinks = document.querySelectorAll('.nav-wrapper a[href*="#"]');

							navLinks.forEach(link => {
								if (link.getAttribute('href')?.includes(id)) {
									activeNavItem = id;
								}
							});
						}
					}
				});
			},
			{ rootMargin: '-30% 0px -70% 0px' }
		);

		// Observe all sections
		const sections = document.querySelectorAll('section[id]');
		sections.forEach(section => {
			observer.observe(section);
		});

		// Add scroll listener with throttling
		let ticking = false;
		const throttledHandleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', throttledHandleScroll);

		// Initial check
		checkActiveSection();

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
			observer.disconnect();
		};
	});

	const checkActiveSection = () => {
		const sections = document.querySelectorAll('section[id]');
		if (sections.length === 0) return;

		const scrollPosition = window.scrollY + window.innerHeight;
		const pageHeight = document.documentElement.scrollHeight;

		// At the top
		if (window.scrollY < 10) {
			const firstSection = sections[0];
			if (firstSection && homePageSections.includes(firstSection.id)) {
				activeNavItem = firstSection.id;
			}

			return;
		}

		// At the bottom
		if (scrollPosition >= pageHeight - 2) {
			const lastSection = sections[sections.length - 1];
			if (lastSection && homePageSections.includes(lastSection.id)) {
				activeNavItem = lastSection.id;
			}

			return;
		}

		// Find section in viewport
		for (const section of sections) {
			const rect = section.getBoundingClientRect();
			if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
				if (homePageSections.includes(section.id)) {
					activeNavItem = section.id;
					break;
				}
			}
		}
	};
</script>

<header class="fixed top-0 left-0 z-50 w-full backdrop-blur-xs">
	<div class="container">
		<div class="mx-auto flex w-full items-center justify-center py-5 lg:justify-between">
			<a href="/" class="flex-1">
				<span class="font-germania-one text-xl font-medium text-white lg:text-3xl">NG</span>
			</a>
			<nav class="flex gap-4">
				<div class="nav-wrapper hidden w-full flex-1 items-center justify-center gap-4 lg:flex">
					<div class="bg-card-background flex items-center gap-6 rounded-md p-2">
						<nav>
							<ul class="flex w-fit flex-col gap-4 text-right text-sm text-white lg:flex-row lg:gap-2 lg:text-center">
								<li class="flex justify-end lg:justify-center">
									<a class:active={activeNavItem === 'home'} class="nav-item" href="/#home">Home</a>
								</li>
								<li class="flex justify-end lg:justify-center">
									<a class:active={activeNavItem === 'about-me'} class="nav-item" href="/#about-me">About Me</a>
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
				<div class="nav-wrapper hidden w-full flex-1 items-center justify-center gap-4 lg:flex">
					<div class="bg-card-background flex items-center gap-6 rounded-md p-2">
						<nav>
							<ul class="flex w-fit flex-col gap-4 text-right text-sm text-white lg:flex-row lg:gap-2 lg:text-center">
								<li class="flex justify-end lg:justify-center">
									<a href="/projects" class:active={activeNavItem === 'projects'} class="nav-item">Projects</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</nav>
			<div class="flex flex-1 justify-end gap-2">
				{#if resumeLink?.asset?.url}
					<a
						href={resumeLink?.asset?.url}
						title="Resume"
						target="_blank"
						class="btn bg-violet font-subtitle text-offwhite text-xs text-nowrap hover:bg-violet-600 md:text-sm"
					>
						View Resume
					</a>
				{/if}
			</div>
		</div>
	</div>
</header>

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
		border-radius: 0.25rem;
		width: max-content;

		&.active {
			background: var(--color-violet);
		}
	}
</style>
