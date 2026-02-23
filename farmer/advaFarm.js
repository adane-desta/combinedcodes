// ==================== INITIALIZATION & STATE MANAGEMENT ====================

// Get DOM elements
const bookAppointmentNav = document.getElementById('bookAppointmentNav');
const myQuestionsNav = document.getElementById('myQuestionsNav');
const newsNav = document.getElementById('newsNav');
const resourcesNav = document.getElementById('resourcesNav');
const myFarmNav = document.getElementById('myFarmNav');
const notificationsNav = document.getElementById('notificationsNav');
const accountNav = document.getElementById('accountNav');
const dashboardOverview = document.getElementById('dashboardOverview');
const contentArea = document.getElementById('contentArea');
const headerActions = document.getElementById('headerActions');
const scrollIndicator = document.getElementById('scrollIndicator');

// Notification badges
const questionsBadge = document.getElementById('questionsBadge');
const notificationsBadge = document.getElementById('notificationsBadge');
const mobileNotificationIcon = document.getElementById('mobileNotificationIcon');

// Stats elements
const todayAppointments = document.getElementById('todayAppointments');
const todayAnimals = document.getElementById('todayAnimals');
const upcomingAppointmentsCount = document.getElementById('upcomingAppointmentsCount');
const pendingQuestionsCount = document.getElementById('pendingQuestionsCount');

// Mobile menu elements
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const sidebar = document.getElementById('sidebar');
const currentDate = document.getElementById('currentDate');

// Quick action buttons
const quickBookAppointment = document.getElementById('quickBookAppointment');
const quickAskQuestion = document.getElementById('quickAskQuestion');
const quickAddAnimal = document.getElementById('quickAddAnimal');
const quickViewMarket = document.getElementById('quickViewMarket');

// State management
let activeSection = '';
let notifications = [];
let unreadCounts = {
    questions: 3,
    notifications: 8
};

let animals = [];
let appointments = [];
let farmerQuestions = [];
let healthRecords = [];
let emergencyContacts = [];

// Form tracking
let formDirtyStates = {
    bookAppointmentForm: false,
    askQuestionForm: false,
    addAnimalForm: false,
    editAnimalForm: false,
    farmDetailsForm: false,
    editEmergencyContactForm: false,
    editAccountForm: false,
    changePasswordForm: false,
    addHealthRecordForm: false
};

let pendingFormData = {};

// Mock data for demonstration
const mockAnimals = [
    { id: 1, name: "Daisy", type: "cow", breed: "Holstein", age: 4, gender: "female", weight: 550, healthStatus: "healthy", tag: "Farm-001" },
    { id: 2, name: "Bessie", type: "cow", breed: "Jersey", age: 3, gender: "female", weight: 450, healthStatus: "monitoring", tag: "Farm-002" },
    { id: 3, name: "Big Boy", type: "bull", breed: "Angus", age: 5, gender: "male", weight: 800, healthStatus: "healthy", tag: "Farm-003" },
    { id: 4, name: "Nanny", type: "goat", breed: "Saanen", age: 2, gender: "female", weight: 65, healthStatus: "treatment", tag: "Farm-004" },
    { id: 5, name: "Clucky", type: "chicken", breed: "Rhode Island Red", age: 1, gender: "female", healthStatus: "healthy", tag: "Coop-001" }
];

const mockAppointments = [
    { id: 1, vetName: "Dr. Thomas", date: new Date(Date.now() + 86400000), time: "10:00", animalName: "Daisy", reason: "Routine checkup", status: "confirmed", type: "clinic" },
    { id: 2, vetName: "Dr. Smith", date: new Date(Date.now() + 172800000), time: "14:00", animalName: "Bessie", reason: "Follow-up treatment", status: "pending", type: "farm" },
    { id: 3, vetName: "Dr. Johnson", date: new Date(Date.now() + 259200000), time: "11:00", animalName: "Nanny", reason: "Vaccination", status: "confirmed", type: "virtual" }
];

const mockQuestions = [
    { id: 1, subject: "Cow not eating properly", category: "health", animal: "Daisy", date: new Date(Date.now() - 86400000), status: "answered", answer: "Try adjusting feed mixture..." },
    { id: 2, subject: "Milk production decreased", category: "nutrition", animal: "Bessie", date: new Date(Date.now() - 43200000), status: "pending" },
    { id: 3, subject: "Chicken sneezing", category: "disease", animal: "Clucky", date: new Date(Date.now() - 21600000), status: "answered", answer: "Could be respiratory infection..." }
];

const mockEmergencyContacts = [
    { id: 1, name: "Dr. Thomas", relationship: "veterinarian", phone: "+1234567890", type: "medical", notes: "Primary vet for large animals" },
    { id: 2, name: "Farm Supply Co.", relationship: "emergency_service", phone: "+1234567891", type: "equipment", notes: "24/7 equipment repair" },
    { id: 3, name: "John (Neighbor)", relationship: "neighbor", phone: "+1234567892", type: "general", notes: "Can help with animal emergencies" }
];

const mockMarketPrices = [
    { commodity: "Milk", price: "$0.45/L", change: "+2.3%", trend: "up" },
    { commodity: "Beef", price: "$4.20/kg", change: "-1.2%", trend: "down" },
    { commodity: "Chicken", price: "$2.80/kg", change: "+0.8%", trend: "up" },
    { commodity: "Eggs", price: "$2.50/dozen", change: "+3.1%", trend: "up" },
    { commodity: "Wool", price: "$5.60/kg", change: "-0.5%", trend: "down" },
    { commodity: "Goat Milk", price: "$1.20/L", change: "+1.5%", trend: "up" }
];

// Initialize animals and other data
animals = mockAnimals;
appointments = mockAppointments;
farmerQuestions = mockQuestions;
emergencyContacts = mockEmergencyContacts;

// ==================== UTILITY FUNCTIONS ====================

// Update current date
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    if (currentDate) {
        currentDate.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Set min date for appointment booking to today
    const appointmentDate = document.getElementById('appointmentDate');
    if (appointmentDate) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDate.min = today;
    }
    
    // Set default date for health records to today
    const healthDate = document.getElementById('healthDate');
    if (healthDate) {
        healthDate.value = new Date().toISOString().split('T')[0];
    }
}

// Update notification badges
function updateNotificationBadges() {
    if (questionsBadge) {
        questionsBadge.textContent = unreadCounts.questions > 0 ? unreadCounts.questions : '';
    }
    if (notificationsBadge) {
        notificationsBadge.textContent = unreadCounts.notifications > 0 ? unreadCounts.notifications : '';
    }
    
    const totalUnread = unreadCounts.questions + unreadCounts.notifications;
    const notificationCount = document.querySelector('.notification-count');
    if (notificationCount) {
        notificationCount.textContent = totalUnread > 0 ? totalUnread : '';
        notificationCount.style.display = totalUnread > 0 ? 'flex' : 'none';
    }
    
    // Update today's stats
    if (todayAppointments) {
        todayAppointments.textContent = appointments.filter(a => 
            new Date(a.date).toDateString() === new Date().toDateString()
        ).length;
    }
    if (todayAnimals) {
        todayAnimals.textContent = animals.length;
    }
    if (upcomingAppointmentsCount) {
        upcomingAppointmentsCount.textContent = appointments.filter(a => 
            new Date(a.date) > new Date() && a.status === 'confirmed'
        ).length;
    }
    if (pendingQuestionsCount) {
        pendingQuestionsCount.textContent = farmerQuestions.filter(q => q.status === 'pending').length;
    }
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
    document.body.style.overflow = '';
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
    checkScrollIndicator();
});

// Update nav items active state
function updateNavActiveState(activeNav) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// Scroll indicator logic
function checkScrollIndicator() {
    if (window.innerWidth > 768) {
        scrollIndicator.classList.remove('show');
        return;
    }
    
    const container = document.querySelector('.table-container') || 
                     document.querySelector('.appointments-list') || 
                     document.querySelector('.animals-grid') ||
                     document.querySelector('.notifications-list');
    
    if (container) {
        const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
        const hasVerticalScroll = container.scrollHeight > container.clientHeight + 10;
        
        if (hasHorizontalScroll || hasVerticalScroll) {
            scrollIndicator.classList.add('show');
        } else {
            scrollIndicator.classList.remove('show');
        }
    } else {
        scrollIndicator.classList.remove('show');
    }
}

