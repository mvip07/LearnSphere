"use client"
import { useEffect, useRef, useState } from "react";

type Heights = Record<string, number>;

export const useElementHeights = (elementKeys: string[]) => {
    const elementRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
        Object.fromEntries(elementKeys.map((key) => [key, { current: null } as unknown as React.RefObject<HTMLDivElement>]))
    );

    const [heights, setHeights] = useState<Heights>(
        Object.fromEntries(elementKeys.map((key) => [key, 0]))
    );

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            setHeights(Object.fromEntries(elementKeys.map((key) => [key, elementRefs.current[key].current?.offsetHeight || 0])));
        });

        elementKeys.forEach((key) => {
            if (elementRefs.current[key].current) {
                observer.observe(elementRefs.current[key].current!);
            }
        });

        return () => observer.disconnect();
    }, [elementKeys]);

    return { elementRefs: elementRefs.current, heights };
};