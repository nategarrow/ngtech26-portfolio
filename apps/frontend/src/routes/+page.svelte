<script lang="ts">
	import Footer from '@components/Footer.svelte';
	import Hero from '@components/Hero.svelte';
	import Portfolio from '@atomic/components/ProjectSpotlight/ProjectSpotlight.svelte';
	import AboutMe from '@components/AboutMe/AboutMe.svelte';
	import Resume from '@components/Resume/Resume.svelte';
	import TestimonialList from '@components/Testimonials/TestimonialList.svelte';

	export let data;
	const { homeData } = data;
	const { heroContent, aboutContent, aboutStats, projectHighlights, experiences, testimonials } = homeData?.[0];
</script>

<Hero {heroContent} />

<AboutMe {aboutContent} {aboutStats} />

<Portfolio {projectHighlights} />

<Resume {experiences} />

<TestimonialList {testimonials} />

<Footer />
