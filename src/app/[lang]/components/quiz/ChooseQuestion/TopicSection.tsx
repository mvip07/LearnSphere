import { TopicProps } from "types/component";

const TopicSection = ({ options, isSelected, onToggle }: TopicProps) => (
    options.map(({ id, title }) => (
        <label key={id} className="w-full h-min flex items-center gap-2 cursor-pointer select-none mb-2">
            <input type="checkbox" checked={isSelected.includes(id)} onChange={() => onToggle(id)} className="w-5 h-5 rounded border-[var(--primary)] text-[var(--primary)]" />
            <span className="text-[16px] leading-normal font-normal text-[var(--textCl)] dark:text-[var(--darkTextCl)]">
                {title}
            </span>
        </label>
    ))
);

export default TopicSection