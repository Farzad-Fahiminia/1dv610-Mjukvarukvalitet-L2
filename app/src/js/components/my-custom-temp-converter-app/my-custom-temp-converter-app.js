/**
 * The my custom app script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { Converter } from '../../../../../unit-converter-module/src/converter'

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
       max-width: 1000px;
       font-size: 1em;
       color: #1d1d1d;
       box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
     }

     .my-custom-wrapper {
       position: relative;
     }

     input,
     select {
       padding: 15px;
       border-radius: 5px;
       border: solid 1px #1d1d1d;
       font-size: 1em;
     }

     #headline {
      color: #dadada;
     }

     #convert-result,
     #convert-result-unit {
      font-size: 2.5em;
     }

     .convert-button {
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

     .convert-button:hover {
      box-shadow: #1d1d1d 0 10px 40px -10px;
      -webkit-transition: all 0.3s;
       -o-transition: all 0.3s;
       transition: all 0.3s;
     }

   </style>

   <div class="container">
    <h1 id="headline">Convert temperature units!</h1>
     <div class ="my-custom-wrapper">
     <div class ="my-custom-converter">
        <span id="convert-result"></span><span id="convert-result-unit"></span>
      </div>
      <form>
        <input type="text" id="converter-name" name="converter-name" value="15" placeholder="Write a temperature" required/>

        <label for="unit" hidden>Choose what unit to convert:</label>
        <select name="unit" id="unit">
          <option value="celsiusToFahrenheit">Celsius to Fahrenheit</option>
          <option value="celsiusToKelvin">Celsius to Kelvin</option>
          <option value="fahrenheitToCelsius">Fahrenheit to Celsius</option>
          <option value="fahrenheitToKelvin">Fahrenheit to Kelvin</option>
          <option value="kelvinToCelsius">Kelvin to Celsius</option>
          <option value="kelvinToFahrenheit">Kelvin to Fahrenheit</option>
        </select>

        <button class="convert-button">Convert</button>
      </form>
     </div>
   </div>
 `

/**
 * Define custom element.
 */
customElements.define('my-custom-converter-app',
  /**
   *
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.converter = new Converter()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.resultOutprint = this.shadowRoot.querySelector('#convert-result')
      this.resultUnitOutprint = this.shadowRoot.querySelector('#convert-result-unit')
      this.chooseUnitToConvert = this.shadowRoot.querySelector('#unit')
      this.convertTextField = this.shadowRoot.querySelector('#converter-name')
      this.convertButton = this.shadowRoot.querySelector('.convert-button')

      this.convertButton.addEventListener('click', (event) => {
        event.preventDefault()
        this.convertUnit()
      })

      this.convertUnit()
    }

    /**
     * Converts numbers to other units.
     *
     */
    convertUnit () {
      try {
        // console.log('CONVERT', this.converter.kelvinToFahrenheit(Number(this.convertTextField.value)))
        console.log(this.convertTextField.value.length)

        const celsiusUnit = ' <span>&#8451;</span>'
        const fahrenheitUnit = ' <span>&#8457;</span>'
        const kelvinUnit = ' <span>&#8490;</span>'

        this.resultOutprint.innerHTML = ''
        this.resultUnitOutprint.innerHTML = ''

        if (this.convertTextField.value.length === 0) {
          throw Error()
        }

        if (this.chooseUnitToConvert.value === 'celsiusToFahrenheit') {
          this.resultOutprint.append(this.converter.celsiusToFahrenheit(Number(this.convertTextField.value)))

          this.resultUnitOutprint.innerHTML = fahrenheitUnit
        } else if (this.chooseUnitToConvert.value === 'celsiusToKelvin') {
          this.resultOutprint.textContent = this.converter.celsiusToKelvin(Number(this.convertTextField.value))

          this.resultUnitOutprint.innerHTML = kelvinUnit
        } else if (this.chooseUnitToConvert.value === 'fahrenheitToCelsius') {
          this.resultOutprint.textContent = this.converter.fahrenheitToCelsius(Number(this.convertTextField.value))

          this.resultUnitOutprint.innerHTML = celsiusUnit
        } else if (this.chooseUnitToConvert.value === 'fahrenheitToKelvin') {
          this.resultOutprint.textContent = this.converter.fahrenheitToKelvin(Number(this.convertTextField.value))

          this.resultUnitOutprint.innerHTML = kelvinUnit
        } else if (this.chooseUnitToConvert.value === 'kelvinToCelsius') {
          this.resultOutprint.textContent = this.converter.kelvinToCelsius(Number(this.convertTextField.value))

          this.resultUnitOutprint.innerHTML = celsiusUnit
        } else {
          this.resultOutprint.textContent = this.converter.kelvinToFahrenheit(Number(this.convertTextField.value))

          this.resultUnitOutprint.innerHTML = fahrenheitUnit
        }
      } catch (error) {
        if (this.convertTextField.value.length === 0) {
          this.resultOutprint.textContent = 'Please enter a number in the field.'
        } else {
          this.resultOutprint.textContent = 'Something went wrong... try again!'
        }
      }
    }
  }
)
