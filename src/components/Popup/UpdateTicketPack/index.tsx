import { Col, DatePicker, Input, Row, Select, TimePicker } from "antd";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import { ArrowDownIcon } from "~/components/Icons";
import { ticketPackSelectors } from "~/redux/selectors";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { types } from "~/types";
import dayjs from "dayjs";
import styles from "./UpdateTicketPack.module.scss";
import { IServicePack } from "~/interface";
import { useEffect, useReducer } from "react";
import { updateTicketPack } from "~/redux/slice/ticketPackSlice";
import reducer from "~/reducer";

type OptionType = {
    label: string;
    value: string;
};

interface UpdateTicketPackProps {
    onCancel: () => void;
}

const options: OptionType[] = [
    {
        label: "Đang áp dụng",
        value: "Đang áp dụng",
    },
    {
        label: "Tắt",
        value: "Tắt",
    },
];

const initState: IServicePack = {
    packageCode: "",
    packageName: "",
    dateApply: dayjs().format("DD/MM/YYYY"),
    timeApply: dayjs().format("HH:mm:ss"),
    expire: dayjs().format("DD/MM/YYYY"),
    timeExpire: dayjs().format("HH:mm:ss"),
    retailPrice: {
        checked: false,
        price: "",
    },
    combo: {
        checked: false,
        price: "",
        quantity: "",
    },
    status: "Đang áp dụng",
};

const cx = classNames.bind(styles);
const UpdateTicketPack = ({ onCancel }: UpdateTicketPackProps) => {
    const dispatch = useAppDispatch();
    const { ticketPack, loading } = useAppSelector(ticketPackSelectors);
    const [state, dispatch2] = useReducer(reducer, initState);
    const {
        packageCode,
        packageName,
        dateApply,
        timeApply,
        expire,
        timeExpire,
        retailPrice,
        combo,
        status,
    } = state;

    useEffect(() => {
        dispatch2({
            type: types.RESET_STATE,
            key: "initState",
            payload: ticketPack,
        });
    }, [ticketPack]);
    const onChangeInput = (
        event: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        dispatch2({
            type: types.INPUT_CHANGE,
            key,
            payload: event.target.value,
        });
    };

    const onChangeStatus = (value: string) => {
        dispatch2({
            type: types.DROPDOWN_CHANGE,
            key: "status",
            payload: value,
        });
    };

    const onChangeDatePicker = (dateString: string, key: string) => {
        dispatch2({ type: types.DATE_PICKER_CHANGE, key, payload: dateString });
    };

    const onChangeTimePicker = (timeString: string, key: string) => {
        dispatch2({ type: types.TIME_PICKER_CHANGE, key, payload: timeString });
    };

    const onChangeCheckbox = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        dispatch2({
            type: types.COMBO_BOX_CHANGE,
            key,
            payload: e.target.checked,
        });
    };

    const onChangePrice = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        dispatch2({
            type: types.PRICE_CHANGE,
            key,
            payload: e.target.value,
        });
    };
    const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch2({
            type: types.QUANTITY_CHANGE,
            key: "quantity",
            payload: e.target.value,
        });
    };

    const handleUpdateServicePack = async () => {
        if (!packageCode || !packageName) {
            alert("Không được bỏ trống các ô dấu *");
            return;
        }
        const res = await dispatch(
            updateTicketPack({ id: ticketPack.id, payload: state })
        );
        if (res.payload) handleCloseModal();
    };

    const handleCloseModal = () => {
        onCancel();
        dispatch2({
            type: types.RESET_STATE,
            key: "Reset",
            payload: initState,
        });
    };
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Thêm gói vé</h1>
            <Row className={cx("row")} gutter={24}>
                <Col span={12}>
                    <p className={cx("label")}>
                        Mã gói vé <span className="required">*</span>
                    </p>
                    <Input
                        placeholder="Nhập mã gói vé"
                        className={cx("name")}
                        value={packageCode}
                        onChange={(event) =>
                            onChangeInput(event, "packageCode")
                        }
                        disabled={true}
                    />
                </Col>
                <Col span={12}>
                    <p className={cx("label")}>
                        Tên gói vé <span className="required">*</span>
                    </p>
                    <Input
                        placeholder="Nhập tên gói vé"
                        className={cx("name")}
                        value={packageName}
                        onChange={(event) =>
                            onChangeInput(event, "packageName")
                        }
                    />
                </Col>
            </Row>
            <Row className={cx("row")}>
                <Col span={12}>
                    <p className={cx("label")}>Ngày áp dụng</p>
                    <DatePicker
                        className={cx("date-picker")}
                        placeholder={"dd/mm/yy"}
                        showToday={false}
                        format={"DD/MM/YYYY"}
                        value={
                            dayjs(dateApply, "DD/MM/YYYY").isValid()
                                ? dayjs(dateApply, "DD/MM/YYYY")
                                : undefined
                        }
                        onChange={(value, dateString) =>
                            onChangeDatePicker(dateString, "dateApply")
                        }
                    />
                    <TimePicker
                        className={cx("time-picker")}
                        placeholder={"hh:mm:ss"}
                        value={
                            dayjs(timeApply, "HH:mm:ss").isValid()
                                ? dayjs(timeApply, "HH:mm:ss")
                                : undefined
                        }
                        onChange={(value, timeString) =>
                            onChangeTimePicker(timeString, "timeApply")
                        }
                    />
                </Col>
                <Col span={12}>
                    <p className={cx("label")}>Ngày hết hạn</p>
                    <DatePicker
                        className={cx("date-picker")}
                        placeholder={"dd/mm/yy"}
                        format={"DD/MM/YYYY"}
                        showToday={false}
                        value={
                            dayjs(expire, "DD/MM/YYYY").isValid()
                                ? dayjs(expire, "DD/MM/YYYY")
                                : undefined
                        }
                        onChange={(value, dateString) =>
                            onChangeDatePicker(dateString, "expire")
                        }
                    />
                    <TimePicker
                        className={cx("time-picker")}
                        placeholder={"hh:mm:ss"}
                        value={
                            dayjs(timeExpire, "HH:mm:ss").isValid()
                                ? dayjs(timeExpire, "HH:mm:ss")
                                : undefined
                        }
                        onChange={(value, timeString) =>
                            onChangeTimePicker(timeString, "timeExpire")
                        }
                    />
                </Col>
            </Row>
            <div className={cx("row")}>
                <p className={cx("label")}>Giá vé áp dụng</p>
                <div className={cx("d-flex")}>
                    <Checkbox
                        value={"Vé lẻ (vnđ/vé) với giá"}
                        checked={retailPrice?.checked}
                        onChange={(e) => onChangeCheckbox(e, "retailPrice")}
                    />
                    <Input
                        type="number"
                        placeholder="Giá vé"
                        className={cx("input")}
                        disabled={!retailPrice?.checked}
                        value={retailPrice?.price}
                        onChange={(event) =>
                            onChangePrice(event, "retailPrice")
                        }
                    />{" "}
                    <span>/ vé</span>
                </div>
                <div className={cx("d-flex")}>
                    <Checkbox
                        value={"Combo vé với giá"}
                        checked={combo?.checked}
                        onChange={(e) => onChangeCheckbox(e, "combo")}
                    />
                    <Input
                        type="number"
                        placeholder="Giá vé"
                        className={cx("input")}
                        disabled={!combo?.checked}
                        value={combo?.price}
                        onChange={(event) => onChangePrice(event, "combo")}
                    />{" "}
                    <span>/</span>{" "}
                    <Input
                        type="number"
                        placeholder="Số vé"
                        className={cx("input", "quantity")}
                        disabled={!combo?.checked}
                        value={combo?.quantity}
                        onChange={(event) => onChangeQuantity(event)}
                    />{" "}
                    <span>vé</span>
                </div>
            </div>
            <div className={cx("row")}>
                <p className={cx("label")}>Tình trạng</p>
                <Select
                    options={options}
                    className={cx("select")}
                    value={status}
                    onChange={onChangeStatus}
                    suffixIcon={<ArrowDownIcon />}
                />
            </div>
            <p>
                <span className="required">* </span>
                <span style={{ opacity: 0.4 }}>là thông tin bắt buộc</span>
            </p>
            <div className={cx("wrap-button")}>
                <Button
                    className={cx("button")}
                    type="outline"
                    size="large"
                    onClick={handleCloseModal}
                >
                    Huỷ
                </Button>
                <Button
                    className={cx("button")}
                    type="primary"
                    size="large"
                    onClick={handleUpdateServicePack}
                    loading={loading}
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default UpdateTicketPack;
