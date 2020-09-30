
fetch('scripts/feature-flags.js')
  .then(response => response.text())
  .then(text => document.getElementById('feature-flags-logic').innerHTML = text)

setTimeout(() => {
    Prism.highlightAll()
}, 1000)