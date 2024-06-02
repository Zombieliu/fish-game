import { error, game, _decorator } from 'cc';
import DarkLayer from "../../engine/uicomponent/DarkLayer";
import LoadingPrefab from "../../engine/uicomponent/LoadingPrefab";
import LoadingScenePrefab from "../../engine/uicomponent/LoadingScenePrefab";
import MusicPrefab from "../../engine/uicomponent/MusicPrefab";
import Progress from "../../engine/uicomponent/Progress";
import SoundPrefab from "../../engine/uicomponent/SoundPrefab";
import { Logger } from "../../engine/utils/Logger";
import ResourcePrefab from "../prefab/ResourcePrefab";
import ShaderMaterialPrefab from "../prefab/ShaderMaterialPrefab";

export default class ResourcePreload {
    public static instance: ResourcePreload = new ResourcePreload();
    private isPreloaded: boolean = false;
    private totalNum: number = 6;
    private nowIndex: number = 0;
    private progress: Progress;
    public async preLoad(callback: Function, progress: Progress) {
        if (this.isPreloaded) {
            callback();
            return;
        }
        this.isPreloaded = true;
        this.progress = progress;
        if(this.progress){
            progress.updateProgress(this.nowIndex, this.totalNum);
        }
        await LoadingPrefab.preLoad(); //1
        this.finishOneItemLoad();
        await DarkLayer.preLoad();  //2
        this.finishOneItemLoad();
        await MusicPrefab.preLoad();//3
        this.finishOneItemLoad();
        await SoundPrefab.preLoad();//4
        this.finishOneItemLoad();
        await ResourcePrefab.preLoad();//5
        this.finishOneItemLoad(); 
        await ShaderMaterialPrefab.preLoad();//6
        this.finishOneItemLoad(); //
        callback();
    }

    private finishOneItemLoad() {
        this.nowIndex++;
        if(this.progress){
            this.progress.updateProgress(this.nowIndex, this.totalNum);
        }
    }

    public restartGame(){
        this.isPreloaded = false;
        // GameSocket.getInstance().closeSocket(false);
        LoadingScenePrefab.clear();
        LoadingPrefab.clear();
        error("需要获取游戏里所有的AudioSource停止音乐");
        //audioEngine.stopAll();
        
        // VersionManager.instance.releaseAll();
        MusicPrefab.destory();
        SoundPrefab.destory();
        ResourcePrefab.clear();
        game.restart();
    }
}

