"use strict"
const ProductosArray=[
    {
        id:"abrigo-01",
        titulo:"abrigo 01",
        imagen:"./img/abrigo1.jpeg",
        categoria:{
            nombre:"abrigos",
            id:"abrigos"
        },
        precio:1000
    },
    {
        id:"abrigo-02",
        titulo:"abrigo 02",
        imagen:"./img/abrigo2.jpeg",
        categoria:{
            nombre:"abrigos",
            id:"abrigos"
        },
        precio:1000
    },
    {
        id:"abrigo-03",
        titulo:"abrigo 03",
        imagen:"./img/abrigo3.jpeg",
        categoria:{
            nombre:"abrigos",
            id:"abrigos"
        },
        precio:1000
    },
    {
        id:"abrigo-04",
        titulo:"abrigo 04",
        imagen:"./img/abrigo4.jpg",
        categoria:{
            nombre:"abrigos",
            id:"abrigos"
        },
        precio:1000
    },
    {
        id:"pantalon-01",
        titulo:"pantalon 01",
        imagen:"./img/pantalones1.jpg",
        categoria:{
            nombre:"pantalones",
            id:"pantalones"
        },
        precio:1000
    },
    {
        id:"pantalon-02",
        titulo:"pantalon 02",
        imagen:"./img/pantalones2.jpg",
        categoria:{
            nombre:"pantalones",
            id:"pantalones"
        },
        precio:1000
    },
    {
        id:"pantalon-03",
        titulo:"pantalon 03",
        imagen:"./img/pantalones3.jpg",
        categoria:{
            nombre:"pantalones",
            id:"pantalones"
        },
        precio:1000
    },
    {
        id:"pantalon-04",
        titulo:"pantalon 04",
        imagen:"./img/pantalones4.jpg",
        categoria:{
            nombre:"pantalones",
            id:"pantalones"
        },
        precio:1000
    },
    {
        id:"remeras-01",
        titulo:"remera 01",
        imagen:"./img/remera1.jpg",
        categoria:{
            nombre:"remeras",
            id:"remeras"
        },
        precio:1000
    },
    {
        id:"remeras-02",
        titulo:"remera 02",
        imagen:"./img/remeras2.jpg",
        categoria:{
            nombre:"remeras",
            id:"remeras"
        },
        precio:1000
    },
    {
        id:"remeras-02",
        titulo:"remera 03",
        imagen:"./img/remeras3.jpg",
        categoria:{
            nombre:"remeras",
            id:"remeras"
        },
        precio:1000
    },
    {
        id:"remeras-04",
        titulo:"remera 01",
        imagen:"./img/remeras4.jpg",
        categoria:{
            nombre:"remeras",
            id:"remeras"
        },
        precio:1000
    },
   

];
const contenedorProductos= document.getElementById("contenedorProductos");
const botonesCategoria=document.querySelectorAll(".botonCategoria");
const tituloPrincipal=document.querySelector("#tituloPrincipal");
function cargarProductos(productos){
    contenedorProductos.innerHTML="";
    productos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML=`
        <img  src='${producto.imagen}'alt="${producto.titulo}" class="productoImagen">
             <div class="productoDetalle">
                <h3 class="productoTitulo">${producto.titulo}</h3>
                <P class="productoPrecio">${producto.precio}</P>
                <button class="productoAgregar"id="${producto.id}">agregar</button>
            </div>
        `;
        
        contenedorProductos.append(div);
    })
    actualizarbtones();
  
}
cargarProductos(ProductosArray);
botonesCategoria.forEach(boton =>{
    boton.addEventListener("click", (e)=>{
        botonesCategoria.forEach(boton=> boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
       tituloPrincipal.innerHTML="Todos Los Productos";
        if(e.currentTarget.id != "todos"){
            const producCategoria= ProductosArray.find(producto=>producto.categoria.id === e.currentTarget.id);
            console.log(producCategoria);
            tituloPrincipal.innerHTML=producCategoria.categoria.nombre;
            const productosBoton= ProductosArray.filter(producto=>producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            cargarProductos(ProductosArray);
        }
        
    })
})
function actualizarbtones(){
    let botonesAgregar= document.querySelectorAll(".productoAgregar");
    botonesAgregar.forEach(boton=>{
        boton.addEventListener("click", agregarCarrito);
    })
}

 let productosEncarrito=[];
 let productosEncarritoLS= JSON.parse(localStorage.getItem("productosEncarrito"));
 console.log(productosEncarritoLS)
//  productosEncarritoLS=JSON.parse(productosEncarritoLS);
 console.log(productosEncarritoLS);
 if(productosEncarritoLS){
    console.log("entre");
    productosEncarrito=productosEncarritoLS;

    
    actualizarNumero();
    
 }else{
    console.log("entre");
      productosEncarrito=[];  
 }
 function agregarCarrito(e){
    const id= e.currentTarget.id;
    console.log(id);
    const productosAgregados= ProductosArray.find(producto=> producto.id === id);
   
  
    if(productosEncarrito.some(producto=> producto.id === id)){
     const index= productosEncarrito.findIndex(producto=>producto.id === id);
      productosEncarrito[index].cantidad++;
    }else{
        productosAgregados.cantidad=1;
        productosEncarrito.push(productosAgregados);
    }
    console.log(productosEncarrito);
    actualizarNumero();
    localStorage.setItem("productosEncarrito", JSON.stringify(productosEncarrito));
}
function actualizarNumero(){
    let numero= document.querySelector("#numero");
    let nuevoNumero= productosEncarrito.reduce((acc,producto)=>acc+producto.cantidad,0);
    numero.innerHTML= nuevoNumero;

}

