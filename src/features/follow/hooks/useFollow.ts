import { ApiErrorProps } from "@/types/apiError.t";
import { useAppContext } from "@/context/AppContext";
import { showToast } from "@/assets/utils/toatify";
import { followApi, unFollowApi } from "../api/follow";
import { handleApiError } from "@/services/handleApiError/handleApiError";

export const useFollow = () => {
    const { fetchUser } = useAppContext()

    const follow = async (followerId: string, followingId: string) => {
        try {
            if (!followerId || !followingId) return;
            const { data } = await followApi(followerId, followingId)

            showToast("success", data.message)
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        } finally {
            fetchUser();
        }
    }

    const unFollow = async (followerId: string, followingId: string) => {
        try {
            if (!followerId || !followingId) return;
            const { data } = await unFollowApi(followerId, followingId)
            showToast("success", data.message)
        } catch (error) {
            handleApiError(error as ApiErrorProps)
        }
        finally {
            fetchUser();
        }
    }

    return { follow, unFollow }
}
