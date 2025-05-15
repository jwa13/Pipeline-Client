import { useEffect, useState } from 'react';
import handleLogin from "../middleware/login";
import { useRouter } from 'next/router';

export default function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    const [badCred, setBadCred] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [goodData, setGoodData] = useState(false);

    useEffect(() => {
        if(router.query.message === 'account-exists') {
            setLoginMessage('An account with this email already exists. Please log in');
        } else if(router.query.message === 'session-expired') {
            setLoginMessage('Session expired, please re-login');
        } else if(router.query.message === 'account-data-success') {
            setLoginMessage('Account data updated successfully, please re-login to access your account');
            setGoodData(true);
        }
    }, [router.query.message]);

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await handleLogin(email, password);
            router.push("/home");
        } catch (error) {
            setBadCred(true);
            router.push("/login");
        }
    }

    function SubmitButton() {
        if(email && password) {
            return <button onClick={submit} className="w-3/4 px-6 py-4 m-6 bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Login</button>
        } else {
            return <button onClick={submit} disabled className="w-3/4 px-6 py-4 m-6 bg-gray-500 text-black font-bebas-neue text-2xl rounded-none font-bold text-white hover:bg-gray-400 transition border-[3px] border-solid border-white">Login</button>
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className={`relative transition-all duration-300 ease-in-out ${loginMessage ? 'pt-20' : 'pt-0'} flex justify-center`}>
                {loginMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md w-[350px] absolute top-1">
                        <div className='flex justify-between items-center'>
                            <p className='text-sm'>{loginMessage}</p>
                            <button onClick={() => setLoginMessage('')} className='text-red-700 font-bold text-lg ml-4'>x</button>
                        </div>
                    </div>
                )}
                {loginMessage && goodData && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md w-[350px] absolute top-1">
                        <div className='flex justify-between items-center'>
                            <p className='text-sm'>{loginMessage}</p>
                            <button onClick={() => setLoginMessage('')} className='text-green-700 font-bold text-lg ml-4'>x</button>
                        </div>
                    </div>
                )}
                <div className="bg-[hsl(43.3,46,64)] rounded-2xl border-[5px] border-solid border-gray-500 shadow-lg p-8 w-96 h-[500px] flex flex-col justify-center">
                    <div className="mb-2 pt-10">
                        <img src="/image.png" alt="Logo" className="mx-auto w-[150px] h-[150px]"></img>
                    </div>
                    <div className="space-y-4 pt-2 pb-6 flex flex-col items-center">
                        <form onSubmit={submit} className="flex flex-col items-center w-full">
                            <label htmlFor="email" className="text-black font-bebas-neue text-m mr-[235px]">Your Email:</label>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-2 ml-2 mr-2 py-1 pl-2 w-full text-black text-l border-[3px] border-solid border-gray-500"></input>
                            <label htmlFor="password" className="text-black font-bebas-neue text-m mr-[210px]">Your Password:</label>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mb-2 ml-2 mr-2 py-1 pl-2 w-full text-black text-l border-[3px] border-solid border-gray-500"></input>
                            {badCred && (<p className='text-red-500 font-bebas-neue'>Email or Password do not match our records</p>)}
                            <SubmitButton />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}