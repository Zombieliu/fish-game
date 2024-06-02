import { _decorator, Component, Node, Prefab, instantiate, math, Quat, Vec3 } from 'cc';
const {ccclass, property} = _decorator;

import PrefabLoader from "../utils/PrefabLoader";
import { GameConfig } from "../../game/config/GameConfig";
import DialogBase from './DialogBase';

@ccclass('LoadingPrefab')
export default class LoadingPrefab extends Component {
    public static instance:Node;
    private static prefab:Prefab;
    public static LoadingZorderIndex:number = 99;
    @property({type:Node})
    loadingSp:Node | null = null;

    private _quatCache: Quat;
    private _vec3Cache: Vec3;
    onLoad (){
       this._quatCache = new Quat();
       this._vec3Cache = new Vec3();
    } 

    start () {
    }

    public static close(){
        if(!LoadingPrefab.instance){
            return;
        }
        LoadingPrefab.instance.removeFromParent();
        LoadingPrefab.instance.destroy();
        LoadingPrefab.instance = null;
    }

    public static preLoad():Promise<void>{
        return new Promise((resolve, reject) => {
            PrefabLoader.loadPrefab(GameConfig.GameName+"/"+"share/uicomponent/LoadingPrefab", (loadedResource)=>{
                LoadingPrefab.prefab = loadedResource;
                resolve();
            });
        })
    }

    private static createLoadingPrefab(parentNode:Node = null){
        let dialogNode:Node = instantiate(LoadingPrefab.prefab);
        LoadingPrefab.instance = dialogNode;
        if(!parentNode){
            parentNode = DialogBase.GetRootCanvas();
        }
        parentNode.insertChild(dialogNode, LoadingPrefab.LoadingZorderIndex);
        dialogNode.setPosition(0, 0);
    }

    public static async show(parentNode: Node=null){
        if(LoadingPrefab.instance)return;
        if(!LoadingPrefab.prefab){
            await LoadingPrefab.preLoad();
        }
        this.createLoadingPrefab(parentNode);
    }

    update (dt) {
        this.loadingSp.getRotation(this._quatCache);
        Quat.toEuler(this._vec3Cache, this._quatCache);
        this._vec3Cache.z += 10;
        this.loadingSp.setRotationFromEuler(this._vec3Cache);
        if(this._vec3Cache.z >= 360){
            this.loadingSp.getRotation(Quat.IDENTITY);
        }
    }

    public static clear(){
        LoadingPrefab.instance = null;
        LoadingPrefab.prefab = null;
    }
}


