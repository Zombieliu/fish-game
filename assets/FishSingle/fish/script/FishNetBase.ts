import { _decorator, Component, Tween, tween, Vec3, Vec2 } from 'cc';
const {ccclass, property} = _decorator;

import FishNetManager from "../../script/game/manager/FishNetManager";

@ccclass('FishNetBase')
export default class FishNetBase extends Component {
    public netType:number = 0;
    
    private tween: Tween<any>;
    private static vec3: Vec3 = new Vec3(2, 2, 1);
    public playMv(){
        this.node.setScale(Vec3.ZERO)
        this.tween = tween(this.node).to(0.2, { scale: FishNetBase.vec3 }).delay(0.3).call(() => {
        FishNetManager.instance.destroyFishNet(this);
        }).start()
    }
    onDestroy(){
        if(this.tween){
            this.tween.stop();
        }
    }
  
}

