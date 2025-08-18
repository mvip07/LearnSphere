"use client";

import { useEffect } from "react";
import { useGoToNextPage } from "@hooks/useGoToNextPage";

export default function ProfileRedirect() {
    const goTo = useGoToNextPage();

    useEffect(() => {
        goTo("/profile/edit");
    }, [goTo]);

    return null;
}
