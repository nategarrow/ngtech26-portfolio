<script lang="ts">
	import { urlFor } from '@lib/sanity/image';
	import { toPlainText } from '@portabletext/svelte';

	const { seo } = $props();
</script>

<svelte:head>
	<title>{seo.metaTitle}</title>
	<meta name="description" content={toPlainText(seo.metaDescription)} />
	{#if seo?.ogImage}
		<meta property="og:image" content={urlFor(seo.ogImage).width(500).auto('format').url()} />
	{/if}
</svelte:head>
