import { defineStore } from 'pinia';
import { ref } from 'vue';
const api_url = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore('user', () => {
    const id = ref(0);
    const email = ref('');
    const number = ref(null);
    const realName = ref(null);
    const nickname = ref('');
    const description = ref('');
    const avatar = ref('');
    const createTime = ref('');
    const is_student = ref(true);
    const is_teacher = ref(true);
    const is_admin = ref(true);

    const token = ref('')
    const is_login = ref(true);
    

    return {
        id,
        email,
        number,
        realName,
        nickname,
        description,
        avatar,
        createTime,
        is_student,
        is_teacher,
        is_admin,
        token,
        is_login
    }
})