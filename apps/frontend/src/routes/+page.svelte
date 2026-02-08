<script lang="ts">
	import ComponentGenerator from '@atomic/components/ComponentGenerator.svelte';
	import Seo from '@atomic/molecules/Seo.svelte';
	import { fade } from 'svelte/transition';

	const { data } = $props();
	const { sections, seo } = $derived(data || {});
</script>

{#if seo}
	<Seo {seo} />
{/if}

<div in:fade>
	<ComponentGenerator {sections} />
</div>
