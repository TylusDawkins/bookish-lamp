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

    const monthIdx = useRef(new Date().getMonth());
    
    const getMonthStr = () => {
        setMonth(monthsMap[monthIdx.current])
    }
    
    //Variables

    const [month, setMonth] = useState()

    const [selectedDate, setSelectedDate] = useState()

    const today = new Date()

    //Functions

    const changeMonthIdx = (n) => {
        monthIdx.current = monthIdx.current + n
    }

    useEffect(() => {
        setMonth(monthsMap[monthIdx.current])
    }, [])


    const numDays = (y, m) => new Date(y, m, 0).getDate();

    return (
        <div className='calendar' data-testid="calendar">
            <div className='calendar-header'>
                <div className='arrow left' onClick={(e) =>{
                    e.preventDefault()
                    changeMonthIdx(-1)
                    getMonthStr()
                    }}>{'<'}</div>
                <div className='header-info'>
                    <div className='calendar-month'>
                        {month}
                    </div>
                    <div className='calendar-year'>
                        {new Date().getFullYear()}
                    </div>
                </div>
                <div className='arrow right' onClick={(e) =>{
                    e.preventDefault()
                    changeMonthIdx(1)
                    getMonthStr()
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
                    {[...Array(numDays(new Date().getFullYear(), monthIdx.current+1))].map((e, i) => {
                        return i===0 ? (
                            <DateComponent day={i+1} currMonth={monthIdx.current} isFirst={true} selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} key={i}/>
                        ) :
                        (
                            <DateComponent day={i+1} currMonth={monthIdx.current} isFirst={false} selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} key={i}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

