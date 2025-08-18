import React from "react";
import { CircleProgressProps } from "src/types/component";

export const CircleProgress = ({ timeLeft, size = 100, progress = 0, strokeWidth = 10 }: CircleProgressProps) => {
    const radius = Math.max((size - strokeWidth) / 2, 1);
    const circumference = 2 * Math.PI * radius;
    const offset = isNaN(progress) ? circumference : circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                r={radius}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                stroke="#e0e0e0"
                strokeWidth={strokeWidth}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                strokeLinecap="round"
                stroke="var(--primary)"
                strokeWidth={strokeWidth}
                strokeDashoffset={offset.toString()}
                strokeDasharray={circumference.toString()}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
            />
            <text
                x="50%"
                y="50%"
                dy="0.3em"
                fontSize="18"
                fontWeight="bold"
                fill="var(--dark)"
                textAnchor="middle"
            >
                {timeLeft}s
            </text>
        </svg>
    );
};

export default CircleProgress;