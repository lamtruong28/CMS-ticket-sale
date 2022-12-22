export interface IChildren {
    children: JSX.Element;
}

export interface IconSVGProps extends React.SVGAttributes<SVGSVGElement> {
    className?: string;
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
}
