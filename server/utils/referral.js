import crypto from 'crypto';

export const verifyReferralCode = async (userId, referralCode) => {
    try {
        const baseReferralCode = hashUserId(userId)
        
        if (baseReferralCode !== referralCode) {
            return false;
        }
        return true; 
    } catch (error) {
        throw new Error('Error encountered during referral code verification.');
    }
};

export const createReferralCode = async (userId) => {
    try {
        const referralCode = hashUserId(userId)
        
        console.log('fildata', hashUserId('fildata'));
        console.log('admin', hashUserId('admin'));
        console.log('song', hashUserId('song'));
        console.log('lee', hashUserId('lee'));
        console.log('lee2', hashUserId('lee2'));
        console.log('yoo', hashUserId('yoo'));

        return referralCode;
    } catch (error) {
        throw new Error('Error encountered during referral code creation.');
    }
};

const hashUserId = (userId) => {
    const config = useRuntimeConfig();
    const saltedUserId = userId + config.salt;
    const hash = crypto.createHash('sha1').update(saltedUserId.toString()).digest('hex');
    const result = hash.slice(0, 20);
    return result;
}   
