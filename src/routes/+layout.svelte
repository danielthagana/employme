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

<style>
	.main {
		margin: 0;
		padding: 0;
		font-family: Arial, sans-serif;
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 60px; /* space for navbar */
		background: #8b8bae;
	}
	/* Navbar on top */
	.navbar {
		width: 100%;
		background-color: white;
		position: fixed;
		top: 0;
		left: 0;
		height: 60px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.logo {
		position: relative;
		z-index: 20;
		padding-left: 20px;
		color: black;
		float: left;
		font-family: 'Arial';
		font-size: 35px;
		padding-right: 10px;
	}

	.menu ul {
		margin: 0;
		padding: 0;
		display: flex;
		gap: 110px;
		justify-content: center;
		align-items: center;
	}

	.menu ul li {
		list-style: none;
		margin-left: 62 px;
		margin-top: 27px;
		font-size: 15px;
	}

	.menu ul li a {
		color: black;
		text-decoration: none;
		font-weight: bold;
		font-family: Arial;
		transition: 0.4s ease-in-out;
	}

	.menu ul li a:hover {
		color: #834effd5;
	}
</style>
