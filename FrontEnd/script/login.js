import { postLogin } from "./components/api.js"
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  const emailEntered = document.querySelector('#email').value
  const passwordEntered = document.querySelector('#pass').value

  event.preventDefault()

  postLogin({ email: emailEntered, password: passwordEntered })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token)
        window.location = "../index.html"
      }
    })
})