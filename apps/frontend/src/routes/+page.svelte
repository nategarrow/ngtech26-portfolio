<script lang="ts">
	import ComponentGenerator from '@atomic/components/ComponentGenerator.svelte';
	import { toPlainText } from '@portabletext/svelte';

	const { data } = $props();
	const { sections, seo } = $derived(data || {});
	console.log('seo: ', seo);
</script>

<svelte:head>
	<title>{seo.metaTitle}</title>
	<meta name="description" content={toPlainText(seo.metaDescription)} />
</svelte:head>
<ComponentGenerator {sections} />
