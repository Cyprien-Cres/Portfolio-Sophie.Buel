const url = "http://localhost:5678/api/users/login"
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  const emailEntered = document.querySelector('#email').value
  const passwordEntered = document.querySelector('#pass').value

  event.preventDefault()

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: emailEntered,
      password: passwordEntered,
    }),
    headers: {
      "Content-Type" : "application/json"
    }
  }).then((response) => response.json())
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