const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const carritoContenedor = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let carrito = [];


eventListeners();
function eventListeners() {

    listaCursos.addEventListener('click', agregarCurso);

    carritoContenedor.addEventListener('click', eliminarCarrito);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}


function agregarCurso(e) {
   
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const cursoClick = e.target.parentElement.parentElement;

        leerDatosCurso(cursoClick);
    }

}


function leerDatosCurso (curso) {

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    const existe = carrito.some(curso => curso.id === infoCurso.id)
    
    if(existe) {

        const carritoAct = carrito.map(curso => {

            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })

        carrito = [...carritoAct]

    } else {

        carrito = [...carrito, infoCurso];
    }


    console.log(carrito);

    carritoHTML();

}


function eliminarCarrito(e) {

    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        carrito = carrito.filter( curso => curso.id !== cursoId)

        console.log(carrito);


        carritoHTML();
    } ;

    
}

function vaciarCarrito () {

    carrito = [];

    limpiarHTML();
}


function carritoHTML() {

    limpiarHTML();

    carrito.forEach (curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${curso.imagen}" width="100"> </td>
        <td> ${curso.titulo} </td>
        <td> ${curso.precio} </td>
        <td>  ${curso.cantidad} </td>
        
        <td> <a href=# class='borrar-curso' data-id="${curso.id}"> X </a>

        `

        listaCarrito.appendChild(row);
    })


};


function limpiarHTML() {

    while(listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
    }

};