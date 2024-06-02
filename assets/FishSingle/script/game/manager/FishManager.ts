import { _decorator, Component, Node, Prefab, NodePool, game, Vec3, sys, instantiate, Animation, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import RandomUtil from "../../engine/utils/RandomUtil";
import FishBase from "../../../fish/script/FishBase";
import { FishPathInfo } from "../config/FishPathInfo";
import { FishPathConfig } from "../config/FishPathConfig";
import FishMover from "../../../fish/script/FishMover";
import { Logger } from "../../engine/utils/Logger";
import { FishInfo } from "../config/FishInfo";
import { FishConfig } from "../config/FishConfig";
import GameMusicHelper from "../utils/GameMusicHelper";
import ScoreManager from "./ScoreManager";
import { FishMap } from "../config/FishMap";
import { FishMapInfo } from "../config/FishMapInfo";
import FishUI from "../../../fish/script/FishUI";
import TimeHelper from '../utils/TimeHelper';

@ccclass('FishManager')
export default class FishManager extends Component {
    public static instance: FishManager = null;
    @property({ type: Node })
    private fishContainer: Node | null = null;
    @property({ type: [Prefab] })
    public fishPrefabList: Array<Prefab> = [];
    private fishPool: Array<NodePool> = [];
    private fishList: Array<FishBase> = [];
    private nextRandomFishTime: number = 0;
    private minRandomTime: number = 2 * game.getFrameRate()
    private maxRandomTime: number = 5 * game.getFrameRate()
    private isFishMap: boolean = false;
    private mapCount: number = 0;
    private minMapCount: number = 30 * game.getFrameRate();
    private maxMapCount: number = 60 * game.getFrameRate();
//    // private minMapCount: number = 2 * cc.game.getFrameRate();
//    // private maxMapCount: number = 5 * cc.game.getFrameRate();

    private _fishPosCache;
    onLoad() {
        FishManager.instance = this;
        this._fishPosCache = new Vec3();
        Logger.log("maxRandomTime=", this.minRandomTime, this.maxRandomTime, game.getFrameRate())
    }

    start() {
        this.randomFish();
    }

    update() {
        this.checkRandomFish();
        this.checkFishMoveEnd();
        this.checkFishMap();
    }

    private checkFishMap() {
        if (!this.isFishMap) {
            if (this.mapCount > 0) {
                this.mapCount--;
                if (this.mapCount <= 0) {
                    FishUI.instance.playWaveEffect();
                }
            }
        }
    }

    private checkRandomFish() {
        if (!this.isFishMap) {
            if (this.nextRandomFishTime > 0) {
                this.nextRandomFishTime--;
                if (this.nextRandomFishTime == 0) {
                    this.randomFish();
                }
            }
        }
    }

    private checkFishMoveEnd() {
        for (let i = this.fishList.length - 1; i >= 0; i--) {
            let fish: FishBase = this.fishList[i]
            if (this.isFishMap) {
                if (!fish.isDead) {
                    fish.node.getPosition(this._fishPosCache);
                    this._fishPosCache.x -= 2;
                    fish.node.setPosition(this._fishPosCache);
                    if (this._fishPosCache.x <= - screen.width / 2) {//winSize.width
                        this.destroyFish(fish)
                        this.fishList.splice(i, 1);
                        this.checkEndFishMap();
                    }
                }
            }
            else if (!fish.getComponent(FishMover).isMoving) {
                this.destroyFish(fish)
                this.fishList.splice(i, 1);
            }
        }
    }

    private checkEndFishMap() {
        Logger.log("checkEndFishMap==", this.isFishMap, this.fishList)
        if (this.isFishMap && this.fishList.length <= 0) {
            this.isFishMap = false;
            this.randomFish();
        }
    }

    private randomFish() {
        if (this.isFishMap) return;
        let randomNum: number = RandomUtil.nextInt(1, 10);
        // let randomNum: number = RandomUtil.nextInt(1, 1);
        for (let i = 0; i < randomNum; i++) {
            let fishType: number = RandomUtil.nextInt(1, 29);
            // let fishType: number = RandomUtil.nextInt(1, 1);
            let fish: FishBase = this.createFishByType(fishType)
            fish.fishPathInfo = FishPathConfig.randomPathInfo();
            this._fishPosCache.z = 0;
            this._fishPosCache.x = fish.fishPathInfo.path[0].x;
            this._fishPosCache.y = fish.fishPathInfo.path[0].y;
            fish.node.setPosition(this._fishPosCache)
            fish.getComponent(FishMover).bezierPList = fish.fishPathInfo.path;
            fish.getComponent(FishMover).startMove();
            this.fishList.push(fish);
            this.fishContainer.addChild(fish.node)
        }
        Logger.log("checkFishMoveEnd=randomFish=", this.fishList)
        this.nextRandomFishTime = RandomUtil.nextInt(this.minRandomTime, this.maxRandomTime)
        if (this.mapCount <= 0) {
            this.mapCount = RandomUtil.nextInt(this.minMapCount, this.maxMapCount)
        }
    }


    public createFishByType(fishType: number): FishBase {
        let fishNode: Node;
        if (this.fishPool[fishType - 1] && this.fishPool[fishType - 1].size() > 0) {
            fishNode = this.fishPool[fishType - 1].get();
        } else {
            fishNode = instantiate(this.fishPrefabList[fishType - 1])
        }
        //fishNode.getComponent(Animation).play() //v3 当前帧 不能播放
        TimeHelper.exeNextFrame(fishNode, ()=>fishNode.getComponent(Animation).play());
        let fishInfo: FishInfo = FishConfig.getFishInfoByType(fishType);
        fishNode.getComponent(FishBase).fishInfo = fishInfo;
        fishNode.getComponent(FishBase).fishType = fishType;
        fishNode.getComponent(FishBase).blood = fishInfo.blood;
        fishNode.getComponent(FishBase).isDead = false;
        return fishNode.getComponent(FishBase)
    }

    public killFish(fish: FishBase) {
        let index: number = this.fishList.indexOf(fish);
        if (index >= 0) {
            GameMusicHelper.playFishDead(fish.fishType)
            fish.node.getPosition(this._fishPosCache);
            let vec2 = new Vec2(this._fishPosCache.x, this._fishPosCache.y);
            ScoreManager.instance.addScore(fish.fishInfo.blood, vec2)
            this.fishList.splice(index, 1);
            this.destroyFish(fish);
            this.checkEndFishMap();
        }
    }

    private destroyFish(fish: FishBase) {
        if (!this.fishPool[fish.fishType - 1]) {
            this.fishPool[fish.fishType - 1] = new NodePool();
        }
        this.fishPool[fish.fishType - 1].put(fish.node);
    }


    public playFishMap() {
        this.isFishMap = true;
        for (let i = this.fishList.length - 1; i >= 0; i--) {
            let fish: FishBase = this.fishList[i]
            this.destroyFish(fish)
            this.fishList.splice(i, 1);
        }
    }

    public startFishMap() {
        // this.playFishMap();
        // this.fishList = [];

        let map: FishMap = FishPathConfig.randomFishMap();
        let fishMapInfoList: Array<FishMapInfo> = map.fishMapInfoList;
        Logger.log("startFishMap==", this.isFishMap, this.fishList, map)
        for (let i = 0; i < fishMapInfoList.length; i++) {
            let fishMapInfo: FishMapInfo = fishMapInfoList[i];
            let fish: FishBase = this.createFishByType(fishMapInfo.fishType)
            fish.node.angle = 0;
            // fish.node.setScale(fishMapInfo.scale);
            this.fishContainer.addChild(fish.node);
            fish.node.setPosition(fishMapInfo.x + screen.width, fishMapInfo.y);
            this.fishList.push(fish);
        }
    }

    onDestroy() {
        FishManager.instance = null;
    }
}

