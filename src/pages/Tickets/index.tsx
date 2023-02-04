import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import { FilterIcon, MoreIcon } from "~/components/Icons";
import Search from "~/components/Search";
import Table, { ColumnType } from "~/components/Table";
import Modal from "~/components/Modal";
import { ChangeTicket, FilterTicket } from "~/components/Popup";
import styles from "./Tickets.module.scss";
import { Popover } from "antd";
import { CSVLink } from "react-csv";
import { IHeaderCSV } from "~/interface";
import { useAppSelector } from "~/redux/store";
import { ticketFilterSelectors } from "~/redux/selectors";

interface DataType {
    key: React.Key;
    index: number;
    bookingCode: string;
    ticketNumber: string;
    eventName: string;
    status: string;
    dateUsed: string;
    createdAt: string;
    gate: string;
}

const data: DataType[] = [];

for (let i = 1; i <= 30; i++) {
    if (i === 3 || i == 5)
        data.push({
            key: i,
            index: i,
            bookingCode: "ALT20210501",
            ticketNumber: "123456789034",
            eventName: "Hội chợ triển lãm tiêu dùng 2021",
            status: "Chưa sử dụng",
            dateUsed: "",
            createdAt: "14/04/2021",
            gate: "-",
        });
    else if (i % 2 == 0)
        data.push({
            key: i,
            index: i,
            bookingCode: "ALT20210501",
            ticketNumber: "123456789034",
            eventName: "Hội chợ triển lãm tiêu dùng 2021",
            status: "Đã sử dụng",
            dateUsed: "14/04/2021",
            createdAt: "14/04/2021",
            gate: "Cổng 1",
        });
    else
        data.push({
            key: i,
            index: i,
            bookingCode: "ALT20210501",
            ticketNumber: "123456789034",
            eventName: "Hội chợ triển lãm tiêu dùng 2021",
            status: "Hết hạn",
            dateUsed: "",
            createdAt: "14/04/2021",
            gate: "-",
        });
}

const headers: IHeaderCSV[] = [
    { label: "STT", key: "index" },
    { label: "Booking code", key: "bookingCode" },
    { label: "Số vé", key: "ticketNumber" },
    { label: "Tên sự kiện", key: "eventName" },
    { label: "Tình trạng sử dụng", key: "status" },
    { label: "Ngày sử dụng", key: "dateUsed" },
    { label: "Ngày xuất vé", key: "createdAt" },
    { label: "Cổng check - in", key: "gate" },
];

const cx = classNames.bind(styles);

function Tickets() {
    const { from, to, status, gate } = useAppSelector(ticketFilterSelectors);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [showChange, setShowChange] = useState<boolean>(false);
    console.log({ from, to, status, gate });
    const columns: ColumnType[] = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Booking code",
            dataIndex: "bookingCode",
            key: "bookingCode",
        },
        {
            title: "Số vé",
            dataIndex: "ticketNumber",
            key: "ticketNumber",
        },
        {
            title: "Tên sự kiện",
            dataIndex: "eventName",
            key: "eventName",
        },
        {
            title: "Tình trạng sử dụng",
            dataIndex: "status",
            key: "status",
            render: (tag) => {
                let status: string = "not-used-yet"; //'Chưa sử dụng';
                if (tag.toUpperCase() === "Đã sử dụng".toUpperCase())
                    status = "used";
                if (tag.toUpperCase() === "Hết hạn".toUpperCase())
                    status = "expire";
                return <span className={`status ${status}`}>{tag}</span>;
            },
        },
        {
            title: "Ngày sử dụng",
            dataIndex: "dateUsed",
            key: "dateUsed",
        },
        {
            title: "Ngày xuất vé",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Cổng check - in",
            dataIndex: "gate",
            key: "gate",
        },
        {
            render: (record) => {
                return (
                    <Popover
                        zIndex={10}
                        placement="left"
                        color="#FFD2A8"
                        content={
                            <div>
                                <p style={{ cursor: "pointer" }}>Sử dụng vé</p>
                                <p
                                    onClick={() => setShowChange(true)}
                                    style={{ cursor: "pointer" }}
                                >
                                    Đổi ngày sử dụng
                                </p>
                            </div>
                        }
                    >
                        <span className={cx("more-btn")}>
                            {record.status.toUpperCase() ===
                                "Chưa sử dụng".toUpperCase() && <MoreIcon />}
                        </span>
                    </Popover>
                );
            },
        },
    ];
    // fake mock api
    useEffect(() => {
        setDataSource(data);
    }, []);

    useEffect(() => {
        let dataRemain = [...data];
        if (status !== "Tất cả")
            dataRemain = dataRemain.filter((item) => item.status === status);
        if (gate[0] !== "Tất cả")
            dataRemain = dataRemain.filter((item) => gate.includes(item.gate));
        setDataSource(dataRemain);
    }, [from, to, status, gate]);

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Danh sách vé</h1>
            <div className={cx("filter")}>
                <Search
                    className={cx("search-box")}
                    placeholder="Tìm bằng số vé"
                />
                <div className={cx("wrap-button")}>
                    <Button
                        size="large"
                        type="outline"
                        leftIcon={<FilterIcon />}
                        onClick={() => setOpen(true)}
                    >
                        Lọc vé
                    </Button>
                    <CSVLink
                        className={cx("csv-btn")}
                        data={dataSource}
                        headers={headers}
                        download={"Danh sách vé.csv"}
                    >
                        <Button size="large" type="outline">
                            Xuất file (.csv)
                        </Button>
                    </CSVLink>
                </div>
            </div>
            <Table columns={columns} rows={dataSource} />
            <Modal open={open} onHide={() => setOpen(false)}>
                <FilterTicket setOpen={setOpen} />
            </Modal>
            <Modal open={showChange} onHide={() => setShowChange(false)}>
                <ChangeTicket onCancel={() => setShowChange(false)} />
            </Modal>
        </div>
    );
}

export default Tickets;
