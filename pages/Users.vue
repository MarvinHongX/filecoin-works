<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
const { authUser } = await useAuth();
const { flag_placeholderUrl } = useImg();
const users = ref(null);
const filters1 = ref({
    global:{},
});
const loading1 = ref(true);

const uniqueSaleUids = computed(() => {
    const saleUidsSet = new Set();
    users.value.forEach(user => {
        if (user.saleUid) {
            saleUidsSet.add(user.saleUid);
        }
    });
    return Array.from(saleUidsSet);
});


definePageMeta({
    middleware: ['admin-only']
});

watch(authUser, () => {
    goToSignInPage();
});




const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        saleUid: { value: null, matchMode: FilterMatchMode.IN },
    };
};

const clearFilter1 = () => {
    initFilters1();
};

onBeforeMount(() => {
    initFilters1();
    $fetch('/api/user/users', {
        headers: useRequestHeaders(['cookie'])
    }).then((data) => {
        users.value = data.users;
        console.log('users',users);
        loading1.value = false;
        initFilters1();
        
    })
    
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loading1"> 회원 관리 </h5>
                <DataTable
                    v-model:filters="filters1"
                    :value="users"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="20"
                    data-key="userId"
                    :row-hover="true"
                    filter-display="menu"
                    :loading="loading1"
                    :filters="filters1"
                    responsive-layout="scroll"
                    :global-filter-fields="['name', 'saleUid']"
                    showGridlines
                >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="초기화" outlined @click="clearFilter1()" />
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="키워드 검색" style="width: 100%" />
                            </IconField>
                        </div>
                    </template>
                    <template #empty v-if="!loading1"> No data found. </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column header="에이전시" filter-field="saleUid" :sort-field="'saleUid'" :show-filter-match-modes="false">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.saleUid }}</span>
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                            <div class="mb-3 text-bold">에이전시를 고르세요.</div>
                            <ClientOnly>
                                <MultiSelect v-model="filterModel.value" :options="uniqueSaleUids" option-label="saleUid" placeholder="모두" class="p-column-filter">
                                    <template #option="slotProps">
                                        <div class="p-multiselect-representative-option">
                                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ slotProps.option }}</span>
                                        </div>
                                    </template>
                                </MultiSelect>
                            </ClientOnly>
                        </template>
                    </Column>
                    <Column field="userId" :sort-field="'userId'">
                        <template #header v-if="!loading1"> 아이디 </template>
                        <template #body="{ data }">
                            {{ data.userId }}
                        </template>
                    </Column>
                    <Column field="name">
                        <template #header v-if="!loading1"> 이름 </template>
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="이름으로 검색하세요." />
                        </template>
                    </Column>
                    <Column field="phone">
                        <template #header v-if="!loading1"> 전화번호 </template>
                        <template #body="{ data }">
                            {{ getFormattedPhoneNumber(data.phone) }}
                        </template>
                    </Column>
                    <Column field="country">
                        <template #header v-if="!loading1"> 국가 </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <img alt="flag" :src="flag_placeholderUrl" :class="`flag flag-${getCountryCodeByPhoneCode(data.phone.country)}`" style="width: 24px" />
                            </div>
                        </template>
                    </Column>
                    <Column field="userFg" filter-field="userFg">
                        <template #header v-if="!loading1"> 사용자 구분 </template>
                        <template #body="{ data }">
                            <Chip :label="getUserFgName(data.userFg)" class="mr-2"></Chip>
                        </template>
                    </Column>
                    <Column field="referralCode" filter-field="referralCode">
                        <template #header v-if="!loading1"> 레퍼럴 코드 </template>
                        <template #body="{ data }">
                            <Chip :label="data.referralCode" icon="pi pi-user-plus" class="mr-2"></Chip>
                        </template>
                    </Column>
                    <Column field="referralUid" filter-field="referralUid">
                        <template #header v-if="!loading1"> 추천인 아이디 </template>
                        <template #body="{ data }">
                            {{ data.referralUid }}
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