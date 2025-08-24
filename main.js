import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDU4wJgaGOy3aztSqv70VtQiL0Rfzyj5fY",
  authDomain: "globalconnectionesp32-292bb.firebaseapp.com",
  projectId: "globalconnectionesp32-292bb",
  storageBucket: "globalconnectionesp32-292bb.firebasestorage.app",
  messagingSenderId: "786523804993",
  appId: "1:786523804993:web:e4e789368b58bea6db3dc0",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const state_div = document.querySelector(".led_on_or_of_state");
const buttonOn = document.querySelector(".on");
const buttonOff = document.querySelector(".off");

// Función para actualizar el estado del LED
function updateLed(state) {
  set(ref(db, "state_led"), state);
  if (state) {
    state_div.classList.remove("led_off");
    state_div.classList.add("led_on");
  } else {
    state_div.classList.remove("led_on");
    state_div.classList.add("led_off");
  }
}

function getLedState() {
  return onValue(ref(db, "state_led"), (snapshot) => {
    const data = snapshot.val();
    if (data) {
      state_div.classList.remove("led_off");
      state_div.classList.add("led_on");
    } else {
      state_div.classList.remove("led_on");
      state_div.classList.add("led_off");
    }
  });
}

getLedState();
// Botones
buttonOn.addEventListener("click", () => updateLed(true));
buttonOff.addEventListener("click", () => updateLed(false));
