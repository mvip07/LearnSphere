import React from "react";
import Image from "next/image";
import Empty from "../Empty";
import { Category } from "types/quiz";
import useTranslation from "@services/languages";

const Categories = ({ categories }: { categories: Category[] }) => {
    const t = useTranslation();
    return categories.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto max-h-[500px]">
            {categories.map((item) => (
                <div key={item.id} className="bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] rounded cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-3 p-4">
                        {item.image && (
                            <Image width={40} height={40} src={item.image} alt={t("categoryImage")} className="w-[40px] h-[40px] aspect-square object-cover" />
                        )}
                        <h4 className="font-medium text-[16px] leading-normal text-[var(--green)] text-center">
                            {item.title}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    ) : <Empty />
};

export default React.memo(Categories);