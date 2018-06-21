const request = require('request')
const moment = require('moment')
const chalk = require('chalk')

module.exports = function (vorpal) {
  vorpal
    .command('weather [location]')
    .alias('wt')
    .autocomplete(vorpal.config.weather.locations)
    .description('Get the weather forecast')
    .action(function (args, callback) {
      let location = args.location
      if (!location) {
        location = 'Rennes,fr'
      }
      const apikey = vorpal.config.weather.token

      const requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&mode=json&appid=${apikey}`
      this.log(requestUrl)

      request
        .get(requestUrl, (error, response, body) => {
          if (error) {
            return callback(error)
          }
          body = JSON.parse(body)

          const result = body.list.map(item => {
            const description = item.weather[0].description
            const isRainy = description.includes('rain')
            const descriptionColor = isRainy ? chalk.blue : chalk.white
            const dateTime = moment.unix(item.dt)
            const formattedDateTime = dateTime.format('dddd H') + 'h'
            const temperature = (item.main.temp - 273.15).toFixed(0)
            const temperatureColor = temperature <= 0 ? chalk.red : chalk.white
            return `${formattedDateTime}\t ${descriptionColor(description)}\t ${temperatureColor(temperature)}°`
          }).join('\n')

          callback(result)
        })
    })
}

/*
{
  "city": {
    "id": 4517009,
    "name": "London",
    "coord": {
      "lon": -83.44825,
      "lat": 39.886452
    },
    "country": "US",
    "population": 0,
    "sys": {
      "population": 0
    }
  },
  "cod": "200",
  "message": 0.1675,
  "cnt": 28,
  "list": [
    {
      "dt": 1485864000,
      "main": {
        "temp": 275.21,
        "temp_min": 274.873,
        "temp_max": 275.21,
        "pressure": 983.65,
        "sea_level": 1019.2,
        "grnd_level": 983.65,
        "humidity": 89,
        "temp_kf": 0.33
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 9.86,
        "deg": 260.002
      },
      "rain": {
        "3h": 0.235
      },
      "snow": {
        "3h": 0.0175
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-01-31 12:00:00"
    },
    {
      "dt": 1485874800,
      "main": {
        "temp": 275.28,
        "temp_min": 275.055,
        "temp_max": 275.28,
        "pressure": 985.98,
        "sea_level": 1021.47,
        "grnd_level": 985.98,
        "humidity": 90,
        "temp_kf": 0.22
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 88
      },
      "wind": {
        "speed": 10.87,
        "deg": 263.001
      },
      "rain": {
        "3h": 0.2
      },
      "snow": {
        "3h": 0.18
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-01-31 15:00:00"
    },
    {
      "dt": 1485885600,
      "main": {
        "temp": 275.62,
        "temp_min": 275.509,
        "temp_max": 275.62,
        "pressure": 987.65,
        "sea_level": 1022.97,
        "grnd_level": 987.65,
        "humidity": 91,
        "temp_kf": 0.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 92
      },
      "wind": {
        "speed": 10.82,
        "deg": 266.5
      },
      "rain": {
        "3h": 0.33
      },
      "snow": {
        "3h": 0.1425
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-01-31 18:00:00"
    },
    {
      "dt": 1485896400,
      "main": {
        "temp": 275.453,
        "temp_min": 275.453,
        "temp_max": 275.453,
        "pressure": 990.1,
        "sea_level": 1025.39,
        "grnd_level": 990.1,
        "humidity": 86,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 10.41,
        "deg": 270
      },
      "rain": {
        "3h": 0.09
      },
      "snow": {
        "3h": 0.0175
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-01-31 21:00:00"
    },
    {
      "dt": 1485907200,
      "main": {
        "temp": 274.595,
        "temp_min": 274.595,
        "temp_max": 274.595,
        "pressure": 993.01,
        "sea_level": 1028.62,
        "grnd_level": 993.01,
        "humidity": 82,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 64
      },
      "wind": {
        "speed": 8.41,
        "deg": 270
      },
      "rain": {
        "3h": 0.025
      },
      "snow": {
        "3h": 0.0125
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-01 00:00:00"
    },
    {
      "dt": 1485918000,
      "main": {
        "temp": 273.333,
        "temp_min": 273.333,
        "temp_max": 273.333,
        "pressure": 994.25,
        "sea_level": 1030.12,
        "grnd_level": 994.25,
        "humidity": 80,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 56
      },
      "wind": {
        "speed": 6.97,
        "deg": 269.501
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-01 03:00:00"
    },
    {
      "dt": 1485928800,
      "main": {
        "temp": 272.66,
        "temp_min": 272.66,
        "temp_max": 272.66,
        "pressure": 995.14,
        "sea_level": 1031.12,
        "grnd_level": 995.14,
        "humidity": 78,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 6.02,
        "deg": 263
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-01 06:00:00"
    },
    {
      "dt": 1485939600,
      "main": {
        "temp": 272.479,
        "temp_min": 272.479,
        "temp_max": 272.479,
        "pressure": 995.47,
        "sea_level": 1031.6,
        "grnd_level": 995.47,
        "humidity": 85,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13n"
        }
      ],
      "clouds": {
        "all": 92
      },
      "wind": {
        "speed": 5.46,
        "deg": 261.501
      },
      "rain": {},
      "snow": {
        "3h": 0.1125
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-01 09:00:00"
    },
    {
      "dt": 1485950400,
      "main": {
        "temp": 272.282,
        "temp_min": 272.282,
        "temp_max": 272.282,
        "pressure": 996.5,
        "sea_level": 1032.72,
        "grnd_level": 996.5,
        "humidity": 86,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13n"
        }
      ],
      "clouds": {
        "all": 92
      },
      "wind": {
        "speed": 5.58,
        "deg": 265.505
      },
      "rain": {},
      "snow": {
        "3h": 0.215
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-01 12:00:00"
    },
    {
      "dt": 1485961200,
      "main": {
        "temp": 272.762,
        "temp_min": 272.762,
        "temp_max": 272.762,
        "pressure": 998.41,
        "sea_level": 1034.49,
        "grnd_level": 998.41,
        "humidity": 86,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13d"
        }
      ],
      "clouds": {
        "all": 92
      },
      "wind": {
        "speed": 5.65,
        "deg": 273.001
      },
      "rain": {},
      "snow": {
        "3h": 0.035
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-01 15:00:00"
    },
    {
      "dt": 1485972000,
      "main": {
        "temp": 274.199,
        "temp_min": 274.199,
        "temp_max": 274.199,
        "pressure": 998.55,
        "sea_level": 1034.35,
        "grnd_level": 998.55,
        "humidity": 90,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": {
        "all": 32
      },
      "wind": {
        "speed": 4.86,
        "deg": 271.506
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-01 18:00:00"
    },
    {
      "dt": 1485982800,
      "main": {
        "temp": 274.967,
        "temp_min": 274.967,
        "temp_max": 274.967,
        "pressure": 998.2,
        "sea_level": 1033.91,
        "grnd_level": 998.2,
        "humidity": 80,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 4.36,
        "deg": 274
      },
      "rain": {},
      "snow": {
        "3h": 0.005
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-01 21:00:00"
    },
    {
      "dt": 1485993600,
      "main": {
        "temp": 272.842,
        "temp_min": 272.842,
        "temp_max": 272.842,
        "pressure": 999.19,
        "sea_level": 1035.18,
        "grnd_level": 999.19,
        "humidity": 78,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 92
      },
      "wind": {
        "speed": 2.87,
        "deg": 282.001
      },
      "rain": {
        "3h": 0.01
      },
      "snow": {
        "3h": 0.13
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-02 00:00:00"
    },
    {
      "dt": 1486004400,
      "main": {
        "temp": 270.669,
        "temp_min": 270.669,
        "temp_max": 270.669,
        "pressure": 999.88,
        "sea_level": 1036.11,
        "grnd_level": 999.88,
        "humidity": 85,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 56
      },
      "wind": {
        "speed": 3.02,
        "deg": 279.506
      },
      "rain": {},
      "snow": {
        "3h": 0.025
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-02 03:00:00"
    },
    {
      "dt": 1486015200,
      "main": {
        "temp": 270.717,
        "temp_min": 270.717,
        "temp_max": 270.717,
        "pressure": 1000.18,
        "sea_level": 1036.67,
        "grnd_level": 1000.18,
        "humidity": 88,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 88
      },
      "wind": {
        "speed": 3.41,
        "deg": 289.004
      },
      "rain": {},
      "snow": {
        "3h": 0.03
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-02 06:00:00"
    },
    {
      "dt": 1486026000,
      "main": {
        "temp": 270.339,
        "temp_min": 270.339,
        "temp_max": 270.339,
        "pressure": 1000.52,
        "sea_level": 1037.13,
        "grnd_level": 1000.52,
        "humidity": 84,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13n"
        }
      ],
      "clouds": {
        "all": 64
      },
      "wind": {
        "speed": 3.71,
        "deg": 289.005
      },
      "rain": {},
      "snow": {
        "3h": 0.065
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-02 09:00:00"
    },
    {
      "dt": 1486036800,
      "main": {
        "temp": 269.653,
        "temp_min": 269.653,
        "temp_max": 269.653,
        "pressure": 1001.98,
        "sea_level": 1038.78,
        "grnd_level": 1001.98,
        "humidity": 85,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13n"
        }
      ],
      "clouds": {
        "all": 56
      },
      "wind": {
        "speed": 3.49,
        "deg": 292.506
      },
      "rain": {},
      "snow": {
        "3h": 0.04
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-02 12:00:00"
    },
    {
      "dt": 1486047600,
      "main": {
        "temp": 270.464,
        "temp_min": 270.464,
        "temp_max": 270.464,
        "pressure": 1003.86,
        "sea_level": 1040.56,
        "grnd_level": 1003.86,
        "humidity": 86,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": {
        "all": 24
      },
      "wind": {
        "speed": 4.48,
        "deg": 291.001
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-02 15:00:00"
    },
    {
      "dt": 1486058400,
      "main": {
        "temp": 271.191,
        "temp_min": 271.191,
        "temp_max": 271.191,
        "pressure": 1004.38,
        "sea_level": 1040.82,
        "grnd_level": 1004.38,
        "humidity": 85,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 48
      },
      "wind": {
        "speed": 5.41,
        "deg": 298.005
      },
      "rain": {},
      "snow": {
        "3h": 0.005
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-02 18:00:00"
    },
    {
      "dt": 1486069200,
      "main": {
        "temp": 271.279,
        "temp_min": 271.279,
        "temp_max": 271.279,
        "pressure": 1005.19,
        "sea_level": 1041.55,
        "grnd_level": 1005.19,
        "humidity": 79,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 6.02,
        "deg": 293.002
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-02 21:00:00"
    },
    {
      "dt": 1486080000,
      "main": {
        "temp": 268.193,
        "temp_min": 268.193,
        "temp_max": 268.193,
        "pressure": 1006.95,
        "sea_level": 1043.85,
        "grnd_level": 1006.95,
        "humidity": 69,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 4.51,
        "deg": 296.501
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-03 00:00:00"
    },
    {
      "dt": 1486090800,
      "main": {
        "temp": 266.021,
        "temp_min": 266.021,
        "temp_max": 266.021,
        "pressure": 1007.79,
        "sea_level": 1044.98,
        "grnd_level": 1007.79,
        "humidity": 68,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "clouds": {
        "all": 20
      },
      "wind": {
        "speed": 3.61,
        "deg": 309.5
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-03 03:00:00"
    },
    {
      "dt": 1486101600,
      "main": {
        "temp": 264.516,
        "temp_min": 264.516,
        "temp_max": 264.516,
        "pressure": 1008.3,
        "sea_level": 1045.77,
        "grnd_level": 1008.3,
        "humidity": 71,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "clouds": {
        "all": 20
      },
      "wind": {
        "speed": 2.18,
        "deg": 304.501
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-03 06:00:00"
    },
    {
      "dt": 1486112400,
      "main": {
        "temp": 264.055,
        "temp_min": 264.055,
        "temp_max": 264.055,
        "pressure": 1008.58,
        "sea_level": 1046.23,
        "grnd_level": 1008.58,
        "humidity": 74,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "clouds": {
        "all": 44
      },
      "wind": {
        "speed": 1.39,
        "deg": 305.505
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-03 09:00:00"
    },
    {
      "dt": 1486123200,
      "main": {
        "temp": 264.414,
        "temp_min": 264.414,
        "temp_max": 264.414,
        "pressure": 1009.1,
        "sea_level": 1046.88,
        "grnd_level": 1009.1,
        "humidity": 72,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 64
      },
      "wind": {
        "speed": 1.3,
        "deg": 315.001
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2017-02-03 12:00:00"
    },
    {
      "dt": 1486134000,
      "main": {
        "temp": 266.384,
        "temp_min": 266.384,
        "temp_max": 266.384,
        "pressure": 1009.85,
        "sea_level": 1047.2,
        "grnd_level": 1009.85,
        "humidity": 79,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": {
        "all": 32
      },
      "wind": {
        "speed": 1.96,
        "deg": 196
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-03 15:00:00"
    },
    {
      "dt": 1486144800,
      "main": {
        "temp": 269.234,
        "temp_min": 269.234,
        "temp_max": 269.234,
        "pressure": 1008.08,
        "sea_level": 1044.95,
        "grnd_level": 1008.08,
        "humidity": 95,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": {
        "all": 24
      },
      "wind": {
        "speed": 2.07,
        "deg": 245.001
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-03 18:00:00"
    },
    {
      "dt": 1486155600,
      "main": {
        "temp": 270.756,
        "temp_min": 270.756,
        "temp_max": 270.756,
        "pressure": 1006.33,
        "sea_level": 1042.84,
        "grnd_level": 1006.33,
        "humidity": 82,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": {
        "all": 48
      },
      "wind": {
        "speed": 2.07,
        "deg": 275.502
      },
      "rain": {},
      "snow": {},
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2017-02-03 21:00:00"
    }
  ]
}
 */