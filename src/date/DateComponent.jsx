import './datecomponent.css';

export const DateComponent = ({day, currMonth, isFirst, selectedDate, setSelectedDate, today}) => {

    const date = new Date(new Date().getFullYear(), currMonth, day)

    const getWeekDay = () => {
        return new Date(date.getFullYear(), currMonth, day).getDay() + 1;
    }

    const getClasses = () => {
        let classes = 'date'
        if (selectedDate === day) {
            classes += ' selected'
        }
        if (day === new Date().getDate() && today.getMonth() === date.getMonth()){
            classes += ' today'
        }
        if (today > date && today.getDate() !== date.getDate()){
            classes += ' past'
        }
        return classes
    }


    return isFirst ? (
            <div id={'date-component'} className={getClasses()} style={{gridColumnStart:getWeekDay()}} onClick={()=>setSelectedDate(day)} data-testid="date-component">
                {day}
            </div>
    ): (
        <div id={'date-component'} className={getClasses()} onClick={()=>setSelectedDate(day)}>
            {day}
        </div>
    )
};