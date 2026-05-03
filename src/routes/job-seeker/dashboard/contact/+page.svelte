<svelte:head>
	<title>Dashboard Contact - EmployMe</title>
</svelte:head>

<div class=" px-2 py-4 sm:px-4">
	<section class="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-teal-50 p-8 shadow-sm">
		<h1 class="text-3xl font-bold text-slate-900">Contact Us</h1>
		<p class="mt-3 text-slate-700">Reach our team through your preferred channel. We usually respond within one business day.</p>

		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			<a
				href="mailto:support@employme.com"
				class="rounded-lg border border-indigo-200 bg-white px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-indigo-50"
			>
				Email
			</a>
			<a
				href="https://wa.me/254722123456"
				target="_blank"
				rel="noreferrer"
				class="rounded-lg border border-teal-200 bg-white px-4 py-3 text-center text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
			>
				WhatsApp
			</a>
			<a
				href="tel:+254722123456"
				class="rounded-lg border border-amber-200 bg-white px-4 py-3 text-center text-sm font-semibold text-amber-800 transition hover:bg-amber-50"
			>
				Phone Call
			</a>
		</div>
	</section>

	<footer class="mt-8 rounded-2xl border border-slate-200 bg-slate-900 px-6 py-8 shadow-sm">
		<div class="grid gap-8 md:grid-cols-2">
			<div>
				<p class="text-lg font-semibold text-white">EmployMe</p>
				<p class="mt-3 text-sm text-slate-300">Helping job seekers and employers connect in a simple, trusted, and professional way.</p>
				<p class="mt-4 text-sm text-slate-300">Nairobi, Kenya</p>
				<p class="text-sm text-slate-300">support@employme.com</p>
				<p class="text-sm text-slate-300">+254 722 123 456</p>
			</div>
			<div>
				<p class="text-sm font-semibold uppercase tracking-wide text-slate-200">Follow Us</p>
				<div class="mt-4 flex items-center gap-4">
					<a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" class="rounded-full border border-slate-600 p-2 text-slate-300 hover:border-indigo-300 hover:text-indigo-200">
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M13 22v-9h3l1-4h-4V7c0-1.2.4-2 2.1-2H17V1.4C16.7 1.3 15.6 1 14.2 1 11.2 1 9 2.8 9 6.2V9H6v4h3v9h4z" />
						</svg>
					</a>
					<a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" class="rounded-full border border-slate-600 p-2 text-slate-300 hover:border-indigo-300 hover:text-indigo-200">
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.95 1.95 0 1 0 5.25 6.9 1.95 1.95 0 1 0 5.25 3zM20.44 13.3c0-3.36-1.79-4.92-4.18-4.92-1.93 0-2.8 1.06-3.28 1.8V8.5H9.6V20h3.38v-6.4c0-1.69.32-3.33 2.41-3.33 2.06 0 2.09 1.93 2.09 3.44V20h3.37v-6.7z" />
						</svg>
					</a>
					<a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" class="rounded-full border border-slate-600 p-2 text-slate-300 hover:border-indigo-300 hover:text-indigo-200">
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5z" />
							<path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM18.2 6.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
						</svg>
					</a>
				</div>
				<p class="mt-4 text-sm text-slate-400">Mon - Fri, 8:00 AM - 5:00 PM</p>
			</div>
		</div>
		<p class="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} EmployMe. All rights reserved.</p>
	</footer>
</div>
