"use client";

import { useParams } from "next/navigation";
import { EN } from "./en";
import { UZ } from "./uz";
import { RU } from "./ru";

type Dictionary = { [key: string]: string };

const dictionaries: Record<string, Dictionary> = {
    en: EN,
    uz: UZ,
    ru: RU,
};

const useTranslation = () => {
    const { lang } = useParams();
    const lan = lang as string || "uz";
    const dictionary = dictionaries[lan] || dictionaries["uz"];

    return (key: string) => dictionary[key] || key;
};

export default useTranslation;
