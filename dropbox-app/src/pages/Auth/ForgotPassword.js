import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../components/store/AuthStore';
import { Oval } from 'react-loader-spinner';
import Alert from '../../ui/alerts/Alert';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const emailField = emailRef.current.value;

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailField).then(() => {
                setMessage("Check your inbox for further instructions");
            });
        } catch (error) {
            setError("Failed to Reset Password!");
        }

        setLoading(false);
    }

    return (
        <>
        <div className="h-screen flex items-center justify-center bg-slate-100">
            <div className="max-w-xs w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl tracking-tight font-bold text-gray-900">
                        Password Reset
                    </h2>
                </div>
                {
                    error && (
                        <Alert type={"error"}>{ error }</Alert>
                    )
                }
                {
                    message && (
                        <Alert type={"success"}>{ message }</Alert>
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
                            Reset Password
                        </button>
                    </div>
                    <div className="!mt-1">
                        <Link className="font-medium text-indigo-600 hover:text-indigo-500" to={"/signin"}>Sign In</Link>
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

export default ForgotPassword;