export enum TimeEnum {
    Milisecond = 1,
    Second = 1000,
    Minute = TimeEnum.Second * 60,
    Hour = TimeEnum.Minute * 60
}