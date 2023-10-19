import { removeAndSetNewClass } from "./components/dom.js"
import Modal from "./components/modal.js"
import { getWorks, getCategories, } from "./components/api.js"
import { Photo } from "./components/modal.js"
import { AddWorks } from "./components/modal.js"

Modal()
Photo()
AddWorks()

const categories = document.querySelector('.categories')
const gallery = document.querySelector('.gallery')
const btnProjectHidden = document.getElementById('project-hidden')

const createGallery = data => {
  // on nettoie tout le container gallery
  gallery.innerHTML = ''

  // parcourir le tableau des data pour afficher le contenu dans le dom
  data.forEach(project => {
    const figure = document.createElement('figure')
    const image = document.createElement('img')
    image.src = project.imageUrl
    image.alt = project.title

    const figCaption = document.createElement('figcaption')
    figCaption.innerHTML = project.title

    figure.appendChild(image)
    figure.appendChild(figCaption)
    gallery.appendChild(figure)
  })
}

const createCategories = data => {
  const all = document.getElementById('all')
  all.addEventListener('click', async () => {
    removeAndSetNewClass('.categories button', all, 'selected')
    await getWorks().then(data => createGallery(data))
  })

  data.forEach(category => {
    const button = document.createElement('button')
    button.innerHTML = category.name
    categories.appendChild(button)


    button.addEventListener('click', async () => {
      removeAndSetNewClass('.categories button', button, 'selected')
      await getWorks(category.id).then(data => createGallery(data))
    })
  })
}

const init = async () => {
  await getWorks().then(data => createGallery(data))
  await getCategories().then(data => createCategories(data))
}

init()

const loginLink = document.querySelector('.header-nav a')

if (localStorage.getItem('token')) {
  loginLink.textContent = 'logout'
  const div = document.querySelector('#hidden')
  const projectDiv = document.querySelector('#project-hidden')
  div.id = ''
  projectDiv.id = ''
} else {
  loginLink.textContent = 'login'
}

loginLink.addEventListener('click', () => localStorage.clear())

btnProjectHidden.addEventListener('click', async () => {
  modal.showModal()
  await getWorks().then(data => {
    console.log(data)
    // Ajouter les images dans le premier popup
    const galleryEdition = document.querySelector(".gallery-edition")
    galleryEdition.innerHTML = ''
    const workCount = data.length
    for (let i = 0; i < workCount; i++) {
      const work = document.createElement("figure")
      const image = document.createElement("img")
      const paraph = document.createElement("p")
      image.classList.add("img-edition")
      paraph.classList.add("delete")
      galleryEdition.appendChild(work)
      work.appendChild(image)
      work.appendChild(paraph)
      image.src = data[i].imageUrl
      image.alt = data[i].title
      image.crossOrigin = "anonymous"
      paraph.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
      paraph.addEventListener('click', async () => {
        const token = localStorage.getItem('token')
        const id = data[i].id
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE',
          headers : {
            Authorization: "Bearer " + token,
          }
        }).then((r) => r.json)
      })
    }
  })
})