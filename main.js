// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded } from "firebase/database";
document.getElementById('notifier').onclick = function(){notifyMe()};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBySS6X2hEKHVAhZD3OSpf9UClbBixM1lk",
  authDomain: "i-recon.firebaseapp.com",
  databaseURL: "https://i-recon-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "i-recon",
  storageBucket: "i-recon.appspot.com",
  messagingSenderId: "735653036738",
  appId: "1:735653036738:web:7dd592393321d0abc7b15b",
  measurementId: "G-LD1VX4L4W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);
const count = ref(database, 'patients/');
onValue(count, (snapshot) => {
  const data = snapshot.val();
  var notification = new Notification("Alert! Please attend to your patient");
});
// onChildAdded(count, () => {
//   alert("Alert! Your patient needs to be attended to.");
// })
// const recentPostsRef = query(ref(database, 'posts'), limitToLast(1));
// console.log(recentPostsRef)
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  // else if (Notification.permission === "granted") {
  //   // If it's okay let's create a notification
  //   var notification = new Notification("Hi there!");
  // }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Alert! Please attend to your patient");
      }
    });
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
