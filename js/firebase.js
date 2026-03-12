import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyARo01mp9SEwt1wNwJfYmLPhlWkivRgIBg",
    authDomain: "join-us-page.firebaseapp.com",
    projectId: "join-us-page",
    storageBucket: "join-us-page.firebasestorage.app",
    messagingSenderId: "1010837248454",
    appId: "1:1010837248454:web:4340557abe02b7f1ecfac7"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }