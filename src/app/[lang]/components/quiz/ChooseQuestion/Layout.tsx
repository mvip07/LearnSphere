import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import useTranslation from "@services/languages";
import { useElementHeights } from "@features/cabinet/hooks/useElementHeights";
import { QuizLayoutPorps } from "src/types/component";


const QuizLayout = ({ hTitle, onSubmit, arr, currentStep, handleBack, children }: QuizLayoutPorps) => {
    const t = useTranslation();
    const { elementRefs, heights } = useElementHeights(["header", "footer"]);

    return (
        <div className="bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] w-full lg:w-[400px] h-full float-end">
            <div ref={elementRefs.header} className="sticky top-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20 border-b border-[var(--whiLg)] dark:border-[var(--darkBorderCl)]">
                <div className="p-4">
                    <h2 className="text-[18px] text-[var(--dark)] dark:text-[var(--whi)] font-semibold leading-normal">
                        {hTitle}
                    </h2>
                </div>
            </div>

            <div style={{ height: `calc(100% - ${heights.header + heights.footer}px)` }} className="overflow-y-auto scroll-bar-none p-4 w-full h-full">
                {children}
            </div>

            <div ref={elementRefs.footer} className="sticky bottom-0 bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] z-20 border-t border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] flex items-center justify-between p-4">
                <button onClick={() => handleBack(currentStep === "category")} className="text-[16px] font-medium text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitilize py-2 px-4 rounded cursor-pointer select-none disabled:btn-disabled flex items-center gap-2">
                    <> <FaLeftLong className="size-5" /> {t("back")}</>
                </button>

                <button onClick={onSubmit} disabled={arr.length === 0} className="text-[16px] font-medium text-[var(--whi)] bg-[var(--primary)] font-medium leading-normal capitilize py-2 px-4 rounded cursor-pointer select-none flex items-center justify-self-end gap-2 disabled:btn-disabled">
                    {t("next")} <FaRightLong className="size-5" />
                </button>
            </div>
        </div>
    );
}

export default QuizLayout