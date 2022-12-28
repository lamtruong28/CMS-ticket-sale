import { IChildren } from "~/interface";
import "./GlobalStyles.scss";
import "./OverrideStylesAntd.scss";

function GlobalStyles({ children }: IChildren) {
    return children;
}

export default GlobalStyles;
