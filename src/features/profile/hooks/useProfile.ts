import { useState, useEffect, useCallback, useMemo } from "react";
import { showToast } from "@assets/utils/toatify";
import { useLoader } from "@context/LoaderContext";
import { useGoToNextPage } from "@hooks/useGoToNextPage";
import { User } from "types/auth";
import { ApiErrorProps } from "types/apiError";
import { handleApiError } from "@services/handleApiError/handleApiError";
import { profileById, follow, unFollow, checkFollowStatus } from "../api/profileApi";

const useProfile = (userId: string) => {
    const { showLoader, hideLoader } = useLoader();
    const goTo = useGoToNextPage();
    const [user, setUser] = useState<User | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setCurrentUserId(parsedUser.userId);
                } catch {
                    localStorage.removeItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
                }
            }
        }
    }, []);

    const loaderFunctions = useMemo(() => ({ showLoader, hideLoader }), [showLoader, hideLoader]);

    const fetchUserData = useCallback(async () => {
        if (!userId) return;

        loaderFunctions.showLoader();
        try {
            const { data: profileData } = await profileById(userId);
            setUser(profileData);

            if (currentUserId && currentUserId !== userId) {
                const { data: followStatus } = await checkFollowStatus(currentUserId, userId);
                setIsFollowing(followStatus.isFollowing);
            }
        } catch (error) {
            handleApiError(error as ApiErrorProps);
        } finally {
            loaderFunctions.hideLoader();
        }
    }, [userId, currentUserId, loaderFunctions]);

    const handleFollow = useCallback(async () => {
        if (!currentUserId || !userId) {
            showToast("error", "User not authenticated");
            return;
        }

        loaderFunctions.showLoader();
        try {
            if (isFollowing) {
                const { data } = await unFollow(currentUserId, userId);
                showToast("success", data.message);
                setIsFollowing(false);
            } else {
                const { data } = await follow(currentUserId, userId);
                showToast("success", data.message);
                setIsFollowing(true);
            }
            await fetchUserData();
        } catch (error) {
            handleApiError(error as ApiErrorProps);
        } finally {
            loaderFunctions.hideLoader();
        }
    }, [currentUserId, userId, isFollowing, fetchUserData, loaderFunctions]);

    const handleMessage = useCallback(() => {
        if (!currentUserId || !userId) return;
        goTo(`cabinet/messages?currentUserId=${currentUserId}&receiverUserId=${userId}`);
    }, [currentUserId, userId, goTo]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData, userId, currentUserId]);

    return {
        user,
        goTo,
        isFollowing,
        handleFollow,
        fetchUserData,
        handleMessage,
        isCurrentUser: currentUserId === userId,
    };
};

export default useProfile;