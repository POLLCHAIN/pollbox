import "./btnDown.scss"
import { useState, useEffect } from 'react';
import { format } from "date-fns";

type TimeNumber = {
    endTime?: number,   
};
export default function BtnTimer({ endTime }: TimeNumber) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    useEffect(() => {
        let myInterval = setInterval(() => {
            const currentDate: any = Date.now() / 1000;
            const endDiff = endTime - currentDate;
            const enddayNum = endDiff > 0 ? Math.floor(endDiff / 60 / 60 / 24) : 0;
            const endhourNum = endDiff > 0 ? Math.floor(endDiff / 60 / 60) % 24 : 0;
            const endminNum = endDiff > 0 ? Math.floor(endDiff / 60) % 60 : 0;
            const endsecNum = endDiff > 0 ? Math.floor(endDiff) % 60 : 0;
            if (currentDate < endTime) {
                setDays(enddayNum);
                setHours(endhourNum);
                setMinutes(endminNum);
                setSeconds(endsecNum);
            }
            else {
                setIsEnded(true)
            }
        }, 0)
        return () => {
            clearInterval(myInterval);
        };

    }, [endTime]);

    return (
        <div className="btntimer">
            <div className="timerNums" style={{
                color: isEnded ? 'red' : '#000'
            }}>

                {
                    isEnded ?
                        <span className="txt">Ended in {format(endTime * 1000, "MMM dd yyyy HH:mm")}</span>
                        :
                        <>
                            <i className="fas fa-clock"></i>
                            <span className="number">{days < 10 ? `0${days}` : days} : {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds} </span>
                        </>
                }

            </div>
        </div>
    )
}