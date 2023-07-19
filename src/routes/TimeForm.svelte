<script>
// @ts-nocheck

	import { onMount } from "svelte";

// @ts-nocheck

	import Selection from "./Selection.svelte";
  import { timeZoneSelect } from './store.ts'

  const countries = Intl.supportedValuesOf('timeZone');
	// console.log(countries)

  // @ts-ignore
  /**
	 * @type {string | any[]}
	 */
  let filteredCountries = [];

  const filterCountries = () => {
	// @ts-ignore
	let storageArr = [];
	if (inputValue) {
		countries.forEach(country => {
			 if (country.toLowerCase().includes(inputValue.toLowerCase())) {
				 // @ts-ignore
				 storageArr = [...storageArr, makeMatchBold(country)];
			 }
		});
	}
	// @ts-ignore
	filteredCountries = storageArr;
}	

// @ts-ignore
let searchInput; // use with bind:this to focus element
let inputValue = "";
	
$: if (!inputValue) {
	filteredCountries = [];
	hiLiteIndex = null;
}

const clearInput = () => {
	inputValue = "";	
	// @ts-ignore
  // timeZoneSelect.set('');
	searchInput.focus();
}

$: timeZones ={};
  timeZoneSelect.subscribe((oldVal) => timeZones = oldVal);

	// I woking here
// clear the objects 
// const clearTimeZones = () =>{
// 	if(timeZones.length === 2){
// 		timeZoneSelect.set({});
// 	}
// }

// @ts-ignore
const setInputVal = (countryName) => {
  // timeZoneSelect.set(inputValue);
  timeZoneSelect.subscribe(oldVal =>console.log( 'this is our old val', oldVal))
  // console.log('this is old value', )
	inputValue = removeBold(countryName);
	filteredCountries = [];
	hiLiteIndex = null;
	// @ts-ignore
	document.querySelector('#country-input').focus();
}	



// @ts-ignore



const checkForTime = (input) => {
  if (Object.keys(timeZones).length === 0) {
    timeZones['timeZone1'] = input;
    timeZoneSelect.update(oldVal => {
      oldVal.timeZone1 = input;
      return oldVal;
    });
  } else if (!timeZones['timeZone2']) {
    timeZones['timeZone2'] = input;
		console.log(timeZones , 'here')
    timeZoneSelect.update(oldVal => {
      oldVal.timeZone2 = input;
      return oldVal;
    });
  }
};



$:console.log(timeZones, 'i am here')
const submitValue = () => {
	checkForTime(inputValue);
  // timeZoneSelect.update((oldVal) => oldVal);
	if (inputValue) {
		console.log(`${inputValue} is submitted!`);
		setTimeout(clearInput, 1000);
	} else {
		alert("You didn't type anything.")
	}
}



// @ts-ignore
const makeMatchBold = (str) => {
	// replace part of (country name === inputValue) with strong tags
	let matched = str.substring(0, inputValue.length);
	let makeBold = `<strong>${matched}</strong>`;
	let boldedMatch = str.replace(matched, makeBold);
	return boldedMatch;
}

// @ts-ignore
const removeBold = (str) => {
	//replace < and > all characters between
	return str?.replace(/<(.)*?>/g, "");
	// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
}

// @ts-ignore
/**
	 * @type {number | null}
	 */
let hiLiteIndex = null;
//$: console.log(hiLiteIndex);	
$: hiLitedCountry = filteredCountries[hiLiteIndex]; 

// @ts-ignore
const navigateList = (e) => {
	// @ts-ignore
	if (e.key === "ArrowDown" && hiLiteIndex <= filteredCountries.length-1) {
		// @ts-ignore
		hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
	// @ts-ignore
	} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
		// @ts-ignore
		hiLiteIndex === 0 ? hiLiteIndex = filteredCountries.length-1 : hiLiteIndex -= 1
	} else if (e.key === "Enter") {
		// @ts-ignore
		setInputVal(filteredCountries[hiLiteIndex]);
	} else {
		return;
	}
}

</script>

  <svelte:window on:keydown={navigateList} />
<section class="mt-5">

  <form autocomplete="off" on:submit|preventDefault={submitValue}>
    <input id="country-input" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"  placeholder="enter which time Zone you need" bind:this={searchInput} bind:value={inputValue}   on:input={filterCountries} on:keydown={(e)=>console.log(e.key)}/>
  <input type="submit" />
  </form>

	{#if filteredCountries.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredCountries as country,i}
      <Selection itemLabel={country} highlighted={i === hiLiteIndex} on:click={() => setInputVal(country)} />
  			{/each}			
		</ul>
	{/if}




</section>

<style>
  input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
	margin: 0;
}

input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
}

input[type=submit]:hover{
  cursor: pointer;
}
</style>