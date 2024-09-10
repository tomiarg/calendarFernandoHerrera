import { createSlice} from "@reduxjs/toolkit"
import { addHours } from "date-fns";

const tempEvent =  {
    _id: new Date().getTime(),
    title: 'Cumple mío',
    notes: 'hay que ser genio',
    start: new Date(),
    end: addHours(new Date(), 2),
    bg: '#fafafa',
    user: {
      id: '123',
      userName: 'Tomás'
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState:{
         events: [
            tempEvent
         ],
         activeEvent:null
    },
    reducers:{
        onSetActiveEvent:(state, {payload})=>{
            state.activeEvent = payload;
        },
        onAddNewEvent:(state,{payload})=>{
          state.events.push(payload)
         state.activeEvent = null;
        }
    }
})

export const {onSetActiveEvent, onAddNewEvent} = calendarSlice.actions