/* --- UNIVERSAL MODAL LOGIC --- */

// Function to open the modal
function openOrderModal() {
    const modal = document.getElementById("orderModal");
    const productTitleElement = document.getElementById('productTitle');
    
    if (modal) {
        if (productTitleElement) {
            const currentTitle = productTitleElement.innerText;
            document.getElementById("modalProductTitle").innerText = "Order: " + currentTitle;
            document.getElementById("productName").value = currentTitle;
        }
        modal.style.display = "block";
    }
}

function closeOrderModal() {
    const modal = document.getElementById("orderModal");
    if (modal) modal.style.display = "none";
}
function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        let cart = JSON.parse(localStorage.getItem('marklee_cart')) || [];
        cart.push(id);
        localStorage.setItem('marklee_cart', JSON.stringify(cart));
        
        window.location.href = 'cart.html'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("orderModal");
    const whatsappForm = document.getElementById("whatsappForm");

    const orderButtons = document.querySelectorAll(".order-btn");
    if (orderButtons.length > 0) {
        orderButtons.forEach(btn => {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const productCard = this.closest(".product-card");
                if (productCard) {
                    const product = productCard.querySelector("h5").innerText;
                    document.getElementById("modalProductTitle").innerText = "Order: " + product;
                    document.getElementById("productName").value = product;
                    if (modal) modal.style.display = "block";
                }
            });
        });
    }

    if (whatsappForm) {
        whatsappForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const product = document.getElementById("productName").value;
            const name = document.getElementById("userName").value;
            const phone = document.getElementById("userPhone").value;
            const wa = document.getElementById("userWhatsapp").value;
            const address = document.getElementById("userAddress").value;
            const pin = document.getElementById("userPincode").value;

            const message = `*NEW ORDER - MARKLEE*%0A%0A` +
                            `*Product:* ${product}%0A` +
                            `*Customer Name:* ${name}%0A` +
                            `*Phone:* ${phone}%0A` +
                            `*WhatsApp:* ${wa}%0A` +
                            `*Address:* ${address}%0A` +
                            `*Pincode:* ${pin}`;

            const whatsappNumber = "918089636070";
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            
            whatsappForm.reset();
            closeOrderModal();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) closeOrderModal();
    });
});