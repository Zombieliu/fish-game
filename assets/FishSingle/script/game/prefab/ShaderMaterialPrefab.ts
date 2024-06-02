import { _decorator, Component, Node, Material, instantiate, Prefab } from 'cc';
const {ccclass, property} = _decorator;

import PrefabLoader from "../../engine/utils/PrefabLoader";
import { GameConfig } from "../config/GameConfig";

@ccclass('ShaderMaterialPrefab')
export default class ShaderMaterialPrefab extends Component {
    public static instance:Node;
        
    @property({type:Material})
    public default:Material | null = null;
    
    @property({type:Material})
    public grayMaterial:Material | null = null;
    @property({type:Material})
    public oldPhoto:Material | null = null;
    @property({type:Material})
    public glowInner:Material | null = null;
    @property({type:Material})
    public mosaic:Material | null = null;
    @property({type:Material})
    public roundCornerCrop:Material | null = null;
    @property({type:Material})
    public flashLight:Material | null = null;
    @property({type:Material})
    public flag:Material | null = null;
    @property({type:Material})
    public gaussian:Material | null = null;
    public static preLoad(): Promise<void> {
        return new Promise((resolve, reject) => {
            PrefabLoader.loadPrefab( GameConfig.GameName+"/"+"game/prefab/ShaderMaterialPrefab", (loadedResource: Prefab) => {
                ShaderMaterialPrefab.instance = instantiate(loadedResource)
                resolve();
            });
        })
    }
}
