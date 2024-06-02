import { _decorator, Component, Label, Node, tween, Vec3, instantiate } from 'cc';
const { ccclass, property } = _decorator;

import PrefabLoader from "../utils/PrefabLoader";
import { GameConfig } from "../../game/config/GameConfig";
import DialogBase from './DialogBase';

@ccclass('CommonTips')
export default class CommonTips extends Component {
    public static TipsZorderIndex: number = 999;
    @property({ type: Label })
    txtContent: Label | null = null;
    private tips: string = "";
    private static showingNameList: Array<string> = []
    onLoad() {
    }

    start() {
        tween(this.node).by(1.5, { position: new Vec3(0, 100, 0) }).to(0.2, {/* opacity: 0*/scale: Vec3.ZERO }).call(() => {
            this.node.destroy();
        }).start()
    }

    onDestroy() {
        let index: number = CommonTips.showingNameList.indexOf(this.tips);
        CommonTips.showingNameList.splice(index, 1);
        this.unscheduleAllCallbacks();
    }

    public static showMsg(msg: string, parentNode: Node = null) {
        PrefabLoader.loadPrefab(GameConfig.GameName+"/"+"share/uicomponent/CommonTips", (loadedResource) => {
            if (!parentNode) {
                parentNode = DialogBase.GetRootCanvas();
            }
            if (CommonTips.showingNameList.indexOf(msg) != -1) {
                return;
            } else {
                CommonTips.showingNameList.push(msg);
            }
            let dialogNode = instantiate(loadedResource);
            dialogNode.setPosition(0, 0);
            let dialogScript: CommonTips = dialogNode.getComponent(CommonTips);
            dialogScript.tips = msg;
            dialogScript.txtContent.string = msg;
            parentNode.insertChild(dialogNode, CommonTips.TipsZorderIndex);
        });
    }
}

