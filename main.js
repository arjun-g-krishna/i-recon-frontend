// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
document.getElementById('notifier').onclick = function(){notifyMe()};
const his = document.getElementById('history');
var buffer= [];

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBKlOBRmZhdnHCixssCKHaSsWFDaid1TI",
  authDomain: "irecon-notify.firebaseapp.com",
  databaseURL: "https://irecon-notify-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "irecon-notify",
  storageBucket: "irecon-notify.appspot.com",
  messagingSenderId: "745444359594",
  appId: "1:745444359594:web:490c55a651c842dd01bfd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);

const countRef = ref(database, 'patients/');
onValue(countRef, (snapshot) => {
  const data = snapshot.val();  
  buffer = data;
  his.innerText = ' '
  for(var key in buffer){
    var timeBuffer = new Date(buffer[key]['time']*1000)
    his.innerText += "● "+buffer[key]['BlinkCount']+" blinks on "+timeBuffer.toString()+'\n\n'
  }
  var notification = new Notification("Alert! Your patient needs assistance",{
    body: "Please attend to your patient.",
    icon: "/favicon.ico"
  });
});
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission()
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}