<script>
	import { UserRound, Mail, Phone, MapPin, BriefcaseBusiness, Sparkles } from '@lucide/svelte';

	/** @type {import('./$types').PageProps} */
	let { data, form } = $props();
</script>

<svelte:head>
	<title>My Profile - EmployMe</title>
</svelte:head>

<div class=" space-y-6 p-3 sm:p-5">
	<div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg">
		<p class="text-sm tracking-wide text-slate-300">Account</p>
		<h1 class="mt-2 text-2xl font-semibold">My Profile</h1>
		<p class="mt-1 text-slate-300">View and update your details anytime.</p>
	</div>

	{#if form?.success}
		<div class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
			Profile updated successfully.
		</div>
	{/if}

	{#if form?.error}
		<div class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
			{form.error}
		</div>
	{/if}

	<div class="grid gap-6 lg:grid-cols-3">
		<aside class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div class="flex flex-col items-center text-center">
				{#if data.user.profile_image}
					<img
						src={data.user.profile_image}
						alt={data.user.name}
						class="h-24 w-24 rounded-full border-4 border-slate-100 object-cover"
					/>
				{:else}
					<div
						class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-200 text-slate-600"
					>
						<UserRound size={36} />
					</div>
				{/if}

				<h2 class="mt-4 text-lg font-semibold text-slate-900">{data.user.name}</h2>
				<p class="text-sm text-slate-600">{data.user.email}</p>
				<span
					class={`mt-3 rounded-full px-3 py-1 text-xs font-medium ${
						data.user.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
					}`}
				>
					{data.user.is_active ? 'Active account' : 'Inactive account'}
				</span>
			</div>

			<div class="mt-5 space-y-3 text-sm text-slate-700">
				<p class="inline-flex items-center gap-2"><Phone size={15} /> {data.user.phone_number || 'No phone set'}</p>
				<p class="inline-flex items-center gap-2"><MapPin size={15} /> {data.user.location || 'No location set'}</p>
				<p class="inline-flex items-center gap-2"><BriefcaseBusiness size={15} /> Job ID: {data.user.job_id ?? 'N/A'}</p>
			</div>
		</aside>

		<form method="POST" class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="sm:col-span-2">
					<label class="mb-1 block text-sm font-medium text-slate-700" for="name">Full name</label>
					<div class="relative">
						<UserRound class="pointer-events-none absolute top-3 left-3 text-slate-400" size={18} />
						<input
							id="name"
							name="name"
							required
							value={data.user.name}
							class="w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 outline-none focus:ring-2 focus:ring-slate-500"
						/>
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-slate-700" for="email">Email</label>
					<div class="relative">
						<Mail class="pointer-events-none absolute top-3 left-3 text-slate-400" size={18} />
						<input
							id="email"
							type="email"
							name="email"
							required
							value={data.user.email}
							class="w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 outline-none focus:ring-2 focus:ring-slate-500"
						/>
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-slate-700" for="phone_number">Phone number</label>
					<div class="relative">
						<Phone class="pointer-events-none absolute top-3 left-3 text-slate-400" size={18} />
						<input
							id="phone_number"
							name="phone_number"
							value={data.user.phone_number ?? ''}
							class="w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 outline-none focus:ring-2 focus:ring-slate-500"
						/>
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-slate-700" for="location">Location</label>
					<div class="relative">
						<MapPin class="pointer-events-none absolute top-3 left-3 text-slate-400" size={18} />
						<input
							id="location"
							name="location"
							value={data.user.location ?? ''}
							class="w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 outline-none focus:ring-2 focus:ring-slate-500"
						/>
					</div>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-slate-700" for="age">Age</label>
					<input
						id="age"
						type="number"
						min="0"
						name="age"
						value={data.user.age ?? ''}
						class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-slate-700" for="experience_years"
						>Experience (years)</label
					>
					<input
						id="experience_years"
						type="number"
						min="0"
						name="experience_years"
						value={data.user.experience_years ?? 0}
						class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-slate-700" for="job_id">Job ID</label>
					<input
						id="job_id"
						type="number"
						min="0"
						name="job_id"
						value={data.user.job_id ?? ''}
						class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-slate-700" for="profile_image">Profile image URL</label>
					<input
						id="profile_image"
						name="profile_image"
						value={data.user.profile_image ?? ''}
						placeholder="https://example.com/avatar.jpg"
						class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
					/>
				</div>

				<div class="sm:col-span-2">
					<label class="mb-1 block text-sm font-medium text-slate-700" for="skills">Skills</label>
					<textarea
						id="skills"
						name="skills"
						rows="3"
						class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
					>{data.user.skills ?? ''}</textarea>
				</div>

				<div class="sm:col-span-2">
					<label class="mb-1 block text-sm font-medium text-slate-700" for="bio">Bio</label>
					<textarea
						id="bio"
						name="bio"
						rows="4"
						class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-slate-500"
					>{data.user.bio ?? ''}</textarea>
				</div>

				
			</div>

			<div class="flex justify-end">
				<button
					type="submit"
					class="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary/90"
				>
					Save Changes
				</button>
			</div>
		</form>
	</div>
</div>
