/**
 * Remove all classes for each element inside querySelectorAll in param
 * and set elementToActivate to a new class in param
 * 
 * @param {String} querySelectorAll 
 * @param {HTMLElement} elementToActivate 
 * @param {String} newClass
 */

const removeAndSetNewClass = (querySelectorAll, elementToActivate, newClass) => {
  document.querySelectorAll(querySelectorAll).forEach(item => item.setAttribute('class', ''))
  elementToActivate.setAttribute('class', newClass)
}

export {
  removeAndSetNewClass
}