"use strict";
let productosEncarrito=JSON.parse(localStorage.getItem("productosEncarrito"));



const carritoVacio= document.querySelector("#carritoVacio");
const contenedorCarrito= document.querySelector("#contenedorProductos");
const carritoAcciones= document.querySelector("#carritoAcciones");
const carritoComprar= document.querySelector("#carritoComprar");
const carritoVaciar=document.querySelector("#vaciarCarrito")
const TOTAL=document.querySelector("#total")

console.log(productosEncarrito);

function cargarProductosCarrito(){
    if(productosEncarrito && productosEncarrito.length>0){
        carritoVacio.classList.add("disabled");
        contenedorCarrito.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        contenedorCarrito.innerHTML=" "
        productosEncarrito.forEach(producto=>{
            const div= document.createElement("div");
            div.classList.add("carritoProducto");
            
            ;
            div.innerHTML=`
            <img class="carritoImagen" src="${producto.imagen}" alt="" />
            <div class="carritoNombre">
              <small>titulo</small>
              <h3>${producto.titulo}</h3>
            </div>
            <div class="carritoCantidad">
              <small>cantidad</small>
              <p>${producto.cantidad}</p>
            </div>
            <div class="carritoPrecio">
              <small>precio</small>
              <p>${producto.precio}</p>
            </div>
            <div class="carritoSubtotal">
              <small>subtotal</small>
              <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="eliminarProducto" id="${producto.id}">
              <i class="fa-sharp fa-solid fa-trash"></i>
            </button>`
             contenedorCarrito.append(div);
    
        })
       
        
    }else{
        carritoVacio.classList.remove("disabled");
        contenedorCarrito.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
    }

    actualizarbtones();
    actualizarTotal();
}
cargarProductosCarrito();



function actualizarbtones(){
    const botonesEliminar= document.querySelectorAll(".eliminarProducto");
    botonesEliminar.forEach(boton=>{
        boton.addEventListener("click", eliminarCarrito);
    })
}
function eliminarCarrito(e){
    const id= e.currentTarget.id;
    console.log(id);
   
     const index= productosEncarrito.findIndex(producto=>producto.id === id);
    productosEncarrito.splice(index,1);
    localStorage.setItem("productosEncarrito", JSON.stringify(productosEncarrito));
    console.log(productosEncarrito)

    cargarProductosCarrito();
 
}
carritoVaciar.addEventListener("click",vaciarCarrito);
function vaciarCarrito(){
    productosEncarrito.length=0;
    localStorage.setItem("productosEncarrito", JSON.stringify(productosEncarrito));
    cargarProductosCarrito();
}
function actualizarTotal(){

TOTAL.innerHTML= ": $"+productosEncarrito.reduce((acc,producto)=>acc+(producto.precio*producto.cantidad),0)
}
