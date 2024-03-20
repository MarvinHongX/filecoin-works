export default defineNuxtRouteMiddleware(async (to) => {
    const { signUpReferralCodeVerified } = await useAuth();

    if (!to.params.referralCode || to.params.referralCode === '') {
        return await navigateTo({ path: '/signin' })
    }

    const verified = await signUpReferralCodeVerified(to.params.referralCode);
    if (!verified) {
        return await navigateTo({ path: '/signin' })
    }

});