<script lang="ts">
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { faGithub, faLinkedin } from '@awesome.me/kit-7afeb9cb5d/icons/classic/brands';
	import { faDownload } from '@awesome.me/kit-7afeb9cb5d/icons/sharp/light';

	import { page } from '$app/state';

	const { openToWork }: { openToWork: boolean } = $props();

	const resumeLink = $derived(page.data.resumeLink);
</script>

{#if openToWork}
  <div class="profile-card relative w-full max-w-3xl">
  	<div class="bg-card-background shadow-blue/15 flex flex-col gap-4 rounded-xl p-3 shadow-2xl md:p-6">
    		<div class="flex items-center gap-4">
      		<div class="flex flex-1 flex-col gap-1">
    				<p class="font-subtitle text-xl text-white">{`<LetsChat />`}</p>
    				<p class="font-code text-blue-light mt-0 text-xs">
              I'm currently open to work!
            </p>
     			</div>
    		</div>
    		<div class="social-media">
     			<ul class="flex gap-5">
    				<li>
     					<a
      						href="https://linkedin.com/in/nategarrow"
      						target="_blank"
      						rel="noopener noreferrer"
      						title="LinkedIn"
      						class="text-offwhite hover:text-blue"
     					>
      						<Icon data={faLinkedin} class="size-6" />
     					</a>
    				</li>
    				<li>
     					<a
      						href="https://github.com/nategarrow"
      						target="_blank"
      						rel="noopener noreferrer"
      						title="Github"
      						class="text-offwhite hover:text-blue"
     					>
      						<Icon data={faGithub} class="size-6" />
     					</a>
    				</li>
    				{#if resumeLink?.asset?.url}
   					<li>
    						<a
   							href={resumeLink?.asset?.url}
   							target="_blank"
   							rel="noopener noreferrer"
   							title="Resume"
   							class="text-offwhite hover:text-blue"
    						>
   							<Icon data={faDownload} class="size-6" />
    						</a>
   					</li>
    				{/if}
   			</ul>
  		</div>
  	</div>
  </div>
{/if}
