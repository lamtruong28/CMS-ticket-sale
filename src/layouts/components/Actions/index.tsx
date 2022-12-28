import { Avatar, Tooltip } from "antd";
import classNames from "classnames/bind";
import images from "~/assets/images";
import { BellIcon, MailIcon } from "~/components/Icons";
import styles from "./Actions.module.scss";

const cx = classNames.bind(styles);

const actions = [
    {
        label: <MailIcon />,
        title: "Hộp thư",
    },
    {
        label: <BellIcon />,
        title: "Thông báo",
    },
    {
        label: <Avatar src={images.avatar} size={48} />,
        title: "Avatar",
    },
];

const Actions = () => {
    return (
        <div className={cx("wrapper")}>
            {actions.map((action, index) => (
                <Tooltip
                    key={index}
                    title={action.title}
                    placement="bottom"
                    arrowPointAtCenter={true}
                >
                    <div className={cx("label")}>{action.label}</div>
                </Tooltip>
            ))}
        </div>
    );
};

export default Actions;
