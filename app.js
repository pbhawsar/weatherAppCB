const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const getWeather = require('./weather/weather');
const argv = yargs
    .options({
        a: {
            alias: 'address',
            demand: true,
            describe: 'address to fetch weather information.',
            string: true,

        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log('argv folder', argv);


geocode.geocode(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {

        console.log(`address  ${results.address}`);
        //console.log(`longitude is ${results.longitude} and latitude is ${results.latitude}`)
        getWeather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Todays temperature is ${results}`);
            }
        });
    }
});