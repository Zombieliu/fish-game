import { _decorator, Node, sys, debug, setDisplayStats, profiler, director, dynamicAtlasManager, error, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

import MusicConfig from "../../engine/config/MusicConfig";
import CommonTips from "../../engine/uicomponent/CommonTips";
import Progress from "../../engine/uicomponent/Progress";
import EventManager, { HaoEvent } from "../../engine/utils/EventManager";
import HotUpdate from "../../engine/utils/HotUpdate";
import { Logger } from "../../engine/utils/Logger";
import VersionManager from "../../engine/utils/VersionManager";
import ResourcePreload from "../utils/ResourcePreload";
import SceneBase from "./SceneBase";
import SceneManager from "./SceneManager";
import StartScene from "./StartScene";

@ccclass('LoadingScene')
export default class LoadingScene extends SceneBase {
    public static scriptName: string = "LoadingScene";
    @property({ type: Node })
    private progressNode: Node | null = null;
    onLoadMe() {
        this.baseInit();
        EventManager.instance.addListener(HotUpdate.Event_On_NeedUpdate, this.onNeedUpdate, this);
        EventManager.instance.addListener(HotUpdate.Event_On_Progress, this.onUpdateProgress, this);
        EventManager.instance.addListener(HotUpdate.Event_On_Fail_Update, this.onUpdateFail, this);
        EventManager.instance.addListener(HotUpdate.Event_Finish_Update, this.onUpdateFinish, this);
        EventManager.instance.addListener(HotUpdate.Event_On_ALREADY_UP_TO_DATE, this.onUpdateFinish, this);
        if (sys.isNative && VersionManager.instance.isOpenHotUpdate) {
            this.checkUpdate();
        }
        else {
            this.preLoadRes();
        }
    }

    private baseInit() {
        profiler.hideStats();//showStats
        //let collisionManager:cc.CollisionManager = director.getCollisionManager();
        PhysicsSystem2D.instance.enable = true;

        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;
    
        //if(collisionManager){
            //collisionManager.enabled = true;
            // collisionManager.enabledDebugDraw = true;
            // collisionManager.enabledDrawBoundingBox = true;
        //}

        if(dynamicAtlasManager){
            dynamicAtlasManager.enabled = false;
        }
        MusicConfig.init();
        // cc.director.getCollisionManager().enabled=true;//这是一个全局属性，开启后就代表碰撞检测组件可以进行检测了
        // cc.director.getCollisionManager().enabledDebugDraw = true; //绘制碰撞区域
    }

    private checkUpdate() {
        Logger.log(this, "checkUpdate====");
        VersionManager.instance.checkUpdate(0);
    }

    private onNeedUpdate(event: HaoEvent, key: string) {
        Logger.log(this, "onNeedUpdate=====", key, VersionManager.Config_Key);
        if (key == VersionManager.Config_Key[0]) {
            VersionManager.instance.startUpdate(0);
        }
    }

    private onUpdateProgress(event, loadedFiles, totalFiles, key) {
        if (key == VersionManager.Config_Key[0]) {
            let msg: string = Math.min(100, (loadedFiles / totalFiles * 100)).toFixed(2) + "%";
            this.progressNode.getComponent(Progress).updateProgress(loadedFiles, totalFiles, msg);
        }
    }

    private onUpdateFail(event, key: string) {
        if (key == VersionManager.Config_Key[0]) {
            Logger.warn(this, "热更新失败========");
            CommonTips.showMsg("热更新失败")
            ResourcePreload.instance.restartGame();
        }
    }

    private onUpdateFinish(event, key: string, needRestart: boolean) {
        Logger.log(this, "onUpdateFinish========");
        if (key == VersionManager.Config_Key[0] && !needRestart) {
            this.preLoadRes();
        }
    }

    private async preLoadRes() {
        ResourcePreload.instance.preLoad(() => {
            this.startGame();
        }, this.progressNode.getComponent(Progress));
    }

    private startGame() {
        Logger.info(this, "startGame")
        SceneManager.instance.sceneSwitch("FishGameScene", true);
    }

    onDestroyMe() {
        EventManager.instance.removeListener(HotUpdate.Event_On_NeedUpdate, this.onNeedUpdate);
        EventManager.instance.removeListener(HotUpdate.Event_On_Progress, this.onUpdateProgress);
        EventManager.instance.removeListener(HotUpdate.Event_On_Fail_Update, this.onUpdateFail);
        EventManager.instance.removeListener(HotUpdate.Event_Finish_Update, this.onUpdateFinish);
        EventManager.instance.removeListener(HotUpdate.Event_On_ALREADY_UP_TO_DATE, this.onUpdateFinish);
    }
}
