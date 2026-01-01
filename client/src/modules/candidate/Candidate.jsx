import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaUserPlus, FaSave } from "react-icons/fa";
export default function Candidate({ onClose, onSuccess, editData }) {
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
                password: "",
                con_status: editData.con_status,
                interview_stage: editData.interview_stage,
                joining_cycle: editData.joining_cycle,
                post_joining: editData.post_joining,
                remarks: editData.remarks,
            });
        }
    }, [editData]);
    console.log("formform", form);
    /* SINGLE submit handler */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editData) {
                // UPDATE
                await api.put(`/users/store-candidate/${editData.id}`, form);
            }
            // else {
            //     // CREATE
            //     await api.post("/users", form);
            // }
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
                    <h3 className="text-lg font-bold">{editData ? "Update Candidate" : "Create Candidate"}</h3>
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
                            <input type="hidden" name="user_id" value={form.id} />
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
                                />
                            </div>
                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    User Role
                                </label>
                                <select
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full border rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="{form.role}">{form.role}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Connection Status
                                </label>
                                <select
                                    value={form.con_status || ""}
                                    onChange={(e) => setForm({ ...form, con_status: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Connected">Connected</option>
                                    <option value="Looking for job">Looking for job</option>
                                    <option value="Looking but callback">Looking but callback</option>
                                    <option value="Not looking">Not looking</option>
                                    <option value="Wrong number">Wrong number</option>
                                    <option value="Ring">Ring</option>
                                    <option value="Not Connected">Not Connected</option>
                                    <option value="Fraud">Fraud</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Interview Stage
                                </label>
                                <select
                                    value={form.interview_stage || ""}
                                    onChange={(e) => setForm({ ...form, interview_stage: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Rescheduled">Rescheduled</option>
                                    <option value="Not Interested">Not Interested</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Joining Cycle
                                </label>
                                <select
                                    value={form.joining_cycle || ""}
                                    onChange={(e) => setForm({ ...form, joining_cycle: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Documentation Pending">Documentation Pending</option>
                                    <option value="Documentation Done">Documentation Done</option>
                                    <option value="Offer Letter Pending">Offer Letter Pending</option>
                                    <option value="Offer Accepted">Offer Accepted</option>
                                    <option value="BGV Pending">BGV Pending</option>
                                    <option value="BGV Red">BGV Red</option>
                                    <option value="Joined">Joined</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Post Joining
                                </label>
                                <select
                                    value={form.post_joining || ""}
                                    onChange={(e) => setForm({ ...form, post_joining: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Working">Working</option>
                                    <option value="Left">Left</option>
                                    <option value="Payment Done">Payment Done</option>
                                    <option value="Decertified">Decertified</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Remarks
                            </label>
                            <textarea
                                value={form.remarks || ""}
                                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                                rows="3"
                                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Add remarks / notes"
                            />
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
                                        <span>Update Candidate</span>
                                    </>
                                ) : (
                                    <>
                                        <FaUserPlus size={14} />
                                        <span>Create Candidate</span>
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
