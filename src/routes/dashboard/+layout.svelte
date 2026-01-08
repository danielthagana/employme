<script>
	import { ChevronDown, ChevronUp, TextAlignJustify } from '@lucide/svelte';
	/** @type {import('./$types').LayoutProps} */
	let { data, children } = $props();

	let dropdownOpen = $state(true);
</script>

{@render children()}
<nav class="fixed top-0 z-10 w-full bg-gray-900 px-2 shadow-xl md:px-6">
	<div class="flex grow flex-col items-center justify-between sm:flex-row lg:px-6">
		<div class="flex items-center space-x-4 py-3">
			<TextAlignJustify class="text-white" />
			<a href="/" class="flex items-center">
				<img
					src="/employmelogo.png"
					class=" -mt-2 ml-5 h-20 object-contain drop-shadow-lg"
					alt="EmployMe Logo"
				/>
			</a>
		</div>
		<div class="flex w-fit items-center gap-4 px-5 py-3 lg:px-0 lg:py-0 lg:shadow-none">
			<span class="flex h-13 w-13 items-center justify-center rounded-full bg-white/20 text-white"
				>D</span
			>
			<button
				class="flex px-4 py-2 font-semibold text-white hover:bg-primary/80"
				onclick={() => (dropdownOpen = !dropdownOpen)}
			>
				Daniel

				{#if dropdownOpen}
					<ChevronDown />
				{:else}
					<ChevronUp />
				{/if}
			</button>
		</div>
	</div>
</nav>
