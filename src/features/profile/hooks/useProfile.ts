import { useState, useEffect, useCallback } from "react";
import { showToast } from "@assets/utils/toatify";
import { useLoader } from "@context/LoaderContext";
import { useGoToNextPage } from "@hooks/useGoToNextPage";
import { User } from "src/types/auth";
import { ApiErrorProps } from "src/types/apiError";
import { handleApiError } from "@services/handleApiError/handleApiError";
import { profileById, follow, unFollow, checkFollowStatus } from "../api/profileApi";

const useProfile = (userId: string) => {
    const goTo = useGoToNextPage();
    const { showLoader, hideLoader } = useLoader();
    const [user, setUser] = useState<User | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedUser = localStorage.getItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setCurrentUserId(parsedUser.userId);
            } catch {
                localStorage.removeItem(process.env.NEXT_PUBLIC_PROJECT_STORAGE!);
            }
        }
    }, []);

    const fetchUserData = useCallback(async () => {
        if (!userId) return;
        showLoader();
        try {
            const { data } = await profileById(userId);
            setUser(data);
            if (currentUserId && currentUserId !== userId) {
                const { data: followStatus } = await checkFollowStatus(currentUserId, userId);
                setIsFollowing(followStatus.isFollowing);
            }
        } catch (error) {
            handleApiError(error as ApiErrorProps);
        } finally {
            hideLoader();
        }
    }, [userId, currentUserId]);

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const handleFollow = useCallback(async () => {
        if (!currentUserId || !userId) {
            showToast("error", "User not authenticated");
            return;
        }

        const prevFollowing = isFollowing;
        setIsFollowing(!prevFollowing);

        try {
            if (prevFollowing) {
                const { data } = await unFollow(currentUserId, userId);
                showToast("success", data.message);
            } else {
                const { data } = await follow(currentUserId, userId);
                showToast("success", data.message);
            }
        } catch (error) {
            setIsFollowing(prevFollowing);
            handleApiError(error as ApiErrorProps);
        }
    }, [currentUserId, userId, isFollowing, user]);

    const handleMessage = useCallback(() => {
        if (!currentUserId || !userId) return;
        goTo(`cabinet/messages?currentUserId=${currentUserId}&receiverUserId=${userId}`);
    }, [currentUserId, userId, goTo]);

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
