import { postLogin } from "./components/api.js"
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  const emailEntered = document.querySelector('#email').value
  const passwordEntered = document.querySelector('#pass').value

  event.preventDefault()

  postLogin({ email: emailEntered, password: passwordEntered })
    .then((data) => {
      const userId = data.userId
      if (userId === 1) {
        localStorage.setItem("token", data.token)
        const token = localStorage.getItem("token")
        window.location = "../index.html"
      } else {
        alert("Erreur dans l’identifiant ou le mot de passe")
      }
    })
})