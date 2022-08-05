console.log("... js cargado")


const info = data.events
console.log(info)

// lication.search nos traemos el id, que llevmos por url
const queryString = location.search

// devuelve la intancia de objeto que es itrable
const params =new URLSearchParams(queryString)

// metodo get le pasamos lo que estamos buscando
const id = params.get("id")

console.log(params.get("id"))


const element = info.find(item => item._id == id)
// console.log(element)

const div = document.getElementById("contCartas")
div.innerHTML = `
<div class="div-details container d-flex">
    <div class="img-details my-5 mx-3 shadow d-flex">
        <img src="${element.image}" alt="maraton" class="img-details">
    </div>
    <div class="description d-flex flex-column justify-content-center align-items-center my-5 mx-3 shadow">
        <h2>${element.name}</h2>
        <p class="m-0">${element.date}</p>
        <p class="text-center" >${element.description}</p>
        <p class="m-0">${element.category}</p>
        <p class="m-0">Place: ${element.place}</p>
        <p class="m-0">Capacity: ${element.capacity}</p>
        <p class="m-0">Assistance: ${element.assistance}</p>
    </div> 
</div>
`
