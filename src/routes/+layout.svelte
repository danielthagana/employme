<script>
	import '../app.css';
	import {setToastState} from '$lib/Toast.svelte';
	import Toaster from '$lib/components/Toaster.svelte';

	let { children } = $props();

	setToastState();
</script>


<svelte:head>
	<link rel="icon" href="employmelogo.png" />
</svelte:head>

<div class="">
	<Toaster />
	{@render children?.()}
</div>

