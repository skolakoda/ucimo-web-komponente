function prebrojReci(roditelj){
  const sadrzaj = roditelj.innerText || roditelj.textContent
  return sadrzaj.trim().split(/\s+/g).length
}

class BrojacReci extends HTMLElement {
  constructor() {
    super()

    this.element = document.createElement('p')
    this.element.style.color = 'maroon'

    this.attachShadow({mode: 'open'})  // pravi shadow root
    this.shadowRoot.appendChild(this.element)

    this.update()
    this.parentNode.addEventListener('input', () => this.update())
  }

  update() {
    this.element.textContent = 'Broj reči: ' + prebrojReci(this.parentNode)
  }
}

customElements.define('brojac-reci', BrojacReci)
