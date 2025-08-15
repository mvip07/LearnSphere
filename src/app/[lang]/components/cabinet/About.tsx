import Empty from "../Empty"

const About = ({ bio, isBio }: { bio: string, isBio: boolean }) => {
    return isBio ?
        <p className="p-4 whitespace-pre-wrap text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal">
            {bio}
        </p>
        : <Empty />
}

export default About