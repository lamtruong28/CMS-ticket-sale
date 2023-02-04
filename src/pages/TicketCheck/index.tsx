import { Col, DatePicker, Radio, Row } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import Button from "~/components/Button";
import Calendar from "~/components/Calendar";
import Search from "~/components/Search";
import Table, { ColumnType } from "~/components/Table";
import styles from "./TicketCheck.module.scss";

type StatusType = {
    label: string;
    value: string;
};

interface DataType {
    key: React.Key;
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

const dataSource: DataType[] = [];

for (let i = 1; i <= 30; i++) {
    if (i % 3 === 0)
        dataSource.push({
            key: i,
            index: i,
            ticketNumber: "123456789034",
            eventName: "Hội chợ triển lãm tiêu dùng 2021",
            dateUsed: "14/04/2021",
            ticketType: "Vé cổng",
            gate: "Cổng 1",
            status: "Đã đối soát",
        });
    else
        dataSource.push({
            key: i,
            index: i,
            ticketNumber: "123456789034",
            eventName: "Hội chợ triển lãm tiêu dùng 2021",
            dateUsed: "14/04/2021",
            ticketType: "Vé cổng",
            gate: "Cổng 1",
            status: "Chưa đối soát",
        });
}

const cx = classNames.bind(styles);
const TicketCheck = () => {
    const [status, setStatus] = useState<string>("Tất cả");
    const [data, setData] = useState<DataType[]>(dataSource);
    const [exportButton, setExportButton] = useState<boolean>(false);
    const handleFilter = () => {
        if (status === "Tất cả") setData(dataSource);
        else setData(dataSource.filter((item) => item.status === status));
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
                        <Button type="outline" size="large">
                            Xuất file (.csv)
                        </Button>
                    ) : (
                        <Button type="primary" size="large">
                            Chốt đối soát
                        </Button>
                    )}
                </div>
                <Table columns={columns} rows={data} />
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
