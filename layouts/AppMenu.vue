<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
const { userAdmin } = useAuth();
const model = ref([
    {
        label: 'UI Components',
        items: [
            { label: '홈', icon: 'pi pi-fw pi-home', to: '/' },
            {
                label: '자산',
                icon: 'pi pi-fw pi-dollar',
                to: '/assets',
            },
            {
                label: '회원 관리',
                icon: 'pi pi-fw pi-id-card',
                to: '/users',
                adminOnly: true,
            },
        ]
    },
]);


const filteredMenus = computed(() => {
      if (userAdmin.value == true) {
        return model.value; 
      } else {
        return model.value.map(menu => ({
          ...menu,
          items: menu.items.filter(item => !item.adminOnly),
        }));
      }
    });
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in filteredMenus" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
