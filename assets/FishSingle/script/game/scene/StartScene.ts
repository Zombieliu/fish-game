import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import EventManager, { HaoEvent } from "../../engine/utils/EventManager";
import SceneBase from "./SceneBase";
import SceneManager from "./SceneManager";

@ccclass('StartScene')
export default class StartScene extends SceneBase {
    public static scriptName: string = "StartScene";
    onLoadMe() {

    }
    update() {

    }
   
    onDestroyMe() {
    }
}

