import { signUpReferralCodeVerified } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const verified = await signUpReferralCodeVerified(body);
    return {
        verified
    };
});
