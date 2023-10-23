// Ouvrir et fermer les popups
const modal = document.getElementById("modal")
const secondModal = document.getElementById('second-modal')
const formAddWork = document.getElementById('form-add-work')
const myFile = document.getElementById("my-file")

export const Photo = () => {
  const button = document.createElement("button")
  const type = myFile.type
  const validTypes = ['image/png', 'image/jpg']
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
  const token = localStorage.getItem('token')
  let inputTitle = document.getElementById('title-modal')
  let valueCategory = document.getElementById('select-modal')

  formAddWork.addEventListener('submit', async (event) => {

    event.preventDefault()

    const formData = new FormData()
    const [file] = myFile.files
    formData.append('image', file)
    formData.append('title', inputTitle.value)
    formData.append('category', parseInt(valueCategory.value))

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => response.json())
      .then((data) => {
        secondModal.close()
        modal.showModal()
        const galleryEdition = document.querySelector(".gallery-edition")
        const work = document.createElement("figure")
        const image = document.createElement("img")
        const paraph = document.createElement("p")
        image.classList.add("img-edition")
        paraph.classList.add("delete")
        galleryEdition.appendChild(work)
        work.appendChild(image)
        work.appendChild(paraph)
        image.src = data.imageUrl
        image.alt = data.title
        image.crossOrigin = "anonymous"
        paraph.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        paraph.addEventListener('click', async () => {
          const token = localStorage.getItem('token')
          const id = data.id
          work.remove()
          const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: "Bearer " + token,
            }
          }).then((r) => r.json)
        })
      })
  })
}