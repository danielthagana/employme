<script>
	import { BriefcaseBusiness, CalendarDays, CircleCheckBig, Clock4, MapPin, TriangleAlert } from '@lucide/svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	/** @param {unknown} value */
	function formatDate(value) {
		if (!value) return 'N/A';
		return new Date(String(value)).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	/** @param {string} status */
	function getStatusClass(status) {
		if (status === 'pending') return 'bg-amber-100 text-amber-700 border-amber-200';
		if (status === 'reviewed') return 'bg-blue-100 text-blue-700 border-blue-200';
		if (status === 'shortlisted') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
		if (status === 'rejected') return 'bg-rose-100 text-rose-700 border-rose-200';
		return 'bg-slate-100 text-slate-600 border-slate-200';
	}

	/** @param {string} status */
	function getStatusLabel(status) {
		return status ? status.replace('_', ' ') : 'unknown';
	}
</script>

<svelte:head>
	<title>My Applications - EmployMe</title>
</svelte:head>

<div class=" space-y-6 p-2 sm:p-4">
	<div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg">
		<p class="text-sm tracking-wide text-slate-300">Dashboard / Applications</p>
		<h1 class="mt-2 text-2xl font-semibold">My Job Applications</h1>
		<p class="mt-1 text-slate-300">Track your submissions, status updates, and recruiter notes.</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
		<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<p class="text-sm text-slate-500">Total</p>
			<p class="mt-1 text-2xl font-semibold text-slate-900">{data.stats.total}</p>
		</div>
		<div class="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
			<p class="text-sm text-amber-700">Pending</p>
			<p class="mt-1 text-2xl font-semibold text-amber-900">{data.stats.pending}</p>
		</div>
		<div class="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
			<p class="text-sm text-blue-700">Reviewed</p>
			<p class="mt-1 text-2xl font-semibold text-blue-900">{data.stats.reviewed}</p>
		</div>
		<div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
			<p class="text-sm text-emerald-700">Shortlisted</p>
			<p class="mt-1 text-2xl font-semibold text-emerald-900">{data.stats.shortlisted}</p>
		</div>
		<div class="rounded-xl border border-rose-200 bg-rose-50 p-4 shadow-sm">
			<p class="text-sm text-rose-700">Rejected</p>
			<p class="mt-1 text-2xl font-semibold text-rose-900">{data.stats.rejected}</p>
		</div>
	</div>

	{#if data.applications.length === 0}
		<div class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
			<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600">
				<BriefcaseBusiness size={24} />
			</div>
			<h2 class="mt-4 text-xl font-semibold text-slate-900">No applications yet</h2>
			<p class="mt-2 text-slate-600">Apply to jobs from the dashboard and your history will appear here.</p>
			<a
				href="/dashboard"
				class="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
			>
				Browse Jobs
			</a>
		</div>
	{:else}
		<div class="grid gap-4">
			{#each data.applications as application}
				<article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
					<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
						<div class="space-y-2">
							<div class="flex flex-wrap items-center gap-2">
								<h2 class="text-xl font-semibold text-slate-900">{application.title}</h2>
									<span
										class={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${getStatusClass(
											application.application_status
										)}`}
									>
										{getStatusLabel(application.application_status)}
									</span>
							</div>
							<p class="text-slate-700">{application.company_name || 'Company not provided'}</p>
							<div class="flex flex-wrap gap-4 text-sm text-slate-600">
								<p class="inline-flex items-center gap-1"><MapPin size={16} /> {application.location || 'N/A'}</p>
								<p class="inline-flex items-center gap-1"><BriefcaseBusiness size={16} /> {application.employment_type || 'N/A'}</p>
								<p class="inline-flex items-center gap-1"><CalendarDays size={16} /> Applied {formatDate(application.applied_at)}</p>
							</div>
						</div>

						<div class="w-full max-w-sm rounded-xl bg-slate-50 p-4">
							<p class="text-sm font-medium text-slate-700">Application Timeline</p>
							<div class="mt-3 space-y-2 text-sm text-slate-600">
								<p class="inline-flex items-center gap-2"><Clock4 size={16} /> Submitted: {formatDate(application.applied_at)}</p>
								<p class="inline-flex items-center gap-2"><CircleCheckBig size={16} /> Reviewed: {formatDate(application.reviewed_at)}</p>
								<p class="inline-flex items-center gap-2"><TriangleAlert size={16} /> Deadline: {formatDate(application.application_deadline)}</p>
							</div>
						</div>
					</div>

					<div class="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2">
						<p>
							<span class="font-medium text-slate-700">Salary:</span>
							<span class="text-slate-600"> KSH {Number(application.salary_min || 0).toFixed(0)} - {Number(application.salary_max || 0).toFixed(0)}</span>
						</p>
						<p>
							<span class="font-medium text-slate-700">Contact:</span>
							<span class="text-slate-600"> {application.employer_email || 'N/A'} / {application.employer_phone || 'N/A'}</span>
						</p>
						<p class="sm:col-span-2">
							<span class="font-medium text-slate-700">Recruiter Notes:</span>
							<span class="text-slate-600"> {application.notes || 'No notes yet.'}</span>
						</p>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
