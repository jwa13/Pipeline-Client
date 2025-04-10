import { useState } from "react";
import handleSignUp from "../middleware/signup";
import { useRouter } from "next/router";

export default function signup() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if(!/\S+@\S+\.\S+/.test(value)) {
            setEmailError('Invalid Email Address');
        } else {
            setEmailError('');
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if(value.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if(value !== password) {
            setConfirmError("Passwords don't match");
        } else {
            setConfirmError('');
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await handleSignUp(email, password);
            router.push("/newUserForm")
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                router.push('/login?message=account-exists');
            }
        }
    }

    function SubmitButton() {
        if(email && password && confirmPassword && !emailError && !passwordError && !confirmError) {
            return <button onClick={submit} className="w-3/4 px-6 py-4 m-6 bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Create Account</button>
        } else {
            return <button onClick={submit} disabled className="w-3/4 px-6 py-4 m-6 bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Create Account</button>
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-[hsl(43.3,46,64)] rounded-2xl border-[5px] border-solid border-gray-500 shadow-lg p-8 w-96 h-[600px] flex flex-col justify-center">
                <div className="mb-2 pt-10">
                    <img src="/image.png" alt="Logo" className="mx-auto w-[150px] h-[150px]"></img>
                </div>
                <div className="space-y-4 pt-2 pb-6 flex flex-col items-center">
                    <form onSubmit={submit} className="flex flex-col items-center w-full">
                        <label htmlFor="email" className="text-black font-bebas-neue text-m mr-[235px]">Your Email:</label>
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required className="mb-2 ml-2 mr-2 py-1 pl-2 w-full text-black text-l border-[3px] border-solid border-gray-500"></input>{emailError && <p className="text-red-500 text-sm ml-2">{emailError}</p>}
                        <label htmlFor="password" className="text-black font-bebas-neue text-m mr-[20px]">Your Password: (must contain at least 6 characters)</label>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required className="mb-2 ml-2 mr-2 py-1 pl-2 w-full text-black text-l border-[3px] border-solid border-gray-500"></input>{passwordError && <p className="text-red-500 text-sm ml-2">{passwordError}</p>}
                        <label htmlFor="passwordConfirmation" className="text-black font-bebas-neue text-m mr-[20px]">Confirm Password: </label>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} required className="mb-2 ml-2 mr-2 py-1 pl-2 w-full text-black text-l border-[3px] border-solid border-gray-500"></input>{confirmError && <p className="text-red-500 text-sm ml-2">{confirmError}</p>}
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </div>
    )
}