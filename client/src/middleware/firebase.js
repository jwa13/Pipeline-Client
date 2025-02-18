import firebase, { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { EmailAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYRRJoZX9r31zz5sxTyCQ22olqigBoVAM",
  authDomain: "pipelinewebapp-b4d24.firebaseapp.com",
  projectId: "pipelinewebapp-b4d24",
  storageBucket: "pipelinewebapp-b4d24.firebasestorage.app",
  messagingSenderId: "73135204707",
  appId: "1:73135204707:web:b0039d1b8f3898b50ecb56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new EmailAuthProvider;

export { auth, provider, signInWithPopup };