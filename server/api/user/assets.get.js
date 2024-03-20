import { userAssets } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const assets = await userAssets(event);
    return {
        assets
    };
});
