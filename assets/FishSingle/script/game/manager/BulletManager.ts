import { _decorator, Component, Prefab, NodePool, Event, Node, Vec3, Vec2, EventTouch, UITransform, instantiate, sys, error} from 'cc';
const { ccclass, property } = _decorator;

import { Logger } from "../../engine/utils/Logger";
import FishBulletBase from "../../../fish/script/FishBulletBase";
import MathUtils from "../../engine/utils/MathUtils";
import CannonManager from "./CannonManager";
import { MoveHelper } from "../../engine/utils/MoveHelper";
import FishNetManager from "./FishNetManager";
import GameMusicHelper from "../utils/GameMusicHelper";
import FishUI from "../../../fish/script/FishUI";
import CommonTips from "../../engine/uicomponent/CommonTips";

@ccclass('BulletManager')
export default class BulletManager extends Component {
    public static instance: BulletManager = null;
    @property({ type: [Prefab] })
    private bulletPrefabList: Prefab[] = [];
    private bulletPool: Array<NodePool> = [];
    private bulletList: Array<FishBulletBase> = [];
    private bulletMoveSpeed: number = 30;
    private _vec3Cache;
    private _vec2Cache;
    private _fireTime: number = 0;
    private _fireTimeNew: number;
    onLoad() {
        this._vec3Cache = new Vec3();
        this._vec2Cache = new Vec2();
        BulletManager.instance = this;
        this.node.on(Node.EventType.TOUCH_START, this.onShootBullet, this)
    }

    start() {

    }

    update() {
        this.checkMoveBullet();
    }

    private checkMoveBullet() {
        for (let i = this.bulletList.length - 1; i >= 0; i--) {
            let bullet: FishBulletBase = this.bulletList[i];
            let isMoving: boolean = MoveHelper.moveNode(bullet.node, this.bulletMoveSpeed, bullet.targetP.x, bullet.targetP.y)
            if (!isMoving) {
                bullet.node.getPosition(this._vec3Cache);
                this._vec2Cache.x = this._vec3Cache.x;
                this._vec2Cache.y = this._vec3Cache.y;
                FishNetManager.instance.addFishNet(bullet.bulletType, this._vec2Cache);
                this.bulletList.splice(i, 1)
                this.destroyBullet(bullet)
            }
        }
    }

    private onShootBullet(event: EventTouch) {

        //TOUCH_START 在Editor上，连续触发2次，导致发2次炮弹bug
        if(sys.platform == "EDITOR_PAGE"){
            this._fireTimeNew = new Date().getTime();
            if(this._fireTimeNew - this._fireTime < 100){
                return;
            }
            this._fireTime = this._fireTimeNew;
        }
        
        let tran = this.node.getComponent(UITransform);
        let location = event.getUILocation();
        this._vec3Cache.x = location.x;
        this._vec3Cache.y = location.y;
        this._vec3Cache.z = 0;
        tran.convertToNodeSpaceAR(this._vec3Cache, this._vec3Cache);
        let localP: Vec2 = new Vec2(this._vec3Cache.x, this._vec3Cache.y);
        FishUI.instance.playClickEffect(localP)
        if (FishUI.instance.score >= CannonManager.instance.cannonType) {
            FishUI.instance.score -= CannonManager.instance.cannonType;
            FishUI.instance.refreshScore();
            this._vec3Cache = CannonManager.instance.getCannonPosition();
            
            let rad: number = MathUtils.p2pRad(new Vec2(this._vec3Cache.x, this._vec3Cache.y), localP)
            let rot: number = MathUtils.radiansToDegrees(rad)
            let bullet: FishBulletBase = this.createBullet(CannonManager.instance.cannonType - 1)
            bullet.targetP = localP;
            this.node.addChild(bullet.node)
            bullet.node.setPosition(CannonManager.instance.getCannonPosition())
            this._vec3Cache.x = 1;
            this._vec3Cache.y = 1;
            this._vec3Cache.y = 1;
            Vec3.multiplyScalar(this._vec3Cache, this._vec3Cache, 2);
            bullet.node.setScale(this._vec3Cache)
            bullet.node.angle = rot;
            this.bulletList.push(bullet)
            GameMusicHelper.playFire();

            //旋转炮台
            CannonManager.instance.rotateCannon(location);
        } else {
            CommonTips.showMsg("金币不足!")
        }
    }

    private createBullet(bulletType: number) {
        let bulletNode: Node;
        if (this.bulletPool[bulletType] && this.bulletPool[bulletType].size() > 0) {
            bulletNode = this.bulletPool[bulletType].get();
        } else {
            bulletNode = instantiate(this.bulletPrefabList[bulletType])
        }
        bulletNode.getComponent(FishBulletBase).bulletType = bulletType;
        return bulletNode.getComponent(FishBulletBase)
    }

    public killBullet(bullet: FishBulletBase) {
        let index: number = this.bulletList.indexOf(bullet);
        if (index >= 0) {
            this.bulletList.splice(index, 1);
            this.destroyBullet(bullet)
        }
    }

    private destroyBullet(bullet: FishBulletBase) {
       //临时代码，因为回收在内存卡顿。后面在优化 2023-2-10
       if(sys.platform == "EDITOR_PAGE"){
            bullet.node.destroy();
            return;
       }
 
        if (!this.bulletPool[bullet.bulletType]) {
            this.bulletPool[bullet.bulletType] = new NodePool();
        }
        this.bulletPool[bullet.bulletType].put(bullet.node)
    }

    onDestroy() {
        BulletManager.instance = null;
    }
}

