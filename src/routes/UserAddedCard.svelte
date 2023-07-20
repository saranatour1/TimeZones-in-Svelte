<script>
  import { browser } from '$app/environment';
	import { onMount } from 'svelte';
  import { timeZoneSelect ,timeZoneCards } from './store';
	import Card from './Card.svelte';

  $: timeZones = {};
timeZoneSelect.subscribe((oldVal) => timeZones = oldVal);

/**
 * @type {{}[]}
 */
let timeZoneC = [];
timeZoneCards.subscribe((oldVal) => timeZoneC = oldVal);

$: countNonEmptyItems = Object.values(timeZones).filter(item => item !== '').length;
$: console.log(countNonEmptyItems);

// This code block is a reactive statement that runs whenever the value of `countNonEmptyItems` changes.
$: {
// This code block is checking if the number of non-empty items in the `timeZones` object is equal to 2. 
// If it is, it creates a copy of the `timeZones` object called `timeZonesCopy`.
  if (countNonEmptyItems === 2) {
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
    timeZoneSelect.set({ timeZone1: '', timeZone2: '' });
  }
}

$: console.log('timeZones array', timeZoneC);
$: console.log('timeZones object', timeZones);



</script>

<div class="grid grid-cols-2 gap-4 my-2">
  {#each timeZoneC as timeZone}
    {#if timeZone?.timeZone1}
      <div class=" p-4 rounded">
        <Card timeZone={timeZone?.timeZone1} />
      </div>
    {/if}
    {#if timeZone?.timeZone2}
      <div class=" p-4 rounded">
        <Card timeZone={timeZone?.timeZone2} />
      </div>
    {/if}
  {/each}
</div>



