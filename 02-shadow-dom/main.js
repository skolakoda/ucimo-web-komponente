const shadowRoot = document.getElementById('example').attachShadow({ mode: 'open' })

// A shadow root can also include content from its containing document by using the <slot> element.
// Using a slot will drop user content from the outer document at a designated spot in your shadow root. 

shadowRoot.innerHTML = `
  <style>
    button {
      background: tomato;
      color: white;
    }
  </style>
  <button id="button"><slot></slot> tomato</button>
`
