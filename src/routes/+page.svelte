<script>
	import TimeCard from './TimeCard.svelte';
	import TimeForm from './TimeForm.svelte';
	import UserAddedCard from './UserAddedCard.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Time Zones Comparizon Application" />
</svelte:head>

<section>	
	<TimeCard />
	<TimeForm />
	<UserAddedCard />

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
