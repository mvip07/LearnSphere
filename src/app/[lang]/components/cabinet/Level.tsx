import React from "react";
import Empty from "../Empty";
import { Level } from "@/types/quiz.t";

const Levels = ({ levels }: { levels: Level[] }) => {
    return levels.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto max-h-[500px]">
            {levels.map((item) => (
                <div key={item.id} className="bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] rounded cursor-pointer p-4">
                    <h4 className="font-medium text-[16px] leading-normal text-[var(--green)] text-center">
                        {item.title}
                    </h4>
                </div>
            ))}
        </div>
    ) : <Empty />
};

export default React.memo(Levels);