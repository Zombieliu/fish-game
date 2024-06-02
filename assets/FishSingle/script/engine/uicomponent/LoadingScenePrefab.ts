import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const {ccclass, property} = _decorator;

import PrefabLoader from "../utils/PrefabLoader";
import Progress from "./Progress";
import { GameConfig } from "../../game/config/GameConfig";
import DialogBase from './DialogBase';

@ccclass('LoadingScenePrefab')
export default class LoadingScenePrefab extends Component {
    public static instance:Node;
    private static prefab:Prefab;
    public static LoadingZorderIndex:number = 99;
    @property({ type: Node })
    private progressNode: Node | null = null;
    onLoad () {

    }

    start () {

    }

    public updateProgress(completedCount: number, totalCount: number, item: any=null){
        this.progressNode.getComponent(Progress).updateProgress(completedCount, totalCount, "消耗流量,预下载所有\"鱼\"类中,请耐心等待...");
    }

    public static updateLoading(completedCount: number, totalCount: number, item: any=null){
        if(LoadingScenePrefab.instance){
            let nodeTs:LoadingScenePrefab = LoadingScenePrefab.instance.getComponent(LoadingScenePrefab);
            if(nodeTs){
                nodeTs.updateProgress(completedCount, totalCount, item);
            }
        }
    }

    private static createPrefab(parentNode:Node = null){
        let dialogNode: Node = instantiate(LoadingScenePrefab.prefab);
        LoadingScenePrefab.instance = dialogNode;
        if(!parentNode){
            parentNode = DialogBase.GetRootCanvas();
        }
        parentNode.insertChild(dialogNode, LoadingScenePrefab.LoadingZorderIndex);
        dialogNode.setPosition(0, 0);
    }

    public static preLoad():Promise<void>{
        return new Promise((resolve, reject) => {
            PrefabLoader.loadPrefab(GameConfig.GameName+"/"+"share/uicomponent/LoadingScenePrefab", (loadedResource: Prefab)=>{
                LoadingScenePrefab.prefab = loadedResource;
                resolve();
            });
        })
    }

    public static close(){
        if(!LoadingScenePrefab.instance){
            return;
        }
        LoadingScenePrefab.instance.destroy();
        LoadingScenePrefab.instance = null;
    }

    public static async show(parentNode: Node=null){
        if(LoadingScenePrefab.instance)return;
        if(!LoadingScenePrefab.prefab){
            await LoadingScenePrefab.preLoad();
        }
        this.createPrefab(parentNode);
    }

    public static clear(){
        LoadingScenePrefab.instance = null;
        LoadingScenePrefab.prefab = null;
    }
}

