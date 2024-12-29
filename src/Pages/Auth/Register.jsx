import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const Navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post("http://demo-api.syaifur.io/api/register", form)
            console.log(data)
            Swal.fire({
                icon: "success",
                title: "Register Berhasil",
                text: data.message
            })
            setTimeout(() => {
                Navigate("/");
            }, 1000)
        } catch (error) {
            console.log(error.response.data)
            Swal.fire({
                icon: "error",
                title: "Register Gagal",
                text: error.response.data.message
            })
        }
    };
    return(
        <div className="flex justify-center items-center h-screen text-center text-2xl flex-col" >
            <h1
                className="my-5 font-semibold"
            >
                Register
            </h1>
            <form action="" onSubmit={handleSubmit} className="flex flex-col border p-5">
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={form.name} 
                    placeholder="name" 
                    required onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input type="text" 
                    name="email" 
                    id="email" 
                    value={form.email} 
                    placeholder="email" 
                    required onChange={handleChange} 
                    className="my-5 p-2 border rounded "
                />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={form.password} 
                    placeholder="password" 
                    required onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button type="submit" className="p-2 m-3 bg-green-500 text-white rounded"> register </button>
            </form>
        </div>
    );
}

export default Register;