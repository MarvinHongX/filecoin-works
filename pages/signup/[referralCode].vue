<script setup>
import AppConfig from '@/layouts/AppConfig.vue';


definePageMeta({
    layout: false,
    middleware: ['signup-referral-code-only']
});


</script>

<template>
    <AppConfig simple />
</template>

<style scoped>
</style>
