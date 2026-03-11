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

//LOAD USER
const user = JSON.parse(localStorage.getItem('loggedInUser'))

if (user) {
    // Update welcome section
    document.getElementById('userName').textContent = user.name
    document.getElementById('profileName').textContent = user.name
    document.getElementById('profileEmail').textContent = user.email
    document.getElementById('profileAvatar').textContent = user.name.charAt(0).toUpperCase()

    // Load saved scholarships
    loadSavedScholarships()
} else {
    // Show not logged in message
    document.getElementById('savedGrid').innerHTML = `
                <div class="not-logged-in">
                    <h2>You are not logged in</h2>
                    <p>Please log in to view your saved scholarships</p>
                    <a href="join us.html" class="browse-btn">Go to Login</a>
                </div>
            `
}

// LOAD SAVED SCHOLARSHIPS 
async function loadSavedScholarships() {
    const savedGrid = document.getElementById('savedGrid')

    // Get saved scholarship IDs from user
    const savedIds = user.savedScholarships || []

    // Update stats
    document.getElementById('savedCount').textContent = savedIds.length

    if (savedIds.length === 0) {
        savedGrid.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">🔖</div>
                        <h3>No saved scholarships yet</h3>
                        <p>Browse scholarships and save the ones you're interested in</p>
                        <a href="scholarships.html" class="browse-btn">Browse Scholarships</a>
                    </div>
                `
        return
    }

    try {
        // Fetch all scholarships
        const response = await fetch('json/scholarships.json')
        const allScholarships = await response.json()

        // Filter only saved ones
        const savedScholarships = allScholarships.filter(s => savedIds.includes(s.id))

        // Update stats
        const fullyFunded = savedScholarships.filter(s => s.fundingType === 'Fully Funded').length
        document.getElementById('fundedCount').textContent = fullyFunded

        // Count upcoming deadlines
        const upcoming = savedScholarships.filter(s => {
            const days = getDaysRemaining(s.deadline)
            return days !== null && days > 0
        }).length
        document.getElementById('upcomingCount').textContent = upcoming

        // Render cards
        savedGrid.innerHTML = savedScholarships.map(s => createSavedCard(s)).join('')

    } catch (error) {
        console.error('Error loading scholarships:', error)
    }
}

//  CREATE SAVED CARD 
function createSavedCard(s) {
    const fundingClass = s.fundingType === 'Fully Funded' ? 'funded' : 'partial'
    const countdown = buildCountdown(s.deadline)

    return `
                <div class="saved-card">
                    <button class="remove-btn" onclick="removeScholarship('${s.id}')" title="Remove">✕</button>
                    <h3>${s.name}</h3>
                    <p class="card-provider">${s.provider} · ${s.country}</p>
                    ${countdown}
                    <div class="saved-card-footer">
                        <span class="card-tag ${fundingClass}">${s.fundingType}</span>
                        <a href="${s.link}" target="_blank" class="card-btn">Apply →</a>
                    </div>
                </div>
            `
}

// BUILD COUNTDOWN
function buildCountdown(deadline) {
    const days = getDaysRemaining(deadline)

    if (days === null) {
        return `<div class="countdown"><p class="countdown-label">Deadline</p><p style="font-size:0.85rem;color:#6b4f4f;">${deadline}</p></div>`
    }

    if (days <= 0) {
        return `<div class="countdown"><p class="countdown-label">Deadline</p><p class="countdown-expired">Deadline passed</p></div>`
    }

    const months = Math.floor(days / 30)
    const weeks = Math.floor((days % 30) / 7)
    const remainingDays = days % 7

    return `
                <div class="countdown">
                    <p class="countdown-label">Time Remaining</p>
                    <div class="countdown-timer">
                        <div class="countdown-unit">
                            <span class="countdown-number">${months}</span>
                            <span class="countdown-unit-label">Months</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-number">${weeks}</span>
                            <span class="countdown-unit-label">Weeks</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-number">${remainingDays}</span>
                            <span class="countdown-unit-label">Days</span>
                        </div>
                    </div>
                </div>
            `
}

// GET DAYS REMAINING 
function getDaysRemaining(deadline) {
    // Try to parse the deadline string
    const parsed = new Date(deadline)
    if (isNaN(parsed)) return null

    const today = new Date()
    const diff = parsed - today
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// REMOVE SCHOLARSHIP
function removeScholarship(id) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.email === user.email)

    if (userIndex !== -1) {
        users[userIndex].savedScholarships = users[userIndex].savedScholarships.filter(s => s !== id)
        localStorage.setItem('users', JSON.stringify(users))

        // Update logged in user too
        user.savedScholarships = users[userIndex].savedScholarships
        localStorage.setItem('loggedInUser', JSON.stringify(user))

        // Reload
        loadSavedScholarships()
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem('loggedInUser')
    window.location.href = 'join us.html'
}