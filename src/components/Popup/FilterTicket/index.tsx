import { useState } from "react";
import classNames from "classnames/bind";
import { Col, DatePicker, Radio, Row } from "antd";
import type { DatePickerProps } from "antd";
import Button from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import styles from "./FilterTicket.module.scss";

type StatusType = {
    label: string;
    value: string;
};

const statusUse: StatusType[] = [
    {
        label: "Tất cả",
        value: "all",
    },
    {
        label: "Đã sử dụng",
        value: "used",
    },
    {
        label: "Chưa sử dụng",
        value: "not-used-yet",
    },
    {
        label: "Hết hạn",
        value: "expire",
    },
];

const options = ["Cổng 1", "Cổng 2", "Cổng 3", "Cổng 4", "Cổng 5"];

const cx = classNames.bind(styles);

const FilterTicket = () => {
    const [status, setStatus] = useState<string>("all");
    const [checkedAll, setCheckedAll] = useState<boolean>(true);
    const [gates, setGates] = useState<string[]>([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setGates([]);
            setCheckedAll(true);
        }
    };
    const handleOnChangeCheckbox = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCheckedAll(false);
        if (event.target.checked) setGates([...gates, event.target.value]);
        else {
            const copyGates = gates.filter(
                (item) => item !== event.target.value
            );
            setGates(copyGates);
        }
    };

    const handleChooseDateFrom: DatePickerProps["onChange"] = (
        value,
        dateString
    ) => {
        setFrom(dateString);
    };
    const handleChooseDateTo: DatePickerProps["onChange"] = (
        value,
        dateString
    ) => {
        setTo(dateString);
    };

    const handleFilter = () => {
        if (checkedAll) console.log(options);
        console.log(gates);
        console.log({ from, to });
    };
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Lọc vé</h1>
            <Row className={cx("date-time")}>
                <Col span={12}>
                    <p className={cx("label")}>Từ ngày</p>
                    <DatePicker
                        className={cx("calendar")}
                        format={"DD/MM/YYYY"}
                        placeholder={"Chọn ngày"}
                        onChange={handleChooseDateFrom}
                    />
                </Col>
                <Col span={12}>
                    <p className={cx("label")}>Đến ngày</p>
                    <DatePicker
                        className={cx("calendar")}
                        format={"DD/MM/YYYY"}
                        placeholder={"Chọn ngày"}
                        onChange={handleChooseDateTo}
                    />
                </Col>
            </Row>
            <div>
                <p className={cx("label")}>Tình trạng sử dụng</p>
                <div>
                    <Radio.Group
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        className={cx("options")}
                    >
                        {statusUse.map((status) => (
                            <Radio key={status.value} value={status.value}>
                                {status.label}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            </div>
            <div>
                <p className={cx("label")}>Cổng Check - in</p>
                <div className={cx("options-2")}>
                    <Checkbox
                        value={"Tất cả"}
                        checked={checkedAll}
                        onChange={handleCheckAll}
                    />
                    {options.map((item, index) => (
                        <Checkbox
                            key={index}
                            value={item}
                            checked={gates.includes(item)}
                            onChange={handleOnChangeCheckbox}
                        />
                    ))}
                </div>
            </div>
            <Button
                type="outline"
                size="large"
                className={cx("filter-btn")}
                onClick={handleFilter}
            >
                Lọc
            </Button>
        </div>
    );
};

export default FilterTicket;
