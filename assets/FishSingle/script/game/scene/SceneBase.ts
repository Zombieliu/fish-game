import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import AdapterHelper from "../../engine/utils/AdapterHelper";
import PrefabLoader from "../../engine/utils/PrefabLoader";
import { Logger } from "../../engine/utils/Logger";
import ResourcePrefab from "../prefab/ResourcePrefab";

@ccclass('SceneBase')
export default class SceneBase extends Component {
    public static scriptName: string = "SceneBase";
    onLoad() {
        AdapterHelper.fixApdater();
        this.onLoadMe();
    }
    onLoadMe() {

    }
    start() {
        this.onStartMe();
    }
    onStartMe() {

    }
    onDestroy() {
        this.onDestroyMe();
    }
    onDestroyMe() {

    }
}
