import { AuthSliceAction } from "./authslice";

const fetchWithBody = async (url, method, body) => {
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    if (data.error) {
        throw new Error();
    }

    return data;
};

export const Signup = (userData) => {
    return async (dispatch) => {
        try {
            const data = await fetchWithBody(`http://54.175.204.200:3000/auth/signup`, "POST", userData);

            dispatch(AuthSliceAction.login());
        } catch (error) {
            dispatch(AuthSliceAction.setError({ error: "Enter valid Details" }));
            console.log(error.message);
        }
    };
};

export const Login = (userData) => {
    return async (dispatch) => {
        try {
            const user = await fetchWithBody(`http://54.175.204.200:3000/auth/login`, "POST", userData);

            localStorage.setItem("token", user.Token);
            localStorage.setItem("login", true);
            dispatch(AuthSliceAction.setAuth({ login: "true", token: user.Token }));
        } catch (error) {
            dispatch(AuthSliceAction.setError({ error: "Enter valid Details" }));
            console.log(error.message);
        }
    };
};