// Add scroll event listeners
function setupScrollListeners() {
    const containers = document.querySelectorAll('.table-container, .appointments-list, .animals-grid, .notifications-list');
    
    containers.forEach(container => {
        container.addEventListener('scroll', checkScrollIndicator);
    });
}

// ==================== MODAL MANAGEMENT ====================

// Show confirmation modal
function showConfirmModal(title, message, parentModalId = null) {
    return new Promise((resolve) => {
        document.getElementById('confirmModalTitle').textContent = title;
        document.getElementById('confirmModalMessage').textContent = message;
        
        const confirmModal = document.getElementById('confirmModal');
        
        if (parentModalId) {
            confirmModal.style.zIndex = '20000';
        } else {
            confirmModal.style.zIndex = '10000';
        }
        
        confirmModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        const confirmBtn = document.getElementById('confirmModalConfirm');
        const cancelBtn = document.getElementById('confirmModalCancel');
        
        const handleConfirm = () => {
            cleanup();
            resolve(true);
        };
        
        const handleCancel = () => {
            cleanup();
            resolve(false);
        };
        
        const cleanup = () => {
            confirmModal.style.display = 'none';
            document.body.style.overflow = '';
            confirmModal.style.zIndex = '';
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        setTimeout(() => {
            document.removeEventListener('keydown', handleEscape);
        }, 100);
    });
}

// Show alert modal
function showAlertModal(title, message, parentModalId = null) {
    return new Promise((resolve) => {
        document.getElementById('alertModalTitle').textContent = title;
        document.getElementById('alertModalMessage').textContent = message;
        
        const alertModal = document.getElementById('alertModal');
        
        if (parentModalId) {
            alertModal.style.zIndex = '20000';
        } else {
            alertModal.style.zIndex = '10000';
        }
        
        alertModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        const okBtn = document.getElementById('alertModalOk');
        
        const handleOk = () => {
            alertModal.style.display = 'none';
            document.body.style.overflow = '';
            alertModal.style.zIndex = '';
            okBtn.removeEventListener('click', handleOk);
            resolve();
        };
        
        okBtn.addEventListener('click', handleOk);
        
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleOk();
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        setTimeout(() => {
            document.removeEventListener('keydown', handleEscape);
        }, 100);
    });
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        const form = modal.querySelector('form');
        if (form && !pendingFormData[form.id]) {
            pendingFormData[form.id] = getFormData(form);
        }
    }
}

// Close modal with confirmation if form is dirty
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const form = modal.querySelector('form');
    if (form && formDirtyStates[form.id]) {
        showConfirmModal('Unsaved Changes', 
            'You have unsaved changes. Are you sure you want to close?',
            modalId)
            .then((confirmed) => {
                if (confirmed) {
                    resetForm(form);
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
    } else {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Get form data
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

// Reset form
function resetForm(form) {
    if (!form) return;
    
    form.reset();
    formDirtyStates[form.id] = false;
    form.classList.remove('form-dirty');
    pendingFormData[form.id] = null;
    
    // Special handling for editor fields
    if (form.id === 'askQuestionForm') {
        const editor = document.getElementById('questionDetails');
        if (editor) editor.innerHTML = '';
    }
}

// Track form changes
function trackFormChanges(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('input', () => {
        formDirtyStates[formId] = true;
        form.classList.add('form-dirty');
    });
    
    form.addEventListener('change', () => {
        formDirtyStates[formId] = true;
        form.classList.add('form-dirty');
    });
    
    form.addEventListener('reset', () => {
        formDirtyStates[formId] = false;
        form.classList.remove('form-dirty');
        pendingFormData[formId] = null;
    });
    
    form.addEventListener('submit', () => {
        formDirtyStates[formId] = false;
        form.classList.remove('form-dirty');
        pendingFormData[formId] = null;
    });
}

// ==================== DASHBOARD FUNCTIONS ====================

// Show dashboard overview
function showDashboardOverview() {
    contentArea.innerHTML = `
        <div class="content-header">
            <h1 class="page-title">Dashboard</h1>
            <div class="header-actions">
                <div class="date-display">
                    <i class="fas fa-calendar-day"></i>
                    <span id="currentDate"></span>
                </div>
            </div>
        </div>
        <div class="dashboard-overview">
            <div class="welcome-card">
                <div class="welcome-content">
                    <h2>Welcome back, John!</h2>
                    <p>You have <strong id="upcomingAppointmentsCount">${appointments.filter(a => 
                        new Date(a.date) > new Date() && a.status === 'confirmed'
                    ).length}</strong> upcoming appointments and <strong id="pendingQuestionsCount">${
                        farmerQuestions.filter(q => q.status === 'pending').length
                    }</strong> unanswered questions.</p>
                    <div class="weather-info">
                        <i class="fas fa-sun"></i>
                        <span>Sunny, 24°C - Good weather for farm work</span>
                    </div>
                </div>
                <div class="welcome-illustration">
                    <i class="fas fa-tractor"></i>
                </div>
            </div>

            <div class="quick-stats">
                <div class="stat-card stat-primary">
                    <i class="fas fa-calendar-alt"></i>
                    <div>
                        <h3>${appointments.length}</h3>
                        <p>Monthly Appointments</p>
                    </div>
                </div>
                <div class="stat-card stat-success">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h3>${farmerQuestions.filter(q => q.status === 'answered').length}</h3>
                        <p>Answered Questions</p>
                    </div>
                </div>
                <div class="stat-card stat-warning">
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <h3>${animals.filter(a => a.healthStatus !== 'healthy').length}</h3>
                        <p>Health Alerts</p>
                    </div>
                </div>
                <div class="stat-card stat-info">
                    <i class="fas fa-cow"></i>
                    <div>
                        <h3>${animals.length}</h3>
                        <p>Total Animals</p>
                    </div>
                </div>
            </div>

            <div class="quick-actions">
                <h2 class="section-title">Quick Actions</h2>
                <div class="actions-grid">
                    <button class="action-card" id="quickBookAppointment">
                        <i class="fas fa-calendar-plus"></i>
                        <span>Book Appointment</span>
                    </button>
                    <button class="action-card" id="quickAskQuestion">
                        <i class="fas fa-question-circle"></i>
                        <span>Ask Question</span>
                    </button>
                    <button class="action-card" id="quickAddAnimal">
                        <i class="fas fa-plus-circle"></i>
                        <span>Add Animal</span>
                    </button>
                    <button class="action-card" id="quickViewMarket">
                        <i class="fas fa-chart-line"></i>
                        <span>Market Prices</span>
                    </button>
                </div>
            </div>

            <div class="upcoming-section">
                <h2 class="section-title">Upcoming Appointments</h2>
                <div class="appointments-list" id="upcomingAppointmentsList">
                    ${appointments.length > 0 ? 
                        appointments.filter(a => new Date(a.date) > new Date())
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .slice(0, 3)
                            .map(appointment => `
                                <div class="appointment-item">
                                    <div class="appointment-info">
                                        <h4>${appointment.vetName} - ${appointment.animalName}</h4>
                                        <p>${appointment.reason}</p>
                                        <div class="appointment-meta">
                                            <span><i class="far fa-calendar"></i> ${new Date(appointment.date).toLocaleDateString()}</span>
                                            <span><i class="far fa-clock"></i> ${appointment.time}</span>
                                            <span class="status-badge ${appointment.status}">${appointment.status}</span>
                                        </div>
                                    </div>
                                    <div class="appointment-actions">
                                        <button class="action-btn secondary" onclick="viewAppointmentDetails(${appointment.id})">
                                            <i class="fas fa-eye"></i> View
                                        </button>
                                    </div>
                                </div>
                            `).join('') :
                        `<div class="empty-state">
                            <i class="fas fa-calendar-times"></i>
                            <h3>No upcoming appointments</h3>
                            <p>Book your first appointment with a veterinarian</p>
                        </div>`
                    }
                </div>
            </div>
        </div>
    `;
    updateCurrentDate();
    
    // Reattach event listeners to quick action buttons
    document.getElementById('quickBookAppointment')?.addEventListener('click', showBookAppointmentModal);
    document.getElementById('quickAskQuestion')?.addEventListener('click', showAskQuestionModal);
    document.getElementById('quickAddAnimal')?.addEventListener('click', showAddAnimalModal);
    document.getElementById('quickViewMarket')?.addEventListener('click', showMarketPricesModal);
    
    setupScrollListeners();
    setTimeout(checkScrollIndicator, 100);
}

// View appointment details
function viewAppointmentDetails(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (!appointment) return;
    
    const modal = document.getElementById('appointmentDetailsModal');
    if (!modal) return;
    
    modal.querySelector('.modal-body').innerHTML = `
        <div class="appointment-details">
            <div class="detail-row">
                <strong>Veterinarian:</strong>
                <span>${appointment.vetName}</span>
            </div>
            <div class="detail-row">
                <strong>Animal:</strong>
                <span>${appointment.animalName}</span>
            </div>
            <div class="detail-row">
                <strong>Date:</strong>
                <span>${new Date(appointment.date).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
                <strong>Time:</strong>
                <span>${appointment.time}</span>
            </div>
            <div class="detail-row">
                <strong>Type:</strong>
                <span>${appointment.type === 'clinic' ? 'Clinic Visit' : appointment.type === 'farm' ? 'Farm Visit' : 'Virtual Consultation'}</span>
            </div>
            <div class="detail-row">
                <strong>Status:</strong>
                <span class="status-badge ${appointment.status}">${appointment.status}</span>
            </div>
            <div class="detail-row">
                <strong>Reason:</strong>
                <p>${appointment.reason}</p>
            </div>
            ${appointment.notes ? `
                <div class="detail-row">
                    <strong>Notes:</strong>
                    <p>${appointment.notes}</p>
                </div>
            ` : ''}
        </div>
        <div class="form-actions">
            ${appointment.status === 'pending' ? `
                <button class="btn-secondary" onclick="cancelAppointment(${appointment.id})">
                    <i class="fas fa-times"></i> Cancel Appointment
                </button>
            ` : ''}
            <button class="btn-primary" onclick="closeModal('appointmentDetailsModal')">
                Close
            </button>
        </div>
    `;
    
    openModal('appointmentDetailsModal');
}

// Cancel appointment
async function cancelAppointment(appointmentId) {
    showConfirmModal('Cancel Appointment', 'Are you sure you want to cancel this appointment?')
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    // In a real app, you would call an API here
                    // For now, we'll update the local state
                    const index = appointments.findIndex(a => a.id === appointmentId);
                    if (index !== -1) {
                        appointments[index].status = 'cancelled';
                        showAlertModal('Success', 'Appointment cancelled successfully!')
                            .then(() => {
                                closeModal('appointmentDetailsModal');
                                if (activeSection === 'dashboardOverview') {
                                    showDashboardOverview();
                                }
                            });
                    }
                } catch (error) {
                    showAlertModal('Error', 'Failed to cancel appointment. Please try again.');
                }
            }
        });
}

