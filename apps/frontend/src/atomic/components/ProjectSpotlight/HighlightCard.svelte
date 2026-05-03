<script lang="ts">
	import { urlFor } from '@lib/sanity/image';
	import { cva } from 'cva';

	import { stringToKebabCase } from '../../../utils/textFunctions';

	import type { Project } from '@lib/types/sanity.types';

	type HighlightCardProps = Project & {
		simple: boolean;
	};

	const {
		simple,
		title,
		client,
		description,
		techStack,
		stats,
		projectImage,
		projectLink,
		agencyLink,
		types
	}: HighlightCardProps = $props();

	const cardClass = cva('relative z-10 size-full text-white', {
		variants: {
			simple: {
				true: '',
				false: 'grid size-full grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] md:grid-rows-1 md:flex-row md:gap-x-12',
			},
		},
		defaultVariants: {
			simple: false,
		},
	});
</script>

<div id={stringToKebabCase(client)} class="project-card mx-auto w-full max-w-5xl">
	{#if projectImage?.image}
		<div class="image-card group relative overflow-hidden rounded-2xl shadow-2xl shadow-blue/10">
			<img
				src={urlFor(projectImage.image).width(1280).auto('format').url()}
				alt={title}
				class="card-bg-image absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="eager"
			/>
			<div class="card-hover-overlay absolute inset-0 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<div class="px-6 py-8 text-white lg:px-10 lg:py-10">
					<p class="font-title mb-2 text-sm font-light tracking-wide md:text-base">{client}</p>
					<p class="font-subtitle text-xl font-medium tracking-tight md:text-2xl">{title}</p>
					{#if description}
						<p class="text-offwhite mt-3 line-clamp-2 text-sm md:text-base">{description}</p>
					{/if}
					{#if techStack}
						<p class="mt-3 text-sm">
							<span class="font-subtitle font-semibold tracking-widest">Technologies: </span>
							<span class="font-code font-light">{techStack}</span>
						</p>
					{/if}
					{#if projectLink || agencyLink}
						<div class="mt-5 flex gap-3">
							{#if projectLink}
								<a
									href={projectLink}
									rel="noopener noreferrer"
									target="_blank"
									class="border-violet hover:bg-blue-light/10 font-subtitle rounded-sm border px-4 py-1.5 text-sm font-medium hover:border-white"
									>View Project</a
								>
							{/if}
							{#if agencyLink}
								<a
									href={agencyLink}
									rel="noopener noreferrer"
									target="_blank"
									class="border-violet hover:bg-blue-light/10 font-subtitle rounded-sm border px-4 py-1.5 text-sm font-medium hover:border-white"
									>View Agency</a
								>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div
			class="bg-background/10 border-blue-light/50 relative h-full overflow-hidden rounded-2xl border px-4 py-10 shadow-2xl shadow-blue/10 backdrop-blur-lg lg:px-12"
		>
			<div class={cardClass({ simple })}>
				<div class="relative z-10 md:row-span-2">
					<div class="flex h-full flex-col justify-between gap-8">
						<div>
							<p class="font-title mb-4 text-base font-light tracking-wide text-white md:text-lg lg:text-xl">
								{client}
							</p>
							<p class="font-subtitle text-xl font-medium tracking-tight text-white md:text-2xl">
								{title}
							</p>
							<p class="text-offwhite mt-4 text-base">
								{description}
							</p>
							{#if techStack}
								<div class="mt-4 flex flex-wrap gap-2">
									<p class="text-sm md:text-base">
										<span class="font-subtitle font-semibold tracking-widest">Technologies: </span>
										<span class="tech-tag font-code font-light">{techStack}</span>
									</p>
								</div>
							{/if}
						</div>
						{#if projectLink || agencyLink}
							<div class="flex flex-col gap-4 text-center md:flex-row md:text-left">
								{#if projectLink}
									<a
										href={projectLink}
										rel="noopener noreferrer"
										target="_blank"
										class="border-violet hover:bg-blue-light/10 font-subtitle rounded-sm border px-6 py-2 font-medium hover:border-white"
										>View Project</a
									>
								{/if}
								{#if agencyLink}
									<a
										href={agencyLink}
										rel="noopener noreferrer"
										target="_blank"
										class="border-violet hover:bg-blue-light/10 font-subtitle rounded-sm border px-6 py-2 font-medium hover:border-white"
										>View Agency</a
									>
								{/if}
							</div>
						{/if}
					</div>
				</div>

				<div class="relative z-10 flex flex-col items-center justify-center md:col-start-2">
					<div class="flex w-full flex-col gap-4">
						<div class="project-stats flex flex-col items-center justify-center gap-4">
							{#each stats as stat}
								<div
									class="stat bg-background/70 border-orange flex w-full flex-1 flex-col border text-center md:text-right"
								>
									<span class="value">{stat.value}</span>
									<span class="label">{stat.label}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.image-card {
		min-height: 320px;
		aspect-ratio: 16 / 9;
	}

	.card-bg-image {
		object-position: center top;
	}

	.card-hover-overlay {
		background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.75) 55%, rgba(0, 0, 0, 0.2) 100%);
	}

	.project-stats {
		.stat {
			padding: 1rem 2rem;
			border-radius: 12px;

			.label {
				font-family: var(--font-title);
				font-size: var(--text-lg);
				font-weight: 400;
				letter-spacing: 0.1em;
				line-height: 1.25;
			}
			.value {
				font-family: var(--font-subtitle);
				font-size: var(--text-2xl);
			}
		}
	}
</style>
