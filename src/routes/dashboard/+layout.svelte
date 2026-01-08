<script>
	import {
		ChevronDown,
		ChevronUp,
		LayoutDashboard,
		TextAlignJustify,
		FileText,
		CircleUser,
		CircleAlert,
		List,
		Plug,
		UserRoundPen,
		LogOut
	} from '@lucide/svelte';
	/** @type {import('./$types').LayoutProps} */
	let { data, children } = $props();

	let dropdownOpen = $state(true);
	let activeNavItem = $state('/dashboard');
	let sidebarOpen = $state(true);

	const navItems = [
		{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
		{ name: 'Pages', href: '/dashboard/?pages', icon: FileText },
		{ name: 'User Profile', href: '/profile', icon: CircleUser },
		{ name: 'Help & Support', href: '/help', icon: CircleAlert }
	];

	const jobsNavItems = [
		{ name: 'Jobs and Hustles', href: '/jobs', icon: List },
		{ name: 'My Jobs Profile', href: '/myjobs', icon: Plug }
	];
</script>

<!-- Navigation Bar -->
<nav class="fixed top-0 z-10 w-full bg-gray-900 px-2 shadow-xl md:px-6">
	<div class="flex grow flex-col items-center justify-between sm:flex-row lg:px-6">
		<div class="flex items-center space-x-4 py-3">
			<TextAlignJustify
				class="cursor-pointer text-white"
				onclick={() => (sidebarOpen = !sidebarOpen)}
			/>
			<a href="/" class="flex items-center">
				<img
					src="/employmelogo.png"
					class=" -mt-2 ml-5 h-20 object-contain drop-shadow-lg"
					alt="EmployMe Logo"
				/>
			</a>
		</div>
		<div class="relative flex w-fit items-center gap-4 px-5 py-3 lg:px-0 lg:py-0 lg:shadow-none">
			<span class="flex h-13 w-13 items-center justify-center rounded-full bg-white/20 text-white"
				>D</span
			>
			<button
				class=" flex cursor-pointer items-center justify-center space-x-2 px-5 py-2 font-semibold text-white"
				onclick={() => (dropdownOpen = !dropdownOpen)}
			>
				<span class="text-lg"> Daniel </span>

				{#if dropdownOpen}
					<ChevronDown />
				{:else}
					<ChevronUp />
				{/if}
			</button>
			<div
				class="dark:bg-gray-dark shadow-theme-lg absolute top-16 right-0 z-40 mt-2 flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 text-white dark:border-gray-800 dark:bg-gray-800"
				class:hidden={dropdownOpen}
			>
				<div class=" flex flex-col space-y-1 px-3 py-2 text-gray-700 dark:text-gray-300">
					<span> Daniel Thagana </span>
					<span> kiretai05dan@gmail.com </span>
				</div>
				<ul>
					<li class=" flex items-center rounded-lg px-4 py-2 hover:bg-gray-700">
						<UserRoundPen class=" h-9" />
						<a
							href="/profile"
							class="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
						>
							Edit Profile
						</a>
					</li>
					<hr class="text-gray-600" />
					<li class="flex items-center rounded-lg px-4 py-2 hover:bg-gray-700">
						<LogOut />
						<a
							href="/logout"
							class="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
						>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>

<!-- Sidebar Navigation -->
<aside>
	<aside
		class="absolute
        top-24 hidden h-full
        w-0
        flex-col border-r
     bg-gray-900 text-gray-900
        shadow-lg transition-all
        duration-300 ease-in-out md:flex
        
        lg:shadow-sm
      "
		class:w-72={sidebarOpen}
	>
		<div class="no-scrollbar overflow-y-auto">
			<nav class="space-y-6 px-4 py-4">
				<div>
					<ul class="flex flex-col gap-2">
						{#each navItems as item (item.href)}
							<li>
								<a
									class="{activeNavItem === item.href
										? 'bg-primary/50 shadow-sm'
										: 'hover:bg-gray-800 hover:text-gray-300'} group relative flex items-center rounded-lg px-4 py-3 text-gray-400 transition-all duration-200 ease-in-out"
									href={item.href}
									onclick={() => (activeNavItem = item.href)}
								>
									<span
										class="flex items-center justify-center text-gray-500 transition-colors duration-200 group-hover:text-gray-300 {activeNavItem ===
										item.href
											? 'text-gray-100'
											: ''}"
									>
										<svelte:component this={item.icon} class="h-5 w-5" />
									</span>

									<span
										class="ml-3 truncate px-2 text-sm font-medium {activeNavItem === item.href
											? 'text-gray-100'
											: ''}"
									>
										{item.name}
									</span>

									{#if activeNavItem === item.href}
										<div
											class="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 transform rounded-r-full bg-gray-400"
										></div>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<h2
						class="
                mb-3 flex items-center justify-start text-xs
                font-semibold tracking-wider
                text-gray-400 uppercase
                dark:text-gray-500
              "
					>
						Jobs
					</h2>
					<ul class="flex flex-col gap-2">
						{#each jobsNavItems as item (item.href)}
							<li>
								<a
									class="{activeNavItem === item.href
										? 'bg-primary/50 shadow-sm'
										: 'hover:bg-gray-800 hover:text-gray-300'} group relative flex items-center rounded-lg px-4 py-3 text-gray-400 transition-all duration-200 ease-in-out"
									href={item.href}
									onclick={() => (activeNavItem = item.href)}
								>
									<span
										class="flex items-center justify-center text-gray-500 transition-colors duration-200 group-hover:text-gray-300 {activeNavItem ===
										item.href
											? 'text-gray-100'
											: ''}"
									>
										<svelte:component this={item.icon} class="h-5 w-5" />
									</span>
									<span
										class="ml-3 truncate px-2 text-sm font-medium {activeNavItem === item.href
											? 'text-gray-100'
											: ''}"
									>
										{item.name}
									</span>

									{#if activeNavItem === item.href}
										<div
											class="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 transform rounded-r-full bg-gray-400"
										></div>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</nav>
		</div>
	</aside>
</aside>

<div
	class="transition-al mt-24 min-h-screen bg-gray-100  duration-300 ease-in-out p-3"
	class:ml-0={!sidebarOpen}
	class:lg:ml-72={sidebarOpen}
>
	{@render children()}
</div>
