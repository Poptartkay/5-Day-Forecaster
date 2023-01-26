var city ='Seattle'
var APIkey ='44f16f0f5b78c42ed94c3a20683882d4';
var currentDate = moment().format('dddd, MMMM Do YYYY');
var searchHistory = [];
$('.search').on("click", function(event){
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('textVal').val().trim();
    if(city === "") {return;}
    searchHistory.push(city);
    localStorage.setItem('city', JSON.stringify(searchHistory));
    weatherForecastEl.empty();
    getForecastToday();
    getSearchHistory();
});
var weatherForecastEl = $('.weatheForecast');