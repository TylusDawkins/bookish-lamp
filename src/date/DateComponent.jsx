import './datecomponent.css';

export const DateComponent = ({day, month, year, isFirst, selectedDate, setSelectedDate, today}) => {
    
    const date = new Date(year, month, day)
    date.setHours(0,0,0,0)

    const getWeekDay = () => {
        return new Date(year, month, day).getDay() + 1;
    }

    const getClasses = () => {
        let classes = 'date'
        if (selectedDate === day) {
            classes += ' selected'
        }
        if (day === today.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()){
            classes += ' today'
        }
        else if (today > date){
            classes += ' past'
        }
        return classes
    }

    const handleClick = () => {
        setSelectedDate(day)
    }


    return isFirst ? (
            <div id={'date-component'} className={getClasses()} style={{gridColumnStart:getWeekDay()}} onClick={handleClick} data-testid="date-component">
                {day}
            </div>
    ): (
        <div id={'date-component'} className={getClasses()} onClick={handleClick}>
            {day}
        </div>
    )
};