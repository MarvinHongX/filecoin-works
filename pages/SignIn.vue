<script setup>
import { ref } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
const editing = ref(false);
const userId = ref('');
const password = ref('');
const errors = ref({
    signIn: '',
});
const { signIn } = await useAuth()
const { logoUrl } = useImg();
definePageMeta({
    layout: false,
    middleware: ['signed-in']
});

watch(userId, () => {
    errorsSignIn(editing, userId, password, errors);
});

watch(password, () => {
    errorsSignIn(editing, userId, password, errors);
});

const handleSignIn = async () => {
    if (!editing.value) editing.value = true;
    errorsSignIn(editing, userId, password, errors);
    if (errors.value.signIn !== '') return
    
    try {
        const data = await signIn({
            userId: userId.value,
            password: password.value
        });
        if (data && data !== '') {
            goToHomePage();
            return;
        }
    } catch (error) {
        console.error(error);
        errors.value.signIn = '아이디 또는 비밀번호를 잘못 입력했습니다.';
        return;
    }
    errors.value.signIn = '아이디 또는 비밀번호를 잘못 입력했습니다.';
}


</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img :src="logoUrl" alt="logo" class="mb-5 w-6rem flex-shrink-0" />
                        <div class="text-900 text-3xl font-medium mb-3">안녕하세요. Filecoin Works 입니다.</div>
                        <span class="text-600 font-medium">계속하려면 로그인하세요.</span>
                    </div>

                    <form @submit.prevent="handleSignIn">
                        <div class="mb-8">
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-user"></i>
                                </InputGroupAddon>
                                <InputText id="userId1" v-model="userId" type="text" placeholder="아이디" class="w-full" style="padding: 1rem" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-lock"></i>
                                </InputGroupAddon>
                                <Password id="password1" v-model="password" placeholder="비밀번호" :toggleMask="true" class="w-full" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            </InputGroup>
                            <div>
                                <small id="user-error" class="p-error mb-5" v-if="errors.signIn !== ''">{{ errors.signIn }}</small>
                            </div>
                        </div>
                        <Button type="submit" label="로그인" class="w-full p-3 text-xl mb-5"></Button>
                    </form> 
                    <div class="flex align-items-center justify-content-between mb-5 gap-5">
                        <a @click="goToHelpPage()" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">비밀번호 찾기</a>
                        <a @click="goToSignUpPageWithOutReferralCode()" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">회원가입</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
</style>
