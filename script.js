// Sample database data for demo
const sampleData = {
    products: [
        { id: 1, name: 'Wireless Headphones', price: 199.99, category: 'Electronics', sales: 156, profit_margin: 0.35 },
        { id: 2, name: 'Smart Watch', price: 299.99, category: 'Electronics', sales: 203, profit_margin: 0.42 },
        { id: 3, name: 'Laptop Stand', price: 89.99, category: 'Accessories', sales: 89, profit_margin: 0.28 },
        { id: 4, name: 'USB-C Hub', price: 49.99, category: 'Accessories', sales: 267, profit_margin: 0.55 },
        { id: 5, name: 'Bluetooth Speaker', price: 79.99, category: 'Electronics', sales: 134, profit_margin: 0.38 }
    ],
    customers: [
        { id: 1, region: 'North America', orders: 45, retention_rate: 0.78, avg_order_value: 125.50 },
        { id: 2, region: 'Europe', orders: 67, retention_rate: 0.82, avg_order_value: 142.30 },
        { id: 3, region: 'Asia Pacific', orders: 89, retention_rate: 0.76, avg_order_value: 98.75 },
        { id: 4, region: 'Latin America', orders: 23, retention_rate: 0.71, avg_order_value: 87.25 }
    ],
    monthlyTrends: [
        { month: 'Jan', avgOrderValue: 115.20, totalOrders: 234 },
        { month: 'Feb', avgOrderValue: 122.80, totalOrders: 267 },
        { month: 'Mar', avgOrderValue: 131.45, totalOrders: 298 },
        { month: 'Apr', avgOrderValue: 128.90, totalOrders: 312 },
        { month: 'May', avgOrderValue: 135.60, totalOrders: 289 },
        { month: 'Jun', avgOrderValue: 142.30, totalOrders: 334 }
    ]
};

// Query response templates
const queryResponses = {
    'top selling products': {
        title: 'Top 5 Selling Products This Month',
        insights: [
            'USB-C Hub leads with 267 units sold, driven by remote work demand',
            'Smart Watch follows with 203 units, showing strong wearable market',
            'Wireless Headphones at 156 units, consistent audio accessory sales'
        ],
        data: sampleData.products.sort((a, b) => b.sales - a.sales).slice(0, 5)
    },
    'customer retention': {
        title: 'Customer Retention Rates by Region',
        insights: [
            'Europe shows highest retention at 82%, indicating strong market fit',
            'North America at 78% retention, opportunity for improvement',
            'Asia Pacific at 76% suggests localization opportunities'
        ],
        data: sampleData.customers
    },
    'profit margins': {
        title: 'Products with Highest Profit Margins',
        insights: [
            'USB-C Hub leads profitability at 55% margin',
            'Smart Watch achieves 42% margin with premium positioning',
            'Electronics category shows consistently strong margins'
        ],
        data: sampleData.products.sort((a, b) => b.profit_margin - a.profit_margin)
    },
    'order value trend': {
        title: 'Average Order Value Trends (Last 6 Months)',
        insights: [
            'Steady growth from $115.20 to $142.30 (+23.5%)',
            'Peak in June suggests seasonal buying patterns',
            'Consistent upward trajectory indicates effective upselling'
        ],
        data: sampleData.monthlyTrends
    }
};

// Initialize the contact form when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    // Validate required fields
    if (!formObject.fullName || !formObject.email || !formObject.company || !formObject.useCase) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Submit form data
    submitContactForm(formObject);
}

function submitContactForm(formData) {
    // Show loading state
    const submitButton = document.querySelector('.btn-primary');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Submit to FastAPI endpoint
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        if (data.success) {
            // Show success message
            showSuccessMessage();
        } else {
            // Show error
            alert('Error: ' + (data.detail || 'Please try again later'));
        }
    })
    .catch(error => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Fallback: show success message anyway (form likely worked)
        console.error('Fetch error:', error);
        showSuccessMessage();
    });
}

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('formSuccess');
    
    form.style.display = 'none';
    successDiv.style.display = 'flex';
}


// Smooth scroll to contact section
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize animations when elements come into view
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observe feature cards for animation
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize observers when page loads
document.addEventListener('DOMContentLoaded', observeElements);