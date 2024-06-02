import { _decorator, Component, Vec2, Node, Vec3, error, Collider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, BoxCollider2D, Collider, BoxCollider, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

import FishBase from "./FishBase";
import FishNetManager from "../../script/game/manager/FishNetManager";
import BulletManager from "../../script/game/manager/BulletManager";

@ccclass('FishBulletBase')
export default class FishBulletBase extends Component {
    public bulletType: number = 0;
    public targetP: Vec2;
    public _cacheVec2: Vec2 = new Vec2();
    public _cacheVec3: Vec3 = new Vec3();
    private _collider: Collider2D;
    onLoad() {
        this._collider = this.getComponent(Collider2D);
        this._collider.sensor = true;
        //this._collider.on(Contact2DType.PRE_SOLVE, this.onBeginContact, this);
       // PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    start() {

    }
   
    onEnable(){
        this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //this._collider.on(Contact2DType.END_CONTACT, this.onBeginContact, this);
    }
    
     onDisable(){
        this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //this._collider.off(Contact2DType.END_CONTACT, this.onBeginContact, this);
    }

    onBeginContact (selfCollider: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        if (other) {
            let fish: FishBase = other.getComponent(FishBase);
            if (fish && !fish.isDead) {
                this.node.getPosition(this._cacheVec3);
                this._cacheVec2.x = this._cacheVec3.x;
                this._cacheVec2.y = this._cacheVec3.y;
                FishNetManager.instance.addFishNet(this.bulletType, this._cacheVec2)
                BulletManager.instance.killBullet(this);
                fish.blood -= (this.bulletType + 1);
                // fish.blood -= 100
                if (fish.blood <= 0) {
                    fish.playDeadMv();
                }
            }
        }
    }

    //v2.4代码
    onCollisionEnter(other:Node, self:Node) {
        error("onCollisionEnter=FishBulletBase=", other, self)
        if (other) {
            let fish: FishBase = other.getComponent(FishBase);
            if (fish && !fish.isDead) {
                this.node.getPosition(this._cacheVec3);
                this._cacheVec2.x = this._cacheVec3.x;
                this._cacheVec2.y = this._cacheVec3.y;
                FishNetManager.instance.addFishNet(this.bulletType, this._cacheVec2)
                BulletManager.instance.killBullet(this);
                fish.blood -= (this.bulletType + 1);
                // fish.blood -= 100
                if (fish.blood <= 0) {
                    fish.playDeadMv();
                }
            }
        }
    }
}

