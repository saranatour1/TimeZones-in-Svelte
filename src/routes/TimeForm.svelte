<script lang='ts'>
	import Selection from "./Selection.svelte";
  import { timeZoneSelect } from './store';

  const countries = Intl.supportedValuesOf('timeZone');

	let filteredCountries:string[] ;

  const filterCountries = () => {
		let storageArr:string[] = [];
		if (inputValue) {
			countries.forEach(country => {
				if (country.toLowerCase().includes(inputValue.toLowerCase())) {
					storageArr = [...storageArr, makeMatchBold(country)];
				}
			});
		}	
		filteredCountries = storageArr;
	}	

	let searchInput: HTMLInputElement; // use with bind:this to focus element
	let inputValue : string = "";
	
	$: if (!inputValue) {
		filteredCountries = [];
		hiLiteIndex = null;
	}

	const clearInput = () => {
		inputValue = "";	
		searchInput.focus();
	}

	$: timeZones ={timeZone1:'' , timeZone2:'' , timeDif:''};
    timeZoneSelect.subscribe((oldVal) => timeZones = oldVal);

	const setInputVal = (countryName:string) => {
		inputValue = removeBold(countryName);
		filteredCountries = [];
		hiLiteIndex = null;
		(document.querySelector('#country-input') as HTMLElement)?.focus();
	}	

	const timeZoneDifference = async (timeZone1:string, timeZone2:string) => {
  	const time = new Date();
  	const firstTime = new Date(time.toLocaleString('en-US', { timeZone: timeZone1 })).getTime();
  	const secondTime = new Date(time.toLocaleString('en-US', { timeZone: timeZone2 })).getTime();

  	const timeDiffMilliseconds = firstTime - secondTime;
  	const timeDiffMinutes = Math.abs(timeDiffMilliseconds) / (1000 * 60);
  
  	const hours = Math.floor(timeDiffMinutes / 60);
		const days = Math.floor(hours % 24);
  	const minutes = Math.floor(timeDiffMinutes % 60);

  	const timeDiff = {
    	hours: hours,
    	minutes: minutes,
			days: days,
  	};
	
	let msg:string; 
	if (timeDiffMilliseconds > 0) {
		msg = `Time zone ${timeZone1} is ahead of ${timeZone2} by ${hours} hours and ${minutes} minutes.`; 
	} else if (timeDiffMilliseconds < 0) {
		msg = `Time zone ${timeZone1} is ahead of ${timeZone2} by ${hours} hours and ${minutes} minutes.`; 
	} else {
		msg = `The two time zones are in sync.`; 
	}

	timeZoneSelect.update((oldVal) => {
			oldVal.timeDif = msg;
		return oldVal
	});
	}

	const checkForTime = (input:string) => {
  	if (Object.keys(timeZones).length === 0 || timeZones['timeZone1'] ==='') {
    	timeZones['timeZone1'] = input;
    		timeZoneSelect.update(oldVal => {
      		oldVal.timeZone1 = input;
      	return oldVal;
  		});
  	} else if (!timeZones['timeZone2']) {
    timeZones['timeZone2'] = input;
		timeZoneDifference(timeZones?.timeZone1, timeZones?.timeZone2);
			timeZoneSelect.update(oldVal => {
      	oldVal.timeZone2 = input;
      	return oldVal;
    	});
  	}
	};

	const submitValue = () => {
		checkForTime(inputValue);
		if (inputValue.trim()) {
			console.log(`${inputValue} is submitted!`);
			setTimeout(clearInput, 500);
		} else {
			alert("You didn't type anything.")
		}
	}

	const makeMatchBold = (str:string) => {
		let matched = str.substring(0, inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	}

	const removeBold = (str:string) => {
		//replace < and > all characters between
		return str?.replace(/<(.)*?>/g, "");
		// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
	}

	let hiLiteIndex:number|null = null;
	$: hiLitedCountry = filteredCountries[hiLiteIndex ?? 0]; 

	const navigateList = (e : KeyboardEvent) => {
		if (e.key === "ArrowDown" && hiLiteIndex! <= filteredCountries.length-1) {
			hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
		} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
			hiLiteIndex === 0 ? hiLiteIndex = filteredCountries.length-1 : hiLiteIndex -= 1
		} else if (e.key === "Enter") {
			setInputVal(filteredCountries[hiLiteIndex!]);
		} else {
			return;
		}
	}
</script>

  <svelte:window on:keydown={navigateList} />
	<section class="mt-5">
  	<form autocomplete="off" on:submit|preventDefault={submitValue}>
    	<input id="country-input" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
			  		placeholder="enter which time Zone you need" 
						bind:this={searchInput} 
						bind:value={inputValue}   
						on:input={filterCountries} 
			/>
  		<input type="submit" />
  	</form>
		{#if filteredCountries.length > 0}
			<ul id="autocomplete-items-list">
				{#each filteredCountries as country,i}
					<Selection 
						itemLabel={country} 
						highlighted={i === hiLiteIndex} 
						on:click={() => setInputVal(country)} 
					/>
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

/* Button styles */
input[type=submit] {
  background-color: plum;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type=submit]:hover {
  background-color: #4db6ac; 
}

input[type=submit]:focus,
input[type=submit]:active {
  outline: none; 
  box-shadow: 0 0 5px rgba(77, 182, 172, 0.7); 
}
</style>