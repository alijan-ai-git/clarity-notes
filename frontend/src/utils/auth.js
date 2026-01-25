const API = "http://localhost:5000/api/auth";

export const registerUser = async (fullName, email, password, userName) => {
    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, userName }),
    });
    console.log(res);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const loginUser = async (userName, password) => {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

