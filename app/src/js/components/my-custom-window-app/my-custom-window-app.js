/**
 * The my custom app script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import '../my-custom-home-app/index.js'
import '../my-custom-weather-app/index.js'
import '../my-custom-temp-converter-app/index.js'
import '../my-custom-calculator-app/index.js'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
     .container {
      /* background-color: #1d1d1d; */
      width: 100%;
      height: 500px;
     }

     .weather-element,
     .converter-element,
     .calculator-element {
      display: none;
     }

     .home-element,
     .weather-element,
     .converter-element {
        margin-bottom: 30px;
      }

   </style>

   <div class="container">

    <div class="home-element">
      <my-custom-home-app id="home"></my-custom-home-app>
    </div>
    <div class="weather-element">
      <my-custom-weather-app id="weather"></my-custom-weather-app>
    </div>
    <div class="converter-element">
      <my-custom-converter-app id="converter"></my-custom-converter-app>
    </div>
    <div class="calculator-element">
      <my-custom-calculator-app id="calculator"></my-custom-calculator-app>
    </div>

   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-custom-window-app',
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

      this.homeApp = document.querySelector('#home')
      this.weatherApp = document.querySelector('#weather')
      this.unitConverterApp = document.querySelector('#converter')
      this.calculatorApp = document.querySelector('#calculator')

      this.homeLiElement = document.querySelector('#home-li')
      this.weatherLiElement = document.querySelector('#weather-li')
      this.unitConverterLiElement = document.querySelector('#converter-li')
      this.calculatorLiElement = document.querySelector('#calculator-li')

      this.homeElement = this.shadowRoot.querySelector('.home-element')
      this.weatherElement = this.shadowRoot.querySelector('.weather-element')
      this.unitConverterElement = this.shadowRoot.querySelector('.converter-element')
      this.calculatorElement = this.shadowRoot.querySelector('.calculator-element')

      this.homeApp.addEventListener('click', (event) => {
        event.preventDefault()
        this.homeWindow()
        console.log('Click on home')
        // this.unitConverterElement.style.display = 'none'
        // this.weatherElement.style.display = 'block'
      })

      this.weatherApp.addEventListener('click', (event) => {
        event.preventDefault()
        this.weatherWindow()
        console.log('Click on weather')
        // this.unitConverterElement.style.display = 'none'
        // this.weatherElement.style.display = 'block'
      })

      this.unitConverterApp.addEventListener('click', (event) => {
        event.preventDefault()
        this.converterWindow()
        console.log('Click on converter')
        // this.weatherElement.style.display = 'none'
        // this.unitConverterElement.style.display = 'block'
      })

      this.calculatorApp.addEventListener('click', (event) => {
        event.preventDefault()
        this.calculatorWindow()
        console.log('Click on calculator')
        // this.weatherElement.style.display = 'none'
        // this.unitConverterElement.style.display = 'block'
      })

      console.log(this.weatherApp)
      console.log(this.unitConverterApp)
    }

    /**
     * Window for home.
     *
     */
    homeWindow () {
      try {
        this.homeElement.style.display = 'block'
        this.weatherElement.style.display = 'none'
        this.unitConverterElement.style.display = 'none'
        this.calculatorElement.style.display = 'none'

        this.weatherLiElement.classList.add('isActive')
        this.weatherLiElement.classList.remove('isActive')
        this.unitConverterLiElement.classList.remove('isActive')
        this.calculatorLiElement.classList.remove('isActive')
      } catch (error) {
        throw Error
      }
    }

    /**
     * Window for weather.
     *
     */
    weatherWindow () {
      try {
        this.homeElement.style.display = 'none'
        this.weatherElement.style.display = 'block'
        this.unitConverterElement.style.display = 'none'
        this.calculatorElement.style.display = 'none'

        this.weatherLiElement.classList.remove('isActive')
        this.weatherLiElement.classList.add('isActive')
        this.unitConverterLiElement.classList.remove('isActive')
        this.calculatorLiElement.classList.remove('isActive')
      } catch (error) {
        throw Error
      }
    }

    /**
     * Window for converter.
     *
     */
    converterWindow () {
      try {
        this.homeElement.style.display = 'none'
        this.weatherElement.style.display = 'none'
        this.unitConverterElement.style.display = 'block'
        this.calculatorElement.style.display = 'none'

        this.weatherLiElement.classList.remove('isActive')
        this.weatherLiElement.classList.remove('isActive')
        this.unitConverterLiElement.classList.add('isActive')
        this.calculatorLiElement.classList.remove('isActive')
      } catch (error) {
        throw Error
      }
    }

    /**
     * Window for calculator.
     *
     */
    calculatorWindow () {
      try {
        this.homeElement.style.display = 'none'
        this.weatherElement.style.display = 'none'
        this.unitConverterElement.style.display = 'none'
        this.calculatorElement.style.display = 'block'

        this.weatherLiElement.classList.remove('isActive')
        this.weatherLiElement.classList.remove('isActive')
        this.unitConverterLiElement.classList.remove('isActive')
        this.calculatorLiElement.classList.add('isActive')
      } catch (error) {
        throw Error
      }
    }
  }
)
