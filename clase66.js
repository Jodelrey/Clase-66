//Local Storage
//Los navegadores tienen una especie de memoria local donde podemos guardar informacion que funciona solo en nuestra computadora. No se guarda en la pagina sino en el navegador. El modo incognito cuando ingresamos no guarda nada. 
//Cuando nos loggeamos lo que hace la pagina es guardar en el local storage el usuario. Cuando volvemos a ingresar verifica si existe un usuario y trae los datos. 
//Local storage es una variable global, podemos accedera directamente. Tiene varios metodos. 
//Set Item
//Remove Item
//Get Item

//Local storage guarda la informacion en formato clave valor. Solamente puede guardar texto. 
//

localStorage.setItem('usuario', 'adalovelave')
//Una vez guardado puedo accederlo con el metodo getItem
localStorage.getItem('usuario')

//Para acutalizarlo vuelvo a usar setItem

//removeItem para eliminarlo
localStorage.removeItem('usuario')

localStorage.setItem('usuario', 'ada')
localStorage.setItem('password', '123123')
localStorage
localStorage.clear()

localStorage.setItem('usuario', 'adalovelave')
localStorage.getItem('usuario') //si recargo la pagina puedo acceder a esa infor

//Es una especie de memoria donde podemos guardar datos por sitio web.

//Es una forma muy simple de guardar info y se usa para loggeos y preferencias de usuarios.
//El localStorage lo podemos ver en la parte de Aplication del navegador.
//Desde clear storage se puede borrar toda la informacion que va guardando el sitio

localStorage('usuario', { username: 'ada', password: '123123'})//todo lo que le pasamos lo convierte a string por lo tanto no puedo guardar un objeto

//La alternativa es convertir el objeto en un string. Para eso se usa un formato JSON. (JavaScript Object Notation) es un formato de texto y es objeto pero la regla es que todas las propiedades van entre comillas. Esta es la diferencia con JS

//Cuando hacemos pedidos http la informacion que trae es en formato JSON. Axios automaticamente cuando obtiene la respuesta lo convierte de JSON a objeto.
//Dado un objeto para convertirlo a JSON utilizamos stringify

const data = { username: 'adalovelace', password: '123123'}
JSON.stringify(data)

const json = JSON.stringify(data)
localStorage.setItem('usuario', json)

//Para reconvertirlo a objeto se usa parse

const usuario = localStorage.getItem('usuario')
JSON.parse(usuario)

const object = JSON.parse(usuario)// ahora lo podemos trabajar como objeto




//Como utilizar una api para mandar informacion

//Muchas veces cuando trabajamos con el backend de una app tenemos que mandar informacion. Para esto tenemos que utilizar el metodo post. 
//Post es para agregar cosas
//Put es para actualizar cosas

//Cuando mandamos informacion con el metodo post no solo necesitamos la direccion a la que mandar sino que tenemos que ver que es lo que tenemos que mandar. Eso se define en lo que es el cuerpo del pedido http.

const  obtenerUsuario = () => localStorage.getItem('usuario')

const agregarFavorito = (evento) => {
    console.log(evento.target.classList.contains('add-to-fav'))
    if(!evento.target.classList.contains('add-to-fav')){
        return
    }

    const imageId = evento.target.closest('.data').dataset.id

    const data = {
        image_id:imageId ,
        sub_id: obtenerUsuario()
    }
    axios
    .post(`https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`, data)
    .then(()=>obtenerFavoritos())
}

document.addEventListener('click', agregarFavorito)

const actualizarFavoritos = (imagenes) => {
    const resultado = imagenes.map((imagen)=>obtenerFavTemplate(imagen.image.url, imagen.image.id)).join('')
    $('#favourites-list').innerHTML = resultado
}

const obtenerFavoritos = () => {
    const usuario = obtenerUsuario()
    axios
    .get(`https://api.thecatapi.com/v1/favourites?sub_id=${usuario}api_key=${API_KEY}`)
    .then((respuesta) => actualizarFavoritos(respuesta.data))
}

const inicializarFavoritos = () => {
    obtenerFavoritos()
}