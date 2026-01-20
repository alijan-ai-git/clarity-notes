import { useState } from "react";
import { toast } from "react-hot-toast";
import { registerUser } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

function register() {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await registerUser(name, email, password);
            login(data.user, data.token);
            toast.success("Registered successfully!");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
            />
            <button type="submit" disabled={loading} className="w-full py-2 bg-black text-white rounded">
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}

export default register;
