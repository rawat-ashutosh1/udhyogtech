import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("email", e.target.email.value);
        formData.append("mobile", e.target.mobile.value);
        formData.append("password", e.target.password.value);
        formData.append("role", "Job Seeker");
        formData.append("resume", e.target.resume.files[0]);
        

        try {
            await api.post("/users/candidate", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
            alert("Registration successful. Please login.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Create Your Account
                </h2>
                <p className="text-center text-gray-500 text-sm mt-1 mb-6">
                    Join us and start managing opportunities
                </p>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            name="name"
                            placeholder="John Doe"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number
                        </label>
                        <input
                            name="mobile"
                            placeholder="Mobile Number"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-green-600 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
