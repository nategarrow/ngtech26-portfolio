<script lang="ts">
	import HighlightCard from '@atomic/components/ProjectSpotlight/HighlightCard.svelte';
	import { urlFor } from '@lib/sanity/image';
	import type { Project } from '@lib/types/sanity.types';

	const { projectHighlights }: { projectHighlights: Project[] } = $props();

	let activeClientId = $state(projectHighlights?.[0]?._id);
	const activeClient = $derived(projectHighlights?.find(project => project._id === activeClientId));
</script>

<section id="portfolio" class="px-4 py-16">
	<div class="border-wrap-top mx-auto max-w-5xl space-y-16 px-0 pt-4 md:space-y-24 md:px-8 md:pt-8">
		<div id="project-list" class="flex flex-col gap-8 md:gap-10">
			<div class="border-blue-light/50 flex justify-between gap-4 overflow-auto rounded-2xl border p-2">
				{#each projectHighlights as project (project._id)}
					<button
						class="[.active]:bg-card-background relative flex w-full flex-1 cursor-pointer items-center justify-center rounded-xl px-4 py-1 text-center text-xl font-bold tracking-wide opacity-50 transition-opacity duration-150 before:absolute before:inset-0 before:rounded-xl before:content-[''] md:py-2 [.active]:opacity-100"
						aria-label={project.client}
						class:active={activeClientId === project._id}
						onclick={() => (activeClientId = project._id)}
					>
						{#if project?.clientLogo?.image}
							<img
								src={urlFor(project.clientLogo.image).width(256).auto('format').url()}
								alt={project.client}
								class="h-8 w-full md:h-6"
							/>
						{:else}
							<span class="relative z-20 block w-max">{project.client}</span>
						{/if}
					</button>
				{/each}
			</div>
			<div>
				<HighlightCard {...activeClient} />
			</div>
		</div>
	</div>
	<!-- <Trustbar /> -->
</section>

<style>
	.border-wrap-top {
		position: relative;

		@media (min-width: 768px) {
			&:before {
				content: '';
				position: absolute;
				inset: 0;
				border-radius: 1.5rem;
				padding: 1.5px;
				background: linear-gradient(to bottom, var(--color-orange), transparent 80%);
				-webkit-mask:
					linear-gradient(#fff 0 0) content-box,
					linear-gradient(#fff 0 0);
				-webkit-mask-composite: xor;
				mask-composite: exclude;
				pointer-events: none;
				z-index: 1;
			}
		}
	}
</style>