// ==================== BOOK APPOINTMENT SECTION ====================

// Show book appointment modal
function showBookAppointmentModal() {
    openModal('bookAppointmentModal');
    
    // Populate animal selection
    const animalSelect = document.getElementById('animalSelection');
    if (animalSelect) {
        animalSelect.innerHTML = `
            <option value="">Choose animal</option>
            ${animals.map(animal => `
                <option value="${animal.id}">${animal.name} (${animal.type}, ${animal.breed || 'Unknown breed'})</option>
            `).join('')}
        `;
    }
}

// Handle book appointment form submission
async function handleBookAppointment(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        // In a real app, you would call an API here
        // For now, we'll simulate the API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create new appointment
        const animal = animals.find(a => a.id == data.animalId);
        const newAppointment = {
            id: appointments.length + 1,
            vetName: data.vetId === 'vet1' ? 'Dr. Thomas' : 
                     data.vetId === 'vet2' ? 'Dr. Smith' :
                     data.vetId === 'vet3' ? 'Dr. Johnson' : 'Dr. Wilson',
            date: new Date(data.date),
            time: data.time,
            animalName: animal ? animal.name : 'Unknown',
            reason: data.reason,
            status: 'pending',
            type: data.location
        };
        
        appointments.push(newAppointment);
        
        showAlertModal('Success', 'Appointment booked successfully! The veterinarian will confirm shortly.', 'bookAppointmentModal')
            .then(() => {
                closeModal('bookAppointmentModal');
                showNotification('Appointment booked successfully!');
                
                // Update dashboard if we're on it
                if (activeSection === 'dashboardOverview') {
                    showDashboardOverview();
                }
            });
        
    } catch (error) {
        showAlertModal('Error', 'Failed to book appointment. Please try again.', 'bookAppointmentModal');
    }
}

// Show book appointment section
function showBookAppointmentSection() {
    contentArea.innerHTML = `
        <div class="content-header">
            <h1 class="page-title">Book Appointment</h1>
            <div class="header-actions">
                <button class="btn-primary" id="newAppointmentBtn">
                    <i class="fas fa-plus"></i> New Appointment
                </button>
                <div class="date-display">
                    <i class="fas fa-calendar-day"></i>
                    <span id="currentDate"></span>
                </div>
            </div>
        </div>
        <div class="card">
            <h2 class="section-title">My Appointments</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Veterinarian</th>
                            <th>Animal</th>
                            <th>Date & Time</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="appointmentsTableBody">
                        ${appointments.length > 0 ? 
                            appointments.map(appointment => `
                                <tr>
                                    <td>${appointment.vetName}</td>
                                    <td>${appointment.animalName}</td>
                                    <td>
                                        ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}
                                    </td>
                                    <td>${appointment.type === 'clinic' ? 'Clinic Visit' : appointment.type === 'farm' ? 'Farm Visit' : 'Virtual'}</td>
                                    <td>
                                        <span class="status-badge ${appointment.status}">${appointment.status}</span>
                                    </td>
                                    <td>
                                        <button class="action-btn secondary" onclick="viewAppointmentDetails(${appointment.id})">
                                            <i class="fas fa-eye"></i> View
                                        </button>
                                    </td>
                                </tr>
                            `).join('') :
                            `<tr>
                                <td colspan="6" class="empty-state">
                                    <i class="fas fa-calendar-times"></i>
                                    <h3>No appointments yet</h3>
                                    <p>Book your first appointment with a veterinarian</p>
                                </td>
                            </tr>`
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;
    updateCurrentDate();
    
    // Add event listener to the new appointment button
    document.getElementById('newAppointmentBtn').addEventListener('click', showBookAppointmentModal);
    
    setupScrollListeners();
    setTimeout(checkScrollIndicator, 100);
}

// ==================== MY QUESTIONS SECTION ====================

// Show ask question modal
function showAskQuestionModal() {
    openModal('askQuestionModal');
    
    // Populate animal selection
    const animalSelect = document.getElementById('questionAnimal');
    if (animalSelect) {
        animalSelect.innerHTML = `
            <option value="">Select animal (optional)</option>
            ${animals.map(animal => `
                <option value="${animal.id}">${animal.name} (${animal.type})</option>
            `).join('')}
        `;
    }
    
    // Setup rich text editor
    setupRichTextEditor();
    
    // Setup attachments
    setupQuestionAttachments();
}

// Setup rich text editor
function setupRichTextEditor() {
    const toolbarButtons = document.querySelectorAll('#askQuestionModal .toolbar-btn');
    const editorBody = document.getElementById('questionDetails');
    
    if (!toolbarButtons.length || !editorBody) return;
    
    toolbarButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const command = button.dataset.command;
            
            if (command === 'createLink') {
                const url = prompt('Enter URL:');
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else {
                document.execCommand(command, false, null);
            }
            
            editorBody.focus();
        });
    });
    
    editorBody.addEventListener('input', () => {
        formDirtyStates.askQuestionForm = true;
        document.getElementById('askQuestionForm').classList.add('form-dirty');
    });
}

// Setup question attachments
function setupQuestionAttachments() {
    const attachmentsInput = document.getElementById('questionAttachments');
    const attachmentsList = document.getElementById('questionAttachmentsList');
    
    if (!attachmentsInput || !attachmentsList) return;
    
    attachmentsInput.addEventListener('change', () => {
        attachmentsList.innerHTML = '';
        
        Array.from(attachmentsInput.files).forEach((file, index) => {
            const attachmentItem = document.createElement('div');
            attachmentItem.className = 'attachment-item';
            attachmentItem.innerHTML = `
                <i class="fas fa-paperclip"></i>
                <span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
                <button type="button" class="remove-attachment" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            attachmentsList.appendChild(attachmentItem);
        });
        
        formDirtyStates.askQuestionForm = true;
        document.getElementById('askQuestionForm').classList.add('form-dirty');
    });
    
    attachmentsList.addEventListener('click', (e) => {
        if (e.target.closest('.remove-attachment')) {
            const index = parseInt(e.target.closest('.remove-attachment').dataset.index);
            const files = Array.from(attachmentsInput.files);
            files.splice(index, 1);
            
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            attachmentsInput.files = dataTransfer.files;
            
            attachmentsInput.dispatchEvent(new Event('change'));
        }
    });
}

