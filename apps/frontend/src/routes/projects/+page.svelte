<script lang="ts">
	import HighlightCard from "@atomic/components/ProjectSpotlight/HighlightCard.svelte";

	const { data } = $props();

	const projects = $derived(data?.projects || []);
	const taxonomies = $derived(data?.taxonomies || []);

	let activeType = $state('all');
	let activeTag = $state('all');

	const workInProgress = true;

	const setActiveFilter = (newValue: string, filter: 'tag' | 'type') => {
		if (filter === 'type') {
			activeType = newValue;
		} else if (filter === 'tag') {
			activeTag = newValue;
		}
	}
</script>

<section class="pt-20 pb-12 md:pt-32 md:pb-20">
	<div class="container py-5 space-y-12">
		<div class="flex flex-col gap-8">
			<h1 class="text-2xl md:text-4xl lg:text-5xl">All Projects</h1>
			{#if !workInProgress}
			<div class="taxonomies flex flex-col gap-4">
				{#if taxonomies?.types}
					<div class="flex gap-4 flex-wrap">
						<button
					 		onclick={() => setActiveFilter('all', 'type')}
							class="taxonomy-type"
							class:active={activeType === 'all'}
						>
							All
						</button>
						{#each taxonomies.types as type}
							<button onclick={() => setActiveFilter(type._id, 'type')} class:active={activeType === type._id} class="taxonomy-type">{type.title}</button>
						{/each}
					</div>
				{/if}
				{#if taxonomies?.tags}
					<div class="flex gap-4 flex-wrap">
						<button
					 		onclick={() => setActiveFilter('all', 'tag')}
							class="taxonomy-tag"
							class:active={activeTag === 'all'}
						>
							All
						</button>

						{#each taxonomies.tags as tag}
							<button
							 	onclick={() => setActiveFilter(tag._id, 'tag')}
								class:active={activeTag === tag._id}
								class="taxonomy-tag"
							>
								{tag.title}
							</button>
						{/each}
					</div>
				{/if}
			</div>
			{:else }
			<div class="space-y-2">
				<p>⚠️ Oh no! This page is currently under construction. ⚠️</p>
				<p>That being said, I'm glad you're here and want to showcase a few of my previous projects. Thank you for visiting!</p>
			</div>
			{/if}

		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
			{#each projects as project}
				<HighlightCard {...project} simple />
			{/each}
		</div>
		<div class="text-center">
			<span class="text-3xl text-white">
				And many more!
			</span>
		</div>
	</div>
</section>

<style>
	.taxonomy-type {
		font-size: 1.2em;

		&.active {
			text-decoration: underline;
		}
	}
	.taxonomy-tag {
		border: 1px solid white;
		border-radius: 0.25rem;
		padding: 0.25rem 1rem;

		&.active {
			border-color: var(--color-blue-300);
		}
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		border: 1px solid var(--color-gray-300);
		border-radius: 0.5rem;
		padding: 1rem;
		background-color: rgba(255,255,255,0.05);
		backdrop-filter: blur(4px);
	}
</style>
