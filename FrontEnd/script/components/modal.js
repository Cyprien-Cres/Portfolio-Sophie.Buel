// Ouvrir et fermer les popups
const modal = document.getElementById("modal")
const secondModal = document.getElementById('second-modal')
const closePopup = document.querySelector('.closePopup')
const closeSecondPopup = document.querySelector('.closeSecondPopup')
const returnPopup = document.querySelector('.returnPopup')
const btnAddPhoto = document.querySelector('.btn-add-photo')
const btnValid = document.getElementById('valid')

const Modal = () => {
  closePopup.addEventListener('click', () => {
    modal.close()
    secondModal.close()
  })
  closeSecondPopup.addEventListener('click', () => {
    secondModal.close()
    modal.close()
  })
  returnPopup.addEventListener('click', () => secondModal.close())
  btnAddPhoto.addEventListener('click', () => secondModal.showModal())


  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close()
      secondModal.close()
    }
  })

  secondModal.addEventListener('click', (event) => {
    if (event.target === secondModal) {
      secondModal.close()
      modal.close()
    }
  })
}

export default Modal

export const Photo = () => {
const myFile = document.getElementById("my-file")
const button = document.createElement("button")
button.classList.add("button-add-photo")
button.type = "button"
button.textContent = "+ Ajouter photo"

myFile.style.display = "none"
myFile.parentNode.insertBefore(button, myFile)

button.addEventListener("click", () => {
  myFile.click()
})

myFile.addEventListener("change", () => {
  const addPhoto = document.getElementById("add-photo") 
  const image = document.createElement("img")
  const button = document.querySelector(".button-add-photo")
  const file = myFile.files[0]
  const lien = URL.createObjectURL(file)
  image.src = lien
  image.classList.add("photo-selected")
  button.style.display = "none"
  addPhoto.appendChild(image)
})
}


export const AddWorks = () => {
  const token = localStorage.getItem('token')
  let inputTitle = document.getElementById('title-modal').value
  let valueCategory = document.getElementById('select-modal').value
  let addImage = document.getElementById("my-file").src
  const inputCategory = () => {
    if (valueCategory === "Objets") {
      inputCategory = 1
    } else if (valueCategory === "Appartements") {
      inputCategory = 2
    } else if (valueCategory === "Hotels & restaurants") {
      inputCategory = 3
    }
  }

  btnValid.addEventListener('click', async (event) => {

    event.preventDefault()
    
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: JSON.stringify({
          title: inputTitle,
          categoryId: inputCategory,
          imageURL: addImage,
        }),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type" : "application/json"
        }
      }).then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
  })
}
