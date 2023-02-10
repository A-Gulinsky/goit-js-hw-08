
import throttle from "lodash.throttle"

const form = document.querySelector(`form`)

// const refs = {
//   form: document.querySelector(`form`),
//   textarea: document.querySelector(`form textarea`) 
// }

const STORAGE_KEY = 'feedback-form-state'

const formData = {}

form.addEventListener(`submit`, onFormInput)
form.addEventListener(`input`, throttle(getValues, 500))

savedValues()

function getValues(e) {
  formData[e.target.name] = e.target.value
  const formDataToString = JSON.stringify(formData)
  
  localStorage.setItem(STORAGE_KEY, formDataToString)
}

function savedValues() {
  const valuesOfFormData = localStorage.getItem(STORAGE_KEY)

  const formDataObjectValues = JSON.parse(valuesOfFormData)
  if(valuesOfFormData) {
    // const formDataObjectValues = JSON.parse(valuesOfFormData)
    
    form[0].value = formDataObjectValues.email || ``
    form[1].value = formDataObjectValues.message || ``
  }
}

function onFormInput(evt) {
  evt.preventDefault()

  evt.target.reset()
  localStorage.removeItem(STORAGE_KEY)
  console.log(formData)
}