<script>
	import {
		BriefcaseBusiness,
		CalendarDays,
		CheckCircle2,
		Clock4,
		FileText,
		Mail,
		MapPin,
		MessageSquareText,
		Phone,
		Search,
		UserCheck,
		UserRound,
		UsersRound,
		XCircle
	} from '@lucide/svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	let searchTerm = $state('');
	let selectedStatus = $state('all');
	let selectedJob = $state('all');
	/** @type {number | null} */
	let expandedApplication = $state(null);

	const statusOptions = [
		{ value: 'all', label: 'All statuses' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'reviewed', label: 'Reviewed' },
		{ value: 'shortlisted', label: 'Shortlisted' },
		{ value: 'hired', label: 'Hired' },
		{ value: 'rejected', label: 'Rejected' }
	];

	const summaryCards = [
		{
			label: 'Total',
			value: data.stats.total,
			icon: UsersRound,
			color: 'text-primary bg-primary/10'
		},
		{
			label: 'Pending',
			value: data.stats.pending,
			icon: Clock4,
			color: 'text-amber-700 bg-amber-100'
		},
		{
			label: 'Shortlisted',
			value: data.stats.shortlisted,
			icon: UserCheck,
			color: 'text-blue-700 bg-blue-100'
		},
		{
			label: 'Hired',
			value: data.stats.hired,
			icon: CheckCircle2,
			color: 'text-emerald-700 bg-emerald-100'
		}
	];

	let filteredApplications = $derived(
		data.applications.filter((/** @type {any} */ application) => {
			const query = searchTerm.trim().toLowerCase();
			const status = String(application.application_status || 'pending').toLowerCase();
			const matchesSearch =
				!query ||
				String(application.candidate_name || '')
					.toLowerCase()
					.includes(query) ||
				String(application.title || '')
					.toLowerCase()
					.includes(query) ||
				String(application.candidate_location || application.job_location || '')
					.toLowerCase()
					.includes(query);
			const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
			const matchesJob = selectedJob === 'all' || application.title === selectedJob;

			return matchesSearch && matchesStatus && matchesJob;
		})
	);

	/** @param {unknown} value */
	function formatDate(value) {
		if (!value) return 'Not set';
		return new Date(String(value)).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	/** @param {string} status */
	function getStatusClass(status) {
		if (status === 'hired') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
		if (status === 'shortlisted') return 'border-blue-200 bg-blue-50 text-blue-700';
		if (status === 'reviewed') return 'border-violet-200 bg-violet-50 text-violet-700';
		if (status === 'rejected') return 'border-rose-200 bg-rose-50 text-rose-700';
		return 'border-amber-200 bg-amber-50 text-amber-700';
	}

	/** @param {string} status */
	function getStatusLabel(status) {
		return status ? status.replace('_', ' ') : 'pending';
	}

	/** @param {number} applicationId */
	function toggleApplication(applicationId) {
		expandedApplication = expandedApplication === applicationId ? null : applicationId;
	}
</script>

<svelte:head>
	<title>Applications - EmployMe</title>
</svelte:head>

<section class="space-y-6">
	<div class="rounded-lg bg-white p-6 shadow-sm">
		<p class="text-sm font-semibold text-primary">Employer Dashboard</p>
		<div class="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">Applications</h1>
				<p class="mt-2 max-w-2xl text-sm text-gray-600">
					Review job seekers, sort applications, update decisions, and keep short notes for each
					candidate.
				</p>
			</div>
			<a
				href="/employer/dashboard/post-job"
				class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
			>
				<BriefcaseBusiness class="h-4 w-4" />
				Post Job
			</a>
		</div>
	</div>

	<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
		{#each summaryCards as card (card.label)}
			{@const Icon = card.icon}
			<div class="rounded-lg bg-white p-5 shadow-sm">
				<div class="flex items-center justify-between gap-3">
					<div>
						<p class="text-sm text-gray-500">{card.label}</p>
						<p class="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
					</div>
					<span class={`flex h-12 w-12 items-center justify-center rounded-lg ${card.color}`}>
						<Icon class="h-6 w-6" />
					</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="rounded-lg bg-white p-4 shadow-sm">
		<div class="grid gap-3 lg:grid-cols-[1fr_190px_220px]">
			<label class="relative block">
				<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<input
					type="search"
					bind:value={searchTerm}
					placeholder="Search applicant, job, or location"
					class="w-full rounded-md border-gray-300 py-3 pr-4 pl-10 text-sm focus:border-primary focus:ring-primary"
				/>
			</label>

			<select
				bind:value={selectedStatus}
				class="rounded-md border-gray-300 py-3 text-sm focus:border-primary focus:ring-primary"
			>
				{#each statusOptions as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>

			<select
				bind:value={selectedJob}
				class="rounded-md border-gray-300 py-3 text-sm focus:border-primary focus:ring-primary"
			>
				<option value="all">All jobs</option>
				{#each data.jobs as job (job)}
					<option value={job}>{job}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="rounded-lg bg-white p-6 shadow-sm">
		<div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-lg font-semibold text-gray-900">Applicant List</h2>
				<p class="text-sm text-gray-500">{filteredApplications.length} applications found</p>
			</div>
			<a
				href="/employer/dashboard/history"
				class="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gray-200"
			>
				<FileText class="h-4 w-4" />
				View History
			</a>
		</div>

		{#if filteredApplications.length === 0}
			<div class="rounded-md border border-dashed border-gray-300 p-10 text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-500"
				>
					<UserRound class="h-6 w-6" />
				</div>
				<h3 class="mt-4 font-semibold text-gray-900">No applications match your filters</h3>
				<p class="mt-2 text-sm text-gray-500">Try a different search term, status, or job title.</p>
			</div>
		{:else}
			<div class="space-y-4">
				{#each filteredApplications as application (application.id)}
					<article class="rounded-md border border-gray-200 p-4">
						<div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
							<div>
								<div class="flex flex-wrap items-center gap-2">
									<h3 class="font-semibold text-gray-900">{application.candidate_name}</h3>
									<span
										class={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${getStatusClass(
											application.application_status
										)}`}
									>
										{getStatusLabel(application.application_status)}
									</span>
								</div>

								<p
									class="mt-2 inline-flex rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary"
								>
									{application.title || 'Job title not provided'}
								</p>

								<div class="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
									<span class="inline-flex items-center gap-1">
										<MapPin class="h-4 w-4" />
										{application.candidate_location ||
											application.job_location ||
											'Location unavailable'}
									</span>
									<span class="inline-flex items-center gap-1">
										<BriefcaseBusiness class="h-4 w-4" />
										{application.employment_type || 'Job type unavailable'}
									</span>
									<span class="inline-flex items-center gap-1">
										<CalendarDays class="h-4 w-4" />
										Applied {formatDate(application.applied_at)}
									</span>
								</div>
							</div>

							<div class="flex flex-col gap-2 sm:flex-row xl:items-center">
								<a
									href={`mailto:${application.candidate_email}`}
									class="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gray-200"
								>
									<Mail class="h-4 w-4" />
									Email
								</a>
								<button
									type="button"
									class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
									onclick={() => toggleApplication(application.id)}
								>
									{expandedApplication === application.id ? 'Hide Details' : 'View Details'}
								</button>
							</div>
						</div>

						<div class="mt-4 flex flex-wrap gap-2">
							<form method="POST" action="?/updateStatus">
								<input type="hidden" name="application_id" value={application.id} />
								<input type="hidden" name="status" value="reviewed" />
								<button
									type="submit"
									class="rounded-md bg-violet-100 px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-200"
								>
									Reviewed
								</button>
							</form>
							<form method="POST" action="?/updateStatus">
								<input type="hidden" name="application_id" value={application.id} />
								<input type="hidden" name="status" value="shortlisted" />
								<button
									type="submit"
									class="rounded-md bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-200"
								>
									Shortlist
								</button>
							</form>
							<form method="POST" action="?/updateStatus">
								<input type="hidden" name="application_id" value={application.id} />
								<input type="hidden" name="status" value="hired" />
								<button
									type="submit"
									class="rounded-md bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
								>
									Hire
								</button>
							</form>
							<form method="POST" action="?/updateStatus">
								<input type="hidden" name="application_id" value={application.id} />
								<input type="hidden" name="status" value="rejected" />
								<button
									type="submit"
									class="rounded-md bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-200"
								>
									Reject
								</button>
							</form>
						</div>

						{#if expandedApplication === application.id}
							<div
								class="mt-4 grid gap-4 rounded-md bg-gray-50 p-4 text-sm text-gray-600 lg:grid-cols-[1fr_320px]"
							>
								<div class="grid gap-3 md:grid-cols-2">
									<a
										href={`tel:${application.candidate_phone}`}
										class="inline-flex items-center gap-2"
									>
										<Phone class="h-4 w-4 text-green-600" />
										{application.candidate_phone || 'Phone unavailable'}
									</a>
									<a
										href={`mailto:${application.candidate_email}`}
										class="inline-flex items-center gap-2"
									>
										<Mail class="h-4 w-4 text-primary" />
										{application.candidate_email || 'Email unavailable'}
									</a>
									<span class="inline-flex items-center gap-2">
										<CalendarDays class="h-4 w-4 text-blue-600" />
										Deadline {formatDate(application.application_deadline)}
									</span>
									<span class="inline-flex items-center gap-2">
										<XCircle class="h-4 w-4 text-rose-600" />
										Last reviewed {formatDate(application.reviewed_at)}
									</span>
									<p>
										<span class="font-semibold text-gray-700">Salary:</span>
										KSH {Number(application.salary_min || 0).toFixed(0)} - {Number(
											application.salary_max || 0
										).toFixed(0)}
									</p>
									<p>
										<span class="font-semibold text-gray-700">Job location:</span>
										{application.job_location || 'Not provided'}
									</p>
								</div>

								<form method="POST" action="?/saveNote" class="space-y-3">
									<input type="hidden" name="application_id" value={application.id} />
									<label class="block">
										<span class="mb-2 flex items-center gap-2 font-semibold text-gray-700">
											<MessageSquareText class="h-4 w-4 text-primary" />
											Private note
										</span>
										<textarea
											name="notes"
											rows="4"
											class="w-full rounded-md border-gray-300 text-sm focus:border-primary focus:ring-primary"
											placeholder="Example: Good phone communication, call again on Friday."
											>{application.notes || ''}</textarea
										>
									</label>
									<button
										type="submit"
										class="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
									>
										Save Note
									</button>
								</form>
							</div>
						{/if}
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>
