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

// FEATURED SCHOLARSHIPS
const featuredGrid = document.getElementById('featuredGrid')

async function loadFeaturedScholarships() {
    try {
        const response = await fetch('json\scholarships.json')
        const scholarships = await response.json()

        
        const featured = scholarships.slice(0, 3)

        featured.forEach(scholarship => {
            featuredGrid.innerHTML += createCard(scholarship)
        })

    } catch (error) {
        console.error('Error loading scholarships:', error)
    }
}

// SCHOLARSHIP CARD
function createCard(s) {
    const fundingClass = s.fundingType === 'Fully Funded' ? 'funded' : 'partial'
    const audienceClass = s.audience === 'Neurodivergent' ? 'neuro' : s.audience === 'Adult Learner' ? 'adult' : ''

    return `
        <div class="scholarship-card">
            <div class="card-tags">
                <span class="card-tag ${fundingClass}">${s.fundingType}</span>
                ${s.audience !== 'General' ? `<span class="card-tag ${audienceClass}">${s.audience}</span>` : ''}
                <span class="card-tag">${s.applicationType}</span>
            </div>
            <h3>${s.name}</h3>
            <p class="card-provider">${s.provider} · ${s.country}</p>
            <p class="card-description">${s.description}</p>
            <div class="card-footer">
                <span class="card-deadline"> ${s.deadline}</span>
                <a href="${s.link}" target="_blank" class="card-btn">Apply →</a>
            </div>
        </div>
    `
}

// SEARCH
const heroSearch = document.getElementById('heroSearch')

if (heroSearch) {
    heroSearch.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const query = heroSearch.value.trim()
            if (query) {
                window.location.href = `scholarships.html?search=${encodeURIComponent(query)}`
            }
        }
    })
}

// Load featured scholarships on home page
if (featuredGrid) loadFeaturedScholarships()