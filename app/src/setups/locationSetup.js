import { closeModal, getElement, customAlert } from "../utils.js";
import {   createLocation, updateLocation} from "../services/locationService.js";
const addLocationForm = getElement("#add-location-form");
const closeBtn = getElement(".add-location-modal .close");

const editLocationForm = getElement("#edit-location-form");
const closeEditModalBtn = getElement(".edit-location-modal .close");
const setupAddLocationModal = (element) => {
  let modal = `
            <h3 class="title">Add Location</h3>
            <div class="form-field">
                <label for="">Location Name</label>
                <input type="text" id="name" required>
            </div>    
            <div class="form-field">
                <label for="">Description</label>
                <input type="text" id="description" required>
            </div> 
            <div class="modal-footer">
                <button class="btn add-location-btn" type="submit">Add</button>
            </div>`;
  element.innerHTML = modal;

  addLocationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addLocation();
  });
  closeBtn.addEventListener("click", () => {
    closeModal(getElement(".modal.add-location-modal"));
  });
};

async function addLocation() {
  let formdata = {
    name: getElement("#name").value,
    description: getElement("#description").value
  };
  let newLocation = await createLocation(formdata);
  if (newLocation.id) {
    customAlert("Location Created Successfully");
  } else {
    customAlert(newLocation.error);
  }
}

const setupEditLocationModal = (location, element) => {
  let modal = `
            <h3 class="title">Edit Location</h3>
            <div class="form-field">
                <label for="">Name</label>
                <input type="text" id="name" value=${location.name} required>
            </div>
            <div class="form-field">
                <label for="">Description</label>
                <input type="text" id="description" value='${location.description}' required>
            </div>  
            <div class="modal-footer">
                <button class="btn add-location-btn" type="submit">Edit</button>
            </div>`;

  element.innerHTML = modal;

  editLocationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    editLocation(location.id);
  });
  closeEditModalBtn.addEventListener("click", () => {
    closeModal(getElement(".modal.edit-location-modal"));
  });
};

async function editLocation(locationId) {
    let formdata = {
      name: getElement("#name").value,
      description: getElement("#description").value
    };
    let newLocation = await updateLocation(locationId, formdata);
    if (newLocation.message) {
      customAlert(newLocation.message);
    } else {
      customAlert(newLocation.error);
    }
  }
  
export { setupEditLocationModal, setupAddLocationModal };
