import { ConveyorItemType } from "./ConveyorItemType";
import { ConveyorBay } from "./ConveyorBay";
export declare interface ConveyorItem {
    typeObject: string;
    id: string;
    type: ConveyorItemType;
    state: ConveyorItem.State;
     bay: ConveyorBay;
}
export declare module ConveyorItem {
    enum State {
        InConveyorBelt = 0,
        InBay = 1,
        Released = 2,
        Error = 3,
    }
}
