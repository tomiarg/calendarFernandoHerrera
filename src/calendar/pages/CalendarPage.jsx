import { NavBar, CalendarEvent, CalendarModal, FabAddNew} from "../"

import { Calendar,} from 'react-big-calendar'
import { localizer, getMessages } from "../../helpers"

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from "react"
import { useUiStore, useCalendarStore } from "../../store/hooks"


export const CalendarPage = () => {

   const {events, setActiveEvent} = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView' )|| 'week')


  const eventStyleGetter = (event, start, end, isSelected) =>{
    const style ={
      backgroundColor:'#c4c4c4',
      borderRadius: '0px',
      opacity: 0.8,
      color:'white'
    }

    return{
      style
    }

  }

  const onDoubleClick =  (event) =>{
    // console.log({doubleClick: event})
     openDateModal();
  }
  const onSelect = (event)=>{
   setActiveEvent(event)
  }
  const onViewChanged = (event)=>{
    localStorage.setItem('lastView', event)
    setLastView(event)
  }
  return (
    <>
      <NavBar/>
      <div>
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages={getMessages()}
          eventPropGetter={eventStyleGetter}
          components={{        
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
    
     </div>
    </>
  )
}
