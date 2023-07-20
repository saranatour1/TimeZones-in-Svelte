<script>
  import { browser } from '$app/environment';
	import { onMount } from 'svelte';
  import { timeZoneSelect ,timeZoneCards } from './store';

  $: timeZones = {};
timeZoneSelect.subscribe((oldVal) => timeZones = oldVal);

/**
 * @type {{}[]}
 */
let timeZoneC = [];
timeZoneCards.subscribe((oldVal) => timeZoneC = oldVal);

$: countNonEmptyItems = Object.values(timeZones).filter(item => item !== '').length;
$: console.log(countNonEmptyItems);

$: {
  if (countNonEmptyItems === 2) {
    const timeZonesCopy = { ...timeZones };
    // Check if timeZonesCopy already exists in timeZoneC before pushing
    if (!timeZoneC.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
      timeZoneC.push(timeZonesCopy);
      // console.log('I am the regular array', timeZoneC);
      timeZoneCards.update((oldVal) => {
        // Check if timeZonesCopy already exists in oldVal before pushing
        if (!oldVal.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
          oldVal.push(timeZonesCopy);
        }
        // console.log('I am inside the if statement', oldVal);
        return oldVal;
      });
    }
    timeZoneSelect.set({ timeZone1: '', timeZone2: '' });
  }
}

$: console.log('timeZones array', timeZoneC);
$: console.log('timeZones object', timeZones);








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
