import { useState } from "react";
import { Button, Calendar as CustomCalendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import updateLocale from "dayjs/plugin/updateLocale";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "./OverrideStyleCalendar.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
    weekdaysMin: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
});
function Calendar() {
    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const [preNextMonth, setPreNextMonth] = useState(dayjs());
    console.log(preNextMonth);
    return (
        <div className="calendar-wrap">
            <CustomCalendar
                fullscreen={false}
                headerRender={({ value }) => {
                    value = preNextMonth;
                    const year: number = value.year();
                    const monthName: string = dayjs(value).format("MM");
                    return (
                        <div className="calendar__header">
                            <Button
                                type="link"
                                className="btn-prev"
                                onClick={() =>
                                    setPreNextMonth(
                                        preNextMonth.subtract(1, "months")
                                    )
                                }
                            >
                                <ArrowLeftIcon />
                            </Button>
                            <div className="date-time">
                                <span>{monthName} </span>
                                <span>{year}</span>
                            </div>
                            <Button
                                type="link"
                                className="btn-next"
                                onClick={() =>
                                    setPreNextMonth(
                                        preNextMonth.add(1, "months")
                                    )
                                }
                            >
                                <ArrowRightIcon />
                            </Button>
                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
            />
        </div>
    );
}

export default Calendar;
