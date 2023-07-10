"use strict";
class workout {
    date = new Date();
    Id = (Date.now() + "").slice(-10);
    constructor(coords, distance, duration){
        this.coords = coords; // lat and lng
        this.distance = distance; // km
        this.duration = duration; // min
    }
    _setDescription() {
        // prettier-ignore
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}
class running extends workout {
    type = "running";
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace() {
        this.pace = this.duration / this.distance; // kn/h
        return this.pace;
    }
}
class cycling extends workout {
    type = "cycling";
    constructor(coords, distance, duration, elevation){
        super(coords, distance, duration);
        this.elevation = elevation;
        this.calcspeed();
        this._setDescription();
    }
    calcspeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}
// const run1 = new running([25, 34], 45, 555, 7);
// const cyc1 = new cycling([23 / 56], 34, 53, 66);
// console.log(run1, cyc1);
// ARITECHTURE OF APPLICATION
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
class App {
    #map;
    #mapevent;
    #workouts = [];
    constructor(){
        this._getposition();
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationfield.bind(this));
    }
    _getposition() {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this._loadmap.bind(this), function() {
            alert("Could not get your position");
        });
    }
    _loadmap(position) {
        // console.log(position);
        const { latitude  } = position.coords;
        const { longitude  } = position.coords;
        // console.log(latitude, longitude);
        // console.log(`https://www.google.com/maps/@28.741526232161608, 76.80597631566049,15z`);
        const coords = [
            latitude,
            longitude
        ];
        this.#map = L.map("map").setView(coords, 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        this.#map.on("click", this._showForm.bind(this));
    }
    _showForm(mapE) {
        form.classList.remove("hidden");
        // cursore distance field pe chalajaega
        inputDistance.focus();
        this.#mapevent = mapE;
    }
    // hide form and input
    _hideForm() {
        //  hide form+remove input fields
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";
        form.style.display = "none";
        form.classList.add("hidden");
        setTimeout(()=>form.style.display = "grid", 1000);
    }
    _toggleElevationfield() {
        // need to change the cadance and elvation as per inputtype
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }
    _newWorkout(e) {
        e.preventDefault();
        const isvalidNum = (...inputs)=>inputs.every((inp)=>Number.isFinite(inp));
        const ispositive = (...inputs)=>inputs.every((inp)=>inp > 0);
        // get data from input
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat , lng  } = this.#mapevent.latlng;
        let workout;
        // IF Workout if running create running object
        if (type === "running") {
            const cadance = +inputCadence.value;
            // check validation positive and numbers
            if (// !Number.isFinite(distance) ||
            // !Number.isFinite(duration) ||
            // !Number.isFinite(cadence) // or we write like this
            !isvalidNum(distance, duration, cadance) || !ispositive(distance, duration, cadance)) return alert("Invalid Input  of running");
            workout = new running([
                lat,
                lng
            ], distance, duration, cadance);
        }
        // same for cycling create object for cycling and replace it by elvation
        if (type === "cycling") {
            const elevation = +inputElevation.value;
            // check validation
            if (!isvalidNum(distance, duration, elevation) || !ispositive(distance, duration, elevation)) return alert("invalid details of cycling");
            workout = new cycling([
                lat,
                lng
            ], distance, duration, elevation);
        }
        // Add new object to workout array
        this.#workouts.push(workout);
        console.log(workout);
        // Render Workout on map as marker
        this._RenderWorkoutMarker(workout);
        // hide inputs and form
        this._hideForm();
        // Rendering Workout on list 
        this._renderWorkout(workout);
    }
    _RenderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map).bindPopup(L.popup({
            maxwidth: 250,
            minwidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        })).setPopupContent("workout").openPopup();
    }
    _renderWorkout(workout) {
        let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.Id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === "running" ? "\uD83C\uDFC3‍♂️" : "\uD83D\uDEB4‍♀️"}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;
        if (workout.type === "running") html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;
        if (workout.type === "cycling") html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
        form.insertAdjacentHTML("afterend", html);
    }
}
const app = new App();

//# sourceMappingURL=index.672d4772.js.map
