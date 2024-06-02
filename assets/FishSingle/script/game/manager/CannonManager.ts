import { _decorator, Component, Node, SpriteFrame, Event, EventMouse, Sprite, Vec2, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import MathUtils from "../../engine/utils/MathUtils";

@ccclass('CannonManager')
export default class CannonManager extends Component {
    public static instance: CannonManager = null;
    @property({ type: Node })
    private view: Node | null = null;
    @property({ type: [SpriteFrame] })
    private cannonSpriteFrame: Array<SpriteFrame> = []
    public cannonType: number = 1;
    private _vec3Cache;
    
    onLoad() {
        this._vec3Cache = new Vec3();
        CannonManager.instance = this;
        this.node.parent.on(Node.EventType.MOUSE_MOVE, this.onMeMove.bind(this))
        this.refreshCannon();
    }
    private onMeMove(event: EventMouse) {
        this.rotateCannon(event.getUILocation());
    }

    public rotateCannon(uilocation: Vec2) {
        let location = uilocation;
        this._vec3Cache.x = location.x;
        this._vec3Cache.y = location.y;
        this._vec3Cache.z = 0;
        let tran = this.node.getComponent(UITransform);
        tran.convertToNodeSpaceAR(this._vec3Cache, this._vec3Cache);
        
        let localTouch: Vec2 = new Vec2(this._vec3Cache.x, this._vec3Cache.y);
        this.view.getPosition(this._vec3Cache);
        let rad: number = MathUtils.p2pRad(new Vec2(this._vec3Cache.x, this._vec3Cache.y), localTouch)
        let rot: number = MathUtils.radiansToDegrees(rad)
        this.view.angle = rot - 90;
    }

    public refreshCannon() {
         this.view.getComponent(Sprite).spriteFrame = this.cannonSpriteFrame[this.cannonType - 1];
    }
    public getCannonPosition() {
         return this.view.getPosition();
    }
    onDestroy() {
         CannonManager.instance = null;
    }
}