// Handle ask question form submission
async function handleAskQuestion(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const editorContent = document.getElementById('questionDetails').innerHTML;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const animal = animals.find(a => a.id == data.animalId);
        const newQuestion = {
            id: farmerQuestions.length + 1,
            subject: data.subject,
            category: data.category,
            animal: animal ? animal.name : 'General',
            details: editorContent,
            date: new Date(),
            status: 'pending'
        };
        
        farmerQuestions.unshift(newQuestion);
        unreadCounts.questions++;
        updateNotificationBadges();
        
        showAlertModal('Success', 'Question submitted successfully! A veterinarian will respond soon.', 'askQuestionModal')
            .then(() => {
                closeModal('askQuestionModal');
                showNotification('Question submitted successfully!');
                
                if (activeSection === 'myQuestions') {
                    showMyQuestionsSection();
                }
            });
        
    } catch (error) {
        showAlertModal('Error', 'Failed to submit question. Please try again.', 'askQuestionModal');
    }
}

// Show my questions section
async function showMyQuestionsSection() {
    try {
        contentArea.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">My Questions</h1>
                <div class="header-actions">
                    <button class="btn-primary" id="newQuestionBtn">
                        <i class="fas fa-plus"></i> Ask Question
                    </button>
                    <div class="date-display">
                        <i class="fas fa-calendar-day"></i>
                        <span id="currentDate"></span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="questions-list" id="questionsList">
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading your questions...</p>
                    </div>
                </div>
            </div>
        `;
        updateCurrentDate();

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock data
        const farmerQuestions = [
            { id: 1, subject: "Cow not eating properly", category: "health", animal: "Daisy", date: new Date(Date.now() - 86400000), status: "answered", details: "My cow Daisy hasn't been eating for 2 days. She seems lethargic.", answer: "Try adjusting feed mixture and monitor temperature. If persists, schedule a farm visit." },
            { id: 2, subject: "Milk production decreased", category: "nutrition", animal: "Bessie", date: new Date(Date.now() - 43200000), status: "pending", details: "Bessie's milk production dropped significantly this week." },
            { id: 3, subject: "Chicken sneezing", category: "disease", animal: "Clucky", date: new Date(Date.now() - 21600000), status: "answered", details: "Several chickens are sneezing and have runny noses.", answer: "Could be respiratory infection. Isolate affected birds and consult vet." }
        ];

        const questionsList = document.getElementById('questionsList');
        if (farmerQuestions.length === 0) {
            questionsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-comments"></i>
                    <h3>No questions yet</h3>
                    <p>Ask your first question to a veterinarian</p>
                </div>
            `;
        } else {
            questionsList.innerHTML = farmerQuestions.map(question => `
                <div class="question-item">
                    <div class="question-header">
                        <div>
                            <h3>${question.subject}</h3>
                            <div class="question-meta">
                                <span class="question-category">${question.category}</span>
                                <span class="question-animal">${question.animal}</span>
                                <span class="question-date">${question.date.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <span class="status-badge ${question.status}">${question.status}</span>
                    </div>
                    <div class="question-content">
                        ${question.details}
                    </div>
                    ${question.answer ? `
                        <div class="question-answer">
                            <strong>Veterinarian's Response:</strong>
                            <p>${question.answer}</p>
                        </div>
                    ` : `
                        <div class="pending-answer">
                            <i class="fas fa-clock"></i>
                            <span>Waiting for veterinarian's response...</span>
                        </div>
                    `}
                    <div class="question-actions">
                        <button class="action-btn secondary" onclick="viewQuestionDetails(${question.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            `).join('');
        }

        document.getElementById('newQuestionBtn').addEventListener('click', showAskQuestionModal);
        setupScrollListeners();
        setTimeout(checkScrollIndicator, 100);

    } catch (error) {
        console.error('Error fetching questions:', error);
        contentArea.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">My Questions</h1>
            </div>
            <div class="card">
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Unable to load your questions</h3>
                    <p>Please check your connection and try again</p>
                    <button class="btn-outline" onclick="showMyQuestionsSection()">
                        <i class="fas fa-redo"></i> Retry
                    </button>
                </div>
            </div>
        `;
    }
}

// View question details
function viewQuestionDetails(questionId) {
    const question = farmerQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const modal = document.getElementById('questionDetailsModal');
    if (!modal) return;
    
    modal.querySelector('.modal-body').innerHTML = `
        <div class="question-details-modal">
            <div class="detail-row">
                <strong>Subject:</strong>
                <span>${question.subject}</span>
            </div>
            <div class="detail-row">
                <strong>Category:</strong>
                <span>${question.category}</span>
            </div>
            <div class="detail-row">
                <strong>Animal:</strong>
                <span>${question.animal}</span>
            </div>
            <div class="detail-row">
                <strong>Date:</strong>
                <span>${question.date.toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
                <strong>Status:</strong>
                <span class="status-badge ${question.status}">${question.status}</span>
            </div>
            <div class="detail-row">
                <strong>Question:</strong>
                <div class="question-content">${question.details || 'No details provided'}</div>
            </div>
            ${question.answer ? `
                <div class="detail-row">
                    <strong>Answer:</strong>
                    <div class="answer-content">${question.answer}</div>
                </div>
            ` : `
                <div class="detail-row">
                    <div class="pending-answer">
                        <i class="fas fa-clock"></i>
                        <p>Waiting for veterinarian's response...</p>
                    </div>
                </div>
            `}
        </div>
        <div class="form-actions">
            <button class="btn-primary" onclick="closeModal('questionDetailsModal')">
                Close
            </button>
        </div>
    `;
    
    openModal('questionDetailsModal');
}

// ==================== NEWS SECTION ====================

// Show news section
async function showNewsSection() {
    try {
        contentArea.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">News & Events</h1>
                <div class="header-actions">
                    <div class="date-display">
                        <i class="fas fa-calendar-day"></i>
                        <span id="currentDate"></span>
                    </div>
                </div>
            </div>
            <div class="card">
                <h2 class="section-title">Latest News & Events</h2>
                <div class="news-grid" id="newsGrid">
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading news & events...</p>
                    </div>
                </div>
            </div>
        `;
        updateCurrentDate();

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data (same as before)
        const newsEvents = [
            { id: 1, title: "New Vaccination Program", description: "Government announces new subsidized vaccination program for livestock.", type: "news", date: new Date() },
            { id: 2, title: "Farmers Workshop", description: "Free workshop on modern farming techniques this Saturday.", type: "event", date: new Date(Date.now() + 86400000) },
            { id: 3, title: "Disease Alert", description: "Alert: Cases of foot-and-mouth disease reported in neighboring county.", type: "alert", date: new Date() },
            { id: 4, title: "Market Price Update", description: "Latest market prices for agricultural products released.", type: "update", date: new Date(Date.now() - 86400000) }
        ];

        const newsGrid = document.getElementById('newsGrid');
        if (newsEvents.length === 0) {
            newsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-newspaper"></i>
                    <h3>No news & events available</h3>
                    <p>Check back later for updates</p>
                </div>
            `;
        } else {
            newsGrid.innerHTML = newsEvents.map(newsEvent => `
                <div class="news-card">
                    <div class="news-header">
                        <span class="news-type ${newsEvent.type.toLowerCase()}">${newsEvent.type}</span>
                        <span class="news-date">${newsEvent.date.toLocaleDateString()}</span>
                    </div>
                    <h3 class="news-title">${newsEvent.title}</h3>
                    <p class="news-description">${newsEvent.description}</p>
                    <div class="news-actions">
                        <button class="like_dislike_buttons like">
                            <i class="fas fa-thumbs-up"></i> Like
                        </button>
                        <button class="like_dislike_buttons dislike">
                            <i class="fas fa-thumbs-down"></i> Dislike
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        setupScrollListeners();
        setTimeout(checkScrollIndicator, 100);
        
    } catch (error) {
        console.error('Error fetching news:', error);
        contentArea.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">News & Events</h1>
            </div>
            <div class="card">
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Unable to load news & events</h3>
                    <p>Please check your connection and try again</p>
                    <button class="btn-outline" onclick="showNewsSection()">
                        <i class="fas fa-redo"></i> Retry
                    </button>
                </div>
            </div>
        `;
    }
}

// ==================== RESOURCES SECTION ====================

// Show resources section
async function showResourcesSection() {
    try {
        contentArea.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Resources</h1>
                <div class="header-actions">
                    <div class="date-display">
                        <i class="fas fa-calendar-day"></i>
                        <span id="currentDate"></span>
                    </div>
                </div>
            </div>
            <div class="card">
                <h2 class="section-title">Available Resources</h2>
                <div class="resources-grid" id="resourcesGrid">
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading resources...</p>
                    </div>
                </div>
            </div>
        `;
        updateCurrentDate();

        // Mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 500));
        const resources = [
            { id: 1, title: "Dairy Cattle Management Guide", description: "Complete guide to managing dairy cattle health and productivity.", type: "guide", icon: "book" },
            { id: 2, title: "Vaccination Schedule", description: "Recommended vaccination schedule for common livestock.", type: "pdf", icon: "file-pdf" },
            { id: 3, title: "Feed Nutrition Calculator", description: "Tool to calculate optimal feed ratios for different animals.", type: "tool", icon: "calculator" },
            { id: 4, title: "Emergency Procedures", description: "Step-by-step emergency procedures for common farm accidents.", type: "manual", icon: "book-medical" }
        ];

        const resourcesGrid = document.getElementById('resourcesGrid');
        resourcesGrid.innerHTML = resources.map(resource => `
            <div class="resource-card">
                <div class="resource-icon">
                    <i class="fas fa-${resource.icon}"></i>
                </div>
                <div class="resource-content">
                    <h3 class="resource-title">${resource.title}</h3>
                    <p class="resource-description">${resource.description}</p>
                    <div class="resource-meta">
                        <span class="resource-type">${resource.type}</span>
                        <button class="btn-outline">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        if (resources.length === 0) {
            resourcesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-medical"></i>
                    <h3>No resources available</h3>
                    <p>Resources will be added soon</p>
                </div>
            `;
        }
        
        setupScrollListeners();
        setTimeout(checkScrollIndicator, 100);
        
    } catch (error) {
        console.error('Error fetching resources:', error);
        contentArea.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Resources</h1>
            </div>
            <div class="card">
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Unable to load resources</h3>
                    <p>Please check your connection and try again</p>
                    <button class="btn-outline" onclick="showResourcesSection()">
                        <i class="fas fa-redo"></i> Retry
                    </button>
                </div>
            </div>
        `;
    }
}

// ==================== MY FARM SECTION ====================

// Show add animal modal
function showAddAnimalModal() {
    openModal('addAnimalModal');
}

// Handle add animal form submission
async function handleAddAnimal(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newAnimal = {
            id: animals.length + 1,
            name: data.name,
            type: data.type,
            breed: data.breed || 'Unknown',
            age: parseFloat(data.age),
            gender: data.gender,
            weight: data.weight ? parseFloat(data.weight) : null,
            color: data.color || '',
            tag: data.tag || '',
            healthStatus: data.healthStatus || 'healthy',
            notes: data.notes || '',
            dateAdded: new Date()
        };
        
        animals.push(newAnimal);
        
        showAlertModal('Success', 'Animal added successfully!', 'addAnimalModal')
            .then(() => {
                closeModal('addAnimalModal');
                showNotification('Animal added to your farm!');
                
                if (activeSection === 'myFarm') {
                    showMyFarmSection();
                }
            });
        
    } catch (error) {
        showAlertModal('Error', 'Failed to add animal. Please try again.', 'addAnimalModal');
    }
}

// Show edit animal modal
function showEditAnimalModal(animalId) {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) return;
    
    const modal = document.getElementById('editAnimalModal');
    if (!modal) return;
    
    modal.querySelector('.modal-body').innerHTML = `
        <form id="editAnimalForm">
            <div class="form-group">
                <label for="editAnimalName">Animal Name/Nickname *</label>
                <input type="text" id="editAnimalName" name="name" required value="${animal.name}">
            </div>
            
            <div class="form-group">
                <label for="editAnimalType">Animal Type *</label>
                <select id="editAnimalType" name="type" required>
                    <option value="cow" ${animal.type === 'cow' ? 'selected' : ''}>Cow</option>
                    <option value="buffalo" ${animal.type === 'buffalo' ? 'selected' : ''}>Buffalo</option>
                    <option value="goat" ${animal.type === 'goat' ? 'selected' : ''}>Goat</option>
                    <option value="sheep" ${animal.type === 'sheep' ? 'selected' : ''}>Sheep</option>
                    <option value="chicken" ${animal.type === 'chicken' ? 'selected' : ''}>Chicken</option>
                    <option value="pig" ${animal.type === 'pig' ? 'selected' : ''}>Pig</option>
                    <option value="horse" ${animal.type === 'horse' ? 'selected' : ''}>Horse</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="editAnimalBreed">Breed</label>
                <input type="text" id="editAnimalBreed" name="breed" value="${animal.breed || ''}">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editAnimalAge">Age *</label>
                    <input type="number" id="editAnimalAge" name="age" required min="0" step="0.5" value="${animal.age}">
                </div>
                
                <div class="form-group">
                    <label for="editAnimalGender">Gender *</label>
                    <select id="editAnimalGender" name="gender" required>
                        <option value="female" ${animal.gender === 'female' ? 'selected' : ''}>Female</option>
                        <option value="male" ${animal.gender === 'male' ? 'selected' : ''}>Male</option>
                        <option value="castrated" ${animal.gender === 'castrated' ? 'selected' : ''}>Castrated Male</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="editAnimalWeight">Weight (kg)</label>
                <input type="number" id="editAnimalWeight" name="weight" min="0" value="${animal.weight || ''}">
            </div>
            
            <div class="form-group">
                <label for="editAnimalHealthStatus">Health Status</label>
                <select id="editAnimalHealthStatus" name="healthStatus">
                    <option value="healthy" ${animal.healthStatus === 'healthy' ? 'selected' : ''}>Healthy</option>
                    <option value="monitoring" ${animal.healthStatus === 'monitoring' ? 'selected' : ''}>Under Monitoring</option>
                    <option value="treatment" ${animal.healthStatus === 'treatment' ? 'selected' : ''}>Under Treatment</option>
                    <option value="critical" ${animal.healthStatus === 'critical' ? 'selected' : ''}>Critical Condition</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="editAnimalNotes">Notes</label>
                <textarea id="editAnimalNotes" name="notes" rows="3">${animal.notes || ''}</textarea>
            </div>
            
            <input type="hidden" name="animalId" value="${animal.id}">
            
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal('editAnimalModal')">Cancel</button>
                <button type="submit" class="btn-primary">Save Changes</button>
                <button type="button" class="btn-outline" onclick="deleteAnimal(${animal.id})" style="color: var(--danger-color);">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </form>
    `;
    
    openModal('editAnimalModal');
    
    // Track form changes
    trackFormChanges('editAnimalForm');
    
    // Handle form submission
    const editForm = document.getElementById('editAnimalForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditAnimal);
    }
}

// Handle edit animal
async function handleEditAnimal(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const animalId = parseInt(data.animalId);
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = animals.findIndex(a => a.id === animalId);
        if (index !== -1) {
            animals[index] = {
                ...animals[index],
                name: data.name,
                type: data.type,
                breed: data.breed,
                age: parseFloat(data.age),
                gender: data.gender,
                weight: data.weight ? parseFloat(data.weight) : null,
                healthStatus: data.healthStatus,
                notes: data.notes
            };
            
            showAlertModal('Success', 'Animal updated successfully!', 'editAnimalModal')
                .then(() => {
                    closeModal('editAnimalModal');
                    showMyFarmSection();
                });
        }
        
    } catch (error) {
        showAlertModal('Error', 'Failed to update animal. Please try again.', 'editAnimalModal');
    }
}

// Delete animal
async function deleteAnimal(animalId) {
    showConfirmModal('Delete Animal', 'Are you sure you want to delete this animal? This action cannot be undone.')
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const index = animals.findIndex(a => a.id === animalId);
                    if (index !== -1) {
                        animals.splice(index, 1);
                        
                        showAlertModal('Success', 'Animal deleted successfully!')
                            .then(() => {
                                closeModal('editAnimalModal');
                                showMyFarmSection();
                            });
                    }
                    
                } catch (error) {
                    showAlertModal('Error', 'Failed to delete animal. Please try again.');
                }
            }
        });
}

// Show animal health modal
function showAnimalHealthModal(animalId) {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) return;
    
    // Get health records for this animal (mock data)
    const animalHealthRecords = healthRecords.filter(r => r.animalId === animalId) || [];
    
    const modal = document.getElementById('animalHealthModal');
    if (!modal) return;
    
    modal.querySelector('.modal-body').innerHTML = `
        <div class="animal-health-modal">
            <div class="animal-header">
                <h3>${animal.name}'s Health Records</h3>
                <span class="health-status ${animal.healthStatus}">${animal.healthStatus}</span>
            </div>
            
            <div class="health-records-list">
                ${animalHealthRecords.length > 0 ? 
                    animalHealthRecords.map(record => `
                        <div class="health-record">
                            <div class="health-record-header">
                                <span class="health-record-type">${record.type}</span>
                                <span class="health-record-date">${record.date.toLocaleDateString()}</span>
                            </div>
                            <p class="health-record-description">${record.description}</p>
                            ${record.medication ? `<p><strong>Medication:</strong> ${record.medication}</p>` : ''}
                            ${record.vet ? `<p><strong>Veterinarian:</strong> ${record.vet}</p>` : ''}
                            ${record.nextDate ? `<p><strong>Next Due:</strong> ${record.nextDate.toLocaleDateString()}</p>` : ''}
                        </div>
                    `).join('') :
                    `<div class="empty-state">
                        <i class="fas fa-file-medical"></i>
                        <p>No health records found for ${animal.name}</p>
                    </div>`
                }
            </div>
            
            <div class="form-actions">
                <button class="btn-secondary" onclick="showAddHealthRecordModal(${animalId})">
                    <i class="fas fa-plus"></i> Add Health Record
                </button>
                <button class="btn-primary" onclick="closeModal('animalHealthModal')">
                    Close
                </button>
            </div>
        </div>
    `;
    
    openModal('animalHealthModal');
}

// Show add health record modal
function showAddHealthRecordModal(animalId = null) {
    const modal = document.getElementById('addHealthRecordModal');
    if (!modal) return;
    
    openModal('addHealthRecordModal');
    
    // Populate animal selection
    const animalSelect = document.getElementById('healthAnimal');
    if (animalSelect) {
        animalSelect.innerHTML = `
            <option value="">Select animal</option>
            ${animals.map(animal => `
                <option value="${animal.id}" ${animalId === animal.id ? 'selected' : ''}>
                    ${animal.name} (${animal.type})
                </option>
            `).join('')}
        `;
    }
}

// Handle add health record
async function handleAddHealthRecord(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newRecord = {
            id: healthRecords.length + 1,
            animalId: parseInt(data.animalId),
            type: data.type,
            date: new Date(data.date),
            description: data.description,
            vet: data.vet || '',
            medication: data.medication || '',
            nextDate: data.nextDate ? new Date(data.nextDate) : null,
            cost: data.cost ? parseFloat(data.cost) : null
        };
        
        healthRecords.push(newRecord);
        
        showAlertModal('Success', 'Health record added successfully!', 'addHealthRecordModal')
            .then(() => {
                closeModal('addHealthRecordModal');
                showNotification('Health record added!');
            });
        
    } catch (error) {
        showAlertModal('Error', 'Failed to add health record. Please try again.', 'addHealthRecordModal');
    }
}

// Show farm details modal
function showFarmDetailsModal() {
    openModal('farmDetailsModal');
}

// Handle farm details form submission
async function handleFarmDetails(e) {
    e.preventDefault();
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showAlertModal('Success', 'Farm details updated successfully!', 'farmDetailsModal')
            .then(() => {
                closeModal('farmDetailsModal');
                showNotification('Farm details updated!');
            });
        
    } catch (error) {
        showAlertModal('Error', 'Failed to update farm details. Please try again.', 'farmDetailsModal');
    }
}

// Show emergency contacts modal
function showEmergencyContactsModal() {
    const modal = document.getElementById('emergencyContactsModal');
    if (!modal) return;
    
    const contactsList = document.getElementById('emergencyContactsList');
    if (contactsList) {
        contactsList.innerHTML = emergencyContacts.map(contact => `
            <div class="emergency-contact">
                <div class="contact-info">
                    <h4>${contact.name}</h4>
                    <p>${contact.relationship} • ${contact.phone}</p>
                    ${contact.notes ? `<p><small>${contact.notes}</small></p>` : ''}
                    <span class="contact-type">${contact.type.replace('_', ' ')}</span>
                </div>
                <div class="contact-actions">
                    <button class="action-btn secondary" onclick="editEmergencyContact(${contact.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn secondary" onclick="deleteEmergencyContact(${contact.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        if (emergencyContacts.length === 0) {
            contactsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-phone"></i>
                    <p>No emergency contacts added</p>
                </div>
            `;
        }
    }
    
    openModal('emergencyContactsModal');
}

// Edit emergency contact
function editEmergencyContact(contactId = null) {
    const contact = contactId ? emergencyContacts.find(c => c.id === contactId) : null;
    const modal = document.getElementById('editEmergencyContactModal');
    if (!modal) return;
    
    modal.querySelector('#emergencyContactModalTitle').textContent = 
        contactId ? 'Edit Emergency Contact' : 'Add Emergency Contact';
    modal.querySelector('#emergencyContactSubmitBtn').textContent = 
        contactId ? 'Update Contact' : 'Add Contact';
    
    const form = document.getElementById('editEmergencyContactForm');
    if (form) {
        if (contact) {
            form.querySelector('#contactName').value = contact.name;
            form.querySelector('#contactRelationship').value = contact.relationship;
            form.querySelector('#contactPhone').value = contact.phone;
            form.querySelector('#contactAltPhone').value = contact.altPhone || '';
            form.querySelector('#contactType').value = contact.type;
            form.querySelector('#contactNotes').value = contact.notes || '';
        } else {
            form.reset();
        }
        
        // Store contact ID for updating
        form.dataset.contactId = contactId || '';
    }
    
    openModal('editEmergencyContactModal');
}

// Handle emergency contact form submission
async function handleEmergencyContact(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const contactId = form.dataset.contactId;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (contactId) {
            // Update existing contact
            const index = emergencyContacts.findIndex(c => c.id == contactId);
            if (index !== -1) {
                emergencyContacts[index] = {
                    ...emergencyContacts[index],
                    name: data.name,
                    relationship: data.relationship,
                    phone: data.phone,
                    altPhone: data.altPhone || '',
                    type: data.type,
                    notes: data.notes || ''
                };
            }
        } else {
            // Add new contact
            const newContact = {
                id: emergencyContacts.length + 1,
                name: data.name,
                relationship: data.relationship,
                phone: data.phone,
                altPhone: data.altPhone || '',
                type: data.type,
                notes: data.notes || ''
            };
            emergencyContacts.push(newContact);
        }
        
        showAlertModal('Success', 
            contactId ? 'Contact updated successfully!' : 'Contact added successfully!',
            'editEmergencyContactModal')
            .then(() => {
                closeModal('editEmergencyContactModal');
                showEmergencyContactsModal();
            });
        
    } catch (error) {
        showAlertModal('Error', 'Failed to save contact. Please try again.', 'editEmergencyContactModal');
    }
}

// Delete emergency contact
async function deleteEmergencyContact(contactId) {
    showConfirmModal('Delete Contact', 'Are you sure you want to delete this emergency contact?')
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const index = emergencyContacts.findIndex(c => c.id === contactId);
                    if (index !== -1) {
                        emergencyContacts.splice(index, 1);
                        showNotification('Emergency contact deleted!');
                        showEmergencyContactsModal();
                    }
                    
                } catch (error) {
                    showAlertModal('Error', 'Failed to delete contact. Please try again.');
                }
            }
        });
}

// Show my farm section
function showMyFarmSection() {
    contentArea.innerHTML = `
        <div class="content-header">
            <h1 class="page-title">My Farm</h1>
            <div class="header-actions">
                <button class="btn-primary" id="addAnimalBtn">
                    <i class="fas fa-plus"></i> Add Animal
                </button>
                <div class="date-display">
                    <i class="fas fa-calendar-day"></i>
                    <span id="currentDate"></span>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2 class="section-title">Farm Animals (${animals.length})</h2>
            <div class="animals-grid" id="animalsGrid">
                ${animals.length > 0 ? 
                    animals.map(animal => `
                        <div class="animal-card">
                            <div class="animal-header">
                                <h3 class="animal-name">${animal.name}</h3>
                                <span class="animal-type">${animal.type}</span>
                            </div>
                            <div class="animal-details">
                                <div class="animal-detail">
                                    <strong>Breed:</strong>
                                    <span>${animal.breed || 'Unknown'}</span>
                                </div>
                                <div class="animal-detail">
                                    <strong>Age:</strong>
                                    <span>${animal.age} years</span>
                                </div>
                                <div class="animal-detail">
                                    <strong>Gender:</strong>
                                    <span>${animal.gender}</span>
                                </div>
                                <div class="animal-detail">
                                    <strong>Weight:</strong>
                                    <span>${animal.weight ? animal.weight + ' kg' : 'Not specified'}</span>
                                </div>
                                ${animal.tag ? `
                                    <div class="animal-detail">
                                        <strong>Tag:</strong>
                                        <span>${animal.tag}</span>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="animal-health">
                                <span class="health-status ${animal.healthStatus}">
                                    <i class="fas fa-${animal.healthStatus === 'healthy' ? 'heart' : 'exclamation-triangle'}"></i>
                                    ${animal.healthStatus.charAt(0).toUpperCase() + animal.healthStatus.slice(1)}
                                </span>
                            </div>
                            <div class="animal-actions">
                                <button class="action-btn secondary" onclick="showEditAnimalModal(${animal.id})">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="action-btn primary" onclick="showAnimalHealthModal(${animal.id})">
                                    <i class="fas fa-heartbeat"></i> Health
                                </button>
                            </div>
                        </div>
                    `).join('') :
                    `<div class="empty-state">
                        <i class="fas fa-paw"></i>
                        <h3>No animals in your farm</h3>
                        <p>Add your first animal to get started</p>
                    </div>`
                }
            </div>
        </div>
        
        <div class="card">
            <div class="farm-management">
                <h2 class="section-title">Farm Management</h2>
                <div class="farm-actions">
                    <button class="action-card" onclick="showFarmDetailsModal()">
                        <i class="fas fa-edit"></i>
                        <span>Farm Details</span>
                    </button>
                    <button class="action-card" onclick="showEmergencyContactsModal()">
                        <i class="fas fa-phone"></i>
                        <span>Emergency Contacts</span>
                    </button>
                    <button class="action-card" onclick="showAddHealthRecordModal()">
                        <i class="fas fa-file-medical"></i>
                        <span>Health Records</span>
                    </button>
                    <button class="action-card" onclick="showMarketPricesModal()">
                        <i class="fas fa-chart-line"></i>
                        <span>Market Analysis</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    updateCurrentDate();
    
    document.getElementById('addAnimalBtn').addEventListener('click', showAddAnimalModal);
    
    setupScrollListeners();
    setTimeout(checkScrollIndicator, 100);
}

// ==================== NOTIFICATIONS SECTION ====================

// Show notifications section
function showNotificationsSection() {
    // Mock notifications
    const notifications = [
        { id: 1, type: 'appointment', title: 'Appointment Tomorrow', message: 'Your appointment with Dr. Thomas is scheduled for tomorrow at 10:00 AM', time: '2 hours ago', read: false },
        { id: 2, type: 'question', title: 'Question Answered', message: 'Dr. Smith has answered your question about milk production', time: '1 day ago', read: true },
        { id: 3, type: 'system', title: 'System Update', message: 'New features added to the farmer dashboard', time: '2 days ago', read: true },
        { id: 4, type: 'alert', title: 'Health Alert', message: 'Bessie\'s health status has been updated to "Under Monitoring"', time: '3 days ago', read: false }
    ];

    contentArea.innerHTML = `
        <div class="content-header">
            <h1 class="page-title">Notifications</h1>
            <div class="header-actions">
                <button class="btn-secondary" id="markAllReadBtn">
                    <i class="fas fa-check-double"></i> Mark All as Read
                </button>
                <div class="date-display">
                    <i class="fas fa-calendar-day"></i>
                    <span id="currentDate"></span>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="notifications-list" id="notificationsList">
                ${notifications.map(notification => `
                    <div class="notification-item ${notification.read ? '' : 'unread'}" data-id="${notification.id}">
                        <div class="notification-icon ${notification.type}">
                            <i class="fas fa-${notification.type === 'appointment' ? 'calendar-check' : 
                                             notification.type === 'question' ? 'question-circle' : 
                                             notification.type === 'alert' ? 'exclamation-triangle' : 'info-circle'}"></i>
                        </div>
                        <div class="notification-content">
                            <h4 class="notification-title">${notification.title}</h4>
                            <p class="notification-message">${notification.message}</p>
                            <span class="notification-time">${notification.time}</span>
                        </div>
                        <div class="notification-actions">
                            ${!notification.read ? `
                                <button class="action-btn primary mark-read-btn" data-id="${notification.id}">
                                    <i class="fas fa-check"></i> Mark Read
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    updateCurrentDate();
    
    // Add event listeners
    document.getElementById('markAllReadBtn').addEventListener('click', () => {
        unreadCounts.notifications = 0;
        updateNotificationBadges();
        showNotification('All notifications marked as read');
        showNotificationsSection();
    });
    
    document.querySelectorAll('.mark-read-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const notificationId = parseInt(btn.dataset.id);
            if (unreadCounts.notifications > 0) {
                unreadCounts.notifications--;
                updateNotificationBadges();
                showNotification('Notification marked as read');
                btn.closest('.notification-item').classList.remove('unread');
                btn.remove();
            }
        });
    });
    
    setupScrollListeners();
    setTimeout(checkScrollIndicator, 100);
}

// ==================== ACCOUNT SECTION ====================

// Show account section
function showAccountSection() {
    contentArea.innerHTML = `
        <div class="content-header">
            <h1 class="page-title">Account Settings</h1>
            <div class="date-display">
                <i class="fas fa-calendar-day"></i>
                <span id="currentDate"></span>
            </div>
        </div>
        <div class="card">
            <div class="account-sections">
                <!-- Personal Information Section -->
                <div class="account-section">
                    <h3><i class="fas fa-user"></i> Personal Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Full Name</label>
                            <p class="account-info">John Farmer</p>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <p class="account-info">john.farmer@example.com</p>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <p class="account-info">+1234567890</p>
                        </div>
                        <div class="form-group">
                            <label>Farm Name</label>
                            <p class="account-info">Green Valley Farm</p>
                        </div>
                        <div class="form-group">
                            <label>Farm Type</label>
                            <p class="account-info">Dairy Farm</p>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <p class="account-info">Rural District, County</p>
                        </div>
                    </div>
                    <button class="btn-primary" id="editAccountBtn">
                        <i class="fas fa-edit"></i> Edit Information
                    </button>
                </div>

                <!-- Security Section -->
                <div class="account-section">
                    <h3><i class="fas fa-shield-alt"></i> Security & Privacy</h3>
                    <div class="privacy-options">
                        <div class="option-item">
                            <div class="option-info">
                                <h4>Login Notifications</h4>
                                <p>Get notified when someone logs into your account</p>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="option-item">
                            <div class="option-info">
                                <h4>Email Notifications</h4>
                                <p>Receive email notifications for important updates</p>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button class="btn-primary" id="changePasswordBtn">
                            <i class="fas fa-key"></i> Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    updateCurrentDate();
    
    document.getElementById('editAccountBtn').addEventListener('click', () => {
        openModal('editAccountModal');
    });

    document.getElementById('changePasswordBtn').addEventListener('click', () => {
        openModal('changePasswordModal');
    });
    
    setupScrollListeners();
    setTimeout(checkScrollIndicator, 100);
}

// ==================== MARKET PRICES ====================

// Show market prices modal
function showMarketPricesModal() {
    const modal = document.getElementById('marketPricesModal');
    if (!modal) return;
    
    const pricesGrid = document.getElementById('marketPricesGrid');
    if (pricesGrid) {
        pricesGrid.innerHTML = mockMarketPrices.map(price => `
            <div class="price-card">
                <h4>${price.commodity}</h4>
                <div class="price-amount">${price.price}</div>
                <div class="price-change ${price.trend === 'up' ? 'positive' : 'negative'}">
                    <i class="fas fa-${price.trend === 'up' ? 'arrow-up' : 'arrow-down'}"></i>
                    ${price.change}
                </div>
            </div>
        `).join('');
    }
    
    openModal('marketPricesModal');
}

// ==================== NOTIFICATION SYSTEM ====================

// Show simple notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('newPassword');
    if (!password) return;
    
    const value = password.value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strengthText');
    const requirements = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
    };
    
    let strength = 0;
    Object.values(requirements).forEach(req => {
        if (req) strength++;
    });
    
    let width = (strength / 5) * 100;
    let color = '#ef4444';
    let text = 'Weak';
    
    if (strength >= 4) {
        color = '#10b981';
        text = 'Strong';
    } else if (strength >= 2) {
        color = '#f59e0b';
        text = 'Medium';
    }
    
    if (strengthBar) {
        strengthBar.style.width = `${width}%`;
        strengthBar.style.backgroundColor = color;
    }
    
    if (strengthText) {
        strengthText.textContent = text;
        strengthText.style.color = color;
    }
    
    // Update requirement list
    Object.keys(requirements).forEach(key => {
        const element = document.getElementById(`req${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (element) {
            if (requirements[key]) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        }
    });
}

// ==================== INITIALIZE FORMS ====================

function initializeForms() {
    // Track form changes for all forms
    Object.keys(formDirtyStates).forEach(formId => {
        trackFormChanges(formId);
    });
    
    // Book Appointment Form
    const bookAppointmentForm = document.getElementById('bookAppointmentForm');
    if (bookAppointmentForm) {
        bookAppointmentForm.addEventListener('submit', handleBookAppointment);
    }
    
    // Ask Question Form
    const askQuestionForm = document.getElementById('askQuestionForm');
    if (askQuestionForm) {
        askQuestionForm.addEventListener('submit', handleAskQuestion);
    }
    
    // Add Animal Form
    const addAnimalForm = document.getElementById('addAnimalForm');
    if (addAnimalForm) {
        addAnimalForm.addEventListener('submit', handleAddAnimal);
    }
    
    // Farm Details Form
    const farmDetailsForm = document.getElementById('farmDetailsForm');
    if (farmDetailsForm) {
        farmDetailsForm.addEventListener('submit', handleFarmDetails);
    }
    
    // Emergency Contact Form
    const emergencyContactForm = document.getElementById('editEmergencyContactForm');
    if (emergencyContactForm) {
        emergencyContactForm.addEventListener('submit', handleEmergencyContact);
    }
    
    // Edit Account Form
    const editAccountForm = document.getElementById('editAccountForm');
    if (editAccountForm) {
        editAccountForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                showAlertModal('Success', 'Account information updated successfully!', 'editAccountModal')
                    .then(() => {
                        closeModal('editAccountModal');
                        showAccountSection();
                    });
            } catch (error) {
                showAlertModal('Error', 'Failed to update account. Please try again.', 'editAccountModal');
            }
        });
    }
    
    // Change Password Form
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                showAlertModal('Success', 'Password changed successfully!', 'changePasswordModal')
                    .then(() => {
                        closeModal('changePasswordModal');
                    });
            } catch (error) {
                showAlertModal('Error', 'Failed to change password. Please try again.', 'changePasswordModal');
            }
        });
    }
    
    // Add Health Record Form
    const addHealthRecordForm = document.getElementById('addHealthRecordForm');
    if (addHealthRecordForm) {
        addHealthRecordForm.addEventListener('submit', handleAddHealthRecord);
    }
    
    // Setup modal close handlers
    const modals = [
        'bookAppointmentModal', 'askQuestionModal', 'addAnimalModal', 
        'editAnimalModal', 'farmDetailsModal', 'editAccountModal',
        'changePasswordModal', 'addHealthRecordModal', 'editEmergencyContactModal'
    ];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    const form = modal.querySelector('form');
                    if (form && formDirtyStates[form.id]) {
                        showConfirmModal('Unsaved Changes', 
                            'You have unsaved changes. Are you sure you want to close?',
                            modalId)
                            .then((confirmed) => {
                                if (confirmed) {
                                    resetForm(form);
                                    closeModal(modalId);
                                }
                            });
                    } else {
                        closeModal(modalId);
                    }
                });
            }
        }
    });
    
    // Setup password strength checker
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', checkPasswordStrength);
    }
}

