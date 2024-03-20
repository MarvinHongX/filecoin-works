export default defineNuxtRouteMiddleware(async (to) => {
    const { signUpAgreed } = await useAuth()
    

    if (!to.query.agree || to.query.agree === '') {
        return await navigateTo({ path: '/signin' })
    }

    const { agrees, referralUid } = await signUpAgreed(to.query.agree);
    if (!agrees || !referralUid || referralUid === '') {
        return await navigateTo({ path: '/signin' })
    }
});