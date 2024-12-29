import axios from "axios";
import { use } from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Mahasiswa = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        progdi_id: "",
        nim: "",
        nama: "",
        alamat: "",
        umur: "",
    })
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://demo-api.syaifur.io/api/mahasiswa", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Terjadi error saat mengirim data.");
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://demo-api.syaifur.io/api/mahasiswa", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            setData([...data, response.data.data]);
            setIsModalOpen(false);
            setFormData({
                progdi_id: "", 
                nim: "", 
                nama: "", 
                alamat: "", 
                umur: "" 
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil menambahkan data",
                text: response.data.message,
            });
        } catch (error) {
            console.error("Terjadi error saat mengirim data baru.", error);
            setError(error.response?.data?.message || error.message);
        }
    };

    return(
        <main className="p-6">
            <div className="grid grid-cols-1 place-items-end mb-2">
                <button
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-green-500 p-2 rounded-md w-[200px]">
                    <span className="text-white font-bold">Tambah Mahasiswa</span>
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Tambah Data Mahasiswa</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">Progdi ID</label>
                                <input
                                    type="text"
                                    name="progdi_id"
                                    value={formData.progdi_id}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">NIM</label>
                                <input
                                    type="text"
                                    name="nim"
                                    value={formData.nim}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Nama</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Alamat</label>
                                <input
                                    type="text"
                                    name="alamat"
                                    value={formData.alamat}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Umur</label>
                                <input
                                    type="number"
                                    name="umur"
                                    value={formData.umur}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button 
                                    type="submit" 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-green-500 text-white px-4 py-2 rounded">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <table className="w-full ">
                <thead>
                    <tr className="bg-gray-300 text-center">
                        <th className=" p-3 border-2" >id</th>
                        <th className=" p-3 border-2" >progdi</th>
                        <th className=" border-2" >nim</th>
                        <th className=" border-2" >nama</th>
                        <th className=" border-2" >alamat</th>
                        <th className=" border-2" >umur</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) =>
                        <tr key={item.id} className="even:bg-gray-200 text-center">
                            <td className="p-4 border-2" >{item.id}</td>
                            <td className="p-4 border-2" >{item.progdi_id}</td>
                            <td className="p-4 border-2" >{item.nim}</td>
                            <td className="p-4 border-2">{item.nama}</td>
                            <td className="p-4 border-2">{item.alamat}</td>
                            <td className="p-4 border-2">{item.umur}</td>
                            {/* <td><button></button></td> */}
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
    )
}

export default Mahasiswa;