  // Preloader
  window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('fade-out');
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 500);
});

// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});




// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll

        // Mobile Navigation Toggle
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        
        // Close modal functionality
      
        const appointmentDate = document.getElementById('appointmentDate');
        const timeSlotsContainer = document.getElementById('timeSlots');
        
        // Minimum date for the appointment date
        appointmentDate.min = new Date().toISOString().split('T')[0];
        
        // Generate time slots based on the selected date
        function generateTimeSlots() {
            // Clear previous slots
            timeSlotsContainer.innerHTML = '';
        
            // Define available times
            const hours = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
        
            // Display time slots dynamically
            hours.forEach(time => {
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = time;
        
                // Add click event to select a time slot
                timeSlot.addEventListener('click', () => {
                    // Deselect previous slot
                    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
                    // Select new slot
                    timeSlot.classList.add('selected');
                });
        
                // Append to container
                timeSlotsContainer.appendChild(timeSlot);
            });
        }
        
        // Listen for date selection change
        appointmentDate.addEventListener('change', generateTimeSlots);
        
   
    
        // Add hover effects for service cards
        

    // Modal functionality
    const modal = document.getElementById('serviceModal');
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
            
            icon.style.transform = `
                translate(${(x - centerX) / 10}px, ${(y - centerY) / 10}px)
                scale(1.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            icon.style.transform = '';
        });
    });const services = {
    cosmetic: {
        icon: 'fas fa-teeth',
        title: 'Cosmetic Dentistry',
        description: `Transform your smile with our premium cosmetic dentistry services. We offer a comprehensive range of treatments to enhance your smile's appearance and boost your confidence.`,
        features: [
            'Custom Porcelain Veneers',
            'Professional Teeth Whitening',
            'Smile Makeover',
            'Dental Bonding',
            'Gum Contouring',
            'Crown Lengthening'
        ],
        priceRange: 'Starting from 500'
    },
    implants: {
        icon: 'fas fa-tooth',
        title: 'Dental Implants',
        description: `Replace missing teeth with our state-of-the-art dental implants. Our expert team uses the latest technology to ensure the best possible results.`,
        features: [
            'Single Tooth Implants',
            'Full Arch Replacement',
            'All-on-4 Implants',
            'Implant-Supported Bridges',
            '3D Treatment Planning',
            'Guided Implant Surgery'
        ],
        priceRange: 'Starting from 3,000'
    },
    orthodontics: {
        icon: 'fas fa-teeth-open',
        title: 'Orthodontics',
        description: `Achieve a perfectly aligned smile with our advanced orthodontic treatments. We offer both traditional and modern solutions to suit your needs.`,
        features: [
            'Invisalign Clear Aligners',
            'Traditional Braces',
            'Ceramic Braces',
            'Lingual Braces',
            'Accelerated Orthodontics',
            'Retainers'
        ],
        priceRange: 'Starting from 2,500'
    }
};
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const service = services[card.dataset.service];
            
            // Update modal content
            modal.querySelector('.modal-icon').className = `modal-icon ${service.icon}`;
            modal.querySelector('.modal-title').textContent = service.title;
            
            // Create modal body content
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <p>${service.description}</p>
                <div class="price-tag">${service.priceRange}</div>
                <h4 style="color: var(--secondary); margin-bottom: 1rem;">Features & Benefits</h4>
                <div class="service-features">
                    ${service.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check feature-icon"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Add hover effects for service cards
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                translateY(-10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
            
            icon.style.transform = `
                translate(${(x - centerX) / 10}px, ${(y - centerY) / 10}px)
                scale(1.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            icon.style.transform = '';
        });
    });

    const scheduleConsultationBtn = document.getElementById("scheduleConsultationBtn");
const appointmentModal = document.getElementById("appointmentModal");
const closeAppointmentModalBtn = document.getElementById("closeAppointmentModal");

// Open modal function
function openAppointmentModal() {
    appointmentModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Close modal function
function closeAppointmentModal() {
    appointmentModal.classList.remove("active");
    document.body.style.overflow = ""; // Restore background scrolling
}

// Event listeners for open and close
scheduleConsultationBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    openAppointmentModal();
});

closeAppointmentModalBtn.addEventListener("click", closeAppointmentModal);

// Close modal when clicking outside the content area
window.addEventListener("click", (event) => {
    if (event.target === appointmentModal) {
        closeAppointmentModal();
    }
});

