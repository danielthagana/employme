<script>
</script>

<!-- Filter Section -->
<div class="mx-auto flex w-full justify-around rounded-md">
	<!-- search box -->
	<div class="">
		<input
			type="text"
			placeholder="Search Jobs..."
			class="w-full min-w-xl rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>

	<!-- Employmet type select box  -->
	<div class="">
		<select
			class="w-full min-w-xs rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			<option value="">All Types</option>
			<option value="full-time">Full-Time</option>
			<option value="part-time">Part-Time</option>
			<option value="contract">Contract</option>
		</select>
	</div>

	<!-- Job type -->
	<div class="">
		<select
			class="w-full min-w-xs rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			<option disabled value="">Select Job Category</option>
			<option value="engineering">Engineering</option>
			<option value="design">Design</option>
			<option value="marketing">Marketing</option>
			<option value="sales">Sales</option>
		</select>
	</div>
</div>

<!-- Job Listings Section -->
<div class="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	<!-- Job Card Example -->
	<div class="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg">
		<div class="mb-4 flex items-center justify-between">
			<h3 class="mb-2 text-xl font-semibold">Security Guard</h3>
			<span>
				<span
					class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
					>Full-Time</span
				>
			</span>
		</div>
		<p class="mb-4 text-gray-600">Company XYZ - Remote</p>
		<p class="mb-4 text-gray-800">
			We are looking for a skilled frontend developer to join our team...
		</p>
        <hr class="mb-4" />
		<div class="flex items-center justify-between">
			<span class="font-semibold text-primary">$70,000 - $90,000</span>
			<button class="rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90"
				>Apply Now</button
			>
		</div>
	</div>
</div>
