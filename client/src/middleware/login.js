import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../middleware/firebase'

const handleLogin = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const idToken = await user.getIdToken();
        console.log(idToken);

        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({idToken})
        });

        const data = await response.json();
        if(data.token) {
            localStorage.setItem("jwt", data.token);
            console.log("jwt:", data.token);
        }
    } catch (error) {
        throw error;
    }
}

export default handleLogin;