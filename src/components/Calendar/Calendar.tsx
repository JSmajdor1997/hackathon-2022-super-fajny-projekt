import React from "react"
import { Component, ReactElement } from "react"
import mergeClassesNames from "../../utils/mergeClassNames"
import DateRange from "../../utils/Range"
import { TimeEnum } from "../../utils/TimeEnum"
import styles from "./styles.module.css"

export interface Event {
    dateRange: DateRange
}

export interface Props<T extends Event> {
    className?: string
    style?: React.CSSProperties
    date: Date

    events: T[]
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
    private containerRef = React.createRef<HTMLDivElement>();

    private calculateEventSize(event: T): {marginTop: number, height: number} {
        const pxPerMs = this.state.rootHeight / (TimeEnum.Hour*24)
        const height = event.dateRange.getSpan() * pxPerMs
        const marginTop = (event.dateRange.from.getHours() * TimeEnum.Hour + event.dateRange.from.getMinutes() * TimeEnum.Minute) * pxPerMs

        return {height, marginTop}
    }

    componentDidMount() {
        this.rootResizeObserver = new ResizeObserver(() => {
            this.setState({
                rootHeight: (this.containerRef.current?.getBoundingClientRect().height || 0) * 2
            })
          });
      
          if(this.containerRef.current != null) {
            this.rootResizeObserver.observe(this.containerRef.current);
          }
    }

    componentWillUnmount() {
        this.rootResizeObserver?.disconnect()
    }

    private readonly renderEventContainer = (event: T) => {
        const size = this.calculateEventSize(event)

        return (
            <div
                style={{height: size.height, top: size.marginTop, backgroundColor: "pink"}}
                className={styles["event-container"]}>
                {this.props.renderEvent(event)}
            </div>
        )
    }

    private readonly renderTimeScales = () => {
        function normalize(str: string): string {
            return str.length == 1 ?
                `0${str}` :
                str
        }
            
        const pxPerMs = this.state.rootHeight / (TimeEnum.Hour*24)

        return new Array<number>(24)
            .fill(0)
            .map((_, index)=>(
                <div className={styles["time-scale-container"]} style={{marginTop: index * TimeEnum.Hour * pxPerMs}}>
                    <div className={styles["time-scale-label"]}>
                        {normalize((index+1).toString())}:00
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
            <div className={styles["current-time-indicator"]} style={{height: 10, width: "100%", marginTop, backgroundColor: "blue" }}>A</div>
        )
    }

    render() {
        const {style, className, events} = this.props

        return (
            <div 
                ref={this.containerRef} 
                style={style} 
                className={mergeClassesNames([styles["root"], className])}>
                {this.renderTimeScales()}

                {this.renderCurrentTimeIndicator()}

                {events.map(this.renderEventContainer)}
            </div>
        )
    }
}