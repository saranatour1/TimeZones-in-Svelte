import { writable, type Writable } from 'svelte/store';
interface TimeZoneCard {
  timeZone1: string;
  timeZone2: string;
  timeDif:string;
}


export const timeZoneSelect = writable({timeZone1:'' , timeZone2:'' , timeDif: '' });

export const timeZoneCards:Writable<TimeZoneCard[]> = writable([]);


