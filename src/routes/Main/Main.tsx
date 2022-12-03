import { Component, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar"
import NavBar from "../../components/NavBar/NavBar";
import DateRange from "../../utils/DateRange"
import ToDoDrawer from "../../components/ToDoDrawer/ToDoDrawer";
import styles from "./styles.module.css"
import { TimeEnum } from "../../utils/TimeEnum";
import API from "../../API/API";
import MyEvent, { isMyCustomEvent, MyCustomEvent } from "../../API/MyEvent";
import { RoutesEnum } from "../RoutesEnum";
import EventItem from "../../components/EventItem/EventItem";
import EventDetailsDrawer from "../../components/EventDetailsDrawer/EventDetailsDrawer";
import GeoLocation from "../../GeoLocation";
import MyMeeting from "../../API/MyMeeting";
import formatHour from "../../utils/formatHour";
import addToDate from "../../utils/addToDate";
import { Difficulty } from "../../API/Difficulty";
import MyToDo from "../../API/MyToDo";
import { ThemeColors } from "../../ThemeColors";
import MyEventItem from "../../components/MyEventItem/MyEventItem";

export default function Main() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isToDoDrawerOpen, setIsToDoDrawerOpen] = useState(false)
  const [eventForDetails, setEventForDetails] = useState<MyEvent | null>(null)
  const [events, setEvents] = useState<MyEvent[]>([])
  const [customEvents, setCustomEvents] = useState<MyCustomEvent[]>([])
  const [toDos, setToDos] = useState<MyToDo[]>([])
  const [meetings, setMeetings] = useState<MyMeeting[]>([])
  useEffect(() => {
    const api = new API()
    api.getEvents(currentDate).then(setEvents)
    api.getMeetings().then(setMeetings)
    api.getToDos().then(setToDos)
    api.getCustomEvents().then(setCustomEvents)
  }, [])

  const navigate = useNavigate()

  const onToDoDrawerClose = () => {
    setIsToDoDrawerOpen(false)
  }

  const onEventDetailsDrawerClose = () => {
    setEventForDetails(null)
  }

  const onHamburgerStateChanged = (newState: boolean) => {
    setIsToDoDrawerOpen(newState)
  }

  const onLogout = () => {
    navigate(RoutesEnum.SignUp)
  }

  const onEventClick = (event: MyEvent) => {
    setEventForDetails(event)
  }

  return (
    <div className={styles["root"]}>
      <NavBar
        hamburgerPosition="right"
        date={currentDate} 
        isHamburgerOn={isToDoDrawerOpen}
        onHamburgerStateChanged={onHamburgerStateChanged}/>
      
      <div className={styles["scrollable"]}>
        <Calendar<MyEvent|MyCustomEvent>
          className={styles["calendar"]}
          events={[...events, ...customEvents]}
          date={currentDate}
          onAddEventRequest={newDate => setEventForDetails({
            dateRange: new DateRange(newDate, addToDate(newDate, TimeEnum.Hour)),
            id: "",
            summary: "Tytuł",
            description: "Opis",
            location: null,
            tag: [],
            difficulty: Difficulty.Easy,
            progress: 0,
            travelTimeMs: 0
          })}
          renderEvent={event => (
            event.tag[0] == "Grey" ?
            <div style={{width: "100%", backgroundColor: "grey", marginTop: 2, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <img src="/images/car-icon.png" style={{marginTop: 7, marginLeft: 4}}/>

              <div style={{color: "white", marginRight: 7}}>30 min.</div>
            </div> :
            isMyCustomEvent(event) ?
              <MyEventItem key={event.id} event={event}
               onShowDetails={()=>{}}/> :
              <EventItem 
              key={event.id}
                style={{backgroundColor: ThemeColors.Work}}
                event={event} 
                onShowDetails={onEventClick}/>
          )}/>
      </div>

      <ToDoDrawer
          toDos={toDos}
          onMuteApp={()=>{}}
          onOpenSettings={()=>{}}
          meetings={meetings}
          isOpen={isToDoDrawerOpen} 
          onClose={onToDoDrawerClose}
          onAddTask={()=>{}}
          onLogOut={onLogout}/>

        <EventDetailsDrawer 
          event={eventForDetails}
          onClose={onEventDetailsDrawerClose}/>
    </div>
  );
}