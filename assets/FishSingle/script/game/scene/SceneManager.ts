import { director, SceneAsset, sys, _decorator } from 'cc';
import { Logger } from "../../engine/utils/Logger";
import LoadingScenePrefab from "../../engine/uicomponent/LoadingScenePrefab";
import CommonTips from "../../engine/uicomponent/CommonTips";
import EventManager from "../../engine/utils/EventManager";
import CommonEvent from "../../engine/config/CommonEvent";

export default class SceneManager {
    public static instance: SceneManager = new SceneManager();

    private loadingSceneName: string;

    public currentSceneName: string;

    public initFullScreenPrefab(isShow: boolean = false) {
        if (sys.isBrowser && !sys.isMobile) {
            if (isShow) {
                // FullscreenPrefab.show();
            } else {
                // FullscreenPrefab.close();
            }
        }
    }

    public sceneSwitch(name: string, showProgress: boolean = false) {
        if (this.loadingSceneName == name) return;
        Logger.log(this, "sceneSwitch==", name);
        if (sys.isBrowser) {
            // showProgress = true;
        }
        this.initFullScreenPrefab(false);
        this.loadingSceneName = name;
        if (showProgress) {
            LoadingScenePrefab.show();
            director.preloadScene(name,
                (completedCount: number, totalCount: number, item: any) => {
                    LoadingScenePrefab.updateLoading(completedCount, totalCount);
                },
                (error: Error, asset: SceneAsset) => {
                    if (error) {
                        Logger.warn(this,"preloadScene=error", error.message);
                        CommonTips.showMsg("加载场景失败");
                    } else {
                        //director.getScene().destroy();//director.getScene().cleanup();
                        director.loadScene(name, this.loadSceneOK.bind(this));
                    }
                });
        } else {
            //director.getScene().destroy();//director.getScene().cleanup();
            director.loadScene(name, this.loadSceneOK.bind(this));
        }
    }

    private loadSceneOK() {
        LoadingScenePrefab.close();
        this.initFullScreenPrefab(true);
        this.currentSceneName = this.loadingSceneName;
        this.loadingSceneName = "";
        Logger.log(this, "scene load ok=", this.currentSceneName);
        EventManager.instance.dispatchEvent(CommonEvent.Event_Scene_Switch);
    }

    public preloadScene(sceneName: string, onProgressCallback: any = null, onLoadedCallback: any = null) {
        director.preloadScene(sceneName, onProgressCallback, onLoadedCallback);
    }

}

