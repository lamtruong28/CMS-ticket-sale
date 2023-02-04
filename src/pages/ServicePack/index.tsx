import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import { EditIcon } from "~/components/Icons";
import Modal from "~/components/Modal";
import { AddTicketPack, UpdateTicketPack } from "~/components/Popup";
import Search from "~/components/Search";
import Table, { ColumnType } from "~/components/Table";
import { db } from "~/firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAppDispatch } from "~/redux/store";
import { getTicketPackById } from "~/redux/slice/ticketPackSlice";
import { CSVLink } from "react-csv";
import { IHeaderCSV } from "~/interface";
import useDebounce from "~/hooks/useDebounce";
import styles from "./ServicePack.module.scss";

interface DataType {
    key?: string;
    index: number;
    packageCode: string;
    packageName: string;
    dateApply: string;
    expire: string;
    ticketPrice: string;
    comboPrice: string;
    status: string;
}

const headers: IHeaderCSV[] = [
    { label: "STT", key: "index" },
    { label: "Mã gói", key: "packageCode" },
    { label: "Tên gói vé", key: "packageName" },
    { label: "Ngày áp dụng", key: "dateApply" },
    { label: "Ngày hết hạn", key: "expire" },
    { label: "Giá vé (VNĐ/Vé)", key: "ticketPrice" },
    { label: "Giá Combo (VNĐ/Combo)", key: "comboPrice" },
    { label: "Tình trạng", key: "status" },
];

const cx = classNames.bind(styles);
const ServicePack = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [search, setSearch] = useState<string>("");
    const debouncedSearchValue = useDebounce(search, 500);
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
            render: (record: DataType) => (
                <div
                    className={cx("edit-btn")}
                    onClick={() => handleClickUpdate(record)}
                >
                    <EditIcon />{" "}
                    <span style={{ whiteSpace: "nowrap" }}>Cập nhật</span>
                </div>
            ),
        },
    ];

    // Get realtime updates:
    useEffect(() => {
        const q = query(collection(db, "service-pack"), orderBy("packageCode"));
        onSnapshot(q, (snapshot) => {
            let data: DataType[] = [];
            snapshot.docs.map((doc, index) => {
                data.push({
                    key: doc.id,
                    index: index + 1,
                    packageCode: doc.data().packageCode,
                    packageName: doc.data().packageName,
                    dateApply:
                        doc.data().dateApply + " " + doc.data().timeApply,
                    expire: doc.data().expire + " " + doc.data().timeExpire,
                    ticketPrice: doc.data().retailPrice.checked
                        ? doc.data().retailPrice.price + " VNĐ"
                        : "-",
                    comboPrice: doc.data().combo.checked
                        ? doc.data().combo.price +
                          " VNĐ/" +
                          doc.data().combo.quantity +
                          " vé"
                        : "-",
                    status: doc.data().status,
                } as DataType);
            });
            // Handle search:
            if (!debouncedSearchValue) setDataSource(data);
            else
                setDataSource(
                    data.filter((item) =>
                        item.packageCode
                            .toLocaleUpperCase()
                            .includes(debouncedSearchValue.toLocaleUpperCase())
                    )
                );
        });
    }, [debouncedSearchValue]);

    const handleClickUpdate = async (record: DataType) => {
        await dispatch(getTicketPackById(record.key as string));
        setOpenEdit(true);
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Danh sách gói vé</h1>

            <div className={cx("filter")}>
                <Search
                    className={cx("search-box")}
                    placeholder="Tìm bằng mã gói"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className={cx("actions")}>
                    <CSVLink
                        className={cx("csv-btn")}
                        data={dataSource}
                        headers={headers}
                        download={"Danh sách gói dịch vụ.csv"}
                    >
                        <Button
                            className={cx("button")}
                            type="outline"
                            size="large"
                        >
                            Xuất file (.csv)
                        </Button>
                    </CSVLink>
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
