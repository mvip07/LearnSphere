import "@/styles/loader.css"

export interface StyleProps {
    width: string,
    padding: string
    background: string,
}
export default function Loader({ style }: { style: StyleProps }) {
    return (
        <div className="loader" style={style}></div>
    )
} 