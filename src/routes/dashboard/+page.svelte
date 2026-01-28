<script>
	import { Mail, MapPin, Phone, User } from '@lucide/svelte';
	let showMore = $state(false);
	
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
			<option disabled selected value="">Select Job Category</option>
			<option value="cleaning">Cleaning & Housekeeping</option>
			<option value="construction">Construction & Manual Labor</option>
			<option value="security">Security</option>
			<option value="hospitality">Hospitality (Waiter / Cook)</option>
			<option value="delivery">Delivery & Riders</option>
			<option value="retail">Retail & Shop Attendant</option>
			<option value="farming">Farming & Agriculture</option>
			<option value="mechanic">Mechanic & Auto Repair</option>
			<option value="domestic">Domestic Work</option>
			<option value="warehouse">Warehouse & Loading</option>
			<option value="office_support">Office Support</option>
			<option value="other">Other</option>
		</select>
	</div>
</div>

<!-- Job Listings Section -->
<div class="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	<!-- Job Card Example -->

	<div class="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg">
		<div class=" mb-4 flex items-center justify-between">
			<div class="flex items-center justify-center gap-1">
				<User class="h-9 w-9 shrink-0" />
				<!-- name profile row -->
				<h3 class="">Gregory Mwakio</h3>
			</div>
			<h1 class="mb-2 text-xl font-semibold">Laundry Cleaner</h1>

			<span>
				<span
					class=" inline-block rounded-full bg-green-100 p-6 px-3 py-1 text-sm font-semibold text-blue-800"
					>Part time</span
				>
			</span>
		</div>
		<!-- next row -->
		 <div class="mb-4">
			 <p class=" text-gray-600">Waterfront Mall</p>
		 </div>
		
		<div class="mb-6 flex items-center justify-between text-gray-600">
			<div class="flex" >
				<MapPin size={19} class="mr-1 text-green-600" />Karen
			</div>
			<!-- Show more button -->
			<button
				onclick={() => (showMore = !showMore)}
				class="ml-2 rounded-md text-primary underline "
			>
				{showMore ? 'Show Less' : 'Show More'}
			</button>
		</div>
		<!-- hidden row -->
		<div>
			<span class=" flex items-center justify-between text-gray-600" hidden={!showMore}>
				<div class="flex">
					<Phone size={19} class="mr-1 text-green-600" /> <a href="tel:+254722123456">0722123456</a>
				</div>
				<div class="flex">
					<Mail size={19} class="mr-1 text-blue-600" />
					<a href="mailto:gregory@example.com">gregory45@gmail.com</a>
				</div>

				<div class="flex text-primary">
					<a class="font-bold underline" href="/profile/1">View Profile</a>
				</div>
			</span>
		</div>
		<hr class="my-4" />
		<div class="flex items-center justify-between">
			<span class="font-semibold text-primary">ksh 500-1000</span>
			<button class="rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90"
				>Apply Now</button
			>
		</div>
	</div>

	<!-- second card -->
	<div class="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg">
		<div class="mb-4 flex items-center justify-between">
			<div class="flex items-center justify-center gap-1">
				<User class="h-9 w-9 shrink-0" />
				<h3 class="mb-2 text-xl">Mary Ojwam</h3>
			</div>

			<h1 class="mb-2 text-xl font-semibold">Mechanic</h1>

			<span>
				<span
					class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
					>Full-Time</span
				>
			</span>
		</div>
		<!-- next row -->
		<p class="mb-4 text-gray-600">Tumaini Stage</p>
		<div class="mb-5 flex items-center justify-between text-gray-600">

			<!-- show more btutton -->
				<div class="flex">
					<MapPin size={19} class="mr-1 text-green-600" />Ongata Rongai
				</div>
		
				<button
					onclick={() => (showMore = !showMore)}
					class="ml-2 rounded-md bg-primary/10 px-2 py-1 text-sm text-primary hover:bg-primary/20">
					{showMore ? 'Show Less' : 'Show More'}
					</button>
				<p class="mb-4 text-gray-800">
				</p>
		</div>
		<hr class="mb-4" />
		<div class="flex items-center justify-between">
			<span class="font-semibold text-primary">ksh 1000-2000</span>
			<button class="rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90"
				>Apply Now</button
			>
		</div>
	</div>
</div>
