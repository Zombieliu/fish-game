import { _decorator, Sprite, Prefab, Node, instantiate, Vec3, Tween } from 'cc';
const { ccclass, property } = _decorator;

import SceneBase from "./SceneBase";
import TextureMgr from "../../engine/uicomponent/TextureMgr";
import RandomUtil from "../../engine/utils/RandomUtil";
import FishMover from "../../../fish/script/FishMover";
import { FishPathInfo } from "../config/FishPathInfo";
import { FishPathConfig } from "../config/FishPathConfig";
import { Logger } from "../../engine/utils/Logger";
import FishWiki from "../../../fish/script/FishWiki";
import GameMusicHelper from "../utils/GameMusicHelper";

@ccclass('FishGameScene')
export default class FishGameScene extends SceneBase {
    @property(Sprite)
    private bg: Sprite | null = null;
    @property({ type: [Prefab] })
    private fishPrefabList: Array<Prefab> = [];
    private showNode: Node | null = null;
    onLoadMe() {
        GameMusicHelper.playBg();
        FishPathConfig.init();
        this.initBg();
        // this.testPathPlay()
    }

    private initBg() {
        let textureMgr: TextureMgr = this.bg.getComponent(TextureMgr);
        this.bg.spriteFrame = textureMgr.Spriteset[RandomUtil.nextInt(0, textureMgr.Spriteset.length - 1)]
    }

    private initShowNode() {
        if (this.showNode) {
            this.showNode.destroy();
            this.showNode = null;
        }
        let fishType: number = 29
        if (fishType < 1 || fishType > 29) {
            return;
        }
        this.showNode = instantiate(this.fishPrefabList[fishType - 1])
        this.showNode.getComponent(FishMover).speed = 2
        this.showNode.getComponent(FishMover).node.setScale(new Vec3(2, 2, 1));
        this.node.addChild(this.showNode)
    }

    private testPathPlay() {
        this.initShowNode()
        let pathInfo: FishPathInfo = FishPathConfig.getPathInfo(3);
        Logger.log("testPathPlay=pathInfo=", pathInfo)
        let params = pathInfo.path;
        let param0 = params[0];
        Logger.log( "testPathPlay=11=", param0)
        this.showNode.setPosition(new Vec3(param0.x, param0.y, 0));
        this.showNode.getComponent(FishMover).bezierPList = params;
        this.showNode.getComponent(FishMover).startMove();
    }

    private onClickWiki(){
        FishWiki.show()
    }

    onDestroyMe() {
        this.unscheduleAllCallbacks();
        //this.node.stopAllActions();
        Tween.stopAllByTarget(this.node);
    }
}
