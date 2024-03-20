<script setup>
const { authUser } = await useAuth()
const { mainUrl } = useImg();
definePageMeta({
    middleware: ['user-only']
});

watch(authUser, () => {
    if (!authUser.value || authUser.value.userId == '') {
        goToSignInPage();
    }
});

const referralLink = ref('');

const onInvitationClick = () => {
    if (authUser.value && authUser.value.userId) {
        referralLink.value = `http://localhost:3005/signup/${authUser.value.referralCode}`;
    }
};

const onInvitationCopyClick = () => {
    if (referralLink.value) {
        navigator.clipboard.writeText(referralLink.value)
            .then(() => {
                console.log('Link copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy link to clipboard: ', err);
            });
    }
};


</script>

<template>
    <div class="grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
                <span class="block text-2xl font-bold mb-1">Filecoin Works</span>
                <div class="text-5xl text-primary font-bold mb-3">친구를 초대하고, 수익을 함께 획득해보세요!</div>
                <p class="mt-0 mb-2 text-700 line-height-3">
                    <span>친구가 Filecoin Works에서 투자할 때 마다 </span>
                </p>
                <p class="mt-0 mb-5 text-700 line-height-3">
                    <span>약 7%의 수수료를 획득할 수 있습니다.</span>
                </p>
                <Button label="지금 초대하기" type="button" class="mr-3 p-button-raised" @click="onInvitationClick" />
                <div v-if="referralLink" class="mt-3 text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <InputGroup>
                        <InputText v-model="referralLink" class="w-full"/>
                        <Button v-tooltip.focus.bottom="{ value: '클립보드에 복사되었습니다.' }" icon="pi pi-copy" type="button" class="p-button-outlined" @click="onInvitationCopyClick" />
                    </InputGroup>

                </div>
            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);">
            <img :src="mainUrl" alt="main image" class="md:ml-auto block md:h-full" style="max-width: 100%; max-height: 100%;">
        </div>

    </div>

    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
        <div class="text-900 font-bold text-6xl mb-4 text-center">지원되는 네트워크</div>
        <div class="text-700 text-xl mb-6 text-center line-height-3">아래 네트워크에서 스테이킹할 수 있습니다. 시작하려면 아래에서 네트워크를 선택하세요.</div>

        <div class="grid">
            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">5K 플랜</div>
                        <div class="text-600">테더(Tether) USDT</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">20.00%</span>
                            <span class="ml-2 font-medium text-600">수익</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>$5,000 USDT</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>540 일 거치</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>이자 20% 지급</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>원금 보장</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                        <Button label="지금 스테이킹하세요" class="p-3 w-full mt-auto"></Button>
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">10K 플랜</div>
                        <div class="text-600">테더(Tether) USDT</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">25.00%</span>
                            <span class="ml-2 font-medium text-600">수익</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>$10,000 USDT</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>540 일 거치</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>이자 25% 지급</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>원금 보장</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                        <Button label="지금 스테이킹하세요" class="p-3 w-full p-button-outlined"></Button>
                    </div>
                </div>
            </div>
            
            <div class="col-12 lg:col-4">
                <div class="p-3 h-full">
                    <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                        <div class="text-900 font-medium text-xl mb-2">50K 플랜</div>
                        <div class="text-600">테더(Tether) USDT</div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <div class="flex align-items-center">
                            <span class="font-bold text-2xl text-900">35.00%</span>
                            <span class="ml-2 font-medium text-600">수익</span>
                        </div>
                        <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                        <ul class="list-none p-0 m-0 flex-grow-1">
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>$50,000 USDT</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>540 일 거치</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>이자 35% 지급</span>
                            </li>
                            <li class="flex align-items-center mb-3">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>원금 보장</span>
                            </li>
                        </ul>
                        <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                        <Button label="지금 스테이킹하세요" class="p-3 w-full"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
