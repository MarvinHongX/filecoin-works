import { getUserById, getUserByPhone, getUserByReferralCode, createUser, getUsers, updateUserName, updateUserPassword } from "@/server/models/user";
import { hashPassword, verifyPassword } from "@/server/utils/password";
import { createAgreeToken, verifyAgreeToken, verifyToken } from "@/server/utils/session"
import { createReferralCode, verifyReferralCode } from "@/server/utils/referral";


const signUpReferralCodeVerified = async (referralCode) => {
    if (!referralCode || referralCode == '') return false;
    const referralUser = await getUserByReferralCode(referralCode);

    const verified = await verifyReferralCode(referralUser.userId, referralCode);
    return verified || false;
};


const signUpAgree = async (body) => {
    const agreeAll = body.agrees?.includes("agree1") && body.agrees?.includes("agree2");
    if (!agreeAll) return null;

    if (!body.referralCode || body.referralCode === '') return null;

    const verified = await signUpReferralCodeVerified(body.referralCode);

    if (!verified) return null;
    const token = await createAgreeToken({
        agrees: body.agrees,
        referralCode: body.referralCode,
    });
    return token;
};


const signUpAgreed = async (token) => {
    if (!token) return null;
    const agree = await verifyAgreeToken(token);
    
    const agreeAll = agree.agrees?.includes("agree1") && agree.agrees?.includes("agree2");
    if (!agreeAll) return null;

    
    if (!agree.referralCode || agree.referralCode === '') return null;

    const referralUser = await getUserByReferralCode(agree.referralCode);

    if (!referralUser || referralUser.userId === '') return null;
    
    return {
        agrees: agree.agrees,
        referralUid: referralUser.userId,
        saleUid: referralUser.saleUid,
    }
};

const signUpUser = async (user) => {
    const hashedPassword = await hashPassword(user.password);
    const referralCode = await createReferralCode(user.userId);
    const { referralUid, saleUid } = await signUpAgreed(user.agreeToken);
    if (!referralUid || !saleUid) return null;
    const newUser = await createUser({
        userId: user.userId,
        name: user.name,
        password: hashedPassword,
        phone: {
            country: user.phone.country,
            number: user.phone.number,
        },
        referralCode,
        referralUid,
        saleUid,
    });

    const { userId, name, userFg, phone } = newUser;
    return { userId, name, userFg, phone, referralCode, referralUid, saleUid };
};

const signInUser = async (user) => {
    const checkUser = await getUserById(user.userId);
    if (!checkUser) {
        throw new Error("User not found");
    }
    const checkPassword = await verifyPassword(user.password, checkUser.password);
    if (!checkPassword) {
        throw new Error("Password is incorrect");
    }
    const checkReferralCode = await verifyReferralCode(checkUser.userId, checkUser.referralCode);
    if (!checkReferralCode) {
        throw new Error("Referral code is incorrect");
    }

    const { userId, name, userFg, phone, referralCode, referralUid, saleUid } = checkUser;
    return { userId, name, userFg, phone, referralCode, referralUid, saleUid };
};

const existUser = async (user) => {
    if (user) {
        if (user.userId) {
            const checkUser = await getUserById(user.userId);
            if (checkUser) {
                return true;
            }
        }
        if (user.phone) {
            const checkPhone = await getUserByPhone(user.phone);
            if (checkPhone) {
                return true;
            }
        }
    }

    return false;
};

const helpUser = async (user) => {
    if (user) {
        if (user.userId) {
            const checkUser = await getUserById(user.userId);
            if (checkUser && (checkUser.phone.country == user.phone.country) && (checkUser.phone.number == user.phone.number)) {
                // send auth-code
                return true;
            }
        }
    }

    return false;
};

const helpCodeUser = async (user) => {
    if (user) {
        if (user.userId) {
            const checkUser = await getUserById(user.userId);
            if (checkUser && (checkUser.phone.country == user.phone.country) && (checkUser.phone.number == user.phone.number)) {
                // send auth-code
                return true;
            }
        }
    }

    return false;
};


const getTokenUser = async (event) => {
    const config = useRuntimeConfig();
    const cookie = getCookie(event, config.session);
    if (!cookie) {
        return null;
    }
    const token = await verifyToken(cookie);
    if (!token) {
        return null; 
    }
    const checkUser = await getUserById(token.userId);
    if (!checkUser) {
        return null;
    }
    const { userId, name, userFg, phone, referralCode, referralUid, saleUid } = checkUser;
    return { userId, name, userFg, phone, referralCode, referralUid, saleUid };
};



const allUsers = async (event) => {
    const config = useRuntimeConfig();
    const cookie = getCookie(event, config.session);
    if (!cookie) {
        return null;
    }
    const token = await verifyToken(cookie);
    if (!token) {
        return null; 
    }
    const checkUser = await getUserById(token.userId);
    if (!checkUser) {
        return null;
    }
    if (checkUser.userFg !== '9') {
        return null;
    }

    return await getUsers();
};

const updateName = async (userId, name) => {
    if (!userId || userId == '') return null;
    if (!name || name == '') return null;

    const user = await updateUserName(userId, name);
    return user || null;
};

const updatePassword = async (userId, body) => {
    if (!userId || userId == '') return null;
    if (!body.currentPassword || body.currentPassword == '') return null;
    if (!body.newPassword || body.newPassword == '') return null;

    const { currentPassword, newPassword } = body;
    const checkUser = await getUserById(userId);
    if (!checkUser) {
        throw new Error("User not found");
    }
    const checkPassword = await verifyPassword(currentPassword, checkUser.password);
    if (!checkPassword) {
        throw new Error("Password is incorrect");
    }
    const hashedNewPassword = await hashPassword(newPassword);
    const updatedUser = await updateUserPassword(userId, hashedNewPassword);

    if (!updatedUser) {
        return null;
    }
    const { name, userFg, phone } = updatedUser;
    return { userId, name, userFg, phone, referralCode, referralUid, saleUid };
};

export { signUpReferralCodeVerified, signUpAgree, signUpAgreed, signUpUser, signInUser, existUser, helpUser, helpCodeUser, getTokenUser, allUsers, updateName, updatePassword }