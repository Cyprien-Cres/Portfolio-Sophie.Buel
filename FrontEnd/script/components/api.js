const WORKS_URL = 'http://localhost:5678/api/works'
const CATEGORIES_URL = 'http://localhost:5678/api/categories'

const get = async url => fetch(url).then(res => res.json()).then(data => data).catch(error => error)

// TODO créer une méthode post

export const getWorks = async categoryId => await get(WORKS_URL).then(data => {
    const dataFiltered = categoryId ? data.filter(item => item.categoryId === categoryId) : data
    return dataFiltered
})

export const getCategories = async () => await get(CATEGORIES_URL)