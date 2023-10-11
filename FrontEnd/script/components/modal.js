// Ouvrir et fermer les popups
const modal = document.getElementById("modal")
const secondModal = document.getElementById("second-modal")

function openPopup() {
  modal.showModal()
}

function openSecondPopup() {
  secondModal.showModal()
}

function closePopup() {
  modal.close()
}

function closeSecondPopup() {
  secondModal.close()
}

modal.addEventListener ('click', (event) => {
  if (event.target === modal) {
    closePopup()
  }
})

secondModal.addEventListener ('click', (event) => {
  if (event.target === secondModal) {
    closeSecondPopup()
  }
})

// Ajouter les images dans le premier popup
const galleryEdition = document.querySelector(".gallery-edition")

const getWorks = async id => {

  galleryEdition.innerHTML = ''

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
        const paraph = document.createElement("p")
        image.classList.add("img-edition")
        paraph.classList.add("delete")
        galleryEdition.appendChild(work)
        work.appendChild(image)
        work.appendChild(paraph)
        image.src = dataFiltered[i].imageUrl
        image.alt = dataFiltered[i].title
        image.crossOrigin = "anonymous"
        paraph.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
      }
    })
    .catch(e => {
      console.error('Une erreur est survenue', e)
    })
}

const init = async () => {
  await getWorks()
}

init()