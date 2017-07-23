const saveToken = token => localStorage.setItem("token", token);

const getToken = () => localStorage.getItem("token");

const removeToken = () => localStorage.removeItem("token");

export { saveToken, getToken, removeToken };
