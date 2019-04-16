const template = document.createElement('template')
const style = document.createElement('style')

style.textContent = `
  button {
    color: crimson;
  }
  p {
    display: inline-block;
  }
`

template.innerHTML = `
  <button>-</button>
    <p>0</p>
  <button>+</button>
`

export class Brojac extends HTMLElement {
  constructor() {
    super()
    this._value = 0

    const okvir = this.attachShadow({ mode: 'open' })  // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    okvir.appendChild(template.content)
    okvir.appendChild(style)

    this.info = okvir.querySelector('p')
    this.dugmePlus = okvir.querySelectorAll('button')[1]
    this.dugmeMinus = okvir.querySelectorAll('button')[0]

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
}

customElements.define('x-brojac', Brojac)
