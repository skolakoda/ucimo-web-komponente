export class Poruka extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `<p>Zdravo iz web komponente</p>`
  }
}

customElements.define('x-poruka', Poruka)
