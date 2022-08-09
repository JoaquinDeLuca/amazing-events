//consumo de la api 
const api = "https://amazing-events.herokuapp.com/api/events"
fetch (api)
.then(response => response.json())
.then(data => pushArray(data))


const pushArray = (data) => {
    
    // aca estan todos los eventos traidos con fech 
    let arrayEvents = data.events

    // ________________ funcion de Upcoming _________________
    function paintStatsUpcoming (){
        // filtro por los eventos futuros 
        let eventsUpcoming = arrayEvents.filter( event => parseInt(event.date) >= 2022 )

        // Eliminar categorias duplicadas, new Set: permite almacenear valores unicos de cualquier tipo
        let categoryFilter = new Set(eventsUpcoming.map( events => events.category))

        // capturo el tbody donde voy a pintar las categorias 
        let tBody = document.getElementById("tBodyUpcoming")

        categoryFilter.forEach((category)=>{
            let profits = 0;
            let percentages = 0;
            eventsUpcoming.forEach((eventsUpcoming)=>{
                if (eventsUpcoming.category == category){
                    profits = profits + (eventsUpcoming.estimate * eventsUpcoming.price)
                    percentages = ((eventsUpcoming.estimate / eventsUpcoming.capacity)*100).toFixed(2)
                }
            })
            let tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${category}</td>
                <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(profits)}</td>
                <td>${percentages}%</td>
            `
            tBody.appendChild(tr)
        })
    }
    paintStatsUpcoming()

    //_______________ function de pastEvents_____________________
    function paintStatsPast (){
        // filtro por los eventos pasado
        let eventsPast = arrayEvents.filter( event => parseInt(event.date) <= 2021 )
        // console.log(eventsPast)

        // Eliminar categorias duplicadas, new Set: permite almacenear valores unicos de cualquier tipo
        let categoryFilter = new Set(eventsPast.map( events => events.category))

        // capturo el tbody donde voy a pintar las categorias 
        let tBody = document.getElementById("tBodyPast")

        categoryFilter.forEach((category) => {
            let profits = 0;
            let percentages = 0;
            eventsPast.forEach((eventsPast) => {
                if (eventsPast.category == category){
                    profits = profits + (eventsPast.assistance * eventsPast.price)
                    percentages = ((eventsPast.assistance / eventsPast.capacity)*100).toFixed(2)
                }
            })

            let tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${category}</td>
                <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(profits)}</td>
                <td>${percentages}%</td>
            `
            tBody.appendChild(tr)
        })

    }
    paintStatsPast()

   
    // _____________________ filtrado final______________________________

    function finalFilter (){
        // Capturo el elemento del html 
        let tbody = document.getElementById("eventStatistics")

        // filtro por los eventos pasado
        let eventsPast = arrayEvents.filter( event => parseInt(event.date) <= 2021 )
    
        // Eventos filtrados por mayor porcentaje de asistencia con respecto a la capacidad
        let eventsMajorPercentage = eventsPast.filter( event => ((event.assistance * 100) / event.capacity) >= 96 )

        // Eventos filtrados por mayor porcentaje de asistencia con respecto a la capacidad
        let eventsMinorPercent = eventsPast.filter( event => ((event.assistance * 100) / event.capacity) <= 78 )

        // aca me traigo todos los eventos pero solo la capacity de cada uno
        let eventCapacity = arrayEvents.map( event => event.capacity )
        // console.log(eventCapacity)

        // nos trae el event con mayor asistencia, uno solo seria
        let capacityMax = Math.max(...eventCapacity)

        let a = arrayEvents.filter( event => event.capacity == capacityMax)
        // console.log(a[0].name)
        
        let tr = document.createElement ("tr")
        tr.innerHTML = `
            <td>${eventsMajorPercentage[0].name}</td>
            <td>${eventsMinorPercent[0].name}</td>
            <td>${a[0].name}</td>
        `
        tbody.appendChild(tr)

        let tr2 = document.createElement ("tr")
        tr2.innerHTML = `
            <td>${eventsMajorPercentage[1].name}</td>
            <td>${eventsMinorPercent[1].name}</td>
        `
        tbody.appendChild(tr2)

        let tr3 = document.createElement ("tr")
        tr3.innerHTML = `
            <td>${eventsMajorPercentage[2].name}</td>
            <td>${eventsMinorPercent[2].name}</td>
        `
        tbody.appendChild(tr3)

        let tr4 = document.createElement ("tr")
        tr4.innerHTML = `
            <td>${eventsMajorPercentage[3].name}</td>
            <td>${eventsMinorPercent[3].name}</td>
        `
        tbody.appendChild(tr4)
    }
    finalFilter()
}