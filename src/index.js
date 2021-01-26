import app from './app'

window.addEventListener('hashchange', event => app(event))
document.addEventListener('DOMContentLoaded', event => app(event))
