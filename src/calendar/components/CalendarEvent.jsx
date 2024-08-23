
export const CalendarEvent = ({event}) => {
   const {title, user} = event
  return (
    <>
     <strong>{title}</strong>
     <span>-    {user.userName}</span>
    </>
  )
}


