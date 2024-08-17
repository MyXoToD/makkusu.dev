import { Hub } from './hub.js'
import { Theme } from './theme.js'
import { Furigana } from './furigana.js'

document.addEventListener('DOMContentLoaded', (e) => {
  // Add age to about page
  function getAge (dateString) {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  const ageContainer = document.querySelector('.age')
  if (ageContainer) {
    ageContainer.textContent = getAge('1993-02-22')
  }

  /* eslint-disable no-new */
  new Hub()
  new Theme()
  new Furigana()
  /* eslint-enable no-new */
})
