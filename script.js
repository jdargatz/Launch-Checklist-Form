//5. Fetch some planetary JSON to update the mission destination with vital facts and figures about where the shuttle is headed.
function fetchData () {
   fetch("https://handlers.education.launchcode.org/static/planets.json") //fetch this
   .then( response => response.json() ) //promise me the json
   .then ( data => planetInfo(data)) //take that data and do something with it
}

//grab a number
function randomNumber (){
   let num = Math.floor(Math.random() * 6);
   return num;
} // end random number

//take the data and do something cool
function planetInfo(data) {
   let p = randomNumber();
   document.getElementById("missionTarget").innerHTML =
         
 `       
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${data[p].name}</li>
   <li>Diameter: ${data[p].diameter}</li>
   <li>Star: ${data[p].star}</li>
   <li>Distance from Earth: ${data[p].distance}</li>
   <li>Number of Moons: ${data[p].moons}</li>
</ol>
<img src="${data[p].image}">
`;
} // end planetInfo

// 1. Use preventDefault() to prevent a request from being sent out and the page reloading.

window.addEventListener("load", () => {

fetchData(); //get destination info

//2. Validate the user-submitted data to ensure the following:
//The user entered something for every field. - Added 'required' in form tags in index.html.
//The user entered text for names and numbers for fuel and cargo levels. - Added 'number' as input for cargoMass and fuelLvl in index.html

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
   event.preventDefault() // has to have an event to prevent

 //3. With validation, update a list of what is currently ready or not ready for the shuttle launch.

   const pilotValue = document.querySelector(["#pilotName"]).value;
   const copilotValue = document.querySelector(["#copilot"]).value;
   const fuelLevelValue = document.querySelector(["#fuel"]).value;
   const cargoValue = document.querySelector(["#cargo"]).value;
   let h2 = document.querySelector("#launchStatus");

//4. Indicate what is good or bad about the shuttle and whether it is ready for launch by using the DOM to update the CSS.   
      
   document.getElementById("pilotStatus").innerText = `Pilot: ${pilotValue}, ready for launch`;
   document.getElementById("copilotStatus").innerText = `Co-Pilot: ${copilotValue}, ready for launch`;

      if (fuelLevelValue < 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("fuelStatus").innerText = `Fuel level ${fuelLevelValue} too low for launch.`;
         h2.style.color = "red";
         h2.innerText = `Shuttle not ready for launch`;
      } // end fuel level check

      if (cargoValue > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerText = `Cargo mass ${cargoValue} too high for launch.`;
         h2.style.color = "red";
         h2.innerText = `Shuttle not ready for launch`;
      } // end cargo mass check

      if (fuelLevelValue >= 10000 && cargoValue <= 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         h2.style.color = "green";
         h2.innerText = `Shuttle is ready for launch`;
      } // end cargo and fuel acceptance check
   }); // end submit event listener
}); // end window load listener