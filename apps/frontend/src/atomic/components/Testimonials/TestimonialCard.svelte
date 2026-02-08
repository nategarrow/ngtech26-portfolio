<script lang="ts">
	import { urlFor } from '@lib/sanity/image';
	import type { Testimonial } from '@lib/types/sanity.types';
	import { PortableText } from '@portabletext/svelte';

	const { _id, name, role, company, image, quote }: Testimonial = $props();
</script>

<div id={_id || ''} class="testimonial-card w-full p-3 md:p-8 xl:px-32">
	<div class="space-y-8 lg:space-y-12">
		{#if quote}
			<div class="quote-text text-lg leading-relaxed font-normal tracking-wide whitespace-pre-line">
				<PortableText value={quote} />
			</div>
		{/if}
		<div class="flex items-center justify-center gap-4">
			<div
				class="image-wrapper bg-card-background grid aspect-square size-12 place-items-center overflow-hidden rounded-full p-3 lg:size-16"
			>
				{#if image?.asset}
					<img src={urlFor(image).auto('format').width(72).url()} alt={name} class="size-full" />
				{/if}
			</div>
			<p class="flex flex-col text-xl">
				<span class="font-title font-medium tracking-wider text-white">{name}</span>
				<span class="font-code text-slate align-bottom text-xs md:text-sm">{role}, {company}</span>
			</p>
		</div>
	</div>
</div>

<style>
	.testimonial-card {
		flex: 1 45%;
	}

	.quote-text {
		color: var(--color-offwhite);
	}

	:global(.quote-text strong) {
		color: var(--color-orange);
	}
</style>
