<script lang="ts">
	import SingleJob from '@components/Resume/organisms/SingleJob.svelte';

	import type { JobType } from '@lib/types/schema';

	type Props = {
		experiences: JobType[];
	};

	let { experiences }: Props = $props();
</script>

<section class="relative z-1 py-12">
	<div class="mx-auto max-w-6xl space-y-12 px-4 text-center lg:space-y-16">
		<div class="resume-grid space-y-24 text-left md:space-y-28">
			<div class="resume-content">
				<div class="space-y-12 md:space-y-20">
					<div id="history" class="resume--work-history">
						<div class="work-history mx-auto w-full max-w-4xl space-y-8 lg:space-y-6">
							<h3 class="font-germania-one text-3xl font-medium lg:text-4xl">Experience</h3>
							<div class="work-list">
								{#each experiences as job}
									<SingleJob {...job} />
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.resume-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, min-content);
		grid-gap: 12px;
		align-items: start;
	}
</style>
