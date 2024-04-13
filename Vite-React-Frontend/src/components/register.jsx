import { useState } from "react";
import axios from 'axios';


function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginNotification, setLoginNotification] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');


    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setLoginMessage('Password must be atleast 8 character long!');
            setLoginNotification(true);
            setTimeout(() => {
                setLoginNotification(false);
                setLoginMessage('');
            }, 2000)
            return;
        }

        if (ConfirmPassword !== password) {
            setLoginMessage('Passwords Do Not Match!');
            setLoginNotification(true);
            setTimeout(() => {
                setLoginNotification(false);
                setLoginMessage('');
            }, 2000)
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/signup', { username, password });
            console.log(response.data);
            if (response.status === 200) {
                setLoginNotification(true);
                setLoginMessage(response.data)
                setTimeout(() => {
                    setLoginNotification(false);
                    setLoginMessage('');
                }, 2000);
            }
        } catch (error) {
            console.log(error.response.data);
            setLoginNotification(true);
            setLoginMessage(error.response.data)
            setTimeout(() => {
                setLoginNotification(false);
                setLoginMessage('');
            }, 2000);
        }
    }

    return (
        <>
            <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat " style={{
                backgroundImage: `url('http://localhost:5173/background.jpeg')`,
            }}>
                {loginNotification && (
                    <div class="bg-white/60 backdrop-blur-xl z-20 max-w-md absolute right-5 top-5 rounded-lg p-5 shadow">
                        <h1 class="text-xl text-slate-700 font-medium">{loginMessage}</h1>

                    </div>
                )}

                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                    <div className="text-white">
                        <div className="mb-8 flex flex-col items-center">
                            <img src="http://localhost:5173/logo.png" width="80" alt="" srcset="" />
                            <h1 className="mb-2 text-2xl mt-3">Registration Page</h1>
                            <span className="text-gray-300">Enter Your Details</span>
                        </div>
                        <form>
                            <div className="mb-4 text-lg">
                                <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className="mb-4 text-lg">
                                <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-4 text-lg">
                                <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="mt-8 flex justify-center text-lg text-black">
                                <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600" onClick={handleSignUp}>Register</button>
                            </div>
                            <p class="gap-2 text-center text-white mt-5">
                                Already have a account?
                                <a href="/" class="font-semibold text-black hover:text-white">  Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register