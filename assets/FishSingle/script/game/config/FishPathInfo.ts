import { _decorator, Vec2 } from 'cc';
export class FishPathInfo {
    public pathId: number;
    public path: Array<Vec2> = []
    constructor(pathId: number, path: Array<Vec2>) {
        this.pathId = pathId;
        this.path = path;
    }
}


