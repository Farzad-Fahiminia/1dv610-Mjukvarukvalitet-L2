/**
 * The my custom app script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import '../my-custom-weather-app/index.js'
import '../my-custom-temp-converter-app/index.js'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
     .container {
     }

     .weather-element,
     .converter-element {
      display: none;
     }

     .weather-element,
     .converter-element {
        margin-bottom: 30px;
      }

   </style>

   <div class="container">

    <div class="weather-element">
      <my-custom-weather-app id="weather"></my-custom-weather-app>
    </div>
    <div class="converter-element">
      <my-custom-converter-app id="converter"></my-custom-converter-app>
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

      this.weatherApp = document.querySelector('#weather')
      this.unitConverterApp = document.querySelector('#converter')

      this.weatherLiElement = document.querySelector('#weather-li')
      this.unitConverterLiElement = document.querySelector('#converter-li')

      this.weatherElement = this.shadowRoot.querySelector('.weather-element')
      this.unitConverterElement = this.shadowRoot.querySelector('.converter-element')

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

      console.log(this.weatherApp)
      console.log(this.unitConverterApp)
    }

    /**
     * Window for application.
     *
     */
    weatherWindow () {
      try {
        this.unitConverterElement.style.display = 'none'
        this.weatherElement.style.display = 'block'

        this.weatherLiElement.classList.add('isActive')
        this.unitConverterLiElement.classList.remove('isActive')
      } catch (error) {
        throw Error
      }
    }

    /**
     * Window for application.
     *
     */
    converterWindow () {
      try {
        this.weatherElement.style.display = 'none'
        this.unitConverterElement.style.display = 'block'

        this.weatherLiElement.classList.remove('isActive')
        this.unitConverterLiElement.classList.add('isActive')
      } catch (error) {
        throw Error
      }
    }
  }
)
