<script lang="ts">
    import { ToggleRight, Trash2, Printer, Download } from '@lucide/svelte';
    import { enhance } from '$app/forms';

    /** @type {import('./$types').PageProps} */
    let { data } = $props();
    let isExporting = false;

    function formatDate(date) {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function formatSalary(min, max) {
        if (!min && !max) return '-';
        if (min && max) return `$${Number(min).toLocaleString()} - $${Number(max).toLocaleString()}`;
        if (min) return `$${Number(min).toLocaleString()}`;
        return `$${Number(max).toLocaleString()}`;
    }

    function buildPdfTable() {
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.padding = '20px';
        container.style.background = '#ffffff';
        container.style.color = '#000000';
        container.style.fontFamily = 'Arial, sans-serif';

        const heading = document.createElement('h1');
        heading.textContent = 'Jobs Listings';
        heading.style.marginBottom = '16px';
        heading.style.fontSize = '22px';
        heading.style.color = '#111111';
        container.appendChild(heading);

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.fontSize = '12px';

        const columns = [
            'Title',
            'Company',
            'Location',
            'Type',
            'Salary',
            'Deadline',
            'Posted',
            'Views',
            'Status'
        ];

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        columns.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.style.padding = '10px';
            th.style.border = '1px solid #ccc';
            th.style.background = '#f4f4f4';
            th.style.textAlign = 'left';
            th.style.color = '#111';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.jobs.forEach(job => {
            const row = document.createElement('tr');

            const cells = [
                `${job.title || '-'}${job.description ? ' — ' + job.description.substring(0, 60) : ''}`,
                job.company_name || '-',
                job.location || '-',
                job.employment_type || '-',
                formatSalary(job.salary_min, job.salary_max),
                formatDate(job.application_deadline),
                formatDate(job.created_at),
                String(job.views_count || 0),
                job.is_active ? 'Active' : 'Inactive'
            ];

            cells.forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                td.style.padding = '10px';
                td.style.border = '1px solid #ccc';
                td.style.color = '#111';
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        container.appendChild(table);

        return container;
    }

    function handlePrint() {
        window.print();
    }

    async function handleDownloadPDF() {
        if (typeof window === 'undefined') return;
        const element = buildPdfTable();
        isExporting = true;

        try {
            const mod = await import('html2pdf.js');
            const html2pdf = mod.default || mod;
            await html2pdf()
                .set({
                    margin: 10,
                    filename: 'jobs-listing.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { backgroundColor: '#ffffff', scale: 2 },
                    jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' }
                })
                .from(element)
                .save();
        } catch (err) {
            console.error('PDF export failed:', err);
            alert('PDF export failed. Please use Print instead.');
        } finally {
            isExporting = false;
        }
    }
</script>
<svelte:head>
	<title>Jobs Management | Admin Dashboard</title>
	<style>
		@media print {
			.no-print {
				display: none;
			}
			body {
				background: white;
			}
		}
	</style>
</svelte:head>

<div class="space-y-6 " style="min-height: calc(100vh - 80px);">	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-slate-700">Jobs Listings</h1>
			<p class="text-slate-500">Manage all job postings</p>
		</div>
		<div class="text-right text-sm text-slate-400">
			Total Jobs: <span class="text-lg font-bold text-black-400">{data.jobs.length}</span>
		</div>
	</div>

	<!-- Actions Bar -->
	<div class="no-print flex gap-3">
		<button
			onclick={handlePrint}
			class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
		>
			<Printer size={18} />
			Print
		</button>

		<button
			onclick={handleDownloadPDF}
			disabled={isExporting}
			class="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<Download size={18} />
			{#if isExporting}Exporting...{:else}Download PDF{/if}
		</button>
	</div>

	<!-- Jobs Table -->
	<div id="jobs-table-container" class="rounded-lg border border-slate-800 bg-slate-900">
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-slate-800 bg-slate-800">
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Title</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Company</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Location</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Type</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Salary</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Deadline</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Posted</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Views</th>
						<th class="px-4 py-3 text-left font-semibold text-slate-300">Status</th>
						<th class="no-print px-4 py-3 text-left font-semibold text-slate-300">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.jobs as job}
						<tr class="border-b border-slate-800 transition hover:bg-slate-800/50">
							<td class="px-4 py-3">
								<div>
									<p class="font-medium text-slate-100">{job.title}</p>
									<p class="text-xs text-slate-500">{job.description?.substring(0, 50)}...</p>
								</div>
							</td>
							<td class="px-4 py-3 text-slate-400">{job.company_name || '-'}</td>
							<td class="px-4 py-3 text-slate-400">{job.location || '-'}</td>
							<td class="px-4 py-3">
								<span class="rounded bg-slate-700 px-2 py-1 text-xs font-medium text-slate-200">
									{job.employment_type || 'full-time'}
								</span>
							</td>
							<td class="px-4 py-3 text-slate-400"
								>{formatSalary(job.salary_min, job.salary_max)}</td
							>
							<td class="px-4 py-3 text-xs text-slate-400"
								>{formatDate(job.application_deadline)}</td
							>
							<td class="px-4 py-3 text-xs text-slate-400">{formatDate(job.created_at)}</td>
							<td class="px-4 py-3 text-slate-400">{job.views_count || 0}</td>
							<td class="px-4 py-3">
								<span
									class={`rounded px-2 py-1 text-xs font-semibold ${
										job.is_active ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
									}`}
								>
									{job.is_active ? 'Active' : 'Inactive'}
								</span>
							</td>
							<td class="no-print px-4 py-3">
								<div class="flex gap-2">
									<form method="POST" action="?/toggleActive" use:enhance>
										<input type="hidden" name="id" value={job.id} />
										<input type="hidden" name="isActive" value={job.is_active} />
										<button
											type="submit"
											class="rounded px-2 py-1 text-blue-400 hover:bg-blue-900/30"
											title="Toggle status"
										>
											<ToggleRight size={18} />
										</button>
									</form>
									<form method="POST" action="?/deleteJob" use:enhance>
										<input type="hidden" name="id" value={job.id} />
										<button
											type="submit"
											class="rounded px-2 py-1 text-red-400 hover:bg-red-900/30"
											title="Deactivate job"
										>
											<Trash2 size={18} />
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	{#if data.jobs.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-800 py-12"
		>
			<p class="text-slate-400">No jobs found</p>
		</div>
	{/if}
</div>
