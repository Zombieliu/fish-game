import { _decorator, Component, Prefab, Node, instantiate } from 'cc';
const { ccclass, property } = _decorator;

import PrefabLoader from "../../engine/utils/PrefabLoader";
import { GameConfig } from "../config/GameConfig";

@ccclass('ResourcePrefab')
export default class ResourcePrefab extends Component {
    private static prefab: Prefab | null = null;
    public static instance: Node;
    @property({ type: Prefab })
    private scorePrefab: Prefab | null = null;
    public static preLoad(): Promise<void> {
        return new Promise((resolve, reject) => {
            PrefabLoader.loadPrefab( GameConfig.GameName+"/"+"game/prefab/ResourcePrefab", (loadedResource: Prefab) => {
                ResourcePrefab.prefab = loadedResource;
                ResourcePrefab.instance = instantiate(loadedResource)
                resolve();
            });
        })
    }

    public static clear() {
        ResourcePrefab.instance = null;
        ResourcePrefab.prefab = null;
    }


    public static getScorePrefab() {
        return ResourcePrefab.instance.getComponent(ResourcePrefab).scorePrefab;
    }
}

