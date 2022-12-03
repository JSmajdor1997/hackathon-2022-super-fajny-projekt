import DateRange from "../utils/DateRange";
import { TimeEnum } from "../utils/TimeEnum";
import MyEvent from "./MyEvent";

export interface ServerResponse {

}

export default class API {
    private readonly serverPath = "https://c20f-157-158-99-97.eu.ngrok.io/api/v1"

    private async genericPost<T>(paths: string[]): Promise<T> {
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
        const yearAsString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

        const rawEvents = await this.genericPost<MyEvent[]>(["events", yearAsString])
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
}