<script lang="ts">
	type Props = {
		id: string;
		label: string;
		active: boolean;
		controls: string;
		onclick: () => void;
	};

	const { id, label, active, controls, onclick }: Props = $props();
</script>

<button
	{id}
	{onclick}
	role="tab"
	aria-selected={active}
	aria-controls={controls}
	tabindex={active ? 0 : -1}
	class="project-type-tab"
	class:active
>
	{label}
</button>

<style>
	.project-type-tab {
		position: relative;
		padding: 0.5rem 1.25rem;
		font-family: var(--font-subtitle);
		font-size: 0.875rem;
		letter-spacing: 0.08em;
		color: var(--color-offwhite, #a0a0b0);
		transition:
			color 0.2s ease,
			opacity 0.2s ease;
		white-space: nowrap;

		&::after {
			content: '';
			position: absolute;
			bottom: -1px;
			left: 0;
			right: 0;
			height: 2px;
			background: var(--color-blue-light);
			transform: scaleX(0);
			transition: transform 0.25s ease;
		}

		&:hover {
			color: white;
		}

		&.active {
			color: white;

			&::after {
				transform: scaleX(1);
			}
		}
	}
</style>
