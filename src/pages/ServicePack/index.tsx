import classNames from "classnames/bind";
import { useState } from "react";
import Button from "~/components/Button";
import { EditIcon } from "~/components/Icons";
import Modal from "~/components/Modal";
import { AddTicketPack, UpdateTicketPack } from "~/components/Popup";
import Search from "~/components/Search";
import Table, { ColumnType } from "~/components/Table";
import styles from "./ServicePack.module.scss";

interface DataType {
    key: React.Key;
    index: number;
    packageCode: string;
    packageName: string;
    dateApply: string;
    expire: string;
    ticketPrice: string;
    comboPrice: string;
    status: string;
}

const dataSource: DataType[] = [
    {
        key: 1,
        index: 1,
        packageCode: "ALT20210501",
        packageName: "Gói gia đình",
        dateApply: "14/04/2021 08:00:00",
        expire: "14/04/2021 23:00:00",
        ticketPrice: "90.000 VNĐ",
        comboPrice: "360.000 VNĐ/4 Vé",
        status: "Đang áp dụng",
    },
    {
        key: 2,
        index: 2,
        packageCode: "ALT20210501",
        packageName: "Gói sự kiện",
        dateApply: "14/04/2021 08:00:00",
        expire: "14/04/2021 23:00:00",
        ticketPrice: "20.000 VNĐ",
        comboPrice: "-",
        status: "Tắt",
    },
];

const cx = classNames.bind(styles);
const ServicePack = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const columns: ColumnType[] = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Mã gói",
            dataIndex: "packageCode",
            key: "packageCode",
        },
        {
            title: "Tên gói vé",
            dataIndex: "packageName",
            key: "packageName",
        },
        {
            title: "Ngày áp dụng",
            dataIndex: "dateApply",
            key: "dateApply",
        },
        {
            title: "Ngày hết hạn",
            dataIndex: "expire",
            key: "expire",
        },
        {
            title: "Giá vé (VNĐ/Vé)",
            dataIndex: "ticketPrice",
            key: "ticketPrice",
        },
        {
            title: "Giá Combo (VNĐ/Combo)",
            dataIndex: "comboPrice",
            key: "comboPrice",
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status",
            render: (text: string) => {
                const status =
                    text.toUpperCase() === "Đang áp dụng".toUpperCase()
                        ? "is-applying"
                        : "off";

                return <span className={`status ${status}`}>{text}</span>;
            },
        },
        {
            render: () => (
                <div
                    className={cx("edit-btn")}
                    onClick={() => setOpenEdit(true)}
                >
                    <EditIcon />{" "}
                    <span style={{ whiteSpace: "nowrap" }}>Cập nhật</span>
                </div>
            ),
        },
    ];
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Danh sách gói vé</h1>

            <div className={cx("filter")}>
                <Search
                    className={cx("search-box")}
                    placeholder="Tìm bằng số vé"
                />
                <div className={cx("actions")}>
                    <Button
                        className={cx("button")}
                        type="outline"
                        size="large"
                    >
                        Xuất file (.csv)
                    </Button>
                    <Button
                        className={cx("button")}
                        type="primary"
                        size="large"
                        onClick={() => setOpen(true)}
                    >
                        Thêm gói vé
                    </Button>
                </div>
            </div>
            <Table columns={columns} rows={dataSource} />

            <Modal open={open} onHide={() => setOpen(false)}>
                <AddTicketPack onCancel={() => setOpen(false)} />
            </Modal>
            <Modal open={openEdit} onHide={() => setOpenEdit(false)}>
                <UpdateTicketPack onCancel={() => setOpenEdit(false)} />
            </Modal>
        </div>
    );
};

export default ServicePack;
