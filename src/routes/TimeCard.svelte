<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  let time = new Date();
  $: myCurrenttime = time.toLocaleTimeString(); 
 // @ts-ignore
   $: myCurrentDate = time.toLocaleDateString('en-US', options);
  $:timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  $:timeZoneOffset = -time.getTimezoneOffset() /60;
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


  $: dayString = weekday[time.getDay()];

  onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});


  console.log(timeZoneOffset)
</script>


<div class="bg-white rounded-lg shadow-md p-6 mt-10">
  <div class="text-3xl font-bold mb-4">
    {myCurrenttime}
  </div> 
  <div class="text-lg text-gray-500 mb-4"> 
    {dayString}, 
    <span class="font-bold">{myCurrentDate}</span>  
    <span class="text-sm">(GMT 
      {#if timeZoneOffset >0 }
        +
        {:else}
        -
      {/if}
      {timeZoneOffset})</span>  
  </div> 
  <div class="text-gray-600">Time in {timeZone}</div>
</div>





<style>

</style>