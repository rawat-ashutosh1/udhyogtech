import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaUserPlus, FaSave } from "react-icons/fa";
export default function UserCreate({ onClose, onSuccess, editData }) {
    // console.log("editDataeditData",editData);
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        role: "",
        is_active: 1,
        password: ""
    });
    useEffect(() => {
        if (editData) {
            setForm({
                name: editData.name,
                email: editData.email,
                mobile: editData.mobile,
                role: editData.role,
                is_active: editData.is_active,
                password: ""
            });
        }
    }, [editData]);
    // console.log("formform",editData);
    /* SINGLE submit handler */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editData) {
                // UPDATE
                const response = await api.put(`/users/${editData.id}`, form);
                if (response.status === 200) {
                    alert("Users updated successfully!");
                }
            } else {
                // CREATE
                await api.post("/users", form);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.log("errerr", err);
            alert(err.response?.data?.message || "Failed to save user");
        }
    };
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            {/* MODAL CONTAINER */}
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl shadow-xl flex flex-col">
                <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold">{editData ? "Update User" : "Create User"}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* BASIC INFO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    placeholder="Enter Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                                    required
                                    disabled={!!editData}
                                />
                            </div>
                            {/* Mobile */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    placeholder="Enter Mobile Number"
                                    value={form.mobile}
                                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    User Role
                                </label>
                                <select
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full border rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Recruiter">Recruiter</option>
                                    <option value="Backoffice">Backoffice</option>
                                    <option value="Lead Specialist">Lead Specialist</option>
                                    <option value="Freelancer">Freelancer</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                placeholder={editData ? "Leave blank to use existing password" : " Enter password"}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                required={!editData}
                            />
                        </div>
                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 border-t pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-2 py-2 rounded
                                bg-blue-600 text-white hover:bg-blue-700 transition"
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                {editData ? (
                                    <>
                                        <FaSave size={14} />
                                        <span>Update User</span>
                                    </>
                                ) : (
                                    <>
                                        <FaUserPlus size={14} />
                                        <span>Create User</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
