import { _decorator, Component, Label, Vec2, tween, Vec3, Tween } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('ScorePrefab')
export default class ScorePrefab extends Component {
    @property({type:Label})
    private txtScore:Label | null = null;
    public init(score:number){
        if(score <= 0){
            this.txtScore.string = "Miss"
        }else{
            this.txtScore.string = score+""
        }
    }

    public playMoveEffect(p:Vec2, callback:Function=null){
        tween(this.node).to(0.5, {scale:new Vec3(3, 3, 3), position: new Vec3(p.x, p.y, 0) }).call(() => {
            if(callback){
                callback();
            }
        }).start()
    }

    onDisable(){
        Tween.stopAllByTarget(this.node);
    }
}

