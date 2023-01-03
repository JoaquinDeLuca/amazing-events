// Elementos capturados
const cardsContainer = document.getElementById("section")
const checkBoxContainer = document.getElementById("containerCategory")
const inputSearch = document.getElementById("search")
const containerCategory = document.getElementById("containerCategory")

//consumo de eventos
import eventData from '../productos.json' assert {type: 'json'}

const pushArray = (data) => {
    let arrayEvents = data.events; // array de eventos 

    // barra de busqueda
    inputSearch.addEventListener("keyup", ()=>{
        let aFilterCategory = filterCategory(arrayEvents)
        let aFilterText = searchText(inputSearch.value, aFilterCategory) 
        paintCards(aFilterText)
    })


    // Function Pinta Cards dinamicamente, en base al array que recibe por lo tanto es generica(por decir asi)
    function paintCards (arrayOfEvents){
        cardsContainer.innerHTML = ""
        arrayOfEvents.forEach(event => {
            let card = document.createElement("div")
            card.className = "card-mof"
            card.innerHTML = `
            <div class="card shadow-card ">
                        <img src="${event.image}" class="card-img-top img-t" alt="imagen">
                <div class="card-body cardd-bodyy">
                    <div class="d-flex flex-column align-items-center h-75">
                        <p class="card-text p-0 mb-2"><span class='fw-semibold'>Date:</span> ${event.date}</p>
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                    </div>
                    <!-- bottom -->
                    <div class="d-flex justify-content-between align-items-baseline mt-2">
                        <p class="fw-bold">$${event.price}</p>
                        <a href="details.html?id=${event._id}" target="_blank" class="btn-a">see more</a>
                    </div>
                </div>
            </div>`
            cardsContainer.appendChild(card)
        })
        if(cardsContainer.innerHTML === ""){
            cardsContainer.innerHTML= `
            <p>Event not found... Try again please</p>`
        }
    }
    // paintCards(arrayOfEvents); 
    paintCards(arrayEvents);

    //_____ funcion para pintar los chebox categorias dinamicamente________

    function paintCheboxCategories (){
        // Eliminar categorias duplicadas, new Set: permite almacenear valores unicos de cualquier tipo
        let categoryFilter = new Set(arrayEvents.map( events => events.category))
        // console.log(categoryFilter)
        
        categoryFilter.forEach((category)=>{
            let divCat = document.createElement("div")
            divCat.className = "form-check form-check-inline similBotom my-1 mx-1 m-sm-1"
            divCat.innerHTML = `
                <input class="form-check-input checkb" type="checkbox" id="${category}" value="${category}">
                <label class="form-check-label" for="${category}">${category}</label>
            `
            containerCategory.appendChild(divCat)
        })
    }
    paintCheboxCategories()


    // Funcion que filtra los texto del input)
    function searchText (text,arrayOfEvents) {
        let arrayFilter = arrayOfEvents.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
        return arrayFilter
    }

    // Escuchando el contendor de chebox category 
    containerCategory.addEventListener("change", ()=>{
        let aFilterText = searchText (inputSearch.value, arrayEvents)
    let filterCat = filterCategory(aFilterText)
    paintCards(filterCat)
    })



    function filterCategory (arrayOfEvents){
        let checkboxCategory = document.querySelectorAll("input[type='checkbox']")

        let arrayCheckboxCategory = Array.from(checkboxCategory)
        let checkedCheckbox = arrayCheckboxCategory.filter( element => element.checked)
        // aca me traigo el valor de los input
        let valueCategory = checkedCheckbox.map( element => element.value)

        if(valueCategory.length > 0){
            let arrayFilCat = arrayOfEvents.filter( event => valueCategory.includes(event.category))
            return arrayFilCat
        }else {
            return arrayOfEvents
        }
        // console.log(arrayFilCat)
    }
}

pushArray(eventData);