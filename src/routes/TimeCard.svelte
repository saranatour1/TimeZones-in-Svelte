<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  let time = new Date();
  $: myCurrenttime = time.toLocaleTimeString(); 
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



<!-- <div class="flex justify-center items-center my-40">
  <div class="grid grid-cols-1 gap-4 bg-gray-300 p-6 rounded-lg shadow-md">
    <div class="text-center">
      <p class="text-2xl font-bold text-indigo-500 mb-4 font-serif">
        {myCurrenttime}
      </p>
    </div>
    <div>
      <p class="text-xl font-normal font-serif text-sky-700">
        {myCurrentDate}
      </p>
      <p class="text-xl font-normal font-serif text-sky-700">
        {timeZone}
      </p>
    </div>
  </div>
</div> -->

<div class="bg-white rounded-lg shadow-md p-6 my-32">
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
  <!-- <div class="mt-4 bg-gray-200 h-4 w-24"></div> -->
</div>

 



<style>

</style>