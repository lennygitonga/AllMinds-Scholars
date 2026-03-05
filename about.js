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

// Track which slide is currently active
let currentSlide = 0
const totalSlides = 3

// Grab all cards and all tabs
const cards = document.querySelectorAll('.stack-card')
const tabs = document.querySelectorAll('.tab')

function goToSlide(index) {
    // Update current slide
    currentSlide = index

    // Loop through every card and assign the right class
    cards.forEach(function (card, i) {
        // Remove all position classes first
        card.classList.remove('active', 'behind-1', 'behind-2', 'hidden')

        // Calculate how far this card is from the active one
        let distance = i - currentSlide

        // Wrap around for cards before the active one
        if (distance < 0) distance += totalSlides

        // Assign class based on distance
        if (distance === 0) card.classList.add('active')
        else if (distance === 1) card.classList.add('behind-1')
        else if (distance === 2) card.classList.add('behind-2')
        else card.classList.add('hidden')
    })

    // Update tabs — active tab gets dark, others grey out
    tabs.forEach(function (tab, i) {
        tab.classList.remove('active')
        if (i === currentSlide) tab.classList.add('active')
    })
}