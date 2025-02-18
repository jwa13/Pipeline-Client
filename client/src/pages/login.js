import { useState } from 'react';
import handleLogin from "../middleware/login";
import { useRouter } from 'next/router';

export default function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await handleLogin(email, password);
            router.push("/");
        } catch (error) {
            setError(error.message);
        }
    }
        return (
        <div>
            <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}