let searchForm = document.querySelector('.header .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
    navbar.classList.remove('activate');
}

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

// carito de compras implementado 

const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();
let carritoArray = [];

// Delegación de eventos:
document.addEventListener("click", (e) => {
    // console.log(e);
    // console.log(e.target.dataset.bear);
    // console.log(e.target.matches(".card button"));
    if (e.target.matches(".content button")) {
        agregarCarrito(e);
    }

    // console.log(e.target.matches(".list-group-item .btn-success"));
    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e);
    }

    // console.log(e.target.matches(".list-group-item .btn-danger"));
    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
});

const agregarCarrito = (e) => {
    // console.log(e.target.dataset);
    const producto = {
        titulo: e.target.dataset.bear,
        id: e.target.dataset.bear,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    };

    // buscamos el indice
    const index = carritoArray.findIndex((item) => item.id === producto.id);

    // si no existe empujamos el nuevo elemento
    if (index === -1) {
        carritoArray.push(producto);
    } else {
        // en caso contrario aumentamos su cantidad
        carritoArray[index].cantidad++;
    }

    // console.log(carritoArray);
    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent = "";

    // recorremos el carrito y pintamos elementos:
    carritoArray.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent =
            item.precio * item.cantidad;
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);

    pintarFooter();
};

const pintarFooter = () => {
    footer.textContent = "";

    const total = carritoArray.reduce(
        (acc, current) => acc + current.precio * current.cantidad,
        0
    );

    // console.log(total);

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    // fragment.appendChild(clone);
    footer.appendChild(clone);
};

const btnAumentar = (e) => {
    // console.log(e.target.dataset.id);
    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    // console.log(e.target.dataset.id);
    carritoArray = carritoArray.filter((item) => {
        // console.log(item);
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                // console.log(item);
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    pintarCarrito();
};