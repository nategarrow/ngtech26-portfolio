<script>
	import Badge from '@molecules/Badge.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} badge
	 * @property {string} heading
	 */
	/** @type {Props} */
	const { badge, heading } = $props();
</script>

<div class="center-content space-y-3">
	{#if badge}
		<Badge label={badge} />
	{/if}
	<h2 class="font-regular text-4xl tracking-widest text-white sm:text-5xl">{heading}</h2>
</div>
