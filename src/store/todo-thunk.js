import { addTodo, setStatus } from "./todoSlice";

// Utility function to fetch data
const fetchData = async (url, token, method, obj = null) => {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? token : "empty",
        },
    };

    if (obj) {
        options.body = JSON.stringify(obj);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
        throw new Error(data);
    }

    return data;
};

// Action creator to fetch all products
export const getallTodo = (token, page) => {
    return async (dispatch) => {
        try {
            const data = await fetchData(`http://54.175.204.200:3000/todo?page=${page}`, token, "GET", null);
            
            dispatch(addTodo({ todo: data.todo, totalcount: data.totalcount }));
        } catch (error) {
            console.error(error);
        }
    };
};

// Action creator to fetch todo data
export const getTodo = (token) => {
    return async (dispatch) => {
        try {
            const data = await fetchData("http://54.175.204.200:3000/todo", token, "GET");
            
        } catch (error) {
            console.error(error);
        }
    };
};

// Action creator to add item
export const postTodo = (obj, token, page) => {
    return async (dispatch) => {
        try {
            dispatch(setStatus({ curstatus: true, statusmessage: "pending!" }));
            const data = await fetchData(`http://54.175.204.200:3000/todo?page=${page}`, token, "POST", obj);
            

            dispatch(addTodo({ todo: data.todo, totalcount: data.totalcount }));
            dispatch(setStatus({ curstatus: true, statusmessage: "success" }));
        } catch (error) {
            console.error(error);
            dispatch(setStatus({ curstatus: true, statusmessage: "error" }));
        }
    };
};

// Action creator to remove item
export const deleteTodo = (id, token, page) => {
    return async (dispatch) => {
        try {
            dispatch(setStatus({ curstatus: true, statusmessage: "pedning!" }));
            const data = await fetchData(`http://54.175.204.200:3000/todo?id=${id}&page=${page}`, token, "DELETE");

            dispatch(addTodo({ todo: data.todo, totalcount: data.totalcount }));
            dispatch(setStatus({ curstatus: true, statusmessage: "success" }));
        } catch (error) {
            dispatch(setStatus({ curstatus: true, statusmessage: "error" }));
        }
    };
};

// Action creator to update item
export const updateTodo = (obj, token, id, page) => {
    return async (dispatch) => {
        try {
            dispatch(setStatus({ curstatus: true, statusmessage: "pedning!" }));
            const data = await fetchData(`http://54.175.204.200:3000/todo?id=${id}&page=${page}`, token, "PATCH", obj);

            dispatch(addTodo({ todo: data.todo, totalcount: data.totalcount }));
            dispatch(setStatus({ curstatus: true, statusmessage: "success" }));
        } catch (error) {
            dispatch(setStatus({ curstatus: true, statusmessage: "error" }));
        }
    };
};
