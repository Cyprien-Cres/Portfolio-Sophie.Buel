import { createGallery } from "../index.js"
import { getWorks, postWork } from "./api.js"

// Ouvrir et fermer les popups
const modal = document.getElementById("modal")
const secondModal = document.getElementById('second-modal')
const formAddWork = document.getElementById('form-add-work')
const myFile = document.getElementById("my-file")

export const Photo = () => {
  const button = document.createElement("button")
  const type = myFile.type
  const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
  button.classList.add("button-add-photo")
  button.type = "button"
  button.textContent = "+ Ajouter photo"

  myFile.style.display = "none"
  myFile.parentNode.insertBefore(button, myFile)

  button.addEventListener("click", () => {
    myFile.click()
  })

  myFile.addEventListener("change", () => {
    if (!validTypes.includes(myFile.files[0].type)) {
      console.log(myFile.files[0].type)
      alert("Le type de fichier n'est pas valide.")
      return
    } else if (Math.round(myFile.files[0].size / 1024) > 4000) {
      alert("Le fichier est trop volumineux.")
      return
    } else {
      const addPhoto = document.getElementById("add-photo")
      const image = document.createElement("img")
      const button = document.querySelector(".button-add-photo")
      const fa = document.querySelector(".fa-image")
      const paraph = document.querySelector(".paraph-add")
      const file = myFile.files[0]
      const lien = URL.createObjectURL(file)
      image.src = lien
      image.classList.add("photo-selected")
      button.style.display = "none"
      fa.style.display = "none"
      paraph.style.display = "none"
      addPhoto.appendChild(image)
      console.log('type:', type)
      console.log('validTypes:', validTypes)
    }
  })
}

export const AddWorks = () => {
  let inputTitle = document.getElementById('title-modal')
  let valueCategory = document.getElementById('select-modal')

  formAddWork.addEventListener('submit', async (event) => {

    event.preventDefault()

    const formData = new FormData()
    const [file] = myFile.files
    formData.append('image', file)
    formData.append('title', inputTitle.value)
    formData.append('category', parseInt(valueCategory.value))

    postWork(formData)
      .then(() => {
        resetForm()
        modal.close()
        return getWorks()
      })
      .then(data => createGallery(data))
  })
}

export const verificationForm = () => {
  const myFile = document.getElementById("my-file")
  const titleModal = document.getElementById("title-modal")
  const selectModal = document.getElementById("select-modal")
  const buttonSubmit = document.getElementById("valid")

  function validation() {
    if (myFile.value !== "" && titleModal.value !== "" && selectModal.value !== "0") {
      buttonSubmit.disabled = false
      buttonSubmit.style.backgroundColor = "#1d6154"
    } else {
      buttonSubmit.disabled = true
      buttonSubmit.style.backgroundColor = "#A7A7A7"
    }
  }

  myFile.addEventListener("change", validation)
  titleModal.addEventListener("change", validation)
  selectModal.addEventListener("change", validation)

  validation()
}

export const resetForm = () => {
  secondModal.close()
  const image = document.querySelector(".photo-selected")
  const button = document.querySelector(".button-add-photo")
  const fa = document.querySelector(".fa-image")
  const paraph = document.querySelector(".paraph-add")
  formAddWork.reset()
  image.remove()
  button.style.display = "block"
  fa.style.display = "block"
  paraph.style.display = "block"
}