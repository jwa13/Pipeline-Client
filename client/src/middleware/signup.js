import { auth } from '../middleware/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const handleSignUp = async (email, password) => {
    try {
        const userCredentail = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentail.user;
        const idToken = await user.getIdToken();

        console.log("Firebase Token:", idToken);

        const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/signup`, {
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

export default handleSignUp;