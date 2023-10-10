import { removeAndSetNewClass } from "./components/dom.js"

const categories = document.querySelector('.categories')
const gallery = document.querySelector('.gallery')

const getWorks = async id => {

  gallery.innerHTML = ''

  return fetch('http://localhost:5678/api/works', {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(r => {
      if (r.ok) {
        return r.json()
      } else {
        throw new Error('Erreur serveur', { cause: r })
      }
    })
    .then(works => {
      const dataFiltered = id ? works.filter(work => work.categoryId === id) : works
      const workCount = dataFiltered.length
      for (let i = 0; i < workCount; i++) {
        const work = document.createElement("figure")
        const image = document.createElement("img")
        image.classList.add("work-image")
        const figcaption = document.createElement("figcaption")
        gallery.appendChild(work)
        work.appendChild(image)
        work.appendChild(figcaption)
        image.src = dataFiltered[i].imageUrl
        image.alt = dataFiltered[i].title
        image.crossOrigin = "anonymous"
        figcaption.innerHTML = dataFiltered[i].title
      }
    })
    .catch(e => {
      console.error('Une erreur est survenue', e)
    })
}

fetch('http://localhost:5678/api/categories')
  .then(res => res.json())
  .then(data => {

    const all = document.getElementById('all')
    all.addEventListener('click', async () => {
      removeAndSetNewClass('.categories button', all, 'selected')
      await getWorks()
    })

    data.forEach(category => {
      const button = document.createElement('button')
      button.innerHTML = category.name
      categories.appendChild(button)


      button.addEventListener('click', async () => {
        removeAndSetNewClass('.categories button', button, 'selected')
        await getWorks(category.id)
      })
    })
  })

const init = async () => {
  await getWorks()
}

init()

const loginLink = document.querySelector('.header-nav a')

if (localStorage.getItem('token')) {
  loginLink.textContent = 'logout'
  const div = document.querySelector('#hidden')
  const projectDiv = document.querySelector('#project-hidden')
  div.id = ''
  projectDiv.id = ''
  console.log()
} else {
  loginLink.textContent = 'login'
}
