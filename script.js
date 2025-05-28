// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Product Data
const products = [
    {
        id: 1,
        name: "Premium Runner",
        price: 129.99,
        description: "Lightweight running shoes with responsive cushioning for optimal performance.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Running",
        size: [7, 8, 9, 10, 11, 12],
        color: ["Black", "White"],
        dateAdded: "2025-01-01"
    },
    {
        id: 2,
        name: "Classic Sneakers",
        price: 89.99,
        description: "Timeless design meets modern comfort.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Sneakers",
        size: [7, 8, 9, 10, 11],
        color: ["White", "Blue"],
        dateAdded: "2025-02-15"
    },
    {
        id: 3,
        name: "Hiking Boots",
        price: 159.99,
        description: "Durable waterproof boots with superior traction for all your outdoor adventures.",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "Boots",
        size: [8, 9, 10, 11, 12],
        color: ["Black", "Gray"],
        dateAdded: "2024-12-10"
    },
    {
        id: 4,
        name: "Casual Loafers",
        price: 79.99,
        description: "Sophisticated slip-ons perfect for both office and weekend wear.",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "Casual",
        size: [7, 8, 9, 10],
        color: ["Black", "Red"],
        dateAdded: "2025-03-01"
    },
    {
        id: 5,
        name: "Basketball High-Tops",
        price: 119.99,
        description: "High-performance basketball shoes with ankle support and responsive cushioning.",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        category: "Sneakers",
        size: [9, 10, 11, 12],
        color: ["White", "Red"],
        dateAdded: "2025-04-20"
    },
    {
        id: 6,
        name: "Slip-Resistant Work Shoes",
        price: 99.99,
        description: "Comfortable and safe footwear for professionals who are always on their feet.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Casual",
        size: [7, 8, 9, 10, 11, 12],
        color: ["Black"],
        dateAdded: "2025-02-01"
    },
    {
        id: 7,
        name: "Chelsea Boots",
        price: 149.99,
        description: "Stylish ankle boots with elastic sides.",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
        category: "Boots",
        size: [8, 9, 10, 11],
        color: ["Black", "Gray"],
        dateAdded: "2025-01-15"
    },
    {
        id: 11,
        name: "Winter Boots",
        price: 179.99,
        description: "Insulated snow boots for cold climates.",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Boots",
        size: [8, 9, 10, 11, 12],
        color: ["Black", "White"],
        dateAdded: "2024-11-01"
    }
];

// State for filters, sorting, and pagination
let currentFilters = {
    category: 'All Shoes',
    priceMax: 300,
    size: null,
    color: null
};
let currentSort = 'Featured';
let currentPage = 1;
const productsPerPage = 12;

// DOM Elements
const productsContainer = document.getElementById('products-container');
const sortSelect = document.querySelector('select');
const priceRange = document.querySelector('input[type="range"]');
const categoryLinks = document.querySelectorAll('.sidebar ul li a');
const sizeButtons = document.querySelectorAll('.size-btn');
const colorButtons = document.querySelectorAll('.sidebar .w-6');
const paginationNav = document.querySelector('.shop-content nav');
const showingText = document.querySelector('.products-grid .text-gray-600');

// Filter and Sort Products
function filterAndSortProducts() {
    let filteredProducts = [...products];

    // Apply Category Filter
    if (currentFilters.category !== 'All Shoes') {
        filteredProducts = filteredProducts.filter(product => product.category === currentFilters.category);
    }

    // Apply Price Filter
    filteredProducts = filteredProducts.filter(product => product.price <= currentFilters.priceMax);

    // Apply Size Filter
    if (currentFilters.size) {
        filteredProducts = filteredProducts.filter(product => product.size.includes(parseInt(currentFilters.size)));
    }

    // Apply Color Filter
    if (currentFilters.color) {
        filteredProducts = filteredProducts.filter(product => product.color.includes(currentFilters.color));
    }

    // Apply Sorting
    switch (currentSort) {
        case 'Price: Low to High':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'Price: High to Low':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'Newest Arrivals':
            filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'Best Sellers':
            // Placeholder: Assume products with lower IDs are best sellers
            filteredProducts.sort((a, b) => a.id - b.id);
            break;
        default:
            // Featured: Default order
            break;
    }

    return filteredProducts;
}

