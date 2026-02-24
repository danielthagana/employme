<script lang="ts">
	import { ToggleRight, Trash2 } from '@lucide/svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	function onToggleActive(id: number) {}
	function onDelete(id: number) {}

	const job_seekers = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			password: 'pass123',
			age: 28,
			phone_number: '+1234567890',
			location: 'New York',
			job_id: 'JOB001',
			role_id: 'ROLE001',
			profile_image: 'https://avatar.iran.liara.run/public/1',
			bio: 'Passionate full-stack developer',
			skills: 'React, Node.js, PostgreSQL',
			experience_years: 3,
			is_active: true
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			password: 'pass456',
			age: 32,
			phone_number: '+0987654321',
			location: 'San Francisco',
			job_id: 'JOB002',
			role_id: 'ROLE002',
			profile_image: 'https://avatar.iran.liara.run/public/2',
			bio: 'UX/UI Designer with 5 years experience',
			skills: 'Figma, UI Design, Prototyping',
			experience_years: 5,
			is_active: true
		},
		{
			id: 3,
			name: 'Mike Johnson',
			email: 'mike@example.com',
			password: 'pass789',
			age: 26,
			phone_number: '+1122334455',
			location: 'Los Angeles',
			job_id: 'JOB003',
			role_id: 'ROLE001',
			profile_image: 'https://avatar.iran.liara.run/public/3',
			bio: 'Data analyst seeking analytics role',
			skills: 'Python, SQL, Tableau',
			experience_years: 2,
			is_active: false
		}
	];
</script>

<div class="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-slate-800 bg-slate-800">
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Name</th>
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Email</th>
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Phone</th>
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Location</th>
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Skills</th>
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Experience</th>
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Status</th>
				<th class="px-4 py-3 text-left font-semibold text-slate-300">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each job_seekers as seeker}
				<tr class="border-b border-slate-800 transition hover:bg-slate-800/50">
					<td class="px-4 py-3">
						<div class="flex items-center gap-3">
							<img src={seeker.profile_image} alt={seeker.name} class="h-8 w-8 rounded-full" />
							<span class="font-medium">{seeker.name}</span>
						</div>
					</td>
					<td class="px-4 py-3 text-slate-400">{seeker.email}</td>
					<td class="px-4 py-3 text-slate-400">{seeker.phone_number}</td>
					<td class="px-4 py-3 text-slate-400">{seeker.location}</td>
					<td class="px-4 py-3 text-xs text-slate-400">{seeker.skills}</td>
					<td class="px-4 py-3 text-slate-400">{seeker.experience_years} yrs</td>
					<td class="px-4 py-3">
						<span
							class={`rounded px-2 py-1 text-xs font-semibold ${
								seeker.is_active ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
							}`}
						>
							{seeker.is_active ? 'Active' : 'Inactive'}
						</span>
					</td>
					<td class="px-4 py-3">
						<div class="flex gap-2">
							
							<button
								onclick={() => onDelete(seeker.id)}
								class="text-red-400 hover:bg-red-900/30"
								title="Delete job seeker"
							>
								<Trash2 size={18} />
							</button>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
