<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let error = $state('');
</script>

<svelte:head>
	<title>Login - EmployMe</title>
	<meta
		name="description"
		content="Login to your EmployMe account to access job opportunities and manage your profile."
	/>
</svelte:head>

<div class="flex min-h-screen bg-gray-50">
	<!-- Left Side - Login Form -->
	<div class="flex w-full items-center justify-center px-6 py-12 sm:px-8 lg:w-1/2 lg:px-16">
		<div class="w-full max-w-md">
			<!-- Logo/Header -->
			<div class="mb-8 text-center">
				<h1 class="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h1>
				<p class="text-gray-600">Sign in to your account to continue</p>
			</div>

			<!-- Login Form -->
			<form
				class="space-y-6"
				method="post"
				use:enhance={({ formData }) => {
					error = '';
					console.log('Form submitted with data:', formData, email, password);

					return async ({ result }) => {
						if (result.type === 'failure') {
							error = `${result.data?.error}` || 'An unknown error occurred.';
						}
					};
				}}
			>
				{#if error}
					<div
						class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
						role="alert"
					>
						<p class="font-medium">{error}</p>
					</div>
				{/if}

				<!-- Email Input -->
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-gray-700">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						name="email"
						bind:value={email}
						required
						placeholder="you@example.com"
						class="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<!-- Password Input -->
				<div>
					<div class="mb-2 flex items-center justify-between">
						<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
						<a href="/forgot-password" class="text-pr text-sm font-medium"> Forgot? </a>
					</div>
					<input
						id="password"
						type="password"
						name="password"
						bind:value={password}
						required
						placeholder="Enter your password"
						class="w-full rounded-lg border border-gray-300 px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<!-- Remember Me Checkbox -->
				<div class="flex items-center">
					<input
						id="remember"
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
					/>
					<label for="remember" class="ml-2 block text-sm text-gray-700"> Remember me </label>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full transform rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-primary/90 disabled:bg-blue-400 disabled:hover:scale-100"
				>
					{isLoading ? 'Signing In...' : 'Sign In'}
				</button>

				<!-- Sign Up Link -->
				<div class="text-center">
					<p class="text-gray-600">
						Don't have an account?
						<a
							href="/signup"
							class="font-semibold text-primary hover:text-primary/90 hover:underline"
						>
							Sign up here
						</a>
					</p>
				</div>
			</form>

			<!-- Social Login Options (Optional) -->
			<!-- <div class="mt-8 border-t border-gray-300 pt-8">
				<div class="relative mb-4">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300"></div>
					</div>
					<div class="relative flex justify-center text-sm">
						<span class="bg-gray-50 px-2 text-gray-500">Or continue with</span>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-3">
					<button
						class="rounded-lg border border-gray-300 px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
					>
						Google
					</button>
					<button
						class="rounded-lg border border-gray-300 px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
					>
						GitHub
					</button>
				</div>
			</div> -->
		</div>
	</div>

	<!-- Right Side - Image -->
	<div class="relative hidden w-1/2 items-center justify-center overflow-hidden bg-primary lg:flex">
		<!-- Decorative shapes -->
		<div class="absolute inset-0 opacity-10">
			<div class="absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-white"></div>
			<div class="absolute bottom-0 left-0 -mb-48 -ml-48 h-96 w-96 rounded-full bg-white"></div>
		</div>

		<!-- Main Image/Content -->
		<div class="relative z-10 px-8 text-center">
			<div class="mb-8">
				<div class="inline-block">
					<img
						src="/employmelogo.png"
						alt="EmployMe Logo"
						class=" h-30 w-40 object-contain drop-shadow-lg"
					/>
				</div>
			</div>
			<h2
				class="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent"
			>
				EmployMe
			</h2>
			<p class="mb-8 max-w-sm text-lg text-gray-300">Work For Everyone, Everywhere.</p>

			<!-- Feature Highlights -->
			<div class="mt-1 space-y-3">
				<div class="flex items-center justify-center text-white">
					<svg class="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
					<span class="text-lg">Find Jobs Near You</span>
				</div>
				<div class="flex items-center justify-center text-white">
					<svg class="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
					<span class="text-lg">Fair Opportunities</span>
				</div>
				<div class="flex items-center justify-center text-white">
					<svg class="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
					<span class="text-lg">Secure and Transparent Hiring</span>
				</div>
			</div>
		</div>
	</div>
</div>
