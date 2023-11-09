const WORKS_URL = 'http://localhost:5678/api/works'
const CATEGORIES_URL = 'http://localhost:5678/api/categories'
const LOGIN_URL = 'http://localhost:5678/api/users/login'

const get = async url => fetch(url).then(res => res.json()).then(data => data).catch(error => error)

const post = async (url, data) => fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
})


export const getWorks = async categoryId => await get(WORKS_URL).then(data => {
    const dataFiltered = categoryId ? data.filter(item => item.categoryId === categoryId) : data
    return dataFiltered
})

export const getCategories = async () => await get(CATEGORIES_URL)

export const postLogin = async data => await post(LOGIN_URL, data)
    .then(res => {
        if (res.status === 401 || res.status === 404) {
            alert('Erreur dans l’identifiant ou le mot de passe')
        }
        return res.json()
    }).catch(error => {
        alert('API indisponible')
        throw error
    })

export const deleteProject = async id => await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
        Authorization: "Bearer " + localStorage.token,
    }
})

export const postWork = data => fetch(WORKS_URL, {
    method: "POST",
    body: data,
    headers: {
        Authorization: "Bearer " + localStorage.token
    }
}).then((response) => response.json())