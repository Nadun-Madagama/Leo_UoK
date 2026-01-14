// Admin Panel JavaScript
// Admin credentials are loaded from config.js

// Check if user is logged in
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadAdminData();
    } else {
        document.getElementById('loginScreen').style.display = 'block';
        document.getElementById('adminPanel').style.display = 'none';
    }
}

// Login handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        checkLogin();
    } else {
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.display = 'block';
    }
});

// Logout
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    checkLogin();
}

// Show section
function showSection(section) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(section + 'Section').classList.add('active');
    event.target.classList.add('active');
    loadAdminData();
}

// Load data for admin panel
function loadAdminData() {
    // Load content
    const content = getData('content', {});
    if (content.intro) document.getElementById('introText').value = content.intro;
    if (content.aboutLeo) document.getElementById('aboutLeoText').value = content.aboutLeo;
    if (content.aboutClub) document.getElementById('aboutClubText').value = content.aboutClub;
    if (content.vision) document.getElementById('visionText').value = content.vision;
    if (content.mission) document.getElementById('missionText').value = content.mission;
    if (content.contact) {
        document.getElementById('contactEmail').value = content.contact.email || '';
        document.getElementById('contactPhone').value = content.contact.phone || '';
        document.getElementById('contactFacebook').value = content.contact.facebook || '';
        document.getElementById('contactInstagram').value = content.contact.instagram || '';
        document.getElementById('contactLinkedIn').value = content.contact.linkedin || '';
    }

    // Load avenues
    loadAvenuesList();
    
    // Load board
    loadBoardList();
    
    // Load projects
    loadProjectsList();
    loadAvenuesForProjects();
    
    // Load gallery
    loadGalleryList();
}

// Get data helper
function getData(key, defaultData) {
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return defaultData;
        }
    }
    return defaultData;
}

// Save data helper
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Content form handler
document.getElementById('contentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const content = {
        intro: document.getElementById('introText').value,
        aboutLeo: document.getElementById('aboutLeoText').value,
        aboutClub: document.getElementById('aboutClubText').value,
        vision: document.getElementById('visionText').value,
        mission: document.getElementById('missionText').value,
        contact: {
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            facebook: document.getElementById('contactFacebook').value,
            instagram: document.getElementById('contactInstagram').value,
            linkedin: document.getElementById('contactLinkedIn').value
        }
    };
    saveData('content', content);
    showSuccess('contentSuccess');
});

