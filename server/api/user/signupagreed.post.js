import { signUpAgreed } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const result = await signUpAgreed(body);
    return result;
});
