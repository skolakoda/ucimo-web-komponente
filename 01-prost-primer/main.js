class Poruka extends HTMLElement {
  // lifecycle metoda, poput componentDidMount
  connectedCallback() {
    this.innerHTML = `<p>Zdravo iz web komponente</p>`
  }
}

customElements.define('x-poruka', Poruka)
