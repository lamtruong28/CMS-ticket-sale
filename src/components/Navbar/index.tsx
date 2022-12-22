import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { HomeIcon, InvoiceIcon, SettingIcon, TicketIcon } from "../Icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/redux/store";
import "./OverrideStyleMenuAntd.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps["items"] = [
    getItem("Trang chủ", "/", <HomeIcon />),
    getItem("Quản lý vé", "/tickets", <TicketIcon />),
    getItem("Đối soát vé", "/ticket-check", <InvoiceIcon />),
    getItem("Cài đặt", "sub", <SettingIcon />, [
        getItem("Gói dịch vụ", "/service-pack"),
    ]),
];
const Navbar: React.FC = () => {
    const { pathname } = useLocation();
    const [selected, setSelected] = useState(pathname);
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setSelected(pathname);
    }, [pathname]);
    const handleSelectItem: MenuProps["onClick"] = (e) => {
        navigate(e.key);
        setSelected(e.key);
    };
    const handleLogout = () => {
        navigate("/login");
    };
    return (
        <Menu
            onClick={handleSelectItem}
            openKeys={["sub"]}
            mode="inline"
            items={items}
            expandIcon={<></>}
            selectedKeys={[selected]}
        />
    );
};

export default Navbar;
