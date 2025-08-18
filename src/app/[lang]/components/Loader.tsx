import "@styles/loader.css"
import { StyleProps } from "src/types/component"

export default function Loader({ style }: { style: StyleProps }) {
    return (
        <div className="loader" style={style}></div>
    )
} 