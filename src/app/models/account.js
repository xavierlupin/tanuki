let DB

const init = function init (app) {
  DB = app.DB
}

const create = async function create (account) {
  return new Promise((resolve, reject) => {
    const tx = DB.clientDB.transaction(['accounts'], 'readwrite')
    const store = tx.objectStore('accounts')
    const request = store.add(account)

    request.addEventListener('success', event => resolve(event.target.result))
    request.addEventListener('error', event => reject(event))
  })
}

const read = async function read () {
  return new Promise((resolve, reject) => {
    const tx = DB.clientDB.transaction(['accounts'])
    const store = tx.objectStore('accounts')
    const request = store.getAll()

    request.addEventListener('success', event => resolve(event.target.result))
    request.addEventListener('error', event => reject(event))
  })
}

const update = async function update (id, account) {
  account.id = Number.parseInt(id)

  return new Promise((resolve, reject) => {
    const tx = DB.clientDB.transaction(['accounts'], 'readwrite')
    const store = tx.objectStore('accounts')
    const request = store.put(account)

    request.addEventListener('success', event => resolve(event.target.result))
    request.addEventListener('error', event => reject(event))
  })
}

const destroy = async function destroy (id) {
  id = Number.parseInt(id)

  return new Promise((resolve, reject) => {
    const tx = DB.clientDB.transaction(['accounts'], 'readwrite')
    const store = tx.objectStore('accounts')
    const request = store.delete(id)

    request.addEventListener('success', event => resolve(event))
    request.addEventListener('error', event => reject(event))
  })
}

const reset = async function reset () {
  return new Promise((resolve, reject) => {
    const tx = DB.clientDB.transaction(['accounts'], 'readwrite')
    const store = tx.objectStore('accounts')
    const request = store.clear()

    request.addEventListener('success', event => {
      t_acc_20200324.forEach(account => store.add({
        code: account[0],
        name: account[1],
        name_en: account[2],
        description: account[3],
        description_en: account[4]
      }))
      resolve(event)
    })
    request.addEventListener('error', event => reject(event))
  })
}

export default {
  init,
  create,
  read,
  update,
  destroy,
  reset
}
