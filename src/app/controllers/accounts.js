import account from '../models/account'

let DOM

const renderRow = function renderRow (accountObj = {}) {
  let html = `<td><button class="removeAccountBtn" data-id="${ accountObj.id || '' }">刪除</button><button class="setAccountBtn" data-id="${ accountObj.id || '' }" ${ accountObj.id ? '' : 'disabled' }>儲存</button></td>`

  html += `<td><input type="text" value="${ accountObj.code || ''}" class="code"></td>`
  html += `<td><input type="text" value="${ accountObj.name || ''}"></td>`
  html += `<td><input type="text" value="${ accountObj.name_en || ''}"></td>`
  html += `<td><textarea>${ accountObj.description || ''}</textarea></td>`
  html += `<td><textarea>${ accountObj.description_en || ''}</textarea></td>`

  return html
}

const createAccount = function createAccount (event) {
  const tr = document.createElement('tr')

  tr.innerHTML = renderRow()
  DOM.accounts.tbody.appendChild(tr)
}

const getAllAccounts = async function getAllAccounts () {
  let html = ''

  try {
    const accounts = await account.read()

    html = '<table><thead><tr><th>指令</th><th>編號</th><th>名稱</th><th>英文名稱</th><th>描述</th><th>英文描述</th></tr></thead><tbody>'
    accounts.forEach(accountObj => {
      html += `<tr>${ renderRow(accountObj) }</tr>`
    })
    html += '</tbody><tfoot><tr><td><button class="createAccountBtn">新增</button></td><td colspan="5"></td></tr></tfoot></table>'

    return html
  } catch (error) { return html }
}

const setAccount = async function setAccount (btn) {
  const row = btn.parentNode.parentNode
  const inputs = row.querySelectorAll('input')
  const textareas = row.querySelectorAll('textarea')
  const accountObj = {
    code: inputs[0].value,
    name: inputs[1].value,
    name_en: inputs[2].value,
    description: textareas[0].value,
    description_en: textareas[1].value
  }

  btn.dataset.id === '' ?
    await account.create(accountObj)
  :
    await account.update(btn.dataset.id, accountObj)
}

const removeAccount = async function removeAccount (btn) {
  const row = btn.parentNode.parentNode

  if (btn.dataset.id) await account.destroy(btn.dataset.id)
  DOM.accounts.tbody.removeChild(row)
}

export default async function accounts (app) {
  account.init(app)
  DOM = app.DOM
  DOM.mainContent.innerHTML = await getAllAccounts()
  DOM.accounts = {
    tbody: document.querySelector('main tbody'),
    createAccountBtn: document.querySelector('main .createAccountBtn')
  }
  DOM.accounts.tbody.addEventListener('click', async event => {
    try {
      if (event.target.className === 'removeAccountBtn') await removeAccount(event.target)
      if (event.target.className === 'setAccountBtn') await setAccount(event.target)
    } catch (error) { console.error(error) }
  })
  DOM.accounts.tbody.addEventListener('change', event => {
    if (event.target.className === 'code') {
      const btn = event.target.parentNode.parentNode.querySelector('.setAccountBtn')
      event.target.value === '' ? btn.disabled = true : btn.disabled = false
    }
  })
  DOM.accounts.createAccountBtn.addEventListener('click', createAccount)
}
