const baseUrl = "http://167.99.193.95:5000";

export function apiFetch(path, options = {}) {

    const url = baseUrl + path;
    const token = localStorage.getItem("token");

    let headers = { ...options.headers };

    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    if (options.body) {
        headers["Content-Type"] = "application/json";
    }

    options.headers = headers;

    return fetch(url, options).then((res) => {
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return res.json();
    });
}