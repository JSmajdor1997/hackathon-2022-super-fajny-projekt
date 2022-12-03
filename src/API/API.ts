import { Position } from "../GeoLocation";
import DateRange from "../utils/DateRange";
import { normalizeLength, Side } from "../utils/formatHour";
import { TimeEnum } from "../utils/TimeEnum";
import MyEvent from "./MyEvent";
import MyMeeting from "./MyMeeting";
import MyToDo from "./MyToDo";

export interface ServerResponse {

}

export default class API {
    private readonly serverPath = "https://c20f-157-158-99-97.eu.ngrok.io/api/v1"

    private async genericPost<T, E>(paths: string[], body: E): Promise<T> {
        const pathsAsString = paths.reduce((acc, it) => acc + `/${it}`)

        const rsp = await fetch(`${this.serverPath}/${pathsAsString}`, {
            method: "post",
            body: JSON.stringify(body),
            headers: [
                ["ngrok-skip-browser-warning", "true"]
            ]
        })

        const json = await rsp.json()
        return json;
    }

    private async genericGet<T>(paths: string[]): Promise<T> {
        const pathsAsString = paths.reduce((acc, it) => acc + `/${it}`)
        
        const rsp = await fetch(`${this.serverPath}/${pathsAsString}`, {
            method: "get",
            headers: [
                ["ngrok-skip-browser-warning", "true"]
            ]
        })

        const json = await rsp.json()
        return json;
    }

    async getEvents(date: Date): Promise<MyEvent[]> {
        const dateAsString = `${date.getFullYear()}-${normalizeLength((date.getMonth()+1).toString(), 2, '0', Side.Left)}-${normalizeLength(date.getDate().toString(), 2, '0', Side.Left)}`

        const rawEvents = await this.genericGet<MyEvent[]>(["events", dateAsString])
        return rawEvents.map(it => {
            return {
                ...it,
                dateRange: new DateRange(new Date(it.dateRange.from), new Date(it.dateRange.to))
            }
        })
    }

    async getCustomEvents(): Promise<MyEvent[]> {
        const rawEvents = await this.genericGet<MyEvent[]>(["custom"])
        return rawEvents.map(it => {
            return {
                ...it,
                dateRange: new DateRange(new Date(it.dateRange.from), new Date(it.dateRange.to))
            }
        })
    }

    async auth(userName: string, password: string): Promise<ServerResponse> {
        return new Promise<ServerResponse>((resolve, reject) => {
            setTimeout(resolve, TimeEnum.Second * 2.5)
        })
    }

    async addEvent(partialEvent: MyEvent&{id: never}): Promise<ServerResponse> {
        throw "ToDo" //powinno zwracać nowo utworzony obiekt
    }

    async deleteEvent(partialEvent: MyEvent): Promise<ServerResponse> {
        throw "ToDo" //powinno zwracać nowo utworzony obiekt
    }

    async modifyEvent(currentEvent: MyEvent, newEvent: Partial<MyEvent>): Promise<ServerResponse> {
        throw "ToDo"
    }

    async getMeetings(): Promise<MyMeeting[]> {
        const rawMeetings = await this.genericGet<MyMeeting[]>(["meetings"])
        return rawMeetings.map(it => {
            return {
                ...it,
                createdAt: new Date(it.createdAt),
                suggested_meeting: it.suggested_meeting.map(it => new Date(it))
            }
        })
    }

    async getToDos(): Promise<MyToDo[]> {
        const rawMeetings = await this.genericGet<MyToDo[]>(["todos"])
        return rawMeetings.map(it => {
            return {
                ...it
            }
        })
    }

    async addToDo(toDo: MyToDo): Promise<ServerResponse> {
        return await this.genericPost<MyToDo[], MyToDo>(["todos", "add"], toDo)
    }
}