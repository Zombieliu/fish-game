import { _decorator } from 'cc';
export class FishMapInfo {
    public fishType:number;
    public scale:number;
    public side:number; //1: -1:
    public x:number;
    public y:number;
    constructor(fishType:number,scale:number, side:number, x:number, y:number){
        this.fishType = fishType;
        this.scale = scale;
        this.side = side;
        this.x = x;
        this.y = y;
    }
}

