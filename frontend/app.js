const signUpForm = document.getElementById("sign-up")
const logInForm = document.getElementById("log-in")
const baseUrl = "http://localhost:3000/"
const signUpUrl = baseUrl + 'users'
const logInURL = baseUrl + 'login'
const profileURL = baseUrl + 'profile'
const token = localStorage.getItem('token')

if(token){
  fetch(profileURL, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => response.json())
  .then(console.log)
}

function createBody(form){
  const formData = new FormData(form)
  const username = formData.get('username')
  const password = formData.get('password')
  const body = JSON.stringify({
    username, 
    password
  })
  return body
}

function postRequest(url, body){
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body 
  })
}
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const body = createBody(event.target)
  event.target.reset()
  postRequest(signUpUrl, body)
})
logInForm.addEventListener('submit', event => {
  event.preventDefault()
  const body = createBody(event.target)
  event.target.reset()
  postRequest(logInURL, body)
    .then(response => response.json())
    .then(result => {
      if(result.token){
        localStorage.setItem('token', result.token)
        const h3 = document.createElement('h3')
        h3.textContent = `Welcome ${result.user.username}`
        document.body.appendChild(h3)
      }
    })
})