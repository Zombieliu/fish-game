import { _decorator, Component, Prefab, Widget, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Logger } from "../utils/Logger";
import PrefabLoader from "../utils/PrefabLoader";
import { GameConfig } from "../../game/config/GameConfig";
import DialogBase from './DialogBase';

@ccclass('DarkLayer')
export default class DarkLayer extends Component {
    private static prefab: Prefab;
    onLoad() {
         this.getComponent(Widget).target = DialogBase.GetRootCanvas();
    }
    start() {

    }
    public static preLoad(): Promise<void> {
        return new Promise((resolve, reject) => {
            PrefabLoader.loadPrefab(GameConfig.GameName + "/" + "share/uicomponent/DarkLayer", (loadedResource) => {
                DarkLayer.prefab = loadedResource;
                resolve();
            });
        })
    }
    public static getDarkLayer() {
        let dialogNode: Node = instantiate(DarkLayer.prefab);
        return dialogNode;
    }
}

