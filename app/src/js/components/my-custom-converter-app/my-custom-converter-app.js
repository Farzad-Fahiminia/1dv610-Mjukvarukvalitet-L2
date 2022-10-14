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

     #convert-result {
      font-size: 2.5em;
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
    <h1 id="headline">Convert different units!</h1>
     <div class ="my-custom-wrapper">
     <div class ="my-custom-converter">
        <h2 id="convert-result"></h2>
      </div>
      <form>
        <input type="text" id="converter-name" name="converter-name" placeholder="Convert something" required/>
        <button class="show-answer-button">Convert</button>
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
      this.convertTextField = this.shadowRoot.querySelector('#converter-name')
      this.showAnswerButton = this.shadowRoot.querySelector('.show-answer-button')

      this.showAnswerButton.addEventListener('click', (event) => {
        event.preventDefault()
        this.convertUnit()
      })

      // this.resultOutprint.textContent = 'Syns jag?'

      this.convertUnit()
    }

    /**
     * Converts numbers to other units.
     *
     */
    convertUnit () {
      try {
        console.log('CONVERT', this.converter.kelvinToFarenheit(Number(this.convertTextField.value)))
        this.resultOutprint.textContent = this.converter.celsiusToFahrenheit(Number(this.convertTextField.value))

      // this.converter.celsiusToFahrenheit(Number(this.convertTextField.value))
      } catch (error) {
        this.resultOutprint.textContent = 'Something went wrong... try again later!'
      }
    }
  }
)
