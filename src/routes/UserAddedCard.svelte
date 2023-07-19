<script>
  import { browser } from '$app/environment';
	import { onMount } from 'svelte';
  import { timeZoneSelect } from './store';

  $: timeZones ={};
  timeZoneSelect.subscribe((oldVal) => timeZones = oldVal);
  $: countNonEmptyItems = Object.values(timeZones).filter(item => item !== '').length;
$:console.log(countNonEmptyItems);




</script>

<!-- // {#if timeZone.length > 0}
// <div class="bg-white rounded-lg shadow-md p-6 mt-10">
//   <div class="text-3xl font-bold mb-4">
//     {timeOf}
//   </div> 
//   <div class="text-lg text-gray-500 mb-4"> 
//     <span class="font-bold">{dateOf}</span>  
//     <span class="text-sm">(GMT 
//       {#if timeZoneOffset.length >0 }
//         +
//         {:else}
//         -
//       {/if}
//       {timeZoneOffset})</span>  
//   </div> 
//   <div class="text-gray-600">Time in {timeZone}</div>
// </div>
// {/if}  -->
