import { Component, useState } from "react"
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar"
import NavBar from "../../components/NavBar/NavBar";
import DateRange from "../../utils/Range"
import ToDoDrawer from "../../components/ToDoDrawer/ToDoDrawer";
import styles from "./styles.module.css"
import { TimeEnum } from "../../utils/TimeEnum";

const now =new Date();
function add(date: Date, deltaMs: number): Date {
  const copy = new Date(date)
  copy.setTime(copy.getTime()+deltaMs);

  return copy
}

const DUMMY_EVENTS = [
  {dateRange: new DateRange(now, add(now, TimeEnum.Hour))},
  {dateRange: new DateRange(add(now, TimeEnum.Hour + 25*TimeEnum.Minute), add(now, 2*TimeEnum.Hour))},
  {dateRange: new DateRange(add(now, 5*TimeEnum.Hour), add(now, 6*TimeEnum.Hour))},
]

export default function Main() {
  const [isToDoDrawerOpen, setIsToDoDrawerOpen] = useState(false)
  const [isEventDetailsDrawerOpen, setIsEventDetailsDrawerOpen] = useState(false)

  const [currentDate, setCurrentDate] = useState(new Date())

  const navigate = useNavigate()

  const onToDoDrawerClose = () => {
    setIsToDoDrawerOpen(false)
  }

  const onEventDetailsDrawerClose = () => {
    setIsEventDetailsDrawerOpen(false)
  }

  const onHamburgerStateChanged = (newState: boolean) => {
    setIsToDoDrawerOpen(newState)
  }

  const onLogout = () => {
    navigate("/signUp")
  }

  return (
    <div className={styles["root"]}>
      <NavBar
        date={currentDate} 
        isHamburgerOn={isToDoDrawerOpen}
        onHamburgerStateChanged={onHamburgerStateChanged}/>

      <Calendar
        events={DUMMY_EVENTS}
        renderEvent={event => (
          <div style={{backgroundColor: "green", height: "100%", width: "100%"}}/>
        )}
        date={currentDate}
        style={{width: "100%", height: "200vh", backgroundColor: "red"}}/>
        
      <div style={{flex: 1, position: "fixed", bottom: 0, left: 0}}>
        <button onClick={()=>setIsEventDetailsDrawerOpen(true)}>top</button>
        <button onClick={()=>setIsToDoDrawerOpen(true)}>right</button>
        <button onClick={onLogout}>wyloguj</button>
      </div>

      <ToDoDrawer 
        isOpen={isToDoDrawerOpen} 
        onClose={onToDoDrawerClose}/>
    </div>
  );
}