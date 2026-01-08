<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="employmelogo.png" />
</svelte:head>

<div class="">
	{@render children?.()}
</div>
