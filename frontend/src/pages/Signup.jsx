import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";


function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        contactNo: '',
        address: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo }
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)
    }


    const handleSignup = async (e) => {
        e.preventDefault()
        const { email, name, password, contactNo, address } = signupInfo
        if (!name || !email || !password || !contactNo || !address) {
            return handleError('name , email, password, contact No, address all field are required')
        }
        try {
            const url = "http://localhost:8080/api/v1/users/register"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            const { success, message,error } = result
            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }else if(error){
                const details=error?.details[0].message
                handleError(details)
            }else if(!success){
                handleError(message)
            }
            console.log(result);
            

        } catch (error) {
            handleError(error)
        }
    }


    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form action="" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter your name:"
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email:"
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password:"
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor="contactNo">ContactNo</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="contactNo"
                        placeholder="Enter your contact no:"
                        value={signupInfo.contactNo}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="address"
                        placeholder="Enter your address:"
                        value={signupInfo.address}
                    />
                </div>
                <button type="submit">SignUp</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup