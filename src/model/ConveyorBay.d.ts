import { ConveyorItemType } from './ConveyorItemType';
export declare class ConveyorBay {
    private typeObject: string;
    private id: string;
    private capacity: number;
    private load: number;
    private preference: Array<ConveyorItemType>;
    private enable: boolean;
    private position: number;
    private datetime: Date;
    constructor(id: string, capacity: number, load: number, enable: boolean, position: number);
    addPreference(conveyorItemType: ConveyorItemType): void;
}
