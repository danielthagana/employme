<script>
	import {
		BriefcaseBusiness,
		CalendarDays,
		CheckCircle2,
		Clock4,
		FileClock,
		Mail,
		MapPin,
		Phone,
		Search,
		UserRoundCheck,
		UsersRound
	} from '@lucide/svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	let searchTerm = $state('');
	let selectedStatus = $state('all');
	let selectedJob = $state('all');
	let expandedRecord = $state(null);

	const statusOptions = [
		{ value: 'all', label: 'All statuses' },
		{ value: 'hired', label: 'Hired' },
		{ value: 'shortlisted', label: 'Shortlisted' },
		{ value: 'reviewed', label: 'Reviewed' },
		{ value: 'rejected', label: 'Rejected' },
		{ value: 'pending', label: 'Pending' }
	];

	const summaryCards = [
		{ label: 'Total Applications', value: data.stats.total, icon: UsersRound },
		{ label: 'Hired', value: data.stats.hired, icon: UserRoundCheck },
		{ label: 'Completed Reviews', value: data.stats.completed, icon: CheckCircle2 },
		{ label: 'Rejected', value: data.stats.rejected, icon: FileClock }
	];

	let filteredHistory = $derived(
		data.history.filter((record) => {
			const query = searchTerm.trim().toLowerCase();
			const status = String(record.application_status || 'pending').toLowerCase();
			const matchesSearch =
				!query ||
				String(record.candidate_name || '')
					.toLowerCase()
					.includes(query) ||
				String(record.title || '')
					.toLowerCase()
					.includes(query) ||
				String(record.candidate_location || '')
					.toLowerCase()
					.includes(query);
			const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
			const matchesJob = selectedJob === 'all' || record.title === selectedJob;

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

	/** @param {number} recordId */
	function toggleRecord(recordId) {
		expandedRecord = expandedRecord === recordId ? null : recordId;
	}
</script>

<svelte:head>
	<title>Hiring History - EmployMe</title>
</svelte:head>

<section class="space-y-6">
	<div class="rounded-lg bg-white p-6 shadow-sm">
		<p class="text-sm font-semibold text-primary">Employer Dashboard</p>
		<div class="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">Hiring History</h1>
				<p class="mt-2 max-w-2xl text-sm text-gray-600">
					Review past applicant decisions, candidate contacts, job details, and hiring timeline
					activity in one place.
				</p>
			</div>
			<a
				href="/employer/dashboard/applications"
				class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
			>
				<BriefcaseBusiness class="h-4 w-4" />
				View Applications
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
					<span class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon class="h-6 w-6" />
					</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="rounded-lg bg-white p-4 shadow-sm">
		<div class="grid gap-3 lg:grid-cols-[1fr_220px_220px]">
			<label class="relative block">
				<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
				<input
					type="search"
					bind:value={searchTerm}
					placeholder="Search candidate, job, or location"
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
				<h2 class="text-lg font-semibold text-gray-900">Hiring Records</h2>
				<p class="text-sm text-gray-500">{filteredHistory.length} records found</p>
			</div>
		</div>

		{#if filteredHistory.length === 0}
			<div class="rounded-md border border-dashed border-gray-300 p-10 text-center">
				<div
					class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-500"
				>
					<FileClock class="h-6 w-6" />
				</div>
				<h3 class="mt-4 font-semibold text-gray-900">No hiring history found</h3>
				<p class="mt-2 text-sm text-gray-500">
					Completed application decisions will appear here as your hiring activity grows.
				</p>
			</div>
		{:else}
			<div class="space-y-4">
				{#each filteredHistory as record (record.id)}
					<article class="rounded-md border border-gray-200 p-4">
						<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
							<div>
								<div class="flex flex-wrap items-center gap-2">
									<h3 class="font-semibold text-gray-900">{record.candidate_name}</h3>
									<span
										class={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${getStatusClass(
											record.application_status
										)}`}
									>
										{getStatusLabel(record.application_status)}
									</span>
								</div>
								<p class="mt-1 text-sm text-gray-600">{record.title}</p>
								<div class="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
									<span class="inline-flex items-center gap-1">
										<MapPin class="h-4 w-4" />
										{record.candidate_location || record.job_location || 'Location unavailable'}
									</span>
									<span class="inline-flex items-center gap-1">
										<BriefcaseBusiness class="h-4 w-4" />
										{record.employment_type || 'Job type unavailable'}
									</span>
									<span class="inline-flex items-center gap-1">
										<CalendarDays class="h-4 w-4" />
										Decision {formatDate(record.reviewed_at || record.applied_at)}
									</span>
								</div>
							</div>

							<div class="flex flex-col gap-3 sm:flex-row lg:items-center">
								<a
									href={`mailto:${record.candidate_email}`}
									class="inline-flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gray-200"
								>
									<Mail class="h-4 w-4" />
									Email
								</a>
								<button
									type="button"
									class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
									onclick={() => toggleRecord(record.id)}
								>
									{expandedRecord === record.id ? 'Hide Details' : 'View Details'}
								</button>
							</div>
						</div>

						{#if expandedRecord === record.id}
							<div class="mt-4 grid gap-3 rounded-md bg-gray-50 p-4 text-sm text-gray-600 md:grid-cols-2">
								<a href={`tel:${record.candidate_phone}`} class="inline-flex items-center gap-2">
									<Phone class="h-4 w-4 text-green-600" />
									{record.candidate_phone || 'Phone unavailable'}
								</a>
								<a href={`mailto:${record.candidate_email}`} class="inline-flex items-center gap-2">
									<Mail class="h-4 w-4 text-primary" />
									{record.candidate_email || 'Email unavailable'}
								</a>
								<span class="inline-flex items-center gap-2">
									<Clock4 class="h-4 w-4 text-blue-600" />
									Applied {formatDate(record.applied_at)}
								</span>
								<span class="inline-flex items-center gap-2">
									<CalendarDays class="h-4 w-4 text-violet-600" />
									Deadline {formatDate(record.application_deadline)}
								</span>
								<p>
									<span class="font-semibold text-gray-700">Salary:</span>
									KSH {Number(record.salary_min || 0).toFixed(0)} - {Number(
										record.salary_max || 0
									).toFixed(0)}
								</p>
								<p>
									<span class="font-semibold text-gray-700">Work period:</span>
									{formatDate(record.start_datetime)} - {formatDate(record.end_datetime)}
								</p>
								<p class="md:col-span-2">
									<span class="font-semibold text-gray-700">Notes:</span>
									{record.notes || 'No notes were added for this application.'}
								</p>
							</div>
						{/if}
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>