// Avenues management
function loadAvenuesList() {
    const avenues = getData('avenues', []);
    const list = document.getElementById('avenuesList');
    list.innerHTML = '';
    avenues.forEach(avenue => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-info">
                <h4>${avenue.icon} ${avenue.name}</h4>
                <p>${avenue.description}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editAvenue(${avenue.id})">Edit</button>
                <button class="btn-delete" onclick="deleteAvenue(${avenue.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

document.getElementById('avenueForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const avenues = getData('avenues', []);
    const id = parseInt(document.getElementById('avenueId').value);
    const avenue = {
        id: id || (avenues.length > 0 ? Math.max(...avenues.map(a => a.id)) + 1 : 1),
        name: document.getElementById('avenueName').value,
        icon: document.getElementById('avenueIcon').value,
        description: document.getElementById('avenueDescription').value
    };
    
    if (id) {
        const index = avenues.findIndex(a => a.id === id);
        if (index !== -1) {
            avenues[index] = avenue;
        }
    } else {
        avenues.push(avenue);
    }
    
    saveData('avenues', avenues);
    loadAvenuesList();
    resetAvenueForm();
});

function editAvenue(id) {
    const avenues = getData('avenues', []);
    const avenue = avenues.find(a => a.id === id);
    if (avenue) {
        document.getElementById('avenueId').value = avenue.id;
        document.getElementById('avenueName').value = avenue.name;
        document.getElementById('avenueIcon').value = avenue.icon;
        document.getElementById('avenueDescription').value = avenue.description;
        document.getElementById('avenuesSection').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteAvenue(id) {
    if (confirm('Are you sure you want to delete this avenue?')) {
        const avenues = getData('avenues', []);
        const filtered = avenues.filter(a => a.id !== id);
        saveData('avenues', filtered);
        loadAvenuesList();
    }
}

function resetAvenueForm() {
    document.getElementById('avenueForm').reset();
    document.getElementById('avenueId').value = '';
}

// Board management
function loadBoardList() {
    const board = getData('board', []);
    const list = document.getElementById('boardList');
    list.innerHTML = '';
    board.forEach(member => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-info">
                <h4>${member.name}</h4>
                <p>${member.role}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editBoard(${member.id})">Edit</button>
                <button class="btn-delete" onclick="deleteBoard(${member.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

document.getElementById('boardForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const board = getData('board', []);
    const id = parseInt(document.getElementById('boardId').value);
    const member = {
        id: id || (board.length > 0 ? Math.max(...board.map(b => b.id)) + 1 : 1),
        name: document.getElementById('boardName').value,
        role: document.getElementById('boardRole').value,
        photo: document.getElementById('boardPhoto').value
    };
    
    if (id) {
        const index = board.findIndex(b => b.id === id);
        if (index !== -1) {
            board[index] = member;
        }
    } else {
        board.push(member);
    }
    
    saveData('board', board);
    loadBoardList();
    resetBoardForm();
});

function editBoard(id) {
    const board = getData('board', []);
    const member = board.find(b => b.id === id);
    if (member) {
        document.getElementById('boardId').value = member.id;
        document.getElementById('boardName').value = member.name;
        document.getElementById('boardRole').value = member.role;
        document.getElementById('boardPhoto').value = member.photo || '';
        if (member.photo) {
            document.getElementById('boardPhotoPreview').src = member.photo;
            document.getElementById('boardPhotoPreview').style.display = 'block';
        }
        document.getElementById('boardSection').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteBoard(id) {
    if (confirm('Are you sure you want to delete this board member?')) {
        const board = getData('board', []);
        const filtered = board.filter(b => b.id !== id);
        saveData('board', filtered);
        loadBoardList();
    }
}

function resetBoardForm() {
    document.getElementById('boardForm').reset();
    document.getElementById('boardId').value = '';
    document.getElementById('boardPhotoPreview').style.display = 'none';
}

// Projects management
function loadAvenuesForProjects() {
    const avenues = getData('avenues', []);
    const select = document.getElementById('projectAvenue');
    select.innerHTML = '<option value="">Select Avenue</option>';
    avenues.forEach(avenue => {
        const option = document.createElement('option');
        option.value = avenue.name;
        option.textContent = avenue.name;
        select.appendChild(option);
    });
}

function loadProjectsList() {
    const projects = getData('projects', []);
    const list = document.getElementById('projectsList');
    list.innerHTML = '';
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-info">
                <h4>${project.title}</h4>
                <p><strong>Avenue:</strong> ${project.avenue}</p>
                <p>${project.description}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editProject(${project.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const projects = getData('projects', []);
    const id = parseInt(document.getElementById('projectId').value);
    const project = {
        id: id || (projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1),
        title: document.getElementById('projectTitle').value,
        avenue: document.getElementById('projectAvenue').value,
        description: document.getElementById('projectDescription').value,
        image: document.getElementById('projectImage').value
    };
    
    if (id) {
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = project;
        }
    } else {
        projects.push(project);
    }
    
    saveData('projects', projects);
    loadProjectsList();
    resetProjectForm();
});

function editProject(id) {
    const projects = getData('projects', []);
    const project = projects.find(p => p.id === id);
    if (project) {
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectAvenue').value = project.avenue;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.image || '';
        if (project.image) {
            document.getElementById('projectImagePreview').src = project.image;
            document.getElementById('projectImagePreview').style.display = 'block';
        }
        document.getElementById('projectsSection').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = getData('projects', []);
        const filtered = projects.filter(p => p.id !== id);
        saveData('projects', filtered);
        loadProjectsList();
    }
}

function resetProjectForm() {
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    document.getElementById('projectImagePreview').style.display = 'none';
}

// Gallery management
function loadGalleryList() {
    const gallery = getData('gallery', []);
    const list = document.getElementById('galleryList');
    list.innerHTML = '';
    gallery.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        const imgPreview = item.url ? `<img src="${item.url}" style="max-width: 100px; max-height: 100px; border-radius: 5px; margin-right: 1rem;">` : '';
        card.innerHTML = `
            <div class="item-info" style="display: flex; align-items: center;">
                ${imgPreview}
                <div>
                    <h4>${item.caption}</h4>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editGallery(${item.id})">Edit</button>
                <button class="btn-delete" onclick="deleteGallery(${item.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

document.getElementById('galleryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const gallery = getData('gallery', []);
    const id = parseInt(document.getElementById('galleryId').value);
    const item = {
        id: id || (gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1),
        url: document.getElementById('galleryUrl').value,
        caption: document.getElementById('galleryCaption').value
    };
    
    if (id) {
        const index = gallery.findIndex(g => g.id === id);
        if (index !== -1) {
            gallery[index] = item;
        }
    } else {
        gallery.push(item);
    }
    
    saveData('gallery', gallery);
    loadGalleryList();
    resetGalleryForm();
});

function editGallery(id) {
    const gallery = getData('gallery', []);
    const item = gallery.find(g => g.id === id);
    if (item) {
        document.getElementById('galleryId').value = item.id;
        document.getElementById('galleryUrl').value = item.url || '';
        document.getElementById('galleryCaption').value = item.caption;
        if (item.url) {
            document.getElementById('galleryPreview').src = item.url;
            document.getElementById('galleryPreview').style.display = 'block';
        }
        document.getElementById('gallerySection').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteGallery(id) {
    if (confirm('Are you sure you want to delete this gallery image?')) {
        const gallery = getData('gallery', []);
        const filtered = gallery.filter(g => g.id !== id);
        saveData('gallery', filtered);
        loadGalleryList();
    }
}

function resetGalleryForm() {
    document.getElementById('galleryForm').reset();
    document.getElementById('galleryId').value = '';
    document.getElementById('galleryPreview').style.display = 'none';
}

// Image upload handler (convert to base64)
function handleImageUpload(input, targetId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result;
            document.getElementById(targetId).value = base64;
            const previewId = targetId + 'Preview';
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.src = base64;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
}

// Show success message
function showSuccess(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 3000);
    }
}

// Initialize on load
checkLogin();
