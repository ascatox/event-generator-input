import { ConveyorItemType } from "./ConveyorItemType";
import { ConveyorBay } from "./ConveyorBay";
export declare class ConveyorItem {
    private typeObject: string;
    private id: string;
    private type: ConveyorItemType;
    private state: ConveyorItem.State;
    private bay: ConveyorBay;
}
export declare module ConveyorItem {
    enum State {
        InConveyorBelt = 0,
        InBay = 1,
        Released = 2,
        Error = 3,
    }
}
