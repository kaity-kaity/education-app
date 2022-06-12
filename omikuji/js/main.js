'use strict'

{
  const button = document.getElementById('button')

  button.addEventListener('click', () => {
    const results = ['大吉', '中吉', '末吉', '凶']
    button.textContent = results[Math.floor(Math.random() * results.length)]
  })
}