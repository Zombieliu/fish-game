import { _decorator, Component, Label, Animation, Node, Vec2, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import FishSetting from "./FishSetting";
import FishManager from "../../script/game/manager/FishManager";
import CannonManager from "../../script/game/manager/CannonManager";

@ccclass('FishUI')
export default class FishUI extends Component {
    public static instance: FishUI = null;
    @property({type:Label})
    private txtScore:Label | null = null;
    @property({type:Animation})
    private clickEffect:Animation | null = null;
    @property({type:Node})
    private  waveEffect:Node | null = null;
    public score:number = 1000000
    private _vec3Cache: Vec3;
    onLoad() {
        FishUI.instance = this;
        this._vec3Cache = new Vec3();
        this.clickEffect.node.active = false;
        this.waveEffect.active = false;
    }

    start() {
        this.refreshScore();

        // setTimeout(()=>{
        //     this.playWaveEffect();
        // }, 5000)
    }
    
    public playClickEffect(p: Vec2){
        this._vec3Cache.x = p.x;
        this._vec3Cache.y = p.y;
        this._vec3Cache.z = 0;
        this.clickEffect.node.setPosition(this._vec3Cache);
        this.clickEffect.node.active = true;
        this.clickEffect.play();
    }

    public playWaveEffect(){
        this.waveEffect.active = true;
        this.waveEffect.setPosition(1292.703, 0)

        FishManager.instance.playFishMap();
        tween(this.waveEffect).to(2, {position: new Vec3(-1319.969, 0, 0) }).call(() => {
           this.waveEffect.active = false;
           FishManager.instance.startFishMap()
        }).start()

    }

    private onClickPre() {
        if (CannonManager.instance.cannonType > 1) {
            CannonManager.instance.cannonType--;
            CannonManager.instance.refreshCannon()
        }
    }

    private onClickNext() {
        if (CannonManager.instance.cannonType < 7) {
            CannonManager.instance.cannonType++;
            CannonManager.instance.refreshCannon()
        }
    }
    
    public refreshScore(){
        this.txtScore.string = this.score+""
    }

    private onClickSetting(){
        FishSetting.show();
    }

    onDestroy() {
        FishUI.instance = null;
        this.unscheduleAllCallbacks();
        Tween.stopAllByTarget(this.node);
        //this.node.stopAllActions();
    }
}

