function prebrojReci(roditelj){
  const sadrzaj = roditelj.innerText || roditelj.textContent
  return sadrzaj.trim().split(/\s+/g).length
}

class BrojacReci extends HTMLParagraphElement {
  constructor() {
    super()
    this.element = document.createElement('span')
    this.element.style.color = 'maroon'
    const koren = this.attachShadow({mode: 'open'})  // pravi shadow root
    koren.appendChild(this.element)
    this.update()
  }

  update() {
    this.element.textContent = 'Broj reči: ' + prebrojReci(this.parentNode)
    setInterval(() => this.update(), 200)
  }
}

customElements.define('brojac-reci', BrojacReci, { extends: 'p' })
