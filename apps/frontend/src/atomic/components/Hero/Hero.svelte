<script lang="ts">
	import { PortableText } from '@portabletext/svelte';

	import { urlFor } from '@lib/sanity/image';

	import type { Hero } from '@lib/types/sanity.types';

	const { title, subheading, content, avatar }: Hero = $props();
</script>

<section id="home" class="center-content relative pt-40 pb-32 md:pb-28 lg:pt-48 lg:pb-48">
	<div class="relative z-10 w-full max-w-5xl px-3">
		<div class="mx-auto grid auto-rows-min grid-cols-1 items-center gap-y-4">
			{#if avatar?.asset}
				<div class="flex flex-col items-center justify-center">
					<div class="aspect-square w-18 overflow-hidden rounded-full bg-gray-300 md:w-24 lg:w-28">
						<img src={urlFor(avatar).auto('format').width(256).url()} alt="Nathan Garrow" />
					</div>
				</div>
			{/if}
			<div class="mb-6 text-center">
				<h1 class="flex flex-col font-medium text-transparent">
					<span class="gradient-text font-germania-one text-4xl tracking-widest md:text-5xl xl:text-7xl">{title}</span>
				</h1>
				<span class="font-subtitle gradient-text text-xl md:text-3xl lg:text-4xl">
					{subheading}
				</span>
			</div>

			<div class="mx-auto max-w-lg flex-1 space-y-6 text-center">
				<div class="text-md w-full max-w-prose leading-snug xl:text-xl">
					{#if content}
						<PortableText value={content} />
					{/if}
				</div>
			</div>
			<div class="mx-auto mt-12 text-center lg:hidden">
				<a href="/projects" class="border-violet hover:bg-blue-light/10 font-subtitle rounded-sm border px-6 py-2 font-medium hover:border-white">
					View Projects
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.gradient-text {
		background-image: linear-gradient(
			to bottom,
			var(--color-offwhite) 10%,
			var(--color-white) 35%,
			var(--color-slate) 100%
		);
	}
</style>
