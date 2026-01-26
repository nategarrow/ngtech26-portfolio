<script lang="ts">
	import AboutMe from '@components/AboutMe/AboutMe.svelte';
	import Hero from '@components/Hero/Hero.svelte';
	import ProjectSpotlight from '@components/ProjectSpotlight/ProjectSpotlight.svelte';
	import Resume from '@components/Resume/Resume.svelte';
	import Testimonials from '@components/Testimonials/TestimonialList.svelte';

	type Props = {
		sections: any[];
	};

	const { sections }: Props = $props();

	const componentMap = {
		hero: Hero,
		aboutMe: AboutMe,
		projectSpotlight: ProjectSpotlight,
		resume: Resume,
		testimonialSlider: Testimonials,
	};
</script>

{#each sections as section}
	{#if section._type && componentMap[section._type]}
		{@const Component = componentMap[section._type]}
		<Component {...section} />
	{/if}
{/each}
