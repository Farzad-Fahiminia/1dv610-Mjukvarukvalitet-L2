/**
 * The my custom app script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
   <style>
     .container {
       /* background-color: #ffffff;
       max-width: 1000px;
       font-size: 1em;
       color: #1d1d1d; */
       /* background-color: #ffffff1f; */
       /* backdrop-filter: blur(10px); */
       padding: 20px 20px 0.5px 20px;
       border-radius: 5px;
       /* box-shadow: rgba(255, 255, 255, 0.3) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.45) 0px 50px 100px -20px, rgba(0, 0, 0, 0.7) 0px 30px 60px -30px; */
     }

     #home-title {
      margin-top: 30px;
      font-size: 10em;
      line-height: 0.9em;
      color: #fff;
     }

   </style>

   <div class="container">
    <h1 id="home-title">Welcome<br>to the <i>weather</i><br>application</h1>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-custom-home-app',
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
