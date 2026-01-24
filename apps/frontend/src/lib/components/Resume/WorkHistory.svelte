<script lang="ts">
	import SingleJob from '@components/Resume/Components/SingleJob.svelte';

	import type { JobType } from '@lib/types/schema';

	type Props = {
		experiences: JobType[];
	};
	const { experiences }: Props = $props();
</script>

<div class="work-history mx-auto w-full max-w-4xl space-y-8 lg:space-y-6">
	<h3 class="font-germania-one text-3xl font-medium lg:text-4xl">Experience</h3>
	<div class="work-list">
		{#each experiences as job}
			<SingleJob {...job} />
		{/each}
	</div>
</div>
