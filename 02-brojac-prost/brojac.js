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
    this.root = this.attachShadow({ mode: 'open' })
    this.root.appendChild(template.content)
  }
}

customElements.define('x-brojac', Brojac)
