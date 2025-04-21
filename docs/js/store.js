// Seletor de Tema
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.documentElement.setAttribute('data-theme', btn.dataset.theme);
        localStorage.setItem('theme', btn.dataset.theme);
    });
});

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`).classList.add('active');

// Dados dos produtos (simulando API)
const products = [
    {
        id: 1,
        name: "Base Líquida HD",
        category: "maquiagem",
        price: 89.90,
        description: "Cobertura natural de longa duração",
        image: "placeholder-maquiagem" // Substituir por imagem real
    },
    // Adicione +15 produtos com categorias diferentes...
];

// Carrinho
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const miniCart = document.querySelector('.mini-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

// Renderiza produtos
function renderProducts(category = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.name}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Adiciona eventos aos botões
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Adiciona ao carrinho
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Atualiza carrinho
function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.quantity} × R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.quantity * item.price;
    });
    
    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    
    // Adiciona eventos de remoção
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Remove do carrinho
function removeFromCart(e) {
    const productId = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.category);
    });
});

// Abrir/fechar carrinho
document.querySelector('.cart-icon').addEventListener('click', () => {
    miniCart.classList.add('active');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    miniCart.classList.remove('active');
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Verifica parâmetro de categoria na URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    
    // Ativa o filtro correspondente
    const activeBtn = document.querySelector(`.filter-btn[data-category="${category}"]`) 
                    || document.querySelector('.filter-btn[data-category="all"]');
    activeBtn.classList.add('active');
    
    renderProducts(category);
});