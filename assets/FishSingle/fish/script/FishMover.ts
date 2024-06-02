import { _decorator, Component, CCInteger, CCFloat, Vec2, Animation, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import FishBase from "./FishBase";
import MathUtils from "../../script/engine/utils/MathUtils";
import { Logger } from "../../script/engine/utils/Logger";
import TimeHelper from '../../script/game/utils/TimeHelper';

@ccclass('FishMover')
export default class FishMover extends Component {
//    //鱼类型
    @property({ type: CCInteger })
    public fishType: number = 1;
//    //鱼移动速度
    @property({ type: CCFloat })
    public speed: number = 3;
//    //下个位置移动点
    private targetMoveIndex: number = 0;
//    //鱼移动位置
    public movePList: Array<Vec2> = []
//    //贝萨尔曲线
    public bezierPList: Array<Vec2> = [];
    public isMoving: boolean = false;
    private minSpeed: number = 0.1;
    private moveCount: number = 1;
    private totalTimes: number = 60 * 2;
    private _vec3Cahce: Vec3 = new Vec3();
    public startMove() {
        this.targetMoveIndex = 0;
        this.isMoving = true;
        //this.node.getComponent(Animation).play()//v3 当前帧 不能播放
        TimeHelper.exeNextFrame(this.node, ()=>this.node.getComponent(Animation).play());
    }

    update(dt) {
        // this.moveFish();
        this.checkMoveBezier();
    }

    private checkMoveBezier() {
        if (this.isMoving && !this.getComponent(FishBase).isDead) {
            this.moveCount++;
            if (this.moveCount >= this.totalTimes) {
                this.moveCount = this.totalTimes;
            }
            this.moveBezier()
        }
    }

    public moveBezier() {
        // [warn]  [[-632,-230],[-444,-117],[-264,-242]]
        // let p0: cc.Vec2 = cc.v2(-632, -230)
        // let p1: cc.Vec2 = cc.v2(-444, -117)
        // let p2: cc.Vec2 = cc.v2(-264, -242)
        if (this.bezierPList.length > this.targetMoveIndex + 2) {
            let p0: Vec2 = this.bezierPList[this.targetMoveIndex];
            let p1: Vec2 = this.bezierPList[this.targetMoveIndex + 1];
            let p2: Vec2 = this.bezierPList[this.targetMoveIndex + 2]
            let t: number = this.moveCount / this.totalTimes;
            let mx: number = Math.pow(1 - t, 2) * p0.x + 2 * t * (1 - t) * p1.x + Math.pow(t, 2) * p2.x;
            let my: number = Math.pow(1 - t, 2) * p0.y + 2 * t * (1 - t) * p1.y + Math.pow(t, 2) * p2.y;
            this.node.getPosition(this._vec3Cahce);
            let rad: number = MathUtils.p2pRad(new Vec2(this._vec3Cahce.x, this._vec3Cahce.y), new Vec2(mx, my));
            let rot111: number = MathUtils.radiansToDegrees(rad);
            let rot: number = MathUtils.rotation2Fish(rot111);
            if (this.fishType == 7 || this.fishType == 27 || this.fishType == 29) {
                if (rot > 90 || rot < -90) {
                    this.node.getScale(this._vec3Cahce);
                    if (this._vec3Cahce.x > 0) {
                        this._vec3Cahce.x = -1 * this._vec3Cahce.x;
                        this.node.setScale(this._vec3Cahce);
                    }
                } else {
                    this.node.getScale(this._vec3Cahce);
                    if (this._vec3Cahce.x < 0) {
                        this._vec3Cahce.x = -1 * this._vec3Cahce.x;
                        this.node.setScale(this._vec3Cahce);
                    }
                }
            }
            else if (this.fishType == 9 || this.fishType == 10 || this.fishType == 21 || this.fishType == 28) {

            } else {
                // this.node.rotation = rot; //过时
                this.node.angle = -rot;
            }
            // Logger.log("moveBezier====", rad, rot111, this.fishType, rot)
            let moveTimes: number = Math.round(this.speed / this.minSpeed);
            for (let i = 0; i < moveTimes; i++) {
                let speedX: number = this.minSpeed * Math.cos(rad)
                let speedY: number = this.minSpeed * Math.sin(rad);
                this.node.getPosition(this._vec3Cahce);
                this._vec3Cahce.x += speedX;
                this._vec3Cahce.y += speedY;
                this.node.setPosition(this._vec3Cahce);
                if (MathUtils.distance(this._vec3Cahce.x, this._vec3Cahce.y, mx, my) <= this.minSpeed) {
                    this.node.setPosition(mx, my);
                    break;
                }
                if (MathUtils.distance(this._vec3Cahce.x, this._vec3Cahce.y, p2.x, p2.y) <= (this.minSpeed * 2)) {
                    this.node.setPosition(p2.x, p2.y);
                    this.targetMoveIndex += 2;
                    this.moveCount = 0;
                    break;
                }
            }
        } else {
            this.isMoving = false
        }
    }

    onDisable(){
        this.isMoving = false;
    }

    public exportBezierConfig() {
        Logger.warn("exportBezierConfig=")
        let tempConfig: Array<Array<number>> = [];
        for (let i = 0; i < this.bezierPList.length; i++) {
            tempConfig[i] = [];
            tempConfig[i].push(Math.floor(this.bezierPList[i].x))
            tempConfig[i].push(Math.floor(this.bezierPList[i].y))
        }
        Logger.warn("fishtype", this.fishType);
        Logger.warn("speed", this.speed);
        Logger.warn("scale", this.node.scale);
        Logger.warn(JSON.stringify(tempConfig));
    }
}

