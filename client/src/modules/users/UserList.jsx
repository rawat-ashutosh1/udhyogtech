import { useEffect, useState } from "react";
import api from "../../services/api";
import UserCreate from "./UserCreate";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, IconButton } from "@mui/material";
import { FaUserPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
export default function UserList() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const fetchUsers = async () => {
        const res = await api.get("/users");
        setUsers(res.data);
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const toggleStatus = async (id) => {
        await api.patch(`/users/${id}/status`);
        fetchUsers();
    };
    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
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
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            // align: "center",
            // headerAlign: "center",
            renderCell: (params) => {
                const row = params.row;
                return (
                    <div
                        style={{
                            display: "flex",
                            // alignItems: "center",
                            // justifyContent: "center",
                            gap: "12px",
                            width: "100%", position: "relative", top: "15px"
                        }}
                    >
                        {/* EDIT */}
                        <span
                            title="Edit User"
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditUser(row);
                                setShowForm(true);
                            }}
                            style={{
                                cursor: "pointer",
                                color: "#ca8a04",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FaEdit size={16} />
                        </span>
                        {/* ACTIVATE / DEACTIVATE */}
                        <span
                            title={row.is_active ? "Deactivate User" : "Activate User"}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleStatus(row.id);
                            }}
                            style={{
                                cursor: "pointer",
                                color: row.is_active ? "#ef4444" : "#22c55e",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {row.is_active ? (
                                <FaToggleOff size={18} />
                            ) : (
                                <FaToggleOn size={18} />
                            )}
                        </span>
                        {/* DELETE */}
                        <span
                            title="Delete User"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteUser(row.id);
                            }}
                            style={{
                                cursor: "pointer",
                                color: "#4b5563",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FaTrash size={15} />
                        </span>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* LEFT SIDEBAR */}
            {/* RIGHT CONTENT */}
            <main className="flex-1 p-2 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">User Management</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <FaUserPlus className="text-sm" />
                    </button>
                </div>
                {showForm && (
                    <UserCreate
                        onClose={() => {
                            setShowForm(false);
                            setEditUser(null);
                        }}
                        onSuccess={fetchUsers}
                        editData={editUser}
                    />
                )}
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <Box sx={{ height: 550, width: "100%", backgroundColor: "#fff" }}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            getRowId={(row) => row.id}
                            disableRowSelectionOnClick
                            rowHeight={52}
                        />
                    </Box>
                </div>
            </main>
        </div>
    );
}
