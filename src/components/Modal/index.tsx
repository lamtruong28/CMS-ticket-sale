import classNames from "classnames/bind";
import { IChildren } from "~/interface";
import styles from "./Modal.module.scss";

interface ModalProps extends IChildren {
    open?: boolean;
    onHide?: () => void;
}

const cx = classNames.bind(styles);
const Modal = ({ children, open = false, onHide }: ModalProps) => {
    return (
        <div className={cx("wrapper", { open })} onClick={onHide}>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
