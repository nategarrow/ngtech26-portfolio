<script lang="ts">
	// import Footer from '@atomic/layout/Footer.svelte';
	// import Hero from '@atomic/components/Hero/Hero.svelte';
	// import Portfolio from '@atomic/components/ProjectSpotlight/ProjectSpotlight.svelte';
	// import AboutMe from '@components/AboutMe/AboutMe.svelte';
	// import Resume from '@components/Resume/Resume.svelte';
	// import TestimonialList from '@components/Testimonials/TestimonialList.svelte';


	const { data } = $props();
	console.log('🚀 ~ page data:', data);

	// const { heroContent, aboutContent, aboutStats, projectHighlights, experiences, testimonials } = homeData?.[0];
</script>

<!-- <Hero {heroContent} />

<AboutMe {aboutContent} {aboutStats} />

<Portfolio {projectHighlights} />

<Resume {experiences} />

<TestimonialList {testimonials} />

<Footer /> -->
