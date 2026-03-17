document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});

const productData = {
    'shoe-rack': {
        title: 'Shoe Rack Key Features',
        points: [
            'Space-saving 5-tier vertical design',
            'Magnetic locking system for safety',
            'Air-ventilation holes to prevent odor',
            'Premium powder-coated metallic finish'
        ]
    },
    'ironing-table': {
        title: 'Ironing Table Excellence',
        points: [
            'Heat-resistant cotton padding surface',
            'Multi-level height adjustment settings',
            'Robust non-slip safety leg caps',
            'Integrated steam iron rest plate'
        ]
    },
    'chopper': {
        title: 'Precision Chopper Features',
        points: [
            'Ultra-sharp stainless steel triple blades',
            'One-touch ergonomic pull mechanism',
            'BPA-free high-impact plastic body',
            'Dishwasher safe and easy to clean'
        ]
    },
    'cooker': {
        title: 'Pressure Cooker Safety',
        points: [
            'High-grade virgin aluminum construction',
            'Lead-free safety valve system',
            'Controlled Gasket-Release System (GRS)',
            'Stay-cool ergonomic Bakelite handles'
        ]
    },
    'airfryer': {
        title: 'Digital Air Fryer Innovation',
        points: [
            '360° Rapid Air Circulation technology',
            'Digital touch control with 8 presets',
            'Non-stick PFOA-free frying basket',
            'Auto-shutoff and overheat protection'
        ]
    }
};

function openFeatures(productId) {
    const modal = document.getElementById('featuresModal');
    const title = document.getElementById('featuresTitle');
    const list = document.getElementById('featuresList');
    
    const data = productData[productId];
    
    if (data) {
        title.innerText = data.title;
        
        list.innerHTML = data.points.map(p => `<li>${p}</li>`).join('');
        
        modal.style.display = 'block';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeFeatures() {
    const modal = document.getElementById('featuresModal');
    
    if (modal) {
       
        modal.style.display = "none";
        
        document.body.style.overflow = 'auto';
        
        modal.style.opacity = '1'; 
    }
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('featuresModal');
    if (event.target === modal) {
        closeFeatures();
    }
});


function changeImage(src) {
    document.getElementById('main-product-img').src = src;
   
    const thumbs = document.querySelectorAll('.thumbnail-stack img');
    thumbs.forEach(t => t.classList.remove('active-thumb'));
    event.target.classList.add('active-thumb');
}


function handleAddToCart() {
    const title = document.getElementById('detail-title').innerText;
    let cart = JSON.parse(localStorage.getItem('marklee_cart')) || [];
    
    cart.push({
        name: title,
        price: 1800,
        date: new Date().toLocaleDateString()
    });
    
    localStorage.setItem('marklee_cart', JSON.stringify(cart));
    updateCartBadge();
    alert(`${title} added to your bag.`);
}
let currentImageIndex = 0; 
let activeImages = [];    

function initPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'shoe-rack';
    const product = productRegistry[productId];

    if (product) {
        activeImages = product.images; 
        currentImageIndex = 0;         
        
        document.getElementById('productTitle').innerText = product.name;
        document.getElementById('productPrice').innerText = product.price;
        
        updateSliderUI(); 
        const featureList = document.getElementById('productFeatures');
        featureList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    }
}


function changeSlide(direction) {
   
    currentImageIndex += direction;

    if (currentImageIndex >= activeImages.length) {
        currentImageIndex = 0;
    }
    
    if (currentImageIndex < 0) {
        currentImageIndex = activeImages.length - 1;
    }

    updateSliderUI();
}

function updateGallery(index) {
    currentImageIndex = index;
    updateSliderUI();
}

function updateSliderUI() {
    const mainImg = document.getElementById('mainImg');
    mainImg.src = activeImages[currentImageIndex];

    const thumbStack = document.getElementById('thumbStack');
    thumbStack.innerHTML = activeImages.map((img, i) => 
        `<img src="${img}" class="thumb-img ${i === currentImageIndex ? 'active' : ''}" 
         onclick="updateGallery(${i})">`
    ).join('');
}
function updateCartBadge() {
    
    const cart = JSON.parse(localStorage.getItem('marklee_cart')) || [];
    
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
function handleTrackOrder() {
  
    const orderID = prompt("Please enter your Marklee Order ID (e.g., ML-1001):");
    
   
    if (orderID && orderID.trim() !== "") {
        const message = `*ORDER TRACKING REQUEST*%0A%0A` +
                        `Hello Marklee Concierge, I would like to check the status of my order.%0A%0A` +
                        `*Order ID:* ${orderID.trim()}`;

        const whatsappUrl = `https://wa.me/918089636070?text=${message}`;
        window.open(whatsappUrl, '_blank');
    } else if (orderID !== null) {
        
        alert("Please enter a valid Order ID to proceed.");
    }
}
function triggerBulkInquiry() {
    const company = prompt("Please enter your Company/Project Name:");
    if (company) {
        const message = `*BULK INQUIRY - MARKLEE LUXURY*%0A%0A` +
                        `*Project:* ${company}%0A` +
                        `*Request:* I would like to discuss a bulk procurement or professional collaboration for an upcoming project. Please share your corporate catalog and B2B pricing.`;
        
        window.open(`https://wa.me/918089636070?text=${message}`, '_blank');
    }
}