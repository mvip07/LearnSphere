"use client"
import Loader from "../../../components/Loader";
import { FaRotateRight } from "react-icons/fa6";
import { useVerification } from "@/features/auth/hooks/useVerification";

export default function Verification() {
    const { timeLeft, values, refresh, inputRefs, loading, handleChange, handleKeyDown, handlePaste, clickRefresh, sendCode } = useVerification();
    return (
        <form onSubmit={sendCode} >
            <h2 className="font-bold text-[var(--dark)] dark:text-[var(--whi)] text-[22px] md:text-[28px] text-start leading-[24px] md:leading-[36px]">
                Verify Your Email
            </h2>
            <p className="text-[14px] text-[var(--authText)] text-start font-medium leading-normal mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eligendi minima ipsa, repellat quia voluptatibus.</p>
            <div className="times flex items-center justify-center gap-2 mt-4">
                <div className="block w-full max-h-[40px] max-w-[40px] input rounded-4 flex items-center justify-center cursor-pointer">{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</div>
                <div className="block w-full max-h-[40px] max-w-[40px] input rounded-4 flex items-center justify-center cursor-pointer">:</div>
                <div className="block w-full max-h-[40px] max-w-[40px] input rounded-4 flex items-center justify-center cursor-pointer">{String(Math.floor(timeLeft % 60)).padStart(2, "0")}</div>
            </div>
            <div className="flex items-center justify-center gap-2 my-6">
                {
                    values.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onPaste={handlePaste}
                            style={{ padding: "12px 0" }}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => { inputRefs.current[index] = el }}
                            className="block w-[50px] min-w-[40px] h-[50px] min-h-[40px] input text-center"
                        />
                    ))
                }
            </div>
            <div className="flex items-center justify-between gap-3 my-6">
                <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-5 rounded-lg py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)]">
                    {loading ? <Loader style={{ background: 'var(--whi)', width: '20px', padding: '3px' }} /> : "Send"}
                </button>
                {
                    refresh && (
                        <button onClick={clickRefresh} disabled={loading} className="flex items-center justify-center gap-5 rounded-lg p-3 md:p-4 outline-0 border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] text-[var(--textCl)] dark:text-[var(--darkTextCl)] text-[16px] font-normal leading-normal bg-[var(--lg)] dark:bg-[var(--darkBorderCl)]">
                            <FaRotateRight className="size-5" />
                        </button>
                    )
                }
            </div>
        </form>
    )
}