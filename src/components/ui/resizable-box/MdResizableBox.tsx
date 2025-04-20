import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "@/components/ui/resizable-box/react-resizable.css";

interface MdResizableBoxProps {
    children: string;
    minWidth: number;
    maxWidth: number;
    minHeight?: number;
    maxHeight?: number;
}

export function MdResizableBox({
    children,
    minWidth,
    maxWidth,
    minHeight = 0,
    maxHeight = 0,
}: MdResizableBoxProps) {
    return (
        <ResizableBox
            width={minWidth}
            axis="x"
            minConstraints={[minWidth, minHeight]}
            maxConstraints={[maxWidth, maxHeight]}
        >
            {children}
        </ResizableBox>
    );
}
