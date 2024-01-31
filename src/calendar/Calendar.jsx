import { useState, useEffect, useRef } from 'react';
import './calendar.css';
import { DateComponent } from '../date/DateComponent';

export const Calendar = () => {

    const monthsMap = {
        0: 'Jan',
        1: 'Feb',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    }


    
    //Variables

    const [selectedDate, setSelectedDate] = useState()

    const [date, setDate] = useState(new Date())

    const today = new Date()

    const monthIdx = useRef(date.getMonth());

    const yearIdx = useRef(date.getFullYear());
    
    //Functions

    const changeMonthIdx = (n) => {
        if (date.getMonth() + n > 11) {
            // monthIdx.current = 0
            // yearIdx.current = yearIdx.current + 1
            setDate(new Date(date.getFullYear() + 1 , 0, 1))
        }
        else if (date.getMonth() + n < 0) {
            // monthIdx.current = 11
            // yearIdx.current = yearIdx.current - 1
            setDate(new Date(date.getFullYear() -1, 11, 1))
        }
        else {
        //  monthIdx.current = monthIdx.current + n
         setDate(new Date(date.getFullYear(), date.getMonth() + n, 1))
        //  setDate(new Date(yearIdx.current, monthIdx.current, 1))
        }
    }

    return (
        <div className='calendar' data-testid="calendar">
            <div className='calendar-header'>
                <div className='arrow left' onClick={(e) =>{
                    e.preventDefault()
                    changeMonthIdx(-1)
                    setSelectedDate(null)
                    }}>{'<'}</div>
                <div className='header-info'>
                    <div className='calendar-month'>
                        {monthsMap[date.getMonth()]}
                    </div>
                    <div className='calendar-year'>
                        {date.getFullYear()}
                    </div>
                </div>
                <div className='arrow right' onClick={(e) =>{
                    e.preventDefault()
                    changeMonthIdx(1)
                    setSelectedDate(null)
                    }}>{'>'}</div>
            </div>
            <div className='calendar-body'>
                <div className='calendar-days'>
                    <div className='day'>SUN</div>
                    <div className='day'>MON</div>
                    <div className='day'>TUES</div>
                    <div className='day'>WED</div>
                    <div className='day'>THUR</div>
                    <div className='day'>FRI</div>
                    <div className='day'>SAT</div>
                </div>
                <div className='calendar-dates'>
                    {[...Array(new Date(date.getFullYear(),date.getMonth()+1, 0).getDate())].map((iJustWantedTheIndex, i) => {
                        return i===0 ? (
                            <DateComponent day={i+1} month={date.getMonth()} year={date.getFullYear()}  isFirst={true} selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} key={i}/>
                        ) :
                        (
                            <DateComponent day={i+1} month={date.getMonth()} year={date.getFullYear()} isFirst={false} selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} key={i}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

