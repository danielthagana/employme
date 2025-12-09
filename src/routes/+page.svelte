<div class="main background">
	<!-- Content area -->
	<div class="content">
		<div class="landingimg">
			<img src="employ me img.avif" alt="myimg" />
		</div>

		<div class="loginForm">
			<a href="/login">login</a>
			<!-- Login form -->
		</div>
	</div>
</div>

<style>
	/* Reset body for full fit */
	.main {
		margin: 0;
		padding: 0;
		font-family: Arial, sans-serif;
	}
	.background {
		background: linear-gradient(to bottom right, rgba(99, 81, 191, 0.9), rgba(181, 126, 220, 0.7));
		background-attachment: fixed; 
		background-repeat: no-repeat;
		background-size: cover;
		color: #fff; 
		font-family: 'Poppins', sans-serif; 
	}
	/* Main layout */
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 100px 50px 50px; /* space for navbar */
		height: 100vh;
		box-sizing: border-box;
	}

	.landingimg img {
		width: 100%;
		max-width: 600px;
		height: auto;
	}

	.loginForm {
		width: 300px;
		height: 500px;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		background-color: #f9f9f9;
	}
</style>
