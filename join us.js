// navbar
const hamburger = document.getElementById('hamburger')
const navLinks = document.querySelector('.nav-links')

if (hamburger) {
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open')
        hamburger.classList.toggle('active')
    })
}

// ACCESSIBILITY
const dyslexicToggle = document.getElementById('dyslexicToggle')
const contrastToggle = document.getElementById('contrastToggle')

// Load saved preferences
if (localStorage.getItem('dyslexic') === 'true') {
    document.body.classList.add('dyslexic')
    if (dyslexicToggle) dyslexicToggle.classList.add('active')
}

if (localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast')
    if (contrastToggle) contrastToggle.classList.add('active')
}

if (dyslexicToggle) {
    dyslexicToggle.addEventListener('click', function () {
        document.body.classList.toggle('dyslexic')
        const isOn = document.body.classList.contains('dyslexic')
        localStorage.setItem('dyslexic', isOn)
        dyslexicToggle.classList.toggle('active', isOn)
    })
}

if (contrastToggle) {
    contrastToggle.addEventListener('click', function () {
        document.body.classList.toggle('high-contrast')
        const isOn = document.body.classList.contains('high-contrast')
        localStorage.setItem('highContrast', isOn)
        contrastToggle.classList.toggle('active', isOn)
    })
}

// login and register toggle
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm')
    const registerForm = document.getElementById('registerForm')
    const loginTab = document.getElementById('loginTab')
    const registerTab = document.getElementById('registerTab')

    if (tab === 'login') {
        loginForm.classList.remove('hidden')
        registerForm.classList.add('hidden')
        loginTab.classList.add('active')
        registerTab.classList.remove('active')
    } else {
        registerForm.classList.remove('hidden')
        loginForm.classList.add('hidden')
        registerTab.classList.add('active')
        loginTab.classList.remove('active')
    }
}

// login
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim()
    const password = document.getElementById('loginPassword').value.trim()

    if (!email || !password) {
        alert('Please fill in all fields')
        return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user))
        window.location.href = 'dashboard.html'
    } else {
        alert('Invalid email or password')
    }
}

// Register
function handleRegister() {
    const name = document.getElementById('registerName').value.trim()
    const email = document.getElementById('registerEmail').value.trim()
    const password = document.getElementById('registerPassword').value.trim()

    if (!name || !email || !password) {
        alert('Please fill in all fields')
        return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.email === email)

    if (exists) {
        alert('An account with this email already exists')
        return
    }

    const newUser = { name, email, password, savedScholarships: [] }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('loggedInUser', JSON.stringify(newUser))

    window.location.href = 'dashboard.html'
}
