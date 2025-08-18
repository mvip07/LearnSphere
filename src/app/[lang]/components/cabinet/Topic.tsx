import React from "react";
import Empty from "../Empty";
import { Topic } from "types/quiz";

const Topics = ({ topics }: { topics: Topic[] }) => {
    return topics.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto max-h-[500px]">
            {topics.map((item) => (
                <div key={item.id} className="bg-[var(--whiLg)] dark:bg-[var(--darkBorderCl)] rounded cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-3 p-4">
                        <h4 className="font-medium text-[16px] leading-normal text-[var(--green)] text-center">
                            {item.title}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    ) : <Empty />
};

export default React.memo(Topics);