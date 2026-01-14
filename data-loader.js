// Data Loader - Loads content from JSON files or LocalStorage

// Load data from LocalStorage or use default data
function getData(key, defaultData) {
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored data:', e);
            return defaultData;
        }
    }
    return defaultData;
}

// Save data to LocalStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initialize default data if not exists
function initializeData() {
    const defaultAvenues = [
        {
            id: 1,
            name: "Community Service Avenue",
            icon: "🤝",
            description: "Community welfare and humanitarian service projects that make a direct impact on people's lives."
        },
        {
            id: 2,
            name: "Professional Development Avenue",
            icon: "💼",
            description: "Career skills, workshops, and mentoring programs to help members grow professionally."
        },
        {
            id: 3,
            name: "Leadership Development Avenue",
            icon: "👑",
            description: "Leadership training and team building activities to develop future leaders."
        },
        {
            id: 4,
            name: "Public Relations Avenue",
            icon: "📢",
            description: "Branding, media, and communications to promote our club and activities."
        },
        {
            id: 5,
            name: "Finance & Sponsorship Avenue",
            icon: "💰",
            description: "Fundraising and financial management to support our projects and initiatives."
        },
        {
            id: 6,
            name: "Environmental Avenue",
            icon: "🌱",
            description: "Sustainability and green initiatives to protect our environment."
        }
    ];

    const defaultBoard = [
        {
            id: 1,
            name: "John Doe",
            role: "President",
            photo: ""
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "Vice President",
            photo: ""
        },
        {
            id: 3,
            name: "Mike Johnson",
            role: "Secretary",
            photo: ""
        },
        {
            id: 4,
            name: "Sarah Williams",
            role: "Treasurer",
            photo: ""
        }
    ];

    const defaultProjects = [
        {
            id: 1,
            title: "Community Cleanup Drive",
            avenue: "Community Service Avenue",
            description: "Organized a large-scale cleanup drive in local neighborhoods, engaging over 100 volunteers.",
            image: ""
        },
        {
            id: 2,
            title: "Career Development Workshop",
            avenue: "Professional Development Avenue",
            description: "Conducted workshops on resume building and interview skills for university students.",
            image: ""
        },
        {
            id: 3,
            title: "Tree Planting Initiative",
            avenue: "Environmental Avenue",
            description: "Planted 500 trees across the university campus and surrounding areas.",
            image: ""
        }
    ];

    const defaultGallery = [
        { id: 1, url: "", caption: "Community Service Event" },
        { id: 2, url: "", caption: "Leadership Workshop" },
        { id: 3, url: "", caption: "Environmental Campaign" },
        { id: 4, url: "", caption: "Team Building Activity" },
        { id: 5, url: "", caption: "Award Ceremony" },
        { id: 6, url: "", caption: "Community Outreach" }
    ];

    const defaultUnits = [
        {
            id: 1,
            name: "Community Service Unit",
            icon: "🤝",
            description: "Dedicated to organizing and executing community welfare projects and humanitarian initiatives.",
            leader: "Led by Community Service Director"
        },
        {
            id: 2,
            name: "Media & Communications Unit",
            icon: "📢",
            description: "Handles all public relations, social media, and communication strategies for the club.",
            leader: "Led by PR Director"
        },
        {
            id: 3,
            name: "Event Management Unit",
            icon: "🎉",
            description: "Plans and coordinates all club events, workshops, and activities throughout the year.",
            leader: "Led by Events Coordinator"
        },
        {
            id: 4,
            name: "Finance & Sponsorship Unit",
            icon: "💰",
            description: "Manages club finances, fundraising activities, and sponsorship partnerships.",
            leader: "Led by Treasurer"
        }
    ];

    const defaultContent = {
        intro: "The Leo Club of University of Kelaniya is a dynamic student organization dedicated to community service, leadership development, and creating positive change. We believe in empowering students to become leaders while making a meaningful impact in society.\n\nThrough our various avenues, we provide opportunities for personal growth, professional development, and community engagement. Join us in our mission to serve, lead, and inspire.",
        aboutLeo: "Leo Clubs are sponsored by Lions Clubs International and provide an opportunity for young people to develop leadership qualities while participating in community service. The Leo Club of University of Kelaniya is one of the most active student organizations on campus, bringing together students from all faculties to work towards a common goal of service and leadership.\n\nOur club operates under the motto \"Leadership, Experience, Opportunity\" and provides a platform for students to develop essential life skills, build lasting friendships, and make a positive impact in their communities.",
        aboutClub: "Established with a vision to create positive change, the Leo Club of University of Kelaniya has been at the forefront of student-led community service initiatives. We work closely with local communities, organize awareness campaigns, conduct workshops, and engage in various humanitarian activities.\n\nOur members come from diverse academic backgrounds, bringing unique perspectives and skills to every project we undertake. Through collaboration and dedication, we strive to create meaningful change while fostering personal and professional growth among our members.",
        vision: "To be the leading student organization that empowers young leaders to create positive change in society through service, leadership, and innovation.",
        mission: "To provide opportunities for students to develop leadership skills, engage in meaningful community service, and build a network of like-minded individuals committed to making a difference.",
        contact: {
            email: "leoclub@kln.ac.lk",
            phone: "+94 XX XXX XXXX",
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    };

    // Initialize if not exists
    if (!localStorage.getItem('avenues')) {
        saveData('avenues', defaultAvenues);
    }
    if (!localStorage.getItem('board')) {
        saveData('board', defaultBoard);
    }
    if (!localStorage.getItem('projects')) {
        saveData('projects', defaultProjects);
    }
    if (!localStorage.getItem('gallery')) {
        saveData('gallery', defaultGallery);
    }
    if (!localStorage.getItem('units')) {
        saveData('units', defaultUnits);
    }
    if (!localStorage.getItem('content')) {
        saveData('content', defaultContent);
    }
}

// Load and display avenues
function loadAvenues() {
    const avenues = getData('avenues', []);
    const grid = document.getElementById('avenuesGrid');
    if (!grid) return;

    grid.innerHTML = '';
    avenues.forEach(avenue => {
        const card = document.createElement('div');
        card.className = 'avenue-card';
        card.innerHTML = `
            <span class="avenue-icon">${avenue.icon || '🎯'}</span>
            <h3>${avenue.name}</h3>
            <p>${avenue.description}</p>
        `;
        grid.appendChild(card);
    });
}

// Load and display board members
function loadBoard() {
    const board = getData('board', []);
    const grid = document.getElementById('boardGrid');
    if (!grid) return;

    grid.innerHTML = '';
    board.forEach(member => {
        const card = document.createElement('div');
        card.className = 'board-card';
        const photoDisplay = member.photo 
            ? `<img src="${member.photo}" alt="${member.name}" class="board-photo">`
            : `<div class="board-photo">👤</div>`;
        card.innerHTML = `
            ${photoDisplay}
            <div class="board-info">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Load and display projects
function loadProjects() {
    const projects = getData('projects', []);
    const grid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelector('.filter-buttons');
    
    if (!grid) return;

    // Get unique avenues for filters
    const avenues = [...new Set(projects.map(p => p.avenue))];
    
    // Create filter buttons
    if (filterButtons) {
        filterButtons.innerHTML = '<button class="filter-btn active" data-avenue="all">All Projects</button>';
        avenues.forEach(avenue => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = avenue;
            btn.setAttribute('data-avenue', avenue);
            filterButtons.appendChild(btn);
        });

        // Filter functionality
        filterButtons.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                const filter = e.target.getAttribute('data-avenue');
                displayProjects(projects, filter);
            }
        });
    }

    displayProjects(projects, 'all');
}

function displayProjects(projects, filter) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.avenue === filter);
    
    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        const imageDisplay = project.image 
            ? `<img src="${project.image}" alt="${project.title}" class="project-image">`
            : `<div class="project-image">📸</div>`;
        card.innerHTML = `
            ${imageDisplay}
            <div class="project-info">
                <span class="project-avenue">${project.avenue}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Load and display gallery
function loadGallery() {
    const gallery = getData('gallery', []);
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '';
    gallery.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        const imageDisplay = item.url 
            ? `<img src="${item.url}" alt="${item.caption}" class="gallery-image">`
            : `<div class="gallery-image">🖼️</div>`;
        galleryItem.innerHTML = imageDisplay;
        grid.appendChild(galleryItem);
    });
    
    // Re-setup modal after loading (function defined in script.js)
    setTimeout(() => {
        if (typeof setupGalleryModal === 'function') {
            setupGalleryModal();
        }
    }, 100);
}

// Load and display units
function loadUnits() {
    const units = getData('units', []);
    const grid = document.getElementById('unitsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    units.forEach(unit => {
        const card = document.createElement('div');
        card.className = 'unit-card';
        card.innerHTML = `
            <span class="unit-icon">${unit.icon || '🏛️'}</span>
            <h3>${unit.name}</h3>
            <p>${unit.description}</p>
            ${unit.leader ? `<div class="unit-leader">${unit.leader}</div>` : ''}
        `;
        grid.appendChild(card);
    });
}

// Load content for pages
function loadContent() {
    const content = getData('content', {});

    // Home page intro
    const introContent = document.getElementById('introContent');
    if (introContent && content.intro) {
        introContent.innerHTML = content.intro.split('\n').map(p => `<p>${p}</p>`).join('');
    }

    // About page content
    const aboutContent = document.getElementById('aboutContent');
    if (aboutContent) {
        const aboutCards = aboutContent.querySelectorAll('.about-card');
        if (aboutCards.length >= 2 && content.aboutLeo) {
            aboutCards[0].querySelectorAll('p').forEach((p, i) => {
                if (i === 0) p.textContent = content.aboutLeo.split('\n')[0];
                if (i === 1) p.textContent = content.aboutLeo.split('\n')[1] || '';
            });
        }
        if (aboutCards.length >= 2 && content.aboutClub) {
            aboutCards[1].querySelectorAll('p').forEach((p, i) => {
                if (i === 0) p.textContent = content.aboutClub.split('\n')[0];
                if (i === 1) p.textContent = content.aboutClub.split('\n')[1] || '';
            });
        }
    }

    // Vision and Mission
    const visionText = document.getElementById('visionText');
    if (visionText && content.vision) {
        visionText.textContent = content.vision;
    }
    const missionText = document.getElementById('missionText');
    if (missionText && content.mission) {
        missionText.textContent = content.mission;
    }

    // Contact info
    if (content.contact) {
        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail) contactEmail.textContent = content.contact.email;
        const contactPhone = document.getElementById('contactPhone');
        if (contactPhone) contactPhone.textContent = content.contact.phone;
        const facebookLink = document.getElementById('facebookLink');
        if (facebookLink && content.contact.facebook) facebookLink.href = content.contact.facebook;
        const instagramLink = document.getElementById('instagramLink');
        if (instagramLink && content.contact.instagram) instagramLink.href = content.contact.instagram;
        const linkedinLink = document.getElementById('linkedinLink');
        if (linkedinLink && content.contact.linkedin) linkedinLink.href = content.contact.linkedin;
    }

    // Populate avenue dropdown in join form
    const avenueSelect = document.getElementById('avenue');
    if (avenueSelect) {
        const avenues = getData('avenues', []);
        avenues.forEach(avenue => {
            const option = document.createElement('option');
            option.value = avenue.name;
            option.textContent = avenue.name;
            avenueSelect.appendChild(option);
        });
    }
}

// Setup gallery modal - re-attach event listeners after dynamic content loads
// This function is defined in script.js, we just call it here after loading gallery

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadContent();
    
    // Load page-specific content
    if (document.getElementById('avenuesGrid')) {
        loadAvenues();
    }
    if (document.getElementById('boardGrid')) {
        loadBoard();
    }
    if (document.getElementById('projectsGrid')) {
        loadProjects();
    }
    if (document.getElementById('galleryGrid')) {
        loadGallery();
    }
    if (document.getElementById('unitsGrid')) {
        loadUnits();
    }
});
