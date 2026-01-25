import { useState } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

function login() {
    const { login } = useAuth();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(userName, password);
            login(data.user, data.token);
            toast.success("Logged in successfully!");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                autoComplete="userName"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                autoComplete="password"
                required
            />
            <button type="submit" disabled={loading} className="w-full py-2 bg-black text-white rounded">
                {loading ? "Logging in..." : "Login"}
            </button>
            <p className="">Don't have an account? <a href="/register">Sign Up</a></p>
        </form>
    );
}

export default login;