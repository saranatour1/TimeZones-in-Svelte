<script lang="ts">
  import { timeZoneSelect, timeZoneCards } from './store';
  import Card from './Card.svelte';
  import { browser } from "$app/environment";

  $: timeZones = { timeZone1: '', timeZone2: '', timeDif: '' };
  timeZoneSelect.subscribe((oldVal) => timeZones = oldVal);

  interface TimeZoneCard {
    timeZone1: string;
    timeZone2: string;
    timeDif: string;
  }
  
  let timeZoneC: TimeZoneCard[] = [];
  timeZoneCards.subscribe((oldVal) => timeZoneC = oldVal);

  let cards:TimeZoneCard[] = [];

    console.log('Did I over write it in line 17?');
    (async () => {
      if (browser) {
        cards = await JSON.parse(localStorage.getItem('cards')!) || [];
      }
      // timeZoneC = cards
    })();



  $: cards.length > 0 && Object.entries(timeZoneC).length ===0 ? timeZoneCards.update(oldVal => oldVal = cards) : timeZoneC = timeZoneC; 


  $: countNonEmptyItems = Object.values(timeZones).filter(item => item !== '').length;

  const test =  () => {
    console.log('Did I over write it in line 41?');
    if (browser) {
      if(Object.entries(timeZoneC).length > 0)
      localStorage.setItem('cards' , JSON.stringify(timeZoneC))
    }else{
      localStorage.setItem('cards',JSON.stringify(timeZoneC.concat(cards)))
    }
  }

   $: {
    if (countNonEmptyItems === 3) {
      let timeZonesCopy: TimeZoneCard = { ...timeZones };
      if (!timeZoneC.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
        timeZoneC.unshift(timeZonesCopy);
        timeZoneCards.update((oldVal) => {
          if (!oldVal.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
            oldVal.unshift(timeZonesCopy);
          }
          return oldVal;
        });
      }
      test();
      timeZoneSelect.set({ timeZone1: '', timeZone2: '', timeDif: '' });
    }
    console.log( 'these are the cards within the same local storage group',cards);
  }

//   const timeTest = (arr1: TimeZoneCard[], arr2: TimeZoneCard[]) => {
//   // Test 1
//   console.time('first');
//   console.log('this is the first way of merging two arrays', [...arr1, ...arr2]);
//   console.timeEnd('first');

//   // Test 2
//   console.time('second');
//   console.log('this is the second way of merging two arrays', arr1.concat(arr2));
//   console.timeEnd('second');
//   // Second wins by 1ms 
// }


// // Example usage
// timeTest(cards, timeZoneC);


  $: console.log('timeZones array', timeZoneC , cards , 'Merged', [...cards, ...timeZoneC]);
  $: console.log('timeZones object', timeZones);
</script>

{#if cards.length === 0 || timeZoneC.length ===0}
    <p class=" text-center mt-5"> Loading ..</p>
{/if}


{#each timeZoneC as timeZone}
  {#if timeZone.timeDif}
    <p class="text-center my-4">
      {timeZone.timeDif}
    </p>
  {/if}
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#if timeZone.timeZone1}
      <div class="rounded">
        <Card timeZone={timeZone.timeZone1} />
      </div>
    {/if}
    {#if timeZone.timeZone2}
      <div class="rounded">
        <Card timeZone={timeZone.timeZone2} />
      </div>
    {/if}
  </div>
{/each}







