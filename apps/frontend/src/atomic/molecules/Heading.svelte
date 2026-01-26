<script lang="ts">
	type Props = {
		headingText: string;
		subheadingText: string;
	};

	const { headingText, subheadingText }: Props = $props();
</script>

{#snippet heading(headText: string)}
	<h2 class="text-3xl font-semibold tracking-widest text-white xl:text-4xl">{headText}</h2>
{/snippet}

{#snippet subheading(subheadText: string)}
	<div class="mx-auto max-w-3xl text-lg xl:text-xl">
		{@html subheadText}
	</div>
{/snippet}

<section class="py-20 lg:py-28">
	<div class="mx-auto max-w-7xl px-4 text-center">
		<div class="space-y-4 lg:space-y-6 xl:space-y-10">
			{@render heading(headingText)}
			{@render subheading(subheadingText)}
		</div>
	</div>
</section>
