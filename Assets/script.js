
const APIkey = '44f16f0f5b78c42ed94c3a20683882d4';
let city = 'Seattle';
let searchHistory = [];

const weatherForecastEl = document.querySelector('.weatherForecast');
const weatherDetails = document.querySelector('.weatherDetails');

const searchBtn = document.querySelector('.search');
searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const inputValue = document.querySelector('.textVal')

  const cityInput = inputValue.value.trim();
  if (!cityInput) {
    return;
  }
  city = cityInput;
  searchHistory.push(city);
  localStorage.setItem('city', JSON.stringify(searchHistory));
  weatherForecastEl.innerHTML = '';
  getForecastToday();
  getSearchHistory();
});

function getweatherForecast() {
  const getweatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIkey}`;

  fetch(getweatherForecastURL)
    .then((response) => response.json())
    .then((data) => {
      const weekArray = data.list.filter((value) => value.dt_txt.split(' ')[1] === '15:00:00');
      weekArray.forEach((value) => {
        const { dt_txt: dateText, main, weather } = value;
        const currentDate = dateText.split(' ')[0];
        const time = dateText.split(' ')[1];
        const icon = weather[0].icon;
        const humidity = main.humidity;

        const divElCard = document.createElement('div');
        divElCard.classList.add('card', 'text-white', 'mb-3', 'cardOne');
        divElCard.setAttribute('style', 'max-width: 200px;');
        weatherForecastEl.appendChild(divElCard);

        const divElHeader = document.createElement('div');
        divElHeader.classList.add('cardHeader');
        const m = moment(currentDate).format('MM/DD/YYYY');
        divElHeader.textContent = m;
        divElCard.appendChild(divElHeader);

        const divElBody = document.createElement('div');
        divElBody.classList.add('cardBody');
        divElCard.appendChild(divElBody);

        const divElIcon = document.createElement('img');
        divElIcon.classList.add('weatherIcons');
        divElIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
        divElBody.appendChild(divElIcon);

        const pElTemperature = document.createElement('p');
        pElTemperature.textContent = `Temperature: ${main.temp} °F`;
        divElBody.appendChild(pElTemperature);

        const pElFeelsLike = document.createElement('p');
        pElFeelsLike.textContent = `Feels Like: ${main.feels_like} °F`;
        divElBody.appendChild(pElFeelsLike);

        const pElHumidity = document.createElement('p');
        pElHumidity.textContent = `Humidity: ${humidity} %`;
        divElBody.appendChild(pElHumidity);
      });
    });
}

function getForecastToday() {
  const getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;

  weatherDetails.innerHTML = '';

  fetch(getUrlCurrent)
    .then((response) => response.json())
    .then((data) => {
      const { name, main, coord, weather, wind } = data;
      const currentDate = moment().format('dddd, MMMM Do YYYY');
      const icon = weather[0].icon;
      const humidity = main.humidity;
	});
}

if (searchHistoryStore !== null) {
	searchHistory = searchHistoryStore;
  }

  getSearchHistory();
  getForecastToday();
  

  sampleCity();
  

  function getSearchHistory() {
	
	const searchHistoryClickify = $('.searchHistory');
  
	searchHistoryClickify.empty();
  

	for (const history of searchHistory) {

	  const rowEl = $('<div>');
	  const btnEl = $('<button>').text(`${history}`);
  
	  rowEl.addClass('row histBtnRow');
	  btnEl.addClass('btn btn-outline-secondary btn-block histBtn');
	  btnEl.attr('type', 'button');
  
	  // Append the new history button to the search history container
	  rowEl.append(btnEl);
	  searchHistoryClickify.prepend(rowEl);
	}
  
	// If no city is selected, exit the function
	if (!city) {
	  return;
	}
  
	// Add click event listeners to the history buttons
	$('.histBtn').on("click", function (event) {
	  event.preventDefault();
	  city = $(this).text();
	  weatherForecastEl.empty();
	  getForecastToday();
	});
  }
  
