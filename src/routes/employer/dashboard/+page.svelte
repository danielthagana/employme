<script>
	import {
		BriefcaseBusiness,
		ClipboardList,
		FileText,
		Mail,
		MapPin,
		Phone,
		Plus,
		Star,
		UsersRound
	} from '@lucide/svelte';

	/**
	 * @typedef {{
	 * id: number;
	 * name: string;
	 * role: string;
	 * rating: number;
	 * email: string;
	 * phone: string;
	 * location: string;
	 * }} Application
	 */

	const stats = [
		{ label: 'Active Jobs', value: '12', icon: BriefcaseBusiness },
		{ label: 'New Applications', value: '38', icon: FileText },
		{ label: 'Hired', value: '9', icon: UsersRound }
	];
	let {data} = $props();
	let recentApplications = data.recentApplications;
	console.log('Recent applications data:', recentApplications);

	

	/** @type {Application[]} */
	let hiredApplications = $state([]);
	/** @type {Record<number, boolean>} */
	let expandedApplications = $state({});

	const jobListings = [
		{ title: 'Security Guard', type: 'Full-Time', applications: 14 },
		{ title: 'Housekeeper', type: 'Part-Time', applications: 8 },
		{ title: 'Warehouse Assistant', type: 'Contract', applications: 16 }
	];

	/** @param {number} applicationId */
	function toggleApplication(applicationId) {
		expandedApplications = {
			...expandedApplications,
			[applicationId]: !expandedApplications[applicationId]
		};
	}

	/** @param {Application} application */
	function hireApplication(application) {
		recentApplications = recentApplications.filter((item) => item.id !== application.id);
		hiredApplications = [application, ...hiredApplications];
		expandedApplications = {
			...expandedApplications,
			[application.id]: false
		};
		activePanel = 'jobs';
	}

	let activePanel = $state('applications');
</script>

<section class="space-y-6">
	<div class="flex flex-col justify-between gap-4 rounded-lg bg-white p-6 shadow-sm md:flex-row md:items-center">
		<div>
			<p class="text-sm font-semibold text-primary">Employer Dashboard</p>
			<h1 class="mt-2 text-2xl font-bold text-gray-900">Manage your hiring activity</h1>
			<p class="mt-2 max-w-2xl text-sm text-gray-600">
				Track posted jobs, review applications, and keep your company profile ready for job
				seekers.
			</p>
		</div>

		<a
			href="/employer/dashboard/post-job"
			class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
		>
			<Plus class="h-4 w-4" />
			Post Job
		</a>
	</div>

	<div class="grid gap-4 md:grid-cols-3">
		{#each stats as stat (stat.label)}
			{@const Icon = stat.icon}
			<div class="rounded-lg bg-white p-5 shadow-sm">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-500">{stat.label}</p>
						<p class="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
					</div>
					<span class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Icon class="h-6 w-6" />
					</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="rounded-lg bg-white p-4 shadow-sm">
		<div class="grid gap-3 md:grid-cols-2">
			<button
				type="button"
				class={`w-full rounded-md px-4 py-3 text-sm font-semibold transition ${
					activePanel === 'applications'
						? 'bg-primary text-white'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
				}`}
				onclick={() => (activePanel = 'applications')}
			>
				Recent Applications
			</button>

			<button
				type="button"
				class={`w-full rounded-md px-4 py-3 text-sm font-semibold transition ${
					activePanel === 'jobs'
						? 'bg-primary text-white'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
				}`}
				onclick={() => (activePanel = 'jobs')}
			>
				Job Listings
			</button>
		</div>
	</div>

	{#if activePanel === 'applications'}
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="mb-5 flex items-center justify-between gap-4">
				<h2 class="text-lg font-semibold text-gray-900">Recent Applications</h2>
				<a
					href="/employer/dashboard/applications"
					class="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gray-200"
				>
					View all
				</a>
			</div>

			<div class="space-y-3">
				{#each recentApplications as application (application.id)}
					<div class="rounded-md border border-gray-200 p-4">
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="font-semibold text-gray-900">{application.name}</p>
								<p class="mt-1 text-sm text-gray-500">{application.location}</p>
							</div>

							<div class="flex items-center gap-1 text-sm font-semibold text-amber-500">
								<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
								<span>{application.rating}</span>
							</div>
						</div>

						{#if expandedApplications[application.id]}
							<div class="mt-4 grid gap-2 rounded-md bg-gray-50 p-3 text-sm text-gray-600 md:grid-cols-3">
								<a href={`mailto:${application.email}`} class="flex items-center gap-2">
									<Mail class="h-4 w-4 text-primary" />
									{application.email}
								</a>
								<a href={`tel:${application.phone_number}`} class="flex items-center gap-2">
									<Phone class="h-4 w-4 text-green-600" />
									{application.phone_number}
								</a>
								<span class="flex items-center gap-2">
									<MapPin class="h-4 w-4 text-blue-600" />
									{application.location}
								</span>
							</div>
						{/if}

						<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<button
								type="button"
								class="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gray-200"
								onclick={() => toggleApplication(application.id)}
							>
								{expandedApplications[application.id] ? 'View Less' : 'View More'}
							</button>

							<button
								type="button"
								class="rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
								onclick={() => hireApplication(application)}
							>
								Hire
							</button>
						</div>
					</div>
				{:else}
					<p class="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
						No recent applications waiting for review.
					</p>
				{/each}
			</div>
		</div>
	{:else}
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="mb-5 flex items-center justify-between gap-4">
				<h2 class="text-lg font-semibold text-gray-900">Job Listings</h2>
				<a
					href="/employer/dashboard/job-listings"
					class="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gray-200"
				>
					Manage
				</a>
			</div>

			<div class="space-y-3">
				{#if hiredApplications.length > 0}
					<div class="space-y-3">
						<h3 class="text-sm font-semibold text-gray-700">Hired Job Seekers</h3>
						{#each hiredApplications as application (application.id)}
							<div class="rounded-md border border-green-200 bg-green-50 p-4">
								<div class="flex items-start justify-between gap-4">
									<div>
										<p class="font-semibold text-gray-900">{application.name}</p>
										<p class="text-sm text-gray-600">{application.role}</p>
										<p class="mt-1 text-sm text-gray-600">{application.phone}</p>
									</div>

									<div class="flex items-center gap-1 text-sm font-semibold text-amber-500">
										<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
										<span>{application.rating}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				{#each jobListings as job (job.title)}
					<div class="flex items-center justify-between rounded-md border border-gray-200 p-4">
						<div class="flex items-center gap-3">
							<span class="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-primary">
								<ClipboardList class="h-5 w-5" />
							</span>
							<div>
								<p class="font-semibold text-gray-900">{job.title}</p>
								<p class="text-sm text-gray-500">{job.type}</p>
							</div>
						</div>
						<p class="text-sm font-semibold text-gray-700">{job.applications} applicants</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
