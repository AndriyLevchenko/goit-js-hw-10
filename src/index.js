import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const inputNameCountry = document.querySelector('#search-box');
console.log(inputNameCountry);

inputNameCountry.addEventListener('input', onSearch);

function onSearch (e) {
    e.preventDefault();
    const entry = inputNameCountry.value;
    if(entry.length === 1) {
        Notify.info(
            `Too many matches found. Please enter a more specific name.`
        );
    }
    console.log(entry);
    
    fetchCountries(entry)
    .then(renderCountryCard)
    .catch(onFetchError)
    // .finally(() => url.reset());
}

function renderCountryCard(country) {
    const marcup = country.map(({flags, altSpellings, capital, population, languages}) => {
    if(country.length > 1) {
        return `
        <div class="card-svg" style = "display: flex">
            <img src="${flags.svg}" alt="${altSpellings[1]}" style = "margin: 1px 0px 1px 15px; width: 3%;">
            <p class="card-title" style = "margin: 0px 0px 0px 10px">${altSpellings[1]}</p>
        </div>
        `
    } else {
        return `
        <div class="card" style = "border: solid; width: 300px">
            <div class="card-svg" style = "display: flex">
                <img src="${flags.svg}" alt="${altSpellings[1]}" style = "margin-left: 15px; width: 30px">
                <h2 class="card-title" style = "margin-left: 10px">${altSpellings[1]}</h2>
            </div>
            <div class="card-description" style = "margin-left: 15px">
                <p class="card-text">Capital: ${capital}</p>
                <p class="card-text">Population: ${population}</p>
                <p class="card-text">Languages: ${Object.values(languages)}</p>
            </div>
        </div>
        `
    }
    
    }).join('');
    countryInfo.innerHTML = marcup;
    console.log(country);
    // console.log(marcup);
}

function onFetchError (error) {
    Notify.failure(
        `Oops, there is no country with that name`
      );
}

const DEBOUNCE_DELAY = 300;



// Створення та рендер розмітки

