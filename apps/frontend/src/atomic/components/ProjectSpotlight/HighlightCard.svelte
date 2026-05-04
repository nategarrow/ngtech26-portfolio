<script lang="ts">
	import './HighlightCard.style.css';

	import { urlFor } from '@lib/sanity/image';

	import { stringToKebabCase } from '../../../utils/textFunctions';

	import type { Project } from '@lib/types/sanity.types';

	type HighlightCardProps = Project & {
		simple: boolean;
		permanent?: boolean;
	};

	const {
		simple,
		permanent = false,
		title,
		client,
		description,
		techStack,
		stats,
		projectImage,
		projectLink,
		agencyLink,
		type,
	}: HighlightCardProps = $props();
</script>

{#snippet linkButton(href: string, label: string, compact = false)}
	<a
		{href}
		rel="noopener noreferrer"
		target="_blank"
		class="link-btn {compact ? 'compact' : ''} border-violet hover:bg-blue-light/10 font-subtitle rounded-sm border font-medium hover:border-white"
	>
		{label}
	</a>
{/snippet}

{#snippet cardMeta(overlay = false)}
	<p
		class="card-client {overlay ? 'is-overlay' : ''} font-title font-light tracking-wide text-white {overlay
			? 'text-sm md:text-base'
			: 'text-base md:text-lg lg:text-xl'}"
	>
		{overlay ? (client ?? type?.title) : client}
	</p>
	<p class="font-subtitle text-xl font-medium tracking-tight text-white md:text-2xl">{title}</p>
	{#if description}
		<p
			class="card-description {overlay ? 'is-overlay' : ''} text-offwhite {overlay
				? 'line-clamp-2 text-sm md:text-base'
				: 'text-base'}"
		>
			{description}
		</p>
	{/if}
	{#if overlay && techStack}
		<p class="card-techstack text-sm">
			<span class="font-subtitle font-semibold tracking-widest">Technologies: </span>
			<span class="font-code font-light">{techStack}</span>
		</p>
	{/if}
{/snippet}

{#snippet cardLinks(overlay = false)}
	{#if projectLink || agencyLink}
		<div class="card-links {overlay ? 'is-overlay' : ''}">
			{#if projectLink}{@render linkButton(projectLink, 'View Project', overlay)}{/if}
			{#if agencyLink}{@render linkButton(agencyLink, 'View Agency', overlay)}{/if}
		</div>
	{/if}
{/snippet}

<div id={stringToKebabCase(client)} class="highlight-card">
	{#if projectImage?.image}
		<div class="image-card group rounded-2xl shadow-2xl shadow-blue/10">
			<img
				src={urlFor(projectImage.image).width(1280).auto('format').url()}
				alt={title}
				class="card-bg-image transition-transform duration-500 group-hover:scale-105"
				loading="eager"
			/>
			<div class="card-hover-overlay {permanent ? 'opacity-100' : 'opacity-0 transition-opacity duration-300 group-hover:opacity-100'}">
				<div class="overlay-content text-white">
					{@render cardMeta(true)}
					{@render cardLinks(true)}
				</div>
			</div>
		</div>
	{:else}
		<div class="text-card rounded-2xl border border-blue-light/50 bg-background/10 shadow-2xl shadow-blue/10 backdrop-blur-lg">
			<div class="text-card-body {simple ? '' : 'with-stats'} text-white">
				<div class="card-content">
					<div>{@render cardMeta()}</div>
					{@render cardLinks()}
				</div>

				{#if stats?.length}
					<div class="card-stats-col">
						<div class="project-stats">
							{#each stats as stat}
								<div class="stat border border-orange bg-background/70">
									<span class="value">{stat.value}</span>
									<span class="label">{stat.label}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
