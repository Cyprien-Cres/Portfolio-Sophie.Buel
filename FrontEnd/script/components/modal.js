// Ouvrir et fermer les popups
const modal = document.getElementById("modal")
const secondModal = document.getElementById('second-modal')
const closePopup = document.querySelector('.closePopup')
const closeSecondPopup = document.querySelector('.closeSecondPopup')
const returnPopup = document.querySelector('.returnPopup')
const btnAddPhoto = document.querySelector('.btn-add-photo')

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