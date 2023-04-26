import {useRef} from "react";
import  styles from "./Dialogue.module.css"

export function Dialogue({children, isOpen, setOpen, title}) {
    const dialog = useRef(null)
    if (!isOpen)
        return;
    return <div ref={dialog} onClick={() => setOpen(false)} className="dialogue-backdrop">
        <div className="custom-dialogue" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
                <h3 className="dialogue-title">{title}</h3>
            </div>
            {children}
        </div>
    </div>
}