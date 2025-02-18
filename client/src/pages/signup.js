import { useState } from "react";
import handleSignUp from "../middleware/signup"
import { useRouter } from "next/router";

export default function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        await handleSignUp(email, password);
        router.push("/index")
    }

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={submit}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}