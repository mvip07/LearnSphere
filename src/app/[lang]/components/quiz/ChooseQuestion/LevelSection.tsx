import { LevelProps } from "types/component";

const LevelSection = ({ options, isSelected, onToggle }: LevelProps) => (
    <div className="flex flex-wrap gap-2">
        {options.map(({ id, title }) => (
            <button key={id} type="button" onClick={() => onToggle(id)} className={`text-[14px] h-min font-medium leading-normal capitalize py-2 px-4 rounded cursor-pointer select-none border border-[var(--primary)] ${isSelected.includes(id) ? "text-[var(--whi)] bg-[var(--primary)]" : "text-[var(--primary)] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)]"}`}>
                {title}
            </button>
        ))}
    </div>
);
export default LevelSection