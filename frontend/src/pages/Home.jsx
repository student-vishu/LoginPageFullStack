import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const name = localStorage.getItem('loggedInUser')
        

        if (name) setLoggedInUser(name)
    }, [])

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8080/api/v1/users/logout", {
                method: "POST",
                credentials: "include"
            })
            localStorage.removeItem("loggedInUser")
            navigate('/login')

        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    return (
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home