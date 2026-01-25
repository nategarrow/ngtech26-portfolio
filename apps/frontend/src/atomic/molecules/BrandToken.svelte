<script lang="ts">
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { faReact } from '@awesome.me/kit-7afeb9cb5d/icons/classic/brands';
	import { cva } from 'cva';
	import { twMerge } from 'tailwind-merge';

	let { onclick, name, position, size, rotate } = $$props;

	const tokenClass = cva('icon shadow-2xl p-[2px]', {
		variants: {
			name: {
				react: 'shadow-blue/20 text-blue hover:text-blue-light',
				svelte: 'shadow-orange/20 text-orange hover:text-orange-light',
				gatsby: 'shadow-violet/20 text-violet hover:text-violet-light',
				nextjs: 'shadow-offwhite/20 text-offwhite hover:text-white',
			},
			size: {
				xs: 'size-14 lg:size-[4svw]',
				sm: 'size-16 lg:size-[5svw]',
				md: 'size-16 lg:size-[8svw]',
				lg: 'size-16 lg:size-[10svw]',
			},
		},
		defaultVariants: {
			name: 'nextjs',
			size: 'sm',
		},
	});
	const shadowClass = cva('background-border bg-gradient-to-br rounded-md', {
		variants: {
			name: {
				react: 'from-blue-500 to-blue-100',
				svelte: 'from-orange-500 to-orange-100',
				gatsby: 'from-violet-500 to-violet-100',
				nextjs: 'from-offwhite to-white',
			},
		},
		defaultVariants: {
			name: 'svelte',
		},
	});
</script>

<button type="button" {onclick} class={twMerge(tokenClass({ name, size }), position, rotate)}>
	<span class={shadowClass({ name })}></span>
	<div class="bg-card-background-dark relative z-20 size-full rounded-md p-4">
		{#if name === 'svelte'}
			<i class="fa-kit fa-svelte d-block z-10 !size-full"></i>
		{:else if name === 'react'}
			<Icon data={faReact} class="d-block z-10 size-full " />
		{:else if name === 'gatsby'}
			<i class="fa-kit fa-gatsby d-block z-10 !size-full"></i>
		{:else if name === 'nextjs'}
			<i class="fa-kit fa-nextjs d-block z-10 !size-full"></i>
		{/if}
	</div>
</button>

<style>
	.icon {
		position: absolute;
		transition: all 0.2s ease-in-out;
		border-radius: 8px;
		background-color: var(--color-card-background);
		cursor: pointer;
		z-index: 2;

		@media (width >= 40rem) {
			opacity: 0.75;
		}

		@media (width >= 64rem) {
			opacity: 1;
		}
	}

	.background-border {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
		z-index: 1;

		&:before {
			content: '';
			position: absolute;
			inset: -4px;
			width: calc(100% + 8px);
			height: calc(100% + 8px);
			border-radius: 8px;
			z-index: -1;
		}
	}
</style>
