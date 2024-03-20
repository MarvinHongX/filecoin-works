<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppConfig from '@/layouts/AppConfig.vue';
const referralCode = ref('');
// const agreeAll = ref(false);
// const agrees = ref([]);
const agreeAll = ref(true);
const agrees = ref(["agree1", "agree2"]);
const route = useRoute();
const { signUpAgree } = await useAuth()
const { logoUrl } = useImg();


const agreeButtonEnabled = computed(() => {
    return agrees.value.includes("agree1") && agrees.value.includes("agree2");
});

definePageMeta({
    layout: false,
    middleware: ['signed-in', 'signup-referral-code-verified-only']
});

const onClickAgreeAll = (checked) => {
    if (checked) {
        agrees.value = ["agree1", "agree2"];        
    } else {
        agrees.value = [];
    }
}

const onClickAgree1 = (checked) => {
    agreeAll.value = (checked && agrees.value.includes("agree2"));
}

const onClickAgree2 = (checked) => {
    agreeAll.value = (agrees.value.includes("agree1") && checked);
}


const handleAgree = async () => {
    try {
        const data = await signUpAgree({
            agrees: agrees.value,
            referralCode: referralCode.value,
        });
        if (data && data.token && data.token !== '') {
            goToSignUpPage(data.token);
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}


onMounted(() => {
    referralCode.value = route.params.referralCode.toString();
});



</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="agree flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <a @click="goToSignInPage()">
                        <img :src="logoUrl" alt="logo" class="mb-5 w-6rem flex-shrink-0 cursor-pointer" />
                    </a>
                    <form @submit.prevent="handleAgree">
                        <div class="mb-8">
                            <div class="flex align-items-center text-900 text-2xl font-medium">
                                <Checkbox v-model="agreeAll" inputId="agreeAll" name="agreeAll" binary @click="onClickAgreeAll($event.target.checked)"/>
                                <label for="agreeAll" class="ml-2"> 전체 동의하기 </label>
                            </div>
                            <div class="card border-none mb-4 flex align-items-center">
                                <ScrollPanel>
                                    <p>
                                        서비스 이용약관, 개인정보 수집 및 이용 동의를 포함합니다.
                                    </p>
                                </ScrollPanel>
                            </div> 
                            <div class="flex align-items-center text-900 text-xl font-medium mb-3">
                                <Checkbox v-model="agrees" inputId="agree1" name="agree1" value="agree1" @click="onClickAgree1($event.target.checked)" />
                                <label for="agree1" class="ml-2">[필수] 서비스 이용약관 </label>
                            </div>
                            <div class="term card flex align-items-center mb-4">
                                <ScrollPanel>
                                    <p>
                                        <h6>여러분을 환영합니다.</h6>
                                        Filecoin Works 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 Filecoin Works 서비스의 이용과 관련하여 Filecoin Works 서비스를 제공하는 주식회사 토탈쉬프트(이하 ‘토탈쉬프트’)와 이를 이용하는 Filecoin Works 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 Filecoin Works 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.

Filecoin Works 서비스를 이용하시거나 Filecoin Works 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
                                    </p>
                                </ScrollPanel>
                            </div>
                            <div class="flex align-items-center text-900 text-xl font-medium mb-3">
                                <Checkbox v-model="agrees" inputId="agree2" name="agree2" value="agree2" @click="onClickAgree2($event.target.checked)" />
                                <label for="agree2" class="ml-2">[필수] 개인정보 수집 및 이용 </label>
                            </div>
                            <div class="term card flex align-items-center mb-4">
                                <ScrollPanel>
                                    <p>
                                        <h6>1. 사용자에게 의미하는 개인정보 처리방침</h6>
                                        <h6>2. 수집된 개인정보</h6>
                                        <h6>3. 수집된 개인정보의 사용</h6>
                                        <h6>4. 개인정보의 제공 및 위탁</h6>
                                        <h6>5. 개인정보의 파기</h6>
                                        <h6>6. 사용자 및 법정 대리인의 권리 및 그 권리의 행사</h6>
                                        <h6>7. 개인정보 보호를 위한 조치</h6>
                                        <h6>8. 주요 개인정보 보호책임자 및 책임자</h6>
                                        <h6>9. 개인 위치 정보 처리</h6>
                                        <h6>10. 이 개인정보 처리방침의 적용</h6>
                                        <h6>11. 수정 전 사전 통지 의무</h6>
                                    </p>
                                </ScrollPanel>
                            </div> 
                        </div>
                        <Button type="submit" label="동의" class="w-full p-3 text-xl mb-5" :disabled="!agreeButtonEnabled"></Button>
                    </form> 
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped lang="scss">
:deep(.agree) {
    width: 40rem;
}

:deep(.card .p-scrollpanel) {
    width: 100%;
    height: 100%;
}

:deep(.card) {
    height: 6rem;
}

:deep(.term) {
    height: 12rem;
}

</style>
