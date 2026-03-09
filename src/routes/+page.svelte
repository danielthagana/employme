<svelte:head>
	<title>EmployMe - Home</title>
	<meta
		name="description"
		content="EmployMe helps job seekers connect with verified employers quickly and professionally."
	/>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<header class="border-b border-slate-200 bg-white/90 backdrop-blur">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
			<a href="/" class="text-xl font-bold text-primary">EmployMe</a>
			<nav class="flex items-center gap-6 text-sm font-medium">
				<a href="/" class="text-primary">Home</a>
				<a href="/about" class="text-slate-600 transition hover:text-primary">About</a>
				<a href="/contact" class="text-slate-600 transition hover:text-primary">Contact</a>
			</nav>
			<div class="flex items-center gap-3">
				<a href="/login" class="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Login</a>
				<a href="/signup" class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Sign Up</a>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
		<section class="grid items-center gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2">
			<div>
				<p class="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">Reliable Hiring Platform</p>
				<h1 class="text-4xl font-bold leading-tight text-slate-900">Connect to the right jobs, faster.</h1>
				<p class="mt-4 text-slate-600">EmployMe brings job seekers and trusted employers together through a clear and simple hiring experience.</p>
				<div class="mt-8 flex gap-3">
					<a href="/signup" class="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">Get Started</a>
					<a href="/about" class="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Learn More</a>
				</div>
			</div>
			<div class="rounded-xl bg-slate-900 p-6 text-slate-100">
				<h2 class="text-lg font-semibold">Why EmployMe</h2>
				<ul class="mt-4 space-y-3 text-sm text-slate-300">
					<li>Verified opportunities from real employers.</li>
					<li>Simple application flow and clear communication.</li>
					<li>Professional dashboard to track your applications.</li>
				</ul>
			</div>
		</section>
	</main>
</div>
