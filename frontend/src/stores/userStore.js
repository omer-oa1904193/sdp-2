import {create} from "zustand"

export const useUserStore = create((set) => ({
    user: null,
    setUser(user) {
        set({user})
    },
    async fetchProtected(url, options = {}) {
        options = {
            method: options?.method ?? "GET",
            headers: options?.headers ?? {
                "Content-Type": "application/json"
            },
            ...options
        };
        options.headers.Authorization = `Bearer ${localStorage.authToken}`;
        const response = await fetch(url, options);
        if (response.status === 401) {
            delete localStorage.authToken;
            return Promise.reject();
        }
        return response;
    },
}))