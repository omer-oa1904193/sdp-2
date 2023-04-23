import {create} from "zustand"

export const useUserStore = create((set, get) => ({
    user: null,
    setUser(user) {
        set({user})
    },
    async fetchProtected(path, options = {}) {
        options = {
            method: options?.method ?? "GET",
            headers: options?.headers ?? {
                "Content-Type": "application/json"
            },
            ...options
        };
        options.headers.Authorization = `Bearer ${localStorage.authToken}`;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options);
        if (response.status === 401) {
            delete localStorage.authToken;
            return Promise.reject();
        }
        return response;
    },
    isAuthenticated() {
        return get().user || localStorage.authToken;
    }
}))