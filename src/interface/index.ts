export interface IChildren {
    children: JSX.Element;
}

export interface IconSVGProps extends React.SVGAttributes<SVGSVGElement> {
    className?: string;
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
}

export interface OptionType {
    label: string;
    value: string;
}

export interface IActionReducer {
    type: any;
    payload: any;
    key: string;
}

export interface IUpdate {
    id: string;
    payload: any;
}

export interface IHeaderCSV {
    label: string;
    key: string;
}

export interface IServicePack {
    packageCode: string;
    packageName: string;
    dateApply?: string;
    timeApply?: string;
    expire?: string;
    timeExpire?: string;
    combo: {
        checked: boolean;
        price: string;
        quantity: string;
    };
    retailPrice: {
        checked: boolean;
        price: string;
    };
    status: string;
}
