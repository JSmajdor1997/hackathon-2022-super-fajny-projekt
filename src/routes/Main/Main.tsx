import { Component, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar"
import NavBar from "../../components/NavBar/NavBar";
import DateRange from "../../utils/DateRange"
import ToDoDrawer from "../../components/ToDoDrawer/ToDoDrawer";
import styles from "./styles.module.css"
import { TimeEnum } from "../../utils/TimeEnum";
import API from "../../API/API";
import MyEvent from "../../API/MyEvent";
import { RoutesEnum } from "../RoutesEnum";
import EventItem from "../../components/EventItem/EventItem";
import EventDetailsDrawer from "../../components/EventDetailsDrawer/EventDetailsDrawer";

export default function Main() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isToDoDrawerOpen, setIsToDoDrawerOpen] = useState(false)
  const [eventForDetails, setEventForDetails] = useState<MyEvent | null>(null)
  const [events, setEvents] = useState<MyEvent[]>([])
  useEffect(() => {
    new API().getEvents(currentDate).then(setEvents)
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
        date={currentDate} 
        isHamburgerOn={isToDoDrawerOpen}
        onHamburgerStateChanged={onHamburgerStateChanged}/>
      
      <div className={styles["scrollable"]}>
        <Calendar<MyEvent>
          className={styles["calendar"]}
          events={events}
          date={currentDate}
          renderEvent={event => (
            <EventItem 
              event={event} 
              onShowDetails={onEventClick}/>
          )}/>

        <ToDoDrawer 
          isOpen={isToDoDrawerOpen} 
          onClose={onToDoDrawerClose}
          onLogOut={onLogout}/>

        <EventDetailsDrawer 
          event={eventForDetails}
          onClose={onEventDetailsDrawerClose}/>
      </div>
    </div>
  );
}