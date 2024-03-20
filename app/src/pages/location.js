import { fetchLocations , fetchLocation} from "../services/locationService.js";
import { setupAddLocationModal , setupEditLocationModal} from "../setups/locationSetup.js";
import { getElement, openModal } from "../utils.js";

const addLocationModalBtn = getElement(".add-location-modal-btn");

const init = async () => {
  const loading = getElement(".page-loading");
  const Locations= await fetchLocations();
  if(Locations) {
     await displayLocations(Locations, getElement('.location.table table tbody'));
  }
  addLocationModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("button click");
    
    setupAddLocationModal(getElement('.modal.add-location-modal .modal-center'));
    openModal(getElement(".modal.add-location-modal"));
  });
  loading.style.display = "none";
};

const displayLocations = async (Locations, element) => {
  renderLocationDataInTheTable(Locations, element);
  await element.addEventListener("click", async function (e) {
    const parent = e.target;
    if (parent.classList.contains("edit-location-btn")) {
      //get a single location , populate
      let location= await fetchLocation(parent.dataset.id);
      
      setupEditLocationModal(location, getElement('.modal.edit-location-modal .modal-center'));
      openModal(getElement(".modal.edit-location-modal"));
    }
  });
};


const renderLocationDataInTheTable = (data, element) => {
  console.log(data)
  data.forEach((item, index) => {
    let newRow = document.createElement("tr");

    let s_noCell = document.createElement("td");
    s_noCell.innerText = index +1;
    newRow.appendChild(s_noCell);

    let name = document.createElement("td");
    name.innerText = item.name;
    newRow.appendChild(name);



    let descriptionCell = document.createElement("td");
    descriptionCell.innerText = item.description;
    newRow.appendChild(descriptionCell);

    let editbutton = `<button class="btn edit-location-btn" data-id="${item.id}">
    Edit</i>
  </button>`;
    let celledit = document.createElement("td");
    celledit.innerHTML = editbutton;
    newRow.appendChild(celledit);
    
    element.appendChild(newRow); 

  });
};

window.addEventListener("DOMContentLoaded", init);
