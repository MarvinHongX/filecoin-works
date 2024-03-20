export default defineNuxtRouteMiddleware(async (to) => {

    if (!to.params.referralCode || to.params.referralCode === '') {
        return await navigateTo({ path: '/signin' })
    }

    const referralCode = to.params.referralCode;
    return await navigateTo({ 
        path: `/agree/${referralCode}`,
    })
});