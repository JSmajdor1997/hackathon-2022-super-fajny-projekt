import { Component, useState } from "react"
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar"
import EventDetailsDrawer from "../../components/EventDetailsDrawer/EventDetailsDrawer";
import NavBar from "../../components/NavBar/NavBar";
import ToDoDrawer from "../../components/ToDoDrawer/ToDoDrawer";
import styles from "./styles.module.css"

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

      <Calendar style={{width: 300, height: 300, backgroundColor: "red"}}/>
      <div style={{flex: 1, position: "fixed", bottom: 0, left: 0}}>
        <button onClick={()=>setIsEventDetailsDrawerOpen(true)}>top</button>
        <button onClick={()=>setIsToDoDrawerOpen(true)}>right</button>
        <button onClick={onLogout}>wyloguj</button>
      </div>

      <ToDoDrawer 
        isOpen={isToDoDrawerOpen} 
        onClose={onToDoDrawerClose}/>

      <EventDetailsDrawer 
        isOpen={isEventDetailsDrawerOpen} 
        onClose={onEventDetailsDrawerClose}/>
    </div>
  );
}