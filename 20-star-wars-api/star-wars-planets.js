// https://gist.github.com/richard-flosi/b6cdba782576447fcc9789f6cdfe2e31
class StarWarsPlanets extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: "open"})
    this.loadData("https://swapi.co/api/planets")
  }

  static get observedAttributes() {
    return ["loading", "planets"]
  }

  get loading() {
    return JSON.parse(this.getAttribute("loading"))
  }

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v))
  }

  get planets() {
    return JSON.parse(this.getAttribute("planets"))
  }

  set planets(v) {
    this.setAttribute("planets", JSON.stringify(v))
  }

  async loadData(url) {
    this.loading = true
    const response = await fetch(url)
    this.planets = await response.json()
    this.loading = false
  }

  // componentDidMount
  connectedCallback() {
    this.shadowRoot.addEventListener("click", e => this[e.target.id]())
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render()
  }

  next() {
    this.loadData(this.planets.next)
  }

  previous() {
    this.loadData(this.planets.previous)
  }

  renderRows() {
    return this.planets.results.map(planet => `
      <tr>
        <td>${planet.name}</td>
        <td>${planet.terrain}</td>
        <td>${planet.population}</td>
        <td>${planet.climate}</td>
        <td>${planet.diameter}</td>
        <td>${planet.gravity}</td>
        <td>${planet.orbital_period}</td>
        <td>${planet.rotation_period}</td>
        <td>${planet.surface_water}</td>
      </tr>
    `).join("")
  }

  render() {
    this.shadowRoot.innerHTML = `
      <h3>Star Wars Planets</h3>
      <div>Count: ${this.planets.count}</div>
      <button id="previous" ${this.planets.previous ? "" : "disabled"}>Previous</button>
      <button id="next" ${this.planets.next ? "" : "disabled"}>Next</button>
      <table>
        <tr>
          <th>Name</th>
          <th>Terrain</th>
          <th>Population</th>
          <th>Climate</th>
          <th>Diameter</th>
          <th>Gravity</th>
          <th>Orbital Period</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
        </tr>
        ${this.loading ? 'Loading...' : this.renderRows()}
      </table>
    `
  }
}

customElements.define("star-wars-planets", StarWarsPlanets)
