<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, type Item, type DndEvent } from 'svelte-dnd-action';

	type Props = {
		skills: {
			id: string;
			name: string;
		}[];
	};
	let { skills }: Props = $props();

	const flipDurationMs = 300;
	const dropTargetStyle = { outline: 'none' };
	let items: Item[] = $state(skills);

	function handleDndConsider(e: CustomEvent<DndEvent>) {
		items = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<DndEvent>) {
		items = e.detail.items;
	}
</script>

<div class="skills mx-auto w-full space-y-8">
	<h3 class="font-germania-one text-3xl font-medium lg:text-4xl">Skills</h3>
	<div
		class="skills-list flex flex-wrap gap-3"
		use:dndzone={{ items, flipDurationMs, dropTargetStyle }}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
		tabindex="-1"
	>
		{#each items as item (item.id)}
			<button
				type="button"
				animate:flip={{ duration: flipDurationMs }}
				class="border-offwhite bg-blue-light/10 hover:bg-blue-light/20 md:text-md rounded-sm border px-2 py-0.5 text-sm text-blue-50 transition-all duration-150 xl:text-lg"
				tabindex="-1"
			>
				{item.name}
			</button>
		{/each}
	</div>
	<p class="text-offwhite/50">(Hint: Feel free to drag them around!)</p>
</div>
