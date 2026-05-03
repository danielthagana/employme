<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').PageProps} */
	let { form } = $props();

	let successMessage = $state('');
	let errorMessage = $state('');
</script>

<svelte:head>
	<title>Post a Job - EmployMe</title>
	<meta name="description" content="Create a new job post on EmployMe." />
</svelte:head>

<section class="space-y-6">
	<div class="rounded-lg bg-white p-6 shadow-sm">
		<p class="text-sm font-semibold text-primary">Job Posting</p>
		<h1 class="mt-2 text-2xl font-bold text-gray-900">Create a job post</h1>
		<p class="mt-2 max-w-3xl text-sm text-gray-600">
			Add the details job seekers need before applying.
		</p>
	</div>

	<form
		method="post"
		class="rounded-lg bg-white p-6 shadow-sm"
		use:enhance={() => {
			successMessage = '';
			errorMessage = '';

			return async ({ result, update }) => {
				await update();

				if (result.type === 'success') {
					successMessage = 'Job post created successfully.';
					errorMessage = '';
				}

				if (result.type === 'failure') {
					successMessage = '';
					errorMessage = String(result.data?.error ?? 'Failed to create job post.');
				}
			};
		}}
	>
		{#if successMessage || form?.success}
			<div class="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
				{successMessage || 'Job post created successfully.'}
			</div>
		{/if}

		{#if errorMessage || form?.error}
			<div class="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
				{errorMessage || form?.error}
			</div>
		{/if}

		<div class="grid gap-5 md:grid-cols-2">
			<div>
				<label for="title" class="mb-2 block text-sm font-medium text-gray-700">Job title</label>
				<input
					id="title"
					name="title"
					type="text"
					required
					placeholder="Security Guard"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="company_name" class="mb-2 block text-sm font-medium text-gray-700">Company name</label>
				<input
					id="company_name"
					name="company_name"
					type="text"
					required
					placeholder="SecurePlus Ltd"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="job_id" class="mb-2 block text-sm font-medium text-gray-700">Job ID</label>
				<input
					id="job_id"
					name="job_id"
					type="number"
					min="1"
					placeholder="4"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="location" class="mb-2 block text-sm font-medium text-gray-700">Location</label>
				<input
					id="location"
					name="location"
					type="text"
					required
					placeholder="Nairobi"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="employment_type" class="mb-2 block text-sm font-medium text-gray-700">Employment type</label>
				<select
					id="employment_type"
					name="employment_type"
					required
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm capitalize focus:border-primary focus:ring-primary"
				>
					<option value="">Select type</option>
					<option value="full-time">Full-time</option>
					<option value="part-time">Part-time</option>
					<option value="contract">Contract</option>
					<option value="temporary">Temporary</option>
					<option value="internship">Internship</option>
				</select>
			</div>

			<div>
				<label for="application_deadline" class="mb-2 block text-sm font-medium text-gray-700">Application deadline</label>
				<input
					id="application_deadline"
					name="application_deadline"
					type="date"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="start_datetime" class="mb-2 block text-sm font-medium text-gray-700">Start date and time</label>
				<input
					id="start_datetime"
					name="start_datetime"
					type="datetime-local"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="end_datetime" class="mb-2 block text-sm font-medium text-gray-700">End date and time</label>
				<input
					id="end_datetime"
					name="end_datetime"
					type="datetime-local"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="salary_min" class="mb-2 block text-sm font-medium text-gray-700">Minimum salary</label>
				<input
					id="salary_min"
					name="salary_min"
					type="number"
					min="0"
					step="0.01"
					placeholder="1500.00"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>

			<div>
				<label for="salary_max" class="mb-2 block text-sm font-medium text-gray-700">Maximum salary</label>
				<input
					id="salary_max"
					name="salary_max"
					type="number"
					min="0"
					step="0.01"
					placeholder="2500.00"
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				/>
			</div>
		</div>

		<div class="mt-5 grid gap-5 md:grid-cols-2">
			<div>
				<label for="description" class="mb-2 block text-sm font-medium text-gray-700">Description</label>
				<textarea
					id="description"
					name="description"
					rows="6"
					required
					placeholder="Describe the role and daily responsibilities."
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				></textarea>
			</div>

			<div>
				<label for="requirements" class="mb-2 block text-sm font-medium text-gray-700">Requirements</label>
				<textarea
					id="requirements"
					name="requirements"
					rows="6"
					required
					placeholder="List required skills, certificates, or experience."
					class="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-primary"
				></textarea>
			</div>
		</div>

		<div class="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
			<label class="inline-flex items-center gap-3 text-sm font-medium text-gray-700">
				<input
					name="is_active"
					type="checkbox"
					checked
					class="rounded border-gray-300 text-primary focus:ring-primary"
				/>
				Active job post
			</label>

			<button
				type="submit"
				class="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
			>
				Create Job
			</button>
		</div>
	</form>
</section>
