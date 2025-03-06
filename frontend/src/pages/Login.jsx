import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";


function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo }
        copyLoginInfo[name] = value
        setLoginInfo(copyLoginInfo)
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = loginInfo
        if (!email || !password) {
            return handleError(' email, password are required')
        }
        try {
            const url = "http://localhost:8080/api/v1/users/login"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo),
                credentials: "include"//important for cookies
            })
            const result = await response.json()
            console.log("login response", result);

            const { success, message, data, error } = result
            const user = data?.user;

            if (success ) {
                handleSuccess(message)

                localStorage.setItem('loggedInUser', user.name)

                setTimeout(() => {
                    navigate('/home')
                }, 2000)
            } else if (error) {
                const details = error?.details[0].message
                handleError(details)
            } else if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }


    return (
        <div className="container">
            <h1>Login</h1>
            <form action="" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email:"
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password:"
                        value={loginInfo.password}
                    />
                </div>
                <button type="submit">Login</button>
                <span>Don't have an account ?
                    <Link to="/signup">SignUp</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login