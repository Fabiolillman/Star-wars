let rightBtn = document.querySelector(".right-btn")
let nameContainer = document.querySelector(".name-container")
let previousButton  = document.querySelector(".previous-class");
let detailContainer = document.querySelector(".mid")
let planetDetails = document.querySelector(".lower2");
let currentPage = document.querySelector(".current-page")
let leftBtn = document.querySelector(".left-btn")
let nextButton = document.querySelector(".right-btn")
let characterNames = document.querySelector(".name-container")
let navContainer=document.querySelector("nav")




let pageCounter = 1;



window.addEventListener("load", loadFirstPage);
nextButton.addEventListener("click", loadNextPage)
leftBtn.addEventListener("click", loadPrevPage)



async function loadFirstPage() {
    currentPage.innerText=pageCounter;
    characterNames.innerHTML = "";
    showLoaderName()
    const response = await fetch("https://swapi.dev/api/people/?page=1") 
    const data = await response.json()
    hideLoader()
    renderName(data.results)
    buttonStatus()
    
    // displayInfo(data.results);

}


async function loadNextPage() {
    pageCounter++; 
    currentPage.innerText=pageCounter;
    characterNames.innerHTML = ""; 
    showLoader()
    const response = await fetch("https://swapi.dev/api/people/?page=" + pageCounter) 
    const data = await response.json()
    hideLoader() 
    renderName(data.results)
    buttonStatus()
    
}

async function loadPrevPage() {
    pageCounter--; 
    currentPage.innerText=pageCounter;
    characterNames.innerHTML = ""; 
    showLoader()
    const response = await fetch("https://swapi.dev/api/people/?page=" + pageCounter) 
    const data = await response.json()
    hideLoader()
    renderName(data.results)
    buttonStatus()
}


function buttonStatus(){
    nextButton.disabled  = (pageCounter == 9) ? true : false; 
    leftBtn.disabled  = (pageCounter == 1) ? true : false; 
}

function showLoader(){
    planetDetails.innerHTML = `
    <div class="load-container">
    <div class="loading"><div>
    </div>
    `   
     detailContainer.innerHTML = `
      <div class="load-container">
      <div class="loading"><div>
      </div>     
    `   
}

function showLoaderName(){
    nameContainer.innerHTML = `
    <div class="load-container">
      <div class="loading"><div>
      </div>
    `   
}

function hideLoader(){
    planetDetails.innerHTML = ``   
    detailContainer.innerHTML = ``   
    nameContainer.innerHTML = ``
}


function renderName(data){
    for (let user of data) {
        let buttons = document.createElement("button")     
        buttons.classList.add("name-btn")
        buttons.innerText = user.name;
        characterNames.append(buttons)
        buttons.addEventListener("click", function(){
            printCharacter(user)
            loadHomeworld(user)
            navContainer.innerHTML=""
            clickNav(user)
        })

    }
}

function renderNav(){
  let planetBtn = document.createElement("button")
  planetBtn.innerText = "Planet"
  planetBtn.classList.add("planet")
  let speciesBtn = document.createElement("button")
  speciesBtn.innerText = "Species"
  speciesBtn.classList.add("species")
  let vehicleBtn = document.createElement("button")
  vehicleBtn.innerText = "Vehicles"
  vehicleBtn.classList.add("vehicles")
  let starshipBtn = document.createElement("button")
  starshipBtn.innerText = "Starships"
  starshipBtn.classList.add("starships")
  navContainer.appendChild(planetBtn)
  navContainer.appendChild(speciesBtn)
  navContainer.appendChild(vehicleBtn)
  navContainer.appendChild(starshipBtn)
}



function clickNav(user){
  renderNav()

  let planetBtns = document.querySelector(".planet")
  let speciesBtns = document.querySelector(".species")
  let vehiclesBtns = document.querySelector(".vehicles")
  let starshipBtns = document.querySelector(".starships")

starshipBtns.addEventListener("click", function(){
  loadStarships(user)
  starshipBtns.setAttribute("id", "active") 
  planetBtns.removeAttribute("id")
  vehiclesBtns.removeAttribute("id")
  speciesBtns.removeAttribute("id")
})

vehiclesBtns.addEventListener("click", function(){
  loadVehicles(user)
  starshipBtns.removeAttribute("id")
  planetBtns.removeAttribute("id")
  vehiclesBtns.setAttribute("id", "active")
  speciesBtns.removeAttribute("id")
})

speciesBtns.addEventListener("click", function(){
  loadSpecies(user)
  starshipBtns.removeAttribute("id")
  planetBtns.removeAttribute("id")
  vehiclesBtns.removeAttribute("id")
  speciesBtns.setAttribute("id", "active")
  

})
planetBtns.addEventListener("click", function(){
  loadHomeworld(user)
  starshipBtns.removeAttribute("id")
  planetBtns.setAttribute("id", "active")
  vehiclesBtns.removeAttribute("id")
  speciesBtns.removeAttribute("id")
})
}

