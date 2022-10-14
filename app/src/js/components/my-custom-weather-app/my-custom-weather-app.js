/**
 * The my custom app script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

//  import { ConverterHandler } from '../../../../energy-price-module/src/converterHandler'
import { Converter } from '../../../../../unit-converter-module/src/converter'

const converter = new Converter()

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
     .container {
       background-color: #ffffff;
       padding: 20px 50px 50px 50px;
       border-radius: 10px;
       max-width: 1200px;
       font-size: 1em;
       color: #1d1d1d;
     }

     .my-custom-wrapper {
       position: relative;
     }

     .my-custom-question {
       width: 100%;
       top: 32%;
       font-size: 1.2em;
     }

     input {
       padding: 15px;
       border-radius: 5px;
       border: solid 1px #1d1d1d;
       font-size: 1em;
     }

     #headline {
      color: #dadada;
     }

     #location {
      font-size: 2.5em;
      margin-top: -30px;
      margin-bottom: -20px;
     }

     #latitude-longitude {
      font-size: 0.8em;
     }

     #weather-img {
      filter: drop-shadow(0 0 0.5rem #bababa);
     }

     .show-answer-button {
       cursor: pointer;
       margin-top: 20px;
       background-color: #1d1d1d;
       color: #ffffff;
       font-size: 0.8em;
       text-transform: uppercase;
       letter-spacing: 1px;
       padding: 18px 30px;
       border-radius: 5px;
       border: none;
     }

     .show-answer-button:hover {
      box-shadow: #1d1d1d 0 10px 40px -10px;
      -webkit-transition: all 0.3s;
       -o-transition: all 0.3s;
       transition: all 0.3s;
     }

   </style>

   <div class="container">
    <h1 id="headline">How's the weather today?</h1>
     <div class ="my-custom-wrapper">
     <div class ="my-custom-weather">
        <h2 id="location"></h2>
        <!-- <div id="weather-img"></div> -->
        <p id="latitude-longitude"></p>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" id="weather-img"> 
        <p id="description"></p>
        <p id="temperature"></p>
      </div>
      <form>
        <input type="text" id="location-name" name="location-name" placeholder="Write a city" value="Stockholm" required autofocus/>
        <button class="show-answer-button">Search weather</button>
      </form>
     </div>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-custom-weather-app',
  /**
   *
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.locationTextField = this.shadowRoot.querySelector('#location-name')
      this.weatherImg = this.shadowRoot.querySelector('#weather-img')
      this.locationOutprint = this.shadowRoot.querySelector('#location')
      this.latitudeLongitude = this.shadowRoot.querySelector('#latitude-longitude')
      this.description = this.shadowRoot.querySelector('#description')
      this.temperature = this.shadowRoot.querySelector('#temperature')
      this.showAnswerButton = this.shadowRoot.querySelector('.show-answer-button')

      this.showAnswerButton.addEventListener('click', (event) => {
        event.preventDefault()
        this.getWeather()
      })

      this.api_key = 'a6533ce007aa11cf448d02673c8c8a8f'
      this.weatherUrlImg = 'http://openweathermap.org/img/wn/'
      // this.weatherImg = '10d@2x.png'

      this.getWeather()
    }

    /**
     * Retrieve weather from API.
     * https://openweathermap.org/api.
     *
     */
    async getWeather () {
      let data = ''
      try {
        data = await window.fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.locationTextField.value}&appid=${this.api_key}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        })
        data = await data.json()
        console.log(data)
        console.log(data.list[0].main.temp)
        console.log(this.locationTextField.value)
        console.log(converter.kelvinToCelsius(Number(data.list[0].main.temp)))
        console.log(this.weatherUrlImg + data.list[0].weather[0].icon)

        this.locationOutprint.textContent = data.city.name
        this.latitudeLongitude.textContent = `Latitude: ${data.city.coord.lat}, Longitude: ${data.city.coord.lon}`
        this.weatherImg.src = this.weatherUrlImg + data.list[0].weather[0].icon + '@2x.png'
        this.description.textContent = `Description: ${data.list[0].weather[0].description}`
        this.temperature.textContent = `Temperature: ${converter.kelvinToCelsius(data.list[0].main.temp)} Celsius, ${converter.kelvinToFarenheit(data.list[0].main.temp)} Farenheit, ${data.list[0].main.temp} Kelvin`
      } catch (error) {
        console.log(error)
        console.log(data.message)
        if (data.cod === '404') {
          this.locationOutprint.textContent = data.message
          this.latitudeLongitude.textContent = 'Where am I?'
          this.temperature.textContent = 'Temperature: ?'
        } else {
          this.temperature.textContent = 'Something went wrong... try again later!'
        }
      }
    }
  }
)