// ==================== SETUP SIDEBAR NAVIGATION ====================

function setupSidebarNavigation() {
    // Book Appointment
    bookAppointmentNav.addEventListener('click', (e) => {
        e.preventDefault();
        updateNavActiveState(bookAppointmentNav);
        activeSection = 'bookAppointment';
        showBookAppointmentSection();
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // My Questions
    myQuestionsNav.addEventListener('click', (e) => {
        e.preventDefault();
        updateNavActiveState(myQuestionsNav);
        activeSection = 'myQuestions';
        showMyQuestionsSection();
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // News
    newsNav.addEventListener('click', (e) => {
        e.preventDefault();
        updateNavActiveState(newsNav);
        activeSection = 'news';
        showNewsSection();
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Resources
    resourcesNav.addEventListener('click', (e) => {
        e.preventDefault();
        updateNavActiveState(resourcesNav);
        activeSection = 'resources';
        showResourcesSection();
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // My Farm
    myFarmNav.addEventListener('click', (e) => {
        e.preventDefault();
        updateNavActiveState(myFarmNav);
        activeSection = 'myFarm';
        showMyFarmSection();
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Notifications
    notificationsNav.addEventListener('click', (e) => {
        e.preventDefault();
        updateNavActiveState(notificationsNav);
        activeSection = 'notifications';
        showNotificationsSection();
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Account
    accountNav.addEventListener('click', (e) => {
        e.preventDefault();
        updateNavActiveState(accountNav);
        activeSection = 'account';
        showAccountSection();
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==================== INITIALIZE DASHBOARD ====================

function initDashboard() {
    updateCurrentDate();
    updateNotificationBadges();
    initializeForms();
    setupSidebarNavigation();
    
    // Setup quick action buttons
    if (quickBookAppointment) {
        quickBookAppointment.addEventListener('click', showBookAppointmentModal);
    }
    if (quickAskQuestion) {
        quickAskQuestion.addEventListener('click', showAskQuestionModal);
    }
    if (quickAddAnimal) {
        quickAddAnimal.addEventListener('click', showAddAnimalModal);
    }
    if (quickViewMarket) {
        quickViewMarket.addEventListener('click', showMarketPricesModal);
    }
    
    // Set default active section
    if (dashboardOverview) {
        dashboardOverview.addEventListener('click', (e) => {
            e.preventDefault();
            updateNavActiveState(dashboardOverview);
            activeSection = 'dashboardOverview';
            showDashboardOverview();
            
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Start with dashboard overview
        dashboardOverview.click();
    }
    
    // Add scroll indicator check on load
    setTimeout(checkScrollIndicator, 500);
}

// Start the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

// Handle window resize for responsive tables
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (activeSection === 'bookAppointment') {
            showBookAppointmentSection();
        } else if (activeSection === 'myQuestions') {
            showMyQuestionsSection();
        } else if (activeSection === 'myFarm') {
            showMyFarmSection();
        }
    }, 250);
});