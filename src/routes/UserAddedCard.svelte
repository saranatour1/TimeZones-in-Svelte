<script>
  import { browser } from '$app/environment';
	import { onMount } from 'svelte';
  import { timeZoneSelect ,timeZoneCards } from './store';
	import Card from './Card.svelte';

  $: timeZones = {timeZone1: '' , timeZone2 : '' , timeDif :''};
timeZoneSelect.subscribe((oldVal) => timeZones = oldVal);


let timeZoneC = [];
timeZoneCards.subscribe((oldVal) => timeZoneC = oldVal);

$: countNonEmptyItems = Object.values(timeZones).filter(item => item !== '').length;
$: console.log(countNonEmptyItems);

// This code block is a reactive statement that runs whenever the value of `countNonEmptyItems` changes.
$: {
// This code block is checking if the number of non-empty items in the `timeZones` object is equal to 2. 
// If it is, it creates a copy of the `timeZones` object called `timeZonesCopy`.
  if (countNonEmptyItems === 3) {
    // console.log('I am right here')
    const timeZonesCopy = { ...timeZones };
    if (!timeZoneC.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
      timeZoneC.push(timeZonesCopy);
      timeZoneCards.update((oldVal) => {
        if (!oldVal.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
          oldVal.push(timeZonesCopy);
        }
        return oldVal;
      });
    }
    timeZoneSelect.set({ timeZone1: '', timeZone2: '', timeDif : '' });
  }
}

$: console.log('timeZones array', timeZoneC);
$: console.log('timeZones object', timeZones);



</script>


{#each timeZoneC as timeZone}
  {#if timeZone.timeDif}
    <p class="text-center my-4">
      {timeZone.timeDif}
    </p>
  {/if}
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#if timeZone.timeZone1}
      <div class=" rounded  ">
        <Card timeZone={timeZone.timeZone1} />
      </div>
    {/if}
    {#if timeZone.timeZone2}
      <div class=" rounded  ">
        <Card timeZone={timeZone.timeZone2} />
      </div>
    {/if}
  </div>
{/each}






