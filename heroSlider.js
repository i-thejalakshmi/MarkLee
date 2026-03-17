const contextMenu = document.getElementById('custom-context-menu');

window.addEventListener('contextmenu', (e) => {
    e.preventDefault(); 
    const { clientX: mouseX, clientY: mouseY } = e;
    
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${mouseX}px`;
    contextMenu.style.top = `${mouseY}px`;
});

window.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});


function copySiteLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('Marklee link copied to clipboard.');
}


function orderViaWhatsApp(product, price) {
    const message = `Hello Marklee Team, I would like to know more about ${product}.`;
    const whatsappUrl = `https://wa.me/918089636070?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}