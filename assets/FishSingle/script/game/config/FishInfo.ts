import { _decorator } from 'cc';
export class FishInfo {
    public fishType:number;
    public name:string;
    public blood:number;
    public wikiScale:number;

    
    constructor(fishType:number, name:string, blood:number, wikiScale:number){
        this.fishType = fishType;
        this.name = name;
        this.blood = blood;
        this.wikiScale = wikiScale;
    }
}

