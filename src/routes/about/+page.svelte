<svelte:head>
	<title>About EmployMe</title>
	<meta
		name="description"
		content="Learn how EmployMe connects job seekers with trusted employers and practical opportunities."
	/>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<header class="border-b border-slate-200 bg-white/90 backdrop-blur">
		<div class="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
			<a href="/" class="text-xl font-bold text-primary">EmployMe</a>
			<nav class="flex items-center gap-8 text-sm font-medium sm:gap-12">
				<a href="/" class="text-slate-600 transition hover:text-primary">Home</a>
				<a href="/about" class="text-primary">About</a>
				<a href="/contact" class="text-slate-600 transition hover:text-primary">Contact</a>
			</nav>
			<div class="hidden items-center gap-3 sm:flex">
				<a
					href="/login"
					class="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
				>
					Login
				</a>
				<a
					href="/signup"
					class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					Sign Up
				</a>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<section class="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
			<div>
				<p class="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase text-primary shadow-sm">
					About EmployMe
				</p>
				<h1 class="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
					Bridging the gap between hard work and real work opportunities.
				</h1>
				<p class="mt-5 max-w-2xl text-base leading-7 text-slate-600">
					EmployMe helps job seekers discover trusted openings, present themselves
					and connect with employers who need dependable people. We are building a simpler path
					from searching to applying to getting hired.
				</p>

				<div class="mt-8 grid gap-4 sm:grid-cols-3">
					<div class="border-l-4 border-primary bg-white p-4 shadow-sm">
						<p class="text-2xl font-bold text-slate-950">Fast</p>
						<p class="mt-1 text-sm text-slate-600">Clear applications and direct next steps.</p>
					</div>
					<div class="border-l-4 border-primary bg-white p-4 shadow-sm">
						<p class="text-2xl font-bold text-slate-950">Trusted</p>
						<p class="mt-1 text-sm text-slate-600">Opportunities from verified employers.</p>
					</div>
					<div class="border-l-4 border-primary bg-white p-4 shadow-sm">
						<p class="text-2xl font-bold text-slate-950">Local</p>
						<p class="mt-1 text-sm text-slate-600">Built for practical hiring needs.</p>
					</div>
				</div>
			</div>

			<div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
				<img
					src="/jobimage.png"
					alt="EmployMe job opportunity illustration"
					class="h-full min-h-[320px] w-full object-cover"
				/>
			</div>
		</section>

		<section class="mt-16 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
			<div class="bg-primary p-8 text-white shadow-sm">
				<p class="text-sm font-semibold uppercase">Our Mission</p>
				<h2 class="mt-3 text-3xl font-bold">Make hiring more accessible, organized, and human.</h2>
				<p class="mt-4 leading-7 text-white/80">
					We want job seekers to spend less time guessing and more time moving forward. For
					employers, EmployMe creates a reliable space to post roles, manage applicants, and
					find people ready to work.
				</p>
			</div>

			<div class="bg-white p-8 shadow-sm ring-1 ring-slate-200">
				<p class="text-sm font-semibold uppercase text-primary">How It Works</p>
				<div class="mt-6 space-y-5">
					<div class="flex gap-4">
						<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
							1
						</span>
						<div>
							<h3 class="font-semibold text-slate-950">Create your profile</h3>
							<p class="mt-1 text-sm leading-6 text-slate-600">
								Job seekers and employers set up focused accounts.
							</p>
						</div>
					</div>
					<div class="flex gap-4">
						<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
							2
						</span>
						<div>
							<h3 class="font-semibold text-slate-950">Find or post opportunities</h3>
							<p class="mt-1 text-sm leading-6 text-slate-600">
								Applicants browse relevant jobs while employers publish clear openings.
							</p>
						</div>
					</div>
					<div class="flex gap-4">
						<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
							3
						</span>
						<div>
							<h3 class="font-semibold text-slate-950">Apply and track progress</h3>
							<p class="mt-1 text-sm leading-6 text-slate-600">
								Applications stay organized, so both sides know what has happened next.
							</p>
						</div>
					</div>
					<div class="flex gap-4">
						<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
							4
						</span>
						<div>
							<h3 class="font-semibold text-slate-950">Connect with confidence</h3>
							<p class="mt-1 text-sm leading-6 text-slate-600">
								The platform keeps the process simple, professional, and easier to trust.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="mt-16">
			<div class="mb-6 max-w-2xl">
				<p class="text-sm font-semibold uppercase text-primary">What We Support</p>
				<h2 class="mt-2 text-3xl font-bold text-slate-950">A better hiring flow for everyday work.</h2>
			</div>
			<div class="grid gap-4 md:grid-cols-3">
				<div class="bg-white p-6 shadow-sm ring-1 ring-slate-200">
					<h3 class="font-semibold text-slate-950">Job Discovery</h3>
					<p class="mt-2 text-sm leading-6 text-slate-600">
						Find openings that match your interests and capability.
					</p>
				</div>
				<div class="bg-white p-6 shadow-sm ring-1 ring-slate-200">
					<h3 class="font-semibold text-slate-950">Employer Dashboard</h3>
					<p class="mt-2 text-sm leading-6 text-slate-600">
						Post jobs, review applications, and keep hiring activity in one place.
					</p>
				</div>
				<div class="bg-white p-6 shadow-sm ring-1 ring-slate-200">
					<h3 class="font-semibold text-slate-950">Application Tracking</h3>
					<p class="mt-2 text-sm leading-6 text-slate-600">
						Stay informed about applications without losing track of the details.
					</p>
				</div>
			</div>
		</section>
	</main>
</div>
