import { defineStore } from 'pinia';
import { ref } from 'vue';
const api_url = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore('user', () => {
    const is_login = ref(true);

    return {
        is_login
    }
})