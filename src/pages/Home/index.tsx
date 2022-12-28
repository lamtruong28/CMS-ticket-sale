import { Col, DatePicker, DatePickerProps, Row } from "antd";
import classNames from "classnames/bind";
import ReactApexChart from "react-apexcharts";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const customFormat: DatePickerProps["format"] = (value) =>
    `Tháng ${value.format("MM,YYYY")}`;

const series = [
    {
        name: "Doanh thu",
        data: [150, 160, 230, 250, 200],
    },
];

const Home = () => {
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Thống kê</h1>
            <div className={cx("filter")}>
                <span className={cx("title")}>Doanh thu</span>
                <DatePicker
                    className={cx("picker")}
                    placeholder={"Chọn tháng"}
                    picker="month"
                    format={(value) => `Tháng ${value.format("MM,YYYY")}`}
                />
            </div>
            <ReactApexChart
                type="area"
                series={series}
                height={300}
                options={{
                    chart: {
                        type: "area",
                        toolbar: {
                            show: false,
                        },
                    },
                    colors: ["#FF993C"],
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "smooth",
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            formatter: (value: number) => value + "tr",
                        },
                    },
                    xaxis: {
                        type: "category",
                        categories: [
                            "29/03 - 04/04",
                            "05/04 - 11/04",
                            "12/01 - 18/04",
                            "19/04 - 25/04",
                            "26/04 - 02/05",
                        ],
                    },
                }}
            />
            <div className={cx("total")}>
                <p className={cx("title")}>Tổng doanh thu theo tuần</p>
                <strong className={cx("value")}>525.145.000</strong>
                <span className={cx("unit")}> đồng</span>
            </div>
            <Row>
                <Col span={4}>
                    <DatePicker
                        className={cx("picker")}
                        placeholder={"Chọn tháng"}
                        picker="month"
                        format={(value) => `Tháng ${value.format("MM,YYYY")}`}
                    />
                </Col>
                <Col span={7}>
                    <p className={cx("label")}>Gói gia đình</p>
                    <ReactApexChart
                        options={{
                            stroke: {
                                width: 0,
                            },
                            colors: ["#FF8A48", "#4F75FF"],
                            labels: ["Vé chưa sử dụng", "Vé đã sử dụng"],
                            legend: {
                                show: false,
                            },
                        }}
                        series={[13568, 56024]}
                        type="donut"
                        width={350}
                    />
                </Col>
                <Col span={7}>
                    <p className={cx("label")}>Gói sự kiện</p>
                    <ReactApexChart
                        options={{
                            stroke: {
                                width: 0,
                            },
                            colors: ["#FF8A48", "#4F75FF"],
                            labels: ["Vé chưa sử dụng", "Vé đã sử dụng"],
                            legend: {
                                show: false,
                            },
                        }}
                        series={[28302, 30256]}
                        type="donut"
                        width={350}
                    />
                </Col>
                <Col span={6}>
                    <div className={cx("ticket-used")}>Vé đã sử dụng</div>
                    <div className={cx("ticket-unused")}>Vé chưa sử dụng</div>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
