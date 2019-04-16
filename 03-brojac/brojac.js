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
    this.koren = this.attachShadow({ mode: 'open' })  // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    this.koren.appendChild(template.content)
    this.koren.appendChild(style)
  }
}

customElements.define('x-brojac', Brojac)
