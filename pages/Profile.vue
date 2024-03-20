<script setup>
import { ref } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
const { authUser, updateName, updatePassword } = await useAuth()
const { flag_placeholderUrl } = useImg();

const newName = ref('');
const isEditingName = ref(false);
const isEditingPassword = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

definePageMeta({
    middleware: ['user-only']
});

watch(authUser, () => {
    if (!authUser?.value || authUser?.value?.userId == '') {
        goToSignInPage();
    }
});

const errors = ref({
    password: '',
    name: ''
});

const invalidNewPassword = computed(() => {
    return errors.value.password !== '' && typeof errors.value.password === 'string';
});

const invalidCurrentPassword = computed(() => {
    return currentPassword.value === '';
});

watch(newName, () => {
    errorsName(isEditingName, newName, errors);
});

watch(newPassword, () => {
    errorsPassword(isEditingPassword, newPassword, confirmNewPassword, errors);
});

watch(confirmNewPassword, () => {
    errorsPassword(isEditingPassword, newPassword, confirmNewPassword, errors);
});

const onEditNameClick = () => {
    isEditingName.value = true;
    newName.value = authUser.value.name;
}

const onSaveNameClick = async () => {
    if (!isEditingName.value) isEditingName.value = true;

    errorsName(isEditingName, newName, errors);

    if (errors.value.name !== '') return

    try {
        const data = await updateName(newName.value);
        if (data && data !== '') {
            errors.value.name = '';
            isEditingName.value = false;
            return;
        }
    } catch (error) {
        console.error(error);
        errors.value.name = '이름을 수정하지 못했습니다. 다시 시도해주세요.';
        return;
    }
    errors.value.name = '이름을 수정하지 못했습니다. 다시 시도해주세요.';
}

const onCancelNameClick = () => {
    isEditingName.value = false;
}

const onEditPasswordClick = () => {
    isEditingPassword.value = true;
    errors.value.password = '';
    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
}

const onSavePasswordClick = async () => {
    if (!isEditingPassword.value) isEditingPassword.value = true;

    errorsPassword(isEditingPassword, newPassword, confirmNewPassword, errors);

    if (errors.value.password !== '') return

    try {
        const data = await updatePassword(currentPassword.value, newPassword.value);
        if (data && data !== '') {
            errors.value.password = '';
            isEditingPassword.value = false;
            return;
        }
    } catch (error) {
        console.error(error);
        errors.value.password = '비밀번호를 수정하지 못했습니다. 다시 시도해주세요.';
        return;
    }
    errors.value.password = '비밀번호를 수정하지 못했습니다. 다시 시도해주세요.';
}


const onCancelPasswordClick = () => {
  currentPassword.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
  isEditingPassword.value = false;
}


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
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <template v-if="isEditingName">
                                        <InputText v-model="newName" />
                                    </template>
                                    <template v-else>
                                        {{ authUser.name }}
                                    </template>
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <template v-if="!isEditingName">
                                        <Button label="수정" icon="pi pi-pencil" class="p-button-text" @click="onEditNameClick" />
                                    </template>
                                    <template v-else>
                                        <Button label="저장" icon="pi pi-check" @click="onSaveNameClick" />
                                        <Button label="취소" icon="pi pi-times" class="p-button-text" @click="onCancelNameClick" />
                                    </template>
                                </div>
                                <div v-if="isEditingName">
                                    <small id="editProfile-error" class="p-error mb-5" v-if="errors.name !== ''">{{ errors.name }}</small>
                                </div>
                            </li>
                            <li v-if="!isEditingPassword" class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">비밀번호</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                                    ••••••••
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button label="수정" icon="pi pi-pencil" class="p-button-text" @click="onEditPasswordClick" />
                                </div>
                            </li>
                            <li v-if="isEditingPassword" class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">기존 비밀번호</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <Password v-model="currentPassword" :invalid="invalidCurrentPassword" :toggleMask="true" inputClass="w-full"></Password>
                                </div>
                            </li>
                            <li v-if="isEditingPassword" class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">새 비밀번호</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <Password v-model="newPassword" :invalid="invalidNewPassword" :toggleMask="true" inputClass="w-full"></Password>
                                </div>
                            </li>
                            <li v-if="isEditingPassword" class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">새 비밀번호 확인</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <Password v-model="confirmNewPassword" :invalid="invalidNewPassword" :toggleMask="true" inputClass="w-full"></Password>
                                </div>
                            </li>
                            <li v-if="isEditingPassword" class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium"></div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <Button label="저장" icon="pi pi-check" @click="onSavePasswordClick" />
                                    <Button label="취소" icon="pi pi-times" class="p-button-text" @click="onCancelPasswordClick" />
                                </div>
                                <div v-if="isEditingPassword">
                                    <small id="editProfile-error" class="p-error mb-5" v-if="errors.password !== ''">{{ errors.password }}</small>
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
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"> 
                                <div class="text-500 w-6 md:w-2 font-medium">레퍼럴 코드</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    <Chip :label="authUser?.referralCode" class="mr-2"></Chip>
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text"></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"> 
                                <div class="text-500 w-6 md:w-2 font-medium">추천인 아이디</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    {{ authUser?.referralUid || "-" }}
                                </div>
                                <div class="w-6 md:w-2 flex justify-content-end">
                                    <Button disabled class="p-button-text"></Button>
                                </div>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"> 
                                <div class="text-500 w-6 md:w-2 font-medium">에이전시 아이디</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                    {{ authUser?.saleUid || "-" }}
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
