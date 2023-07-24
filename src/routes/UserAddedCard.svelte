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

  let cards:TimeZoneCard[] = [];
  $: {
    (async () => {
      if (browser) {
        cards = await JSON.parse(localStorage.getItem('cards')!) || [];
      }
    })();
  }

  let timeZoneC: TimeZoneCard[] = [];
  timeZoneCards.subscribe((oldVal) => timeZoneC = oldVal);
  

  $: countNonEmptyItems = Object.values(timeZones).filter(item => item !== '').length;

  const test =  () => {

    if (browser) {
      // let test = localStorage.getItem('cards'); 
      // cards = JSON.parse(test!) ?? [];
      if(cards.length > 0){
        localStorage.setItem('cards', JSON.stringify(cards.concat(timeZoneC)));
      }else{
        localStorage.setItem('cards', JSON.stringify(timeZoneC));
      }  

    }
  }
// $: console.log(cards)
   $: {
    if (countNonEmptyItems === 3) {
      let timeZonesCopy: TimeZoneCard = { ...timeZones };
      if (!timeZoneC.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
        timeZoneC.push(timeZonesCopy);
        timeZoneCards.update((oldVal) => {
          if (!oldVal.some(item => JSON.stringify(item) === JSON.stringify(timeZonesCopy))) {
            oldVal.push(timeZonesCopy);
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



{#each cards as timeZone}
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







