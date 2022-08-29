import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../components/store/AuthStore';
import { Oval } from 'react-loader-spinner';
import Alert from '../../ui/alerts/Alert';

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const emailField = emailRef.current.value;
        const passwordField = passwordRef.current.value;

        try {
            setError('');
            setLoading(true);
            await signIn(emailField, passwordField).then(() => {
                navigate("/");
            });
        } catch (error) {
            setError("Failed to Sign In!");
        }

        setLoading(false);
    }

    return (
        <>
        <div className="h-screen flex items-center justify-center bg-slate-100">
            <div className="max-w-xs w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl tracking-tight font-bold text-gray-900">
                        Sign In
                    </h2>
                </div>
                {
                    error && (
                        <Alert type={"error"}>{ error }</Alert>
                    )
                }
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                ref={emailRef}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
        
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {
                                    loading &&
                                    <Oval
                                    height={17}
                                    width={17}
                                    color="#fff"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#fff"
                                    strokeWidth={4}
                                    strokeWidthSecondary={2}
                                    />
                                }
                            </span>
                            Sign In
                        </button>
                    </div>
                    <div className="!mt-1">
                        <Link className="font-medium text-indigo-600 hover:text-indigo-500" to={"/forgot-password"}>Forgot Password?</Link>
                    </div>
                    <div className="!mt-4">
                        <span>If you don't have an account?&nbsp;</span>
                        <Link className="font-medium text-indigo-600 hover:text-indigo-500" to={"/signup"}>Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};

export default SignIn;