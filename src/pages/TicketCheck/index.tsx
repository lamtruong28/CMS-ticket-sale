import { Col, DatePicker, Radio, Row } from "antd";
import classNames from "classnames/bind";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Button from "~/components/Button";
import Search from "~/components/Search";
import Table, { ColumnType } from "~/components/Table";
import { db } from "~/firebase/config";
import { IHeaderCSV } from "~/interface";
import styles from "./TicketCheck.module.scss";

type StatusType = {
    label: string;
    value: string;
};

interface DataType {
    key: string;
    index: number;
    ticketNumber: string;
    eventName: string;
    ticketType: string;
    dateUsed: string;
    gate: string;
    status: string;
}

const statusCheck: StatusType[] = [
    {
        label: "Tất cả",
        value: "Tất cả",
    },
    {
        label: "Đã đối soát",
        value: "Đã đối soát",
    },
    {
        label: "Chưa đối soát",
        value: "Chưa đối soát",
    },
];

const columns: ColumnType[] = [
    {
        title: "STT",
        dataIndex: "index",
        key: "index",
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
        title: "Ngày sử dụng",
        dataIndex: "dateUsed",
        key: "dateUsed",
    },
    {
        title: "Loại vé",
        dataIndex: "ticketType",
        key: "ticketType",
    },
    {
        title: "Cổng check - in",
        dataIndex: "gate",
        key: "gate",
    },
    {
        dataIndex: "status",
        render: (text: string) => (
            <span
                style={
                    text === "Đã đối soát"
                        ? { color: "var(--end-color)" }
                        : { color: "var(--grey-color-4)" }
                }
            >
                {text}
            </span>
        ),
    },
];

const headers: IHeaderCSV[] = [
    { label: "STT", key: "index" },
    { label: "Số vé", key: "ticketNumber" },
    { label: "Tên sự kiện", key: "eventName" },
    { label: "Ngày sử dụng", key: "dateUsed" },
    { label: "Loại vé", key: "ticketType" },
    { label: "Cổng check - in", key: "gate" },
];

const cx = classNames.bind(styles);
const TicketCheck = () => {
    const [status, setStatus] = useState<string>("Tất cả");
    const [exportButton, setExportButton] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [copyDataSource, setCopyDataSource] = useState<DataType[]>([]);
    // Get realtime updates:
    useEffect(() => {
        const q = query(collection(db, "ticketCheck"), orderBy("ticketNumber"));
        onSnapshot(q, (snapshot) => {
            let data: DataType[] = [];
            snapshot.docs.map((doc, index) => {
                data.push({
                    key: doc.id,
                    index: index + 1,
                    ticketNumber: doc.data().ticketNumber,
                    eventName: doc.data().eventName,
                    dateUsed: doc.data().dateUsed,
                    ticketType: doc.data().ticketType,
                    gate: doc.data().gate,
                    status: doc.data().status,
                } as DataType);
            });
            setDataSource(data);
            setCopyDataSource(data);
        });
    }, []);

    const handleFilter = () => {
        if (status === "Tất cả") setDataSource(copyDataSource);
        else
            setDataSource(
                copyDataSource.filter((item) => item.status === status)
            );
        setExportButton(status === "Đã đối soát");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("left")}>
                <h1 className={cx("heading")}>Đối soát vé</h1>
                <div className={cx("actions")}>
                    <Search
                        className={cx("search-box")}
                        placeholder="Tìm bằng số vé"
                    />
                    {exportButton ? (
                        <CSVLink
                            style={{ textDecoration: "none" }}
                            data={dataSource}
                            headers={headers}
                            download={"Danh sách đối soát vé.csv"}
                        >
                            <Button type="outline" size="large">
                                Xuất file (.csv)
                            </Button>
                        </CSVLink>
                    ) : (
                        <Button type="primary" size="large">
                            Chốt đối soát
                        </Button>
                    )}
                </div>
                <Table columns={columns} rows={dataSource} />
            </div>
            <div className={cx("right")}>
                <h2 className={cx("sub-heading")}>Lọc vé</h2>
                <Row className={cx("row")}>
                    <Col span={11}>
                        <span className={cx("label")}>Tình trạng đối soát</span>
                    </Col>
                    <Radio.Group
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        className={cx("options")}
                    >
                        {statusCheck.map((status) => (
                            <Radio key={status.value} value={status.value}>
                                {status.label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Row>
                <Row className={cx("row")}>
                    <Col span={11}>
                        <span className={cx("label")}>Loại vé</span>
                    </Col>
                    <Col span={11}>
                        <span className={cx("value")}>Vé cổng</span>
                    </Col>
                </Row>
                <Row className={cx("row")}>
                    <Col span={11}>
                        <span className={cx("label")}>Từ ngày</span>
                    </Col>
                    <Col>
                        <DatePicker
                            disabled
                            placeholder="Chọn ngày"
                            showToday={false}
                        />
                    </Col>
                </Row>
                <Row className={cx("row")}>
                    <Col span={11}>
                        <span className={cx("label")}>Đến ngày</span>
                    </Col>
                    <Col>
                        <DatePicker placeholder="Chọn ngày" showToday={false} />
                    </Col>
                </Row>
                <Button
                    className={cx("filter-btn")}
                    type="outline"
                    size="large"
                    onClick={handleFilter}
                >
                    Lọc
                </Button>
            </div>
        </div>
    );
};

export default TicketCheck;
