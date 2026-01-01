import { useEffect, useState } from "react";
import api from "../../services/api";
import Candidate from "./Candidate";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, IconButton } from "@mui/material";
import { FaUserPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaFilePdf, FaFileAlt, FaEye } from "react-icons/fa";
export default function CandidateList() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const baseURL = import.meta.env.VITE_API_URL;
    const fetchCandidate = async () => {
        const res = await api.get("/users/candidate-list");
        setUsers(res.data);
    };
    useEffect(() => {
        fetchCandidate();
    }, []);
    const toggleStatus = async (id) => {
        await api.patch(`/users/${id}/status`);
        fetchCandidate();
    };
    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/users/${id}`);
            fetchCandidate();
        } catch (error) {
            // console.log("error",error);        
            alert("Failed to delete user");
        }
    };
    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "mobile",
            headerName: "Mobile",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            renderCell: (params) => (
                <Chip label={params.value} size="small" />
            ),
        },
        {
            field: "is_active",
            headerName: "Status",
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                    <Chip label="Active" color="success" size="small" />
                ) : (
                    <Chip label="Inactive" color="error" size="small" />
                ),
        },
        {
            field: "resume",
            headerName: "Resume",
            flex: 1,
            sortable: false,
            renderCell: (params) =>
                params.value ? (
                    <a
                        href={`${baseURL}/uploads/${params.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Resume"
                        style={{ color: "#dc2626", position: "relative", top: "15px" }}
                    >
                        <FaFilePdf size={18} />
                    </a>
                ) : (
                    <span style={{ color: "#9ca3af", fontSize: 12 }}>No file</span>
                ),
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            //   align: "center",
            //   headerAlign: "center",
            renderCell: (params) => {
                const row = params.row;
                return (
                    <div
                        style={{
                            display: "flex",
                            //   alignItems: "center",
                            //   justifyContent: "center",
                            gap: "12px",
                            width: "100%",
                        }}
                    >
                        {/* EDIT */}
                        <span
                            title="Edit User"
                            onClick={() => {
                                setEditUser(row);
                                setShowForm(true);
                            }}
                            style={{
                                cursor: "pointer",
                                color: "#ca8a04",
                                display: "flex", position: "relative", top: "15px"
                            }}
                        >
                            <FaEdit size={16} />
                        </span>
                        {/* TOGGLE */}
                        <span
                            title={row.is_active ? "Deactivate User" : "Activate User"}
                            onClick={() => toggleStatus(row.id)}
                            style={{
                                cursor: "pointer",
                                color: row.is_active ? "#ef4444" : "#22c55e",
                                display: "flex",
                                position: "relative", top: "15px"
                            }}
                        >
                            {row.is_active ? (
                                <FaToggleOff size={18} />
                            ) : (
                                <FaToggleOn size={18} />
                            )}
                        </span>
                    </div>
                );
            },
        }
    ];
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* LEFT SIDEBAR */}
            {/* RIGHT CONTENT */}
            <main className="flex-1 p-2 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Candidate Management</h2>
                    {/* <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                <FaUserPlus  className="text-sm" />
            </button> */}
                </div>
                {showForm && (
                    <Candidate
                        onClose={() => {
                            setShowForm(false);
                            setEditUser(null);
                        }}
                        onSuccess={fetchCandidate}
                        editData={editUser}
                    />
                )}
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <Box sx={{ height: 550, width: "100%", background: "#fff" }}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            disableRowSelectionOnClick
                            getRowId={(row) => row.id}
                        />
                    </Box>
                </div>
            </main>
        </div>
    );
}
