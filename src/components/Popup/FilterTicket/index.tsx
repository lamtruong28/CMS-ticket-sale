import { useState } from "react";
import classNames from "classnames/bind";
import { Col, DatePicker, Radio, Row } from "antd";
import type { DatePickerProps } from "antd";
import Button from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import styles from "./FilterTicket.module.scss";
import { useAppDispatch } from "~/redux/store";
import ticketSlice from "~/redux/slice/ticketSlice";

type StatusType = {
    label: string;
    value: string;
};

const statusUse: StatusType[] = [
    {
        label: "Tất cả",
        value: "Tất cả",
    },
    {
        label: "Đã sử dụng",
        value: "Đã sử dụng",
    },
    {
        label: "Chưa sử dụng",
        value: "Chưa sử dụng",
    },
    {
        label: "Hết hạn",
        value: "Hết hạn",
    },
];

const options = ["Cổng 1", "Cổng 2", "Cổng 3", "Cổng 4", "Cổng 5"];

const cx = classNames.bind(styles);

type FilterTicketType = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterTicket = ({ setOpen }: FilterTicketType) => {
    const [status, setStatus] = useState<string>("Tất cả");
    const [checkedAll, setCheckedAll] = useState<boolean>(true);
    const [gates, setGates] = useState<string[]>([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const dispatch = useAppDispatch();

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
        dispatch(
            ticketSlice.actions.setFilter({
                from,
                to,
                status,
                gate: checkedAll ? options : gates,
            })
        );
        setOpen(false);
    };
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Lọc vé</h1>
            <Row className={cx("date-time")}>
                <Col span={12}>
                    <p className={cx("label")}>Từ ngày</p>
                    <DatePicker
                        className={cx("calendar")}
                        showToday={false}
                        format={"DD/MM/YYYY"}
                        placeholder={"Chọn ngày"}
                        onChange={handleChooseDateFrom}
                    />
                </Col>
                <Col span={12}>
                    <p className={cx("label")}>Đến ngày</p>
                    <DatePicker
                        className={cx("calendar")}
                        showToday={false}
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