function printCharacter(user) {
    
        let userDetails = document.querySelector(".mid");
        userDetails.innerHTML = `
          <h3>${user.name}</h3>
        <p>Height: ${user.height}</p>
        <p>Mass: ${user.mass}</p>
        <p>Hair color: ${user.hair_color}</p>
        <p>Skin color: ${user.skin_color}</p>
        <p>Eye color: ${user.eye_color}</p>
        <p>Birth year: ${user.birth_year}</p>
        <p>Gender: ${user.gender}</p>
        `              
    }
    async function loadHomeworld(user) {
    try{
        const homeworld = await fetch(user.homeworld)
        const homeworldData = await homeworld.json()
    
        planetDetails.innerHTML = `
          <h3>${homeworldData.name}</h3>
        <p>Rotation period: ${homeworldData.rotation_period}</p>
        <p>Orbital period: ${homeworldData.orbital_period}</p>
        <p>Diameter: ${homeworldData.diameter}</p>
        <p>Climate: ${homeworldData.climate}</p>
        <p>Gravity: ${homeworldData.gravity}</p>
        <p>Terrain: ${homeworldData.terrain}</p>
        `  } catch(error) {
          planetDetails.innerHTML = `
          PLANET GOES ZOOOM
          `  
        }
    }

    async function loadSpecies(user) {
     try{
        const species = await fetch(user.species)
        const speciesData = await species.json()
        
        planetDetails.innerHTML = `
          <h3>${speciesData.name}</h3>
        <p>Classification: ${speciesData.classification}</p>
        <p>Designation: ${speciesData.designation}</p>
        <p>Average height: ${speciesData.average_height}</p>
        <p>Skin colors: ${speciesData.skin_colors}</p>
        <p>Hair colors: ${speciesData.hair_colors}</p>
        <p>Eye colors: ${speciesData.eye_colors}</p>
        <p>Average lifespan: ${speciesData.average_lifespan}</p>
        <p>Homeworld: ${speciesData.homeworld}</p>
        <p>Language: ${speciesData.language}</p>
        `  
    } catch(error){
        planetDetails.innerHTML = `
      IT'S A SPACE-HOMAN
      `  
        }  
    }

    async function loadVehicles(user) {
      planetDetails.innerHTML = ""
      if (user.vehicles.length>0) {
        for(let i =0; i < user.vehicles.length; i++){
          try{
            const vehicles = await fetch(user.vehicles[i])
            const vehiclesData = await vehicles.json()
            
            planetDetails.innerHTML += `
              <h3>${vehiclesData.name}</h3>
            <p>Model: ${vehiclesData.model}</p>
            <p>Manufacturer: ${vehiclesData.manufacturer}</p>
            <p>Cost in credits: ${vehiclesData.cost_in_credits}</p>
            <p>Length: ${vehiclesData.length}</p>
            <p>Max atmosphering speed: ${vehiclesData.max_atmosphering_speed}</p>
            <p>Crew: ${vehiclesData.crew}</p>
            <p>Passengers: ${vehiclesData.passengers}</p>
            <p>cargo capacity: ${vehiclesData.cargo_capacity}</p>
            <p>Consumables: ${vehiclesData.consumables}</p>
            <p>Vehicle class: ${vehiclesData.vehicle_class}</p>
            <span></span>     
            `  } catch(error){
              planetDetails.innerHTML = `
            CAR GOES WRROM WROOM
            `  
              }  
          }
      }   else {
        planetDetails.innerHTML = `
        CAR GOES WRROM WROOM
        `  
      }    
    }


    async function loadStarships(user) {
      planetDetails.innerHTML = ""
      if (user.starships.length>0) {
        for(let i = 0; i < user.starships.length; i++){
          try{
            const starships = await fetch(user.starships[i])
            const starshipsData = await starships.json()
            
        
            planetDetails.innerHTML += `
              <h3>${starshipsData.name}</h3>
            <p>Model: ${starshipsData.model}</p>
            <p>Manufacturer: ${starshipsData.manufacturer}</p>
            <p>Cost in credits: ${starshipsData.cost_in_credits}</p>
            <p>Length: ${starshipsData.length}</p>
            <p>Max atmosphering speed: ${starshipsData.max_atmosphering_speed}</p>
            <p>Crew: ${starshipsData.crew}</p>
            <p>Passengers: ${starshipsData.passengers}</p>
            <p>cargo capacity: ${starshipsData.cargo_capacity}</p>
            <p>Consumables: ${starshipsData.consumables}</p>
            <p>Hyperdrive rating: ${starshipsData.hyperdrive_rating}</p>
            <p>MGLT: ${starshipsData.MGLT}</p>
            <p>Starship class: ${starshipsData.starship_class}</p>
            <span></span>

            `   } catch(error) {
              planetDetails.innerHTML = `
              SPACESHIP GOES BOOOM
              `  
            }
          }
      } else {
        planetDetails.innerHTML = `
        SPACESHIP GOES BOOOM
        `  
      }
   
    }

    