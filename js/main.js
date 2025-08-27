// Navigation Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Sample Menu Data
const menuItems = [
    {
        category: 'Entradas',
        items: [
            {
                name: 'Tabla de Quesos Artesanales',
                description: 'Selección de quesos locales, miel de la región y frutos secos',
                price: '$2800',
                image: 'assets/menu/picada'
            },
            {
                name: 'Provoleta Rústica',
                description: 'Provoleta a la parrilla con orégano y aceite de oliva',
                price: '$2200',
                image: 'assets/menu/provoleta.jpeg'
            }
        ]
    },
    {
        category: 'Principales',
        items: [
            {
                name: 'Hamburguesa Vieja Estación',
                description: 'Blend de carne premium, queso ahumado, panceta crocante, cebolla caramelizada en pan de papa',
                price: '$3200',
                image: 'assets/menu/burga.jpeg'
            },
            {
                name: 'Risotto de Hongos',
                description: 'Risotto cremoso con mix de hongos frescos y queso parmesano',
                price: '$2900',
                image: 'assets/menu/risoto'
            }
        ]
    },
    {
        category: 'Para Compartir',
        items: [
            {
                name: 'Papas Vieja Estación',
                description: 'Papas rústicas con salsa cheddar, panceta crocante y verdeo',
                price: '$2400',
                image: 'assets/menu/papas.jpeg'
            },
            {
                name: 'Nachos Cargados',
                description: 'Nachos con chili de carne, guacamole, pico de gallo y crema agria',
                price: '$2600',
                image: 'assets/menu/nachos.jpeg'
            }
        ]
    }
];

// Sample Events Data
const events = [
    {
        day: 'Miércoles',
        band: 'Jazz Quartet Local',
        description: 'Noche de Jazz & Blues',
        time: '21:00',
        image: 'assets/rolling2.jpeg'
    },
    {
        day: 'Miércoles',
        band: 'Jazz Quartet Local',
        description: 'Noche de Jazz & Blues',
        time: '21:00',
        image: 'assets/quuen.jpeg'
    },
    {
        day: 'Jueves',
        band: 'Acoustic Sessions',
        description: 'Música acústica en vivo',
        time: '21:30',
        image: 'assets/img3.jpeg'
    },
    {
        day: 'Viernes',
        band: 'Rock Revival',
        description: 'Clásicos del rock nacional e internacional',
        time: '22:00',
        image: 'assets/img1.jpeg'
    },
    {
        day: 'Sábado',
        band: 'Banda invitada',
        description: 'Shows especiales cada semana',
        time: '22:30',
        image: 'assets/images.jpeg'
    },
    {
        day: 'Domingo',
        band: 'Sunset Sessions',
        description: 'Música en vivo al atardecer',
        time: '20:00',
        image: 'assets/descarga.jpeg'
    }
];

// Populate Menu
function populateMenu() {
    const menuContainer = document.querySelector('.menu-categories');
    menuItems.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.classList.add('menu-category');
        
        categorySection.innerHTML = `
            <h3 class="category-title">${category.category}</h3>
            <div class="category-items"></div>
        `;
        
        const categoryItems = categorySection.querySelector('.category-items');
        
        category.items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <div class="menu-item-content">
                    <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                    <div class="menu-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
                <span class="menu-item-price">${item.price}</span>
            `;
            categoryItems.appendChild(menuItem);
        });
        
        menuContainer.appendChild(categorySection);
    });
}

// Populate Events
function populateEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-card');
        eventItem.innerHTML = `
            <img src="${event.image}" alt="${event.band}" class="event-image">
            <h3>${event.day}</h3>
            <h4>${event.band}</h4>
            <p>${event.description}</p>
            <span class="event-time"><i class="far fa-clock"></i> ${event.time}</span>
        `;
        eventsGrid.appendChild(eventItem);
    });
}

// Handle Reservation Form
document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const people = document.getElementById('people').value;
    const name = document.getElementById('name').value;
    
    // Format the WhatsApp message
    const message = `Hola! Me gustaría hacer una reserva:
    - Fecha: ${date}
    - Hora: ${time}
    - Personas: ${people}
    - Nombre: ${name}`;
    
    // Create WhatsApp link with the message
    const whatsappLink = `https://wa.me/2996120756?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');
});

// Initialize Reviews Carousel
function initReviewsCarousel() {
    const track = document.querySelector('.reviews-track');
    const reviews = document.querySelectorAll('.review-card');
    
    // Clone reviews for infinite scroll
    reviews.forEach(review => {
        const clone = review.cloneNode(true);
        track.appendChild(clone);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateMenu();
    populateEvents();
    initReviewsCarousel();
});
