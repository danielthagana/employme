<svelte:head>
	<title>Dashboard Home - EmployMe</title>
</svelte:head>

<div class="px-2 py-4 sm:px-4">
	<section class="overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-primary via-[#3b2a84] to-[#0f766e] p-8 shadow-lg md:p-10">
		<div class="grid items-center gap-8 md:grid-cols-2">
			<div>
				<p class="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100">Reliable Hiring Platform</p>
				<h1 class="text-4xl font-bold leading-tight text-white">Connect to the right jobs, faster.</h1>
				<p class="mt-4 text-indigo-100">EmployMe brings job seekers and trusted employers together through a clear and simple hiring experience.</p>
				<div class="mt-8 flex gap-3">
					<a href="/signup" class="rounded-md bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-indigo-50">Get Started</a>
					<a href="/dashboard/about" class="rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Learn More</a>
				</div>
			</div>
			<div class="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
				<h2 class="text-lg font-semibold text-white">Why EmployMe</h2>
				<ul class="mt-4 space-y-3 text-sm text-indigo-100">
					<li>Real opportunities from real employers.</li>
					<li>Simple application flow and clear communication.</li>
					<li>Professional dashboard to track your applications.</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="mt-6 grid gap-4 md:grid-cols-3">
		<div class="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
			<p class="text-sm font-semibold text-primary">Trusted Listings</p>
			<p class="mt-2 text-sm text-slate-700">Employers are screened to keep opportunities reliable and safe.</p>
		</div>
		<div class="rounded-xl border border-teal-100 bg-teal-50 p-5">
			<p class="text-sm font-semibold text-teal-800">Faster Applications</p>
			<p class="mt-2 text-sm text-slate-700">Submit quickly and keep track of all updates from one place.</p>
		</div>
		<div class="rounded-xl border border-amber-100 bg-amber-50 p-5">
			<p class="text-sm font-semibold text-amber-800">Career Growth</p>
			<p class="mt-2 text-sm text-slate-700">Find work aligned to your experience and long-term goals.</p>
		</div>
	</section>
</div>
