import { ConveyorItemType } from './ConveyorItemType';
import { ConveyorBay } from './ConveyorBay';

export class ConveyorItem {
    public typeObject   : string;
    public id           : string;
    public type         : ConveyorItemType;
    public conveyorBay  : ConveyorBay;
    public state        : ConveyorItem.State;

}

export module ConveyorItem {
    export enum State {
        'InConveyorBelt',
        'InBay',
        'Released',
        'Error'
    }
}