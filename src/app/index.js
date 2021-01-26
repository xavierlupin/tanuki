import routes from './routes'

const DOM = {}
const DB = {}

const init = function init () {
  // Initialize DOM
  const navLinks = [
    { url: '', text: '首頁' },
    { url: '#accounts', text: '會計項目' }
  ]

  DOM.mainContent = document.querySelector('main > .content')
  DOM.mainNav = document.querySelector('main > header > nav')
  DOM.mainNav.innerHTML = navLinks.map(link => `<a href="${ location.pathname }${ link.url }">${ link.text }</a>`).join(' | ')
  // Initialize Database
  const IDBOpenDBRequest = indexedDB.open('tanuki')

  IDBOpenDBRequest.addEventListener('error', event => console.log(event.target.error))
  IDBOpenDBRequest.addEventListener('upgradeneeded', event => {
    const db = event.target.result

    if (event.oldVersion < 1) {
      const accountStore = db.createObjectStore('accounts', { keyPath: 'id', autoIncrement: true })
      t_acc_20200324.forEach(account => accountStore.add({
        code: account[0],
        name: account[1],
        name_en: account[2],
        description: account[3],
        description_en: account[4]
      }))
    }
  })
  IDBOpenDBRequest.addEventListener('success', event => {
    DB.clientDB = event.target.result
    hashChange()
  })
}

const hashChange = function hashChange () {
  location.hash === '#accounts' ?
    routes.accounts({ DOM, DB })
  :
    routes.index({ DOM, DB })
}

export default function app (event) {
  event.type === 'DOMContentLoaded' ?
    init()
  :
    hashChange()
}
