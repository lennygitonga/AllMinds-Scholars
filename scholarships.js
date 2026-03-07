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

let allScholarships = []

        // Fetch scholarships from JSON
        async function loadScholarships() {
            try {
                const response = await fetch('json/scholarships.json')
                allScholarships = await response.json()
                applyFilters()
            } catch (error) {
                console.error('Error loading scholarships:', error)
            }
        }

        // Apply search and filters
        function applyFilters() {
            const search = document.getElementById('searchInput').value.toLowerCase()

            // Get all checked values for each filter group
            const audience = getChecked('Audience')
            const funding = getChecked('Funding Type')
            const appType = getChecked('Application Type')
            const time = getChecked('Time Commitment')

            let results = allScholarships.filter(s => {
                // Search filter
                const matchesSearch = !search ||
                    s.name.toLowerCase().includes(search) ||
                    s.country.toLowerCase().includes(search) ||
                    s.fieldOfStudy.toLowerCase().includes(search) ||
                    s.provider.toLowerCase().includes(search)

                // Checkbox filters — if none checked, show all
                const matchesAudience = audience.length === 0 || audience.includes(s.audience)
                const matchesFunding = funding.length === 0 || funding.includes(s.fundingType)
                const matchesAppType = appType.length === 0 || appType.includes(s.applicationType)
                const matchesTime = time.length === 0 || time.includes(s.timeCommitment)

                return matchesSearch && matchesAudience && matchesFunding && matchesAppType && matchesTime
            })

            displayScholarships(results)
        }

        // Get all checked checkbox values for a filter group
        function getChecked(groupName) {
            const group = [...document.querySelectorAll('.filter-group')].find(g =>
                g.querySelector('h4').textContent === groupName
            )
            if (!group) return []
            return [...group.querySelectorAll('input:checked')].map(cb => cb.value)
        }

        // Display scholarship cards
        function displayScholarships(scholarships) {
            const grid = document.getElementById('scholarshipsGrid')
            const count = document.getElementById('resultsCount')

            count.textContent = scholarships.length

            if (scholarships.length === 0) {
                grid.innerHTML = `
                    <div class="no-results">
                        <h3>No scholarships found</h3>
                        <p>Try adjusting your filters or search term</p>
                    </div>
                `
                return
            }

            grid.innerHTML = scholarships.map(s => createCard(s)).join('')
        }

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

        // Clear all filters
        function clearFilters() {
            document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => cb.checked = false)
            document.getElementById('searchInput').value = ''
            applyFilters()
        }

        // Search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') applyFilters()
        })

        // Load on page start
        loadScholarships()