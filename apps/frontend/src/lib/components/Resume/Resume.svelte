<script lang="ts">
	import WorkSkills from './WorkSkills.svelte';
	import WorkHistory from './WorkHistory.svelte';

	import type { JobType } from '@lib/types/schema';

	type Props = {
		experiences: JobType[];
		skills: {
			id: string;
			name: string;
		}[];
	};

	let { experiences, skills }: Props = $props();
</script>

<section class="relative z-[1] py-12">
	<div class="mx-auto max-w-6xl space-y-12 px-4 text-center lg:space-y-16">
		<div class="resume-grid space-y-24 text-left md:space-y-28">
			<div class="resume-content">
				<div class="space-y-12 md:space-y-20">
					<div id="history" class="resume--work-history">
						<WorkHistory {experiences} />
					</div>
					<!-- <div id="skills" class="resume--skills">
						<WorkSkills {skills} />
					</div> -->
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
