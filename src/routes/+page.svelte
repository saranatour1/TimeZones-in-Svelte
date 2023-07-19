<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import TimeCard from './TimeCard.svelte';
	import TimeForm from './TimeForm.svelte';
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Time Zones Comparizon Application" />
</svelte:head>

<section>	
	<TimeCard />
	<TimeForm />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}


</style>
