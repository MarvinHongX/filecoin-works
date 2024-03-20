export const goToHomePage = () => {
    navigateTo('/');
}

export const goToSignInPage = () => {
    navigateTo('/signin');
}

export const goToHelpPage = () => {
    navigateTo('/help');
}

export const goToSignUpPage = (token) => {
    navigateTo({
        path: '/signup',
        query: {
            agree: token,
        }
    });
}

export const goToSignUpPageWithOutReferralCode = () => {
    const referralCode = '07e8703249d1e2dfee0a';
    navigateTo({
        path: `/signup/${referralCode}`,
    });
}

export const goToNotFoundPage = () => {
    navigateTo('/notfound');
}

export const goToProfilePage = () => {
    navigateTo('/profile');
}