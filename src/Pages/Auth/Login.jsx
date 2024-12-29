import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://demo-api.syaifur.io/api/login", {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("authToken", response.data.data.token);
            localStorage.setItem("userData", JSON.stringify(response.data.data.user));
            console.log("Login response:", response.data);
            Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: response.data.message,
            });

            setTimeout(() => {
                Navigate("/admin");
            }, 1000);
        } catch (err) {
            console.error("Error during login:", err.response || err.message);
            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: err.response?.data?.message || err.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen text-center text-2xl flex-col">
            <h1 className="my-5 font-semibold">Login Page</h1>
            <form onSubmit={handleSubmit} className="flex flex-col border p-5">
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-6 p-2 border rounded"
                />
                <button type="submit" className="p-2 bg-green-500 text-white rounded">
                    Login
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
