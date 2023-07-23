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

  $: cards = [];
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

  const test = async () => {
    if (browser) {
      localStorage.setItem('cards', JSON.stringify(timeZoneC));
    }
  }
$: console.log(cards)
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
      timeZoneSelect.set({ timeZone1: '', timeZone2: '', timeDif: '' });
    }
    test();
    console.log(cards);
  }

  $: console.log('timeZones array', timeZoneC);
  $: console.log('timeZones object', timeZones);
</script>


{#if cards}
  {#each cards as card}
    {#each card as item,index }
      {item[index]}
    {/each}
  {/each}
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







