<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import HighlightCard from '@atomic/organisms/HighlightCard/HighlightCard.svelte';
	import ProjectTypeNav from '@atomic/features/ProjectTypeMenu/molecules/ProjectTypeNav.svelte';

	const { data } = $props();

	const projects = $derived(data?.projects || []);
	const taxonomies = $derived(data?.taxonomies || {});

	let activeType = $state('all');

	const filteredProjects = $derived(
		activeType === 'all' ? projects : projects.filter((p: any) => p.type?._id === activeType)
	);

	const activeTabId = $derived(`project-type-tab-${activeType}`);

	const PANEL_ID = 'project-type-panel';
</script>

<section class="pt-20 pb-12 md:pt-32 md:pb-20" in:fade>
	<div class="container space-y-12 py-5">
		<div class="flex flex-col gap-8">
			<h1 class="text-2xl md:text-4xl lg:text-5xl">All Projects</h1>
			<div class="space-y-2">
				<p>⚠️ Oh no! This page is currently under construction. ⚠️</p>
				<p>
					That being said, I'm glad you're here and want to showcase a few of my previous projects. Thank you for
					visiting!
				</p>
			</div>
			{#if taxonomies?.types?.length}
				<ProjectTypeNav
					types={taxonomies.types}
					{activeType}
					panelId={PANEL_ID}
					onchange={(id) => (activeType = id)}
				/>
			{/if}
		</div>

		<div
			id={PANEL_ID}
			role="tabpanel"
			aria-labelledby={activeTabId}
			tabindex="0"
			class="outline-none"
		>
			{#key activeType}
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
					{#each filteredProjects as project, i (project._id)}
						<div in:fly={{ y: 16, duration: 300, delay: 60 + i * 70, easing: cubicOut }}>
							<HighlightCard {...project} simple />
						</div>
					{:else}
						<p class="text-offwhite col-span-full py-12 text-center">
							No projects found for this type.
						</p>
					{/each}
				</div>
			{/key}
		</div>

		{#if activeType === 'all'}
			<div class="text-center">
				<span class="text-3xl text-white"> And many more! </span>
			</div>
		{/if}
	</div>
</section>
