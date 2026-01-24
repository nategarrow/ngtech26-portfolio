<script lang="ts">
	import { animate, scroll } from 'motion';

	import HighlightCard from '@components/Portfolio/HighlightCard.svelte';
	import Trustbar from '@components/Portfolio/Trustbar.svelte';
	import { onMount } from 'svelte';
	import type { ProjectsProps } from '@lib/types/schema';
	import { cva } from 'cva';

	type Props = {
		projectHighlights: ProjectsProps[];
	};

	const { projectHighlights }: Props = $props();

	let activeClient = $state(projectHighlights[0].client);
	const clientData = $derived(
		projectHighlights.find(project => project.client === activeClient) || projectHighlights[0]
	);

	const companyLogos = {
		deepgram: '/images/deepgram-logo.svg',
		webstacks: '/images/webstacks-logo.svg',
		semgrep: '/images/semgrep-logo.svg',
		arcesium: '/images/arcesium-logo.svg',
	} as const;
</script>

<section id="portfolio" class="px-4 py-16">
	<div class="border-wrap-top mx-auto max-w-5xl space-y-16 px-0 pt-4 md:space-y-24 md:px-8 md:pt-8">
		<div id="project-list" class="flex flex-col gap-8 md:gap-10">
			<div class="border-blue-light/50 flex justify-between gap-4 overflow-auto rounded-2xl border p-2">
				{#each projectHighlights as project, idx}
					<button
						class="[.isactive]:bg-card-background relative flex w-full flex-1 cursor-pointer items-center justify-center rounded-xl px-4 py-1 text-center text-xl font-bold tracking-wide opacity-50 transition-opacity duration-150 before:absolute before:inset-0 before:rounded-xl before:content-[''] md:py-2 [.isactive]:opacity-100"
						aria-label={project.client}
						class:isactive={activeClient === project.client}
						onclick={() => (activeClient = project.client)}
					>
						{#if companyLogos[project.client.toLowerCase() as keyof typeof companyLogos]}
							<img
								src={companyLogos[project.client.toLowerCase() as keyof typeof companyLogos]}
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
				<HighlightCard {...clientData} />
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
