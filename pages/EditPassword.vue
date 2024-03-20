<script setup>
import AppConfig from '@/layouts/AppConfig.vue';
const { authUser } = await useAuth()
const { flag_placeholderUrl } = useImg();

definePageMeta({
    middleware: ['user-only']
});

watch(authUser, () => {
    goToSignInPage();
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card mb-0">
                <div class="text-700 text-center">
                    <Avatar :label="authUser?.name?.charAt(0)" class="mr-3 mb-3" size="xlarge" shape="circle"></Avatar>

                    <div class="text-900 font-bold text-2xl mb-3">안녕하세요, {{ authUser?.name }}님!</div>
                    <div class="text-700 text-2xl mb-5"></div>
                </div>
                <div class="card border-none">
                    <div class="surface-section">
                        <div class="font-medium text-3xl text-900 mb-3">프로필 수정</div>
                        <div class="text-500 mb-5">일부 정보는 서비스를 사용하는 다른 사람에게 표시될 수 있습니다.</div>
                        <ul class="list-none p-0 m-0">
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">이름</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{ authUser?.name  }}</div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button label="수정" icon="pi pi-pencil" class="p-button-text"></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">비밀번호</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                                    •••••••• </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button label="수정" icon="pi pi-pencil" class="p-button-text"></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">휴대전화번호</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{ getFormattedPhoneNumber(authUser?.phone) }}</div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text"></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">국가</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <img alt="flag" :src="flag_placeholderUrl" :class="`flag flag-${getCountryCodeByPhoneCode(authUser?.phone.country)}`" style="width: 24px" />
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text"></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">    
                                <div class="text-500 w-6 md:w-2 font-medium">회원등급</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <Chip :label="getUserFgName(authUser?.userFg)" class="mr-2"></Chip>
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text"></Button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
</style>
