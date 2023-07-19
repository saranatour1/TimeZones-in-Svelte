<script>
	import Header from './Header.svelte';
	import './styles.css';
	import './app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>Made with <a href="https://kit.svelte.dev">kit.svelte.dev</a></p>
	</footer>
</div>

<style>


	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
