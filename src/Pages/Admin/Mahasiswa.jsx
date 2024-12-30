import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Mahasiswa = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isModalTambah, setIsModalTambah] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
    const [formData, setFormData] = useState({
        progdi_id: "",
        nim: "",
        nama: "",
        alamat: "",
        umur: "",
    });

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
                console.error("Terjadi error saat mengambil data.");
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
            setIsModalTambah(false);
            setFormData({
                progdi_id: "",
                nim: "",
                nama: "",
                alamat: "",
                umur: "",
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

    const pilihMahasiswa = (mahasiswa) => {
        setSelectedMahasiswa(mahasiswa);
        setFormData({
            progdi_id: mahasiswa.progdi_id,
            nim: mahasiswa.nim,
            nama: mahasiswa.nama,
            alamat: mahasiswa.alamat,
            umur: mahasiswa.umur,
        });
        setIsModalUpdate(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://demo-api.syaifur.io/api/mahasiswa/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            setData(data.filter((item) => item.id !== id));
            Swal.fire({
                icon: "success",
                title: "Berhasil menghapus data",
                text: response.data.message,
            });
        } catch (error) {
            console.error("Terjadi error saat menghapus data.", error);
            setError(error.response?.data?.message || error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://demo-api.syaifur.io/api/mahasiswa/${selectedMahasiswa.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            setData(data.map((item) => (item.id === selectedMahasiswa.id ? response.data.data : item)));
            setIsModalUpdate(false);
            setFormData({
                progdi_id: "",
                nim: "",
                nama: "",
                alamat: "",
                umur: "",
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil mengubah data",
                text: response.data.message,
            });
        } catch (error) {
            console.error("Terjadi error saat mengubah data.", error);
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <main className="p-6">
            <div className="grid grid-cols-1 place-items-end mb-2">
                <button
                    onClick={() => setIsModalTambah(true)}
                    className="bg-green-500 p-2 rounded-md w-[200px]"
                >
                    <span className="text-white font-bold">Tambah Mahasiswa</span>
                </button>
            </div>
            {isModalTambah && (
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
                                </div>
                            {/* Repeat for other fields */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalTambah(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isModalUpdate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Edit Data Mahasiswa</h2>
                        <form onSubmit={handleUpdate}>
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
                                    type="button"
                                    onClick={() => setIsModalUpdate(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-300 text-center">
                        <th className="p-3 border-2">Id</th>
                        <th className="p-3 border-2">Progdi</th>
                        <th className="border-2">Nim</th>
                        <th className="border-2">Nama</th>
                        <th className="border-2">Alamat</th>
                        <th className="border-2">Umur</th>
                        <th className="border-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="even:bg-gray-200 text-center">
                            <td className="p-4 border-2">{item.id}</td>
                            <td className="p-4 border-2">{item.progdi_id}</td>
                            <td className="p-4 border-2">{item.nim}</td>
                            <td className="p-4 border-2">{item.nama}</td>
                            <td className="p-4 border-2">{item.alamat}</td>
                            <td className="p-4 border-2">{item.umur}</td>
                            <td className="flex gap-3 p-4 border-1">
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                                    onClick={() => pilihMahasiswa(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default Mahasiswa;
