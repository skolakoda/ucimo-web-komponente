const template = document.createElement('template')

template.innerHTML = `
  <style>
    button {
      color: crimson;
    }
    p {
      display: inline-block;
    }
  </style>

  <button>-</button>
    <p>0</p>
  <button>+</button>
`

export class Brojac extends HTMLElement {
  constructor() {
    super()
    this._value = 0

    this.attachShadow({ mode: 'open' })  // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    this.shadowRoot.appendChild(template.content)

    this.info = this.shadowRoot.querySelector('p')
    this.dugmePlus = this.shadowRoot.querySelectorAll('button')[1]
    this.dugmeMinus = this.shadowRoot.querySelectorAll('button')[0]

    this.dugmePlus.addEventListener('click', e => this.value++)
    this.dugmeMinus.addEventListener('click', e => this.value--)
  }

  set value(value) {
    this._value = value
    this.info.innerText = this._value
  }

  get value() {
    return this._value
  }

  // svojstva koja posmatramo
  static get observedAttributes() {
    return ['value']
  }
  // lifecycle metoda se poziva kad se posmatrano svojstvo promeni
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == 'value') this.value = parseInt(newValue)
  }
}

customElements.define('x-brojac', Brojac)
