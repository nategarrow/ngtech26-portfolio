<script lang="ts">
	import ComponentGenerator from '@atomic/components/ComponentGenerator.svelte';
	import Seo from '@atomic/molecules/Seo.svelte';

	const { data } = $props();
	const { sections, seo } = $derived(data || {});
</script>

{#if seo}
	<Seo {seo} />
{/if}

<ComponentGenerator {sections} />
