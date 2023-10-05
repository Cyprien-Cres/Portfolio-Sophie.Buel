fetch('http://localhost:5678/api/works', {
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
    const workCount = works.length
    for (let i = 0; i < workCount; i++) {
      const gallery = document.querySelector(".gallery")
      const work = document.createElement("figure")
      const image = document.createElement("img")
      image.classList.add("work-image")
      const figcaption = document.createElement("figcaption")
      gallery.appendChild(work)
      work.appendChild(image)
      work.appendChild(figcaption)
      image.src = works[i].imageUrl
      image.alt = works[i].title
      image.crossOrigin = "anonymous"
      figcaption.innerHTML = works[i].title
      console.log(works)
    }
    const buttons = document.querySelectorAll("button")
    let checkedButtons = []
    for (let button of buttons) {
      button.addEventListener("click", () => {
        if (checkedButtons.length > 0) {
          checkedButtons.forEach((button) => {
            button.checked = false
            button.style.backgroundColor = "#FFF"
            button.style.color = "#1d6154"
          })
        }
        checkedButtons.push(button)
        button.checked = true
        button.style.backgroundColor = "#1d6154"
        button.style.color = "#FFF"
      })
    }
  })
  .catch(e => {
    console.error('Une erreur est survenue', e)
  })