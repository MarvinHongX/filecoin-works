<script setup>
import { ref, onBeforeMount } from 'vue';
const { authUser } = await useAuth();
const assets = ref(null);

const loading1 = ref(true);


watch(authUser, () => {
    goToSignInPage();
});





onBeforeMount(() => {
    $fetch('/api/user/assets', {
        headers: useRequestHeaders(['cookie'])
    }).then((data) => {
        assets.value = data.assets;
        console.log('assets',data.assets);
        loading1.value = false;        
    })
    
});
</script>

<template>
    <div v-if="!loading1" class="surface-ground px-4 py-5 md:px-6 lg:px-8">
        <div class="font-medium text-3xl text-900 mb-3">자산 요약</div>
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">총 수량</span>
                            <div>
                                <span class="text-900 font-medium text-xl">${{ assets.totalAmount }} </span>
                                <span class="text-500">USDT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">총 예치수량</span>
                            <div>
                                <span class="text-900 font-medium text-xl">${{ assets.totalStakeAmount }} </span>
                                <span class="text-500">USDT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">총 이자수량</span>
                            <div>
                                <span class="text-900 font-medium text-xl">${{ assets.totalRewardAmount }} </span>
                                <span class="text-500">USDT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3">
                <div class="surface-card shadow-2 p-3 border-round">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">총 수수료수량</span>
                            <div>
                                <span class="text-900 font-medium text-xl">${{ assets.totalCommissionAmount }} </span>
                                <span class="text-500">USDT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loading1"> 나의 스테이킹 </h5>
                <DataTable
                    :value="assets?.stakings"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="20"
                    data-key="seq"
                    :row-hover="true"
                    :loading="loading1"
                    responsive-layout="scroll"
                    showGridlines
                >
                    <template #empty v-if="!loading1"> No data found. </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column field="amt">
                        <template #header v-if="!loading1"> 예치수량 </template>
                        <template #body="{ data }">
                            {{ data.amt }}
                        </template>
                    </Column>
                    <Column field="rewardAmt">
                        <template #header v-if="!loading1"> 리워드수량 </template>
                        <template #body="{ data }">
                            {{ data.rewardAmt }}
                        </template>
                    </Column>
                    <Column field="contractDt">
                        <template #header v-if="!loading1"> 입금일자 </template>
                        <template #body="{ data }">
                            {{ data.contractDt }}
                        </template>
                    </Column>
                    <Column field="sDt">
                        <template #header v-if="!loading1"> 시작일 </template>
                        <template #body="{ data }">
                            {{ data.sDt }}
                        </template>
                    </Column>
                    <Column field="eDt">
                        <template #header v-if="!loading1"> 종료일 </template>
                        <template #body="{ data }">
                            {{ data.eDt }}
                        </template>
                    </Column>
                    <Column field="duration">
                        <template #header v-if="!loading1"> 거치기간 </template>
                        <template #body="{ data }">
                            {{ data.duration }}
                        </template>
                    </Column>
                    <Column field="elapsed">
                        <template #header v-if="!loading1"> 경과기간 </template>
                        <template #body="{ data }">
                            {{ data.elapsed }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loading1"> 추천 수수료 </h5>
                <DataTable
                    :value="assets?.stakings"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="20"
                    data-key="seq"
                    :row-hover="true"
                    :loading="loading1"
                    responsive-layout="scroll"
                    showGridlines
                >
                    <template #empty v-if="!loading1"> No data found. </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column field="amt">
                        <template #header v-if="!loading1"> 예치수량 </template>
                        <template #body="{ data }">
                            {{ data.amt }}
                        </template>
                    </Column>
                    <Column field="rewardAmt">
                        <template #header v-if="!loading1"> 리워드수량 </template>
                        <template #body="{ data }">
                            {{ data.rewardAmt }}
                        </template>
                    </Column>
                    <Column field="contractDt">
                        <template #header v-if="!loading1"> 입금일자 </template>
                        <template #body="{ data }">
                            {{ data.contractDt }}
                        </template>
                    </Column>
                    <Column field="sDt">
                        <template #header v-if="!loading1"> 시작일 </template>
                        <template #body="{ data }">
                            {{ data.sDt }}
                        </template>
                    </Column>
                    <Column field="eDt">
                        <template #header v-if="!loading1"> 종료일 </template>
                        <template #body="{ data }">
                            {{ data.eDt }}
                        </template>
                    </Column>
                    <Column field="duration">
                        <template #header v-if="!loading1"> 거치기간 </template>
                        <template #body="{ data }">
                            {{ data.duration }}
                        </template>
                    </Column>
                    <Column field="elapsed">
                        <template #header v-if="!loading1"> 경과기간 </template>
                        <template #body="{ data }">
                            {{ data.elapsed }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}

:deep(.p-datatable-loading-overlay) {
    background-color: rgba(0, 0, 0, 0.05);
}

:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}

</style>