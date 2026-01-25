<script lang="ts">
	import '@splidejs/svelte-splide/css';
	import { Splide, SplideTrack, SplideSlide } from '@splidejs/svelte-splide';

	import type { TestimonialType } from '@lib/types/schema';
	import TestimonialCard from '@components/Testimonials/TestimonialCard.svelte';

	const { testimonials }: { testimonials: TestimonialType[] } = $props();
</script>

<section id="success-stories" class="relative z-[1] mt-8 md:mt-28">
	<div class="mx-auto max-w-6xl space-y-12 px-4 lg:space-y-16">
		{#if testimonials}
			<div
				class="splide-wrapper styled-border-blue-top styled-border-blue-bottom mx-auto flex flex-col flex-wrap gap-6 py-16 md:flex-row"
			>
				<Splide
					hasTrack={false}
					options={{ type: 'fade', rewind: true, autoplay: true, interval: 6000 }}
					class="w-full pb-8 md:pb-2"
				>
					<SplideTrack>
						{#each testimonials as testimonial}
							<SplideSlide class="flex items-center">
								<TestimonialCard {...testimonial} />
							</SplideSlide>
						{/each}
					</SplideTrack>

					<div class="splide__arrows"></div>
				</Splide>
			</div>
		{/if}
	</div>
</section>

<style>
	:global(.splide__arrow) {
		&:hover {
			background: var(--color-orange-light);
		}
	}

	.splide__arrows {
		@media (max-width: 1287px) {
			position: relative;
			top: 1rem;
		}
	}
</style>