// Display Products
function displayProducts(page = 1) {
    const filteredProducts = filterAndSortProducts();
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    // Update Showing Text
    showingText.textContent = `Showing ${start + 1}-${Math.min(end, filteredProducts.length)} of ${filteredProducts.length} products`;

    // Clear Products Container
    productsContainer.innerHTML = '';

    // Render Product Cards
    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300';
        productCard.innerHTML = `
            <div class="product-image h-48 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold">$${product.price.toFixed(2)}</span>
                    <button class="view-details-btn text-orange-500 font-medium" data-id="${product.id}">View Details</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Re-attach event listeners for view details buttons
    attachViewDetailsListeners();

    // Update Pagination
    updatePagination(filteredProducts.length);
}

// Update Pagination
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    paginationNav.innerHTML = '';

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.className = 'px-3 py-1 rounded border hover:bg-orange-500 hover:text-white';
    prevButton.textContent = '«';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(currentPage);
            scrollToProducts();
        }
    });
    paginationNav.appendChild(prevButton);

    // Page Buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `px-3 py-1 rounded border ${i === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-orange-500 hover:text-white'}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayProducts(currentPage);
            scrollToProducts();
        });
        paginationNav.appendChild(pageButton);
    }

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.className = 'px-3 py-1 rounded border hover:bg-orange-500 hover:text-white';
    nextButton.textContent = '»';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(currentPage);
            scrollToProducts();
        }
    });
    paginationNav.appendChild(nextButton);
}

// Smooth Scroll to Products
function scrollToProducts() {
    const productsSection = document.querySelector('.products-grid');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Filter Event Listeners
// Category Filter
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        categoryLinks.forEach(l => l.classList.remove('text-orange-500'));
        link.classList.add('text-orange-500');
        currentFilters.category = link.textContent;
        currentPage = 1;
        displayProducts();
    });
});

// Price Range Filter
priceRange.addEventListener('input', () => {
    currentFilters.priceMax = parseInt(priceRange.value);
    currentPage = 1;
    displayProducts();
});

// Size Filter
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('bg-orange-500', 'text-white'));
        button.classList.add('bg-orange-500', 'text-white');
        currentFilters.size = button.textContent;
        currentPage = 1;
        displayProducts();
    });
});

// Color Filter
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        colorButtons.forEach(btn => btn.classList.remove('ring-2', 'ring-orange-500'));
        button.classList.add('ring-2', 'ring-orange-500');
        const colorMap = {
            'bg-black': 'Black',
            'bg-white': 'White',
            'bg-red-500': 'Red',
            'bg-blue-500': 'Blue',
            'bg-gray-500': 'Gray'
        };
        currentFilters.color = colorMap[button.className.match(/bg-[a-z0-9-]+/)[0]];
        currentPage = 1;
        displayProducts();
    });
});

// Sort Event Listener
sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    currentPage = 1;
    displayProducts();
});

// Modal Functionality
const modal = document.getElementById('productModal');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalClose = document.querySelector('.modal-close');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const quantityInput = document.querySelector('.quantity-input');
const addToCartBtn = document.getElementById('addToCart');
const cartCount = document.querySelector('.cart-count');

let currentProduct = null;
let cartItems = 0;

// View Product Details
function attachViewDetailsListeners() {
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            currentProduct = products.find(p => p.id === productId);
            
            modalProductTitle.textContent = currentProduct.name;
            modalProductImage.src = currentProduct.image;
            modalProductDescription.textContent = currentProduct.description;
            modalProductPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close Modal
modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Quantity Controls
incrementBtn.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

decrementBtn.addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// Add to Cart
addToCartBtn.addEventListener('click', () => {
    if (currentProduct) {
        const quantity = parseInt(quantityInput.value);
        cartItems += quantity;
        cartCount.textContent = cartItems;
        
        alert(`${quantity} ${currentProduct.name}(s) added to cart!`);
        
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput.value) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    }
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize Products
displayProducts();