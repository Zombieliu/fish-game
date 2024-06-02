import { _decorator } from 'cc';
import { FishMapInfo } from "./FishMapInfo";

export class FishMap {
    public mapId:number;
    public fishMapInfoList:Array<FishMapInfo>;
    constructor(mapId:number, list:Array<FishMapInfo>){
        this.mapId = mapId;
        this.fishMapInfoList = list;
    }
}


