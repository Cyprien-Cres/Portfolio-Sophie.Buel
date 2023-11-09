import { Photo, AddWorks, resetForm, verificationForm } from "./components/modal.js"
import { removeAndSetNewClass } from "./components/dom.js"
import { getWorks, getCategories, deleteProject } from "./components/api.js"

Photo()
AddWorks()

const categories = document.querySelector('.categories')
const gallery = document.querySelector('.gallery')
const btnProjectHidden = document.getElementById('project-hidden')
const modal = document.getElementById("modal")
const secondModal = document.getElementById('second-modal')
const closePopup = document.querySelector('.closePopup')
const closeSecondPopup = document.querySelector('.closeSecondPopup')
const returnPopup = document.querySelector('.returnPopup')
const btnAddPhoto = document.querySelector('.btn-add-photo')
const galleryEdition = document.querySelector(".gallery-edition")

export const createGallery = (data, container = gallery, isModal = false) => {
  // on nettoie tout le container gallery
  container.innerHTML = ''

  // parcourir le tableau des data pour afficher le contenu dans le dom
  data.forEach(project => {
    const figure = document.createElement('figure')
    const image = document.createElement('img')
    image.src = project.imageUrl
    image.alt = project.title

    figure.appendChild(image)

    if (!isModal) {
      const figCaption = document.createElement('figcaption')
      figCaption.innerHTML = project.title
      figure.appendChild(figCaption)
    } else {
      image.classList.add("img-edition")
      const paraph = document.createElement("p")
      paraph.classList.add("delete")
      paraph.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
      paraph.addEventListener('click', async () => {
        await deleteProject(project.id)
          .then(() => getWorks())
          .then(data => createGallery(data, galleryEdition, true))
      })
      figure.appendChild(paraph)
    }

    container.appendChild(figure)
  })
}

let categoryData = {}
const loadCategory = async (categoryId) => {
  if (!categoryData[categoryId]) {
    categoryData[categoryId] = await getWorks(categoryId)
  }
  createGallery(categoryData[categoryId])
}

const createCategories = data => {
  const all = document.getElementById('all')

  all.addEventListener('click', () => {
    removeAndSetNewClass('.categories button', all, 'selected');
    loadCategory()
  })

  data.forEach(category => {
    const button = document.createElement('button');
    button.innerHTML = category.name
    categories.appendChild(button)

    button.addEventListener('click', () => {
      removeAndSetNewClass('.categories button', button, 'selected')
      loadCategory(category.id)
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
  const categories = document.querySelector('.categories')
  const projectHidden = document.querySelector(".projects-edition")
  div.id = ''
  projectDiv.id = ''
  categories.classList.remove('categories')
  categories.classList.add("hidden")
  projectHidden.style.padding = "0 0 92px 0"
} else {
  loginLink.textContent = 'login'
}

loginLink.addEventListener('click', () => localStorage.clear())


closePopup.addEventListener('click', () => {
  modal.close()
  init()
})
closeSecondPopup.addEventListener('click', () => {
  secondModal.close()
  resetForm()
})
returnPopup.addEventListener('click', () => {
  secondModal.close()
  resetForm()
})
btnAddPhoto.addEventListener('click', () => {
  secondModal.showModal()
  verificationForm()
})


modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close()
    init()
  }
})

secondModal.addEventListener('click', (event) => {
  if (event.target === secondModal) {
    secondModal.close()
    resetForm()
  }
})

btnProjectHidden.addEventListener('click', async () => {
  modal.showModal()
  await getWorks().then(data => createGallery(data, galleryEdition, true))
})
