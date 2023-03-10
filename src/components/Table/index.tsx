import classNames from "classnames/bind";
import { Table as CustomTable } from "antd";
import styles from "./Table.module.scss";
import "./OverrideStyleTableAntd.scss";

export type ColumnType = {
    title?: string;
    dataIndex?: string;
    key?: string;
    render?: (record: any) => React.ReactNode;
};

type TableProps = {
    columns: ColumnType[];
    rows: any;
    pagination?: boolean;
    pageSize?: number;
    rowKey?: any;
    loading?: boolean;
};

const cx = classNames.bind(styles);
function Table({
    columns,
    rows,
    pagination,
    pageSize = 9,
    rowKey,
    loading,
    ...props
}: TableProps) {
    return (
        <CustomTable
            columns={columns}
            dataSource={rows}
            className={cx("wrapper")}
            rowClassName={() => cx("row")}
            pagination={{ pageSize: pageSize }}
            rowKey={rowKey}
            loading={loading}
            {...props}
        />
    );
}

export default Table;
