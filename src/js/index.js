// @flow
'use strict'

function execute() {
  let html:string = '<div class="message">Hello World</div>'
  let el = document.querySelector('#app')
  if(el) el.innerHTML = html
}

execute()
