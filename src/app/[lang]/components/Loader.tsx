import "@/styles/loader.css"
import { StyleProps } from "@/types/component.t"

export default function Loader({ style }: { style: StyleProps }) {
    return (
        <div className="loader" style={style}></div>
    )
} 