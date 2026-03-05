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

// sliding cards
const slider = document.getElementById('slider')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
let currentSlide = 0
const totalSlides = 3

nextBtn.addEventListener('click', function() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++
    } else {
        currentSlide = 0
    }
    slider.style.transform = `translateX(-${currentSlide * 100}%)`
})

prevBtn.addEventListener('click', function() {
    if (currentSlide > 0) {
        currentSlide--
    } else {
        currentSlide = totalSlides - 1
    }
    slider.style.transform = `translateX(-${currentSlide * 100}%)`
})