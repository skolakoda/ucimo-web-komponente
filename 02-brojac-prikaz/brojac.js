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
    this.koren = this.attachShadow({ mode: 'open' })
    this.koren.appendChild(template.content)
  }
}

customElements.define('x-brojac', Brojac)
