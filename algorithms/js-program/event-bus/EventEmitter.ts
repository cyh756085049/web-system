
type EventType = string | number;

// 使用 Record 类型来声明属性名还未确定的接口类型
export type BaseEvents = Record<EventType, any[]>


export class EventEmitter<Events extends BaseEvents> {


}
