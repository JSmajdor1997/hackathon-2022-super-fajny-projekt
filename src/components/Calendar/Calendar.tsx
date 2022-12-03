import React from "react"
import { Component, ReactElement } from "react"
import mergeClassesNames from "../../utils/mergeClassNames"
import DateRange from "../../utils/DateRange"
import Styllable from "../../utils/Styllable"
import { TimeEnum } from "../../utils/TimeEnum"
import styles from "./styles.module.css"
import { normalizeLength, Side } from "../../utils/formatHour"
import { ThemeColors } from "../../ThemeColors"

export interface Event {
    dateRange: DateRange
    id: string
}

export interface Props<T extends Event> extends Styllable {
    date: Date
    onAddEventRequest: (startingDate: Date)=>void

    events: T[]
    customEvents: T[]
    renderEvent: (event: T)=>ReactElement
}

interface State {
    rootHeight: number
}

export default class Calendar<T extends Event> extends Component<Props<T>, State> {
    constructor(props: Props<T>) {
        super(props)

        this.state = {
            rootHeight: 0
        }
    }

    private rootResizeObserver: ResizeObserver | null = null
    private rootRef = React.createRef<HTMLDivElement>();

    private calculateEventSize(event: T): {marginTop: number, height: number} {
        const pxPerMs = this.state.rootHeight / (TimeEnum.Hour*24)
        const height = event.dateRange.getSpan() * pxPerMs
        const marginTop = (event.dateRange.from.getHours() * TimeEnum.Hour + event.dateRange.from.getMinutes() * TimeEnum.Minute) * pxPerMs

        return {height, marginTop}
    }

    componentDidMount() {
        this.rootResizeObserver = new ResizeObserver(() => {
            this.setState({
                rootHeight: (this.rootRef.current?.getBoundingClientRect().height || 0) * 2
            })
          });
      
          if(this.rootRef.current != null) {
            this.rootResizeObserver.observe(this.rootRef.current);
          }
    }

    componentWillUnmount() {
        this.rootResizeObserver?.disconnect()
    }

    private readonly renderEventContainer = (event: T) => {
        const size = this.calculateEventSize(event)

        return (
            <div
                key={event.id}
                style={{height: size.height, top: size.marginTop}}
                className={styles["event-container"]}>
                {this.props.renderEvent(event)}
            </div>
        )
    }

    private readonly renderTimeScales = () => {            
        const pxPerMs = this.state.rootHeight / (TimeEnum.Hour*24)

        return new Array<number>(25)
            .fill(0)
            .map((_, index)=>(
                <div 
                    key={index.toString()}
                    className={styles["time-scale-container"]} 
                    style={{marginTop: index * TimeEnum.Hour * pxPerMs}}>
                    <div className={styles["time-scale-label"]}>
                        {normalizeLength((index).toString(), 2, '0', Side.Left)}:00
                    </div>

                    <div className={styles["time-scale-line"]}/>
                </div>
            ))
    }

    private readonly renderCurrentTimeIndicator = () => {
        const now = new Date()

        const pxPerMs = this.state.rootHeight / (TimeEnum.Hour*24)
        const marginTop = (now.getHours() * TimeEnum.Hour + now.getMinutes() * TimeEnum.Minute) * pxPerMs

        return (
            <div className={styles["current-time-indicator"]} style={{marginTop}}>
                <div className={styles["current-time-indicator-line"]}/>
            </div>
        )
    }

    private firstClickDate: Date | null = null
    private onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(this.firstClickDate == null) {
            this.firstClickDate = new Date();

            return;
        }

        const rootBoundingRect = this.rootRef.current?.getBoundingClientRect()
    
        if(rootBoundingRect != null && (new Date().getTime() - this.firstClickDate.getTime()) < TimeEnum.Second*0.5) {
            const clickedOffset = e.clientY - rootBoundingRect.top - 100 + this.rootRef.current!.offsetTop;
            const ms = clickedOffset / this.state.rootHeight * (TimeEnum.Hour*24)

            const newDate = new Date(this.props.date)
            newDate.setHours(0)
            newDate.setMinutes(0)
            newDate.setSeconds(0)
            newDate.setMilliseconds(0)
            newDate.setTime(newDate.getTime() + ms)

            this.props.onAddEventRequest(newDate)
        }

        this.firstClickDate = null

        e.preventDefault()
        e.stopPropagation()
    }

    render() {
        const {style, className, events, customEvents} = this.props

        return (
            <div 
                ref={this.rootRef} 
                style={style} 
                className={mergeClassesNames([styles["root"], className])}
                onMouseDown={this.onMouseDown}>
                {this.renderTimeScales()}

                {this.renderCurrentTimeIndicator()}

                {customEvents.map(this.renderEventContainer)}
                {events.map(this.renderEventContainer)}
            </div>
        )
    }
}