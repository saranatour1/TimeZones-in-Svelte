<script>
	import { onMount } from "svelte";

  export let timeZone; 

const options = { month: 'long', day: 'numeric', year: 'numeric' };
$: timeNow = new Date();
$: dateTimeNow = timeZone.length > 0 ? timeNow.toLocaleString('en-US', { timeZone: timeZone }) : '';
$: timeOf = timeZone.length > 0 ? timeNow.toLocaleTimeString('en-US', { timeZone: timeZone }) : '';
$: dateOf = timeZone.length > 0 ? timeNow.toLocaleDateString('en-US', { ...options, timeZone: timeZone }) : '';
let timeZoneOffset;
// $: console.log(timeZoneOffset);

for (const locale of ["ja", "en", "fr"]) {
  timeZoneOffset = Intl?.DateTimeFormat(locale, {
    timeZoneName: "short",
    timeZone: timeZone,
  })
    .formatToParts()
    .find((i) => i.type === "timeZoneName")?.value;
  console.log(timeZoneOffset);
}

onMount(() => {
		const interval = setInterval(() => {
			timeNow = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

</script>
<!-- 
<div>
  {timeZone}
</div> -->
 {#if timeZone.length > 0}
  <div class="bg-white rounded-lg shadow-md p-6 mt-10">
      <div class="text-3xl font-bold mb-4">
        {timeOf}
      </div> 
    <div class="text-lg text-gray-500 mb-4"> 
      <span class="font-bold">
        {dateOf}
      </span>       
      <span class="text-sm">(GMT 
      {#if timeZoneOffset.length >0 }
      +
        {:else}
      -
      {/if}
      {timeZoneOffset})</span>  
  </div> 
  <div class="text-gray-600">Time in {timeZone}</div> </div> {/if} 