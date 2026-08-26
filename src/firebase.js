import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'devtype-9fa2f.firebaseapp.com',
  projectId: 'devtype-9fa2f',
  storageBucket: 'devtype-9fa2f.firebasestorage.app',
  messagingSenderId: '316214800109',
  appId: '1:316214800109:web:4ae818c2a773f1bbaf26e4',
  measurementId: 'G-6Y6SMEQV9F',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
