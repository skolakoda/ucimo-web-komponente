// https://gist.github.com/richard-flosi/b6cdba782576447fcc9789f6cdfe2e31
class StarWarsPlanets extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: "open"})
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

  async fetchPlanets(url) {
    this.loading = true
    const response = await fetch(url)
    const json = await response.json()
    this.planets = json
    this.loading = false
  }

  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (event) => {
      const name = event.srcElement.id
      if (this[name]) {
        this[name]()
      }
    })
    await this.fetchPlanets("https://swapi.co/api/planets")
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render()
  }

  next() {
    this.fetchPlanets(this.planets.next)
  }

  previous() {
    this.fetchPlanets(this.planets.previous)
  }

  renderPrevious() {
    return this.planets.previous
      ? `<button id="previous">Previous</button>`
      : `<button disabled>Previous</button>`
  }

  renderNext() {
    return this.planets.next
      ? `<button id="next">Next</button>`
      : `<button disabled>Next</button>`
  }

  render() {
    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`
    } else {
      this.shadowRoot.innerHTML = `
      <span>
        <h3><slot name="title">Star Wars Planets</slot></h3>
        <div>Count: ${this.planets.count}</div>
        ${this.renderPrevious()}
        ${this.renderNext()}
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
            <th>URL</th>
          </tr>
          ${this.planets.results.map((planet) => {
          return `
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
              <td>${planet.url}</td>
            </tr>
          `
        }).join("")}
        </table>
      </span>
    `
    }
  }
}

customElements.define("star-wars-planets", StarWarsPlanets)
