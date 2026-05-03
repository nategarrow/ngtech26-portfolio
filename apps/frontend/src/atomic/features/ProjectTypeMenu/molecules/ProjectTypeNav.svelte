<script lang="ts">
	import ProjectTypeTab from '../atoms/ProjectTypeTab.svelte';

	type ProjectType = {
		_id: string;
		title: string;
	};

	type Props = {
		types: ProjectType[];
		activeType: string;
		panelId: string;
		onchange: (id: string) => void;
	};

	const { types, activeType, panelId, onchange }: Props = $props();

	const allTabs = $derived([{ _id: 'all', title: 'All' }, ...types]);

	let navEl: HTMLElement;

	function handleKeydown(event: KeyboardEvent) {
		if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

		event.preventDefault();

		const currentIndex = allTabs.findIndex((t) => t._id === activeType);
		let newIndex: number;

		switch (event.key) {
			case 'ArrowRight':
				newIndex = (currentIndex + 1) % allTabs.length;
				break;
			case 'ArrowLeft':
				newIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
				break;
			case 'Home':
				newIndex = 0;
				break;
			case 'End':
				newIndex = allTabs.length - 1;
				break;
			default:
				return;
		}

		onchange(allTabs[newIndex]._id);

		// Buttons stay in the DOM — focus immediately without waiting for a tick
		const buttons = navEl?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
		buttons?.[newIndex]?.focus();
	}
</script>

<nav
	bind:this={navEl}
	role="tablist"
	aria-label="Filter projects by type"
	class="project-type-nav"
	onkeydown={handleKeydown}
>
	{#each allTabs as tab (tab._id)}
		<ProjectTypeTab
			id={`project-type-tab-${tab._id}`}
			label={tab.title}
			active={activeType === tab._id}
			controls={panelId}
			onclick={() => onchange(tab._id)}
		/>
	{/each}
</nav>

<style>
	.project-type-nav {
		display: flex;
		gap: 0.25rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		overflow-x: auto;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
