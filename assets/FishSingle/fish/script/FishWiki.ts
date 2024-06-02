import { _decorator, ScrollView, Prefab, Node, instantiate, Label, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;

import FishBase from "./FishBase";
import DialogBase from "../../script/engine/uicomponent/DialogBase";
import { FishConfig } from "../../script/game/config/FishConfig";
import { FishInfo } from "../../script/game/config/FishInfo";
import FishManager from "../../script/game/manager/FishManager";
import PrefabLoader from "../../script/engine/utils/PrefabLoader";
import { GameConfig } from "../../script/game/config/GameConfig";
import TimeHelper from '../../script/game/utils/TimeHelper';

@ccclass('FishWiki')
export default class FishWiki extends DialogBase {
    @property({ type: ScrollView })
    private scrollView: ScrollView | null = null;
    @property({ type: Prefab })
    private wikiItemPrefab: Prefab | null = null;

    private _vec3Cache: Vec3;
    onLoadMe() {
        this._vec3Cache = new Vec3(1, 1, 1);
        this.init();
    }

    private init() {
        this.scrollView.content.removeAllChildren();
        this.initOne(0)
    }

    private initOne(index: number) {
        if (index < FishConfig.config.length) {
            let itemNode: Node = instantiate(this.wikiItemPrefab)

            this.scrollView.content.addChild(itemNode);
            let fishInfo:FishInfo = FishConfig.config[index];
            let txtName: Label = itemNode.getChildByName("txtName").getComponent(Label);
            txtName.string = fishInfo.name;
            let txtLife:Label = itemNode.getChildByName("txtLife").getComponent(Label);
            txtLife.string = "life:"+fishInfo.blood + ""
            let view: Node = itemNode.getChildByName("view");
            view.removeAllChildren();

            let fish: FishBase = FishManager.instance.createFishByType(fishInfo.fishType);
            view.addChild(fish.node);
            fish.node.setPosition(0,0)

            //缩放有bug
            //Vec3.multiplyScalar(this._vec3Cache, this._vec3Cache, fishInfo.wikiScale);
            //fish.node.setScale(this._vec3Cache);

            //fish.node.getComponent(Animation).play(); //v3 当前帧 不能播放
            TimeHelper.exeNextFrame(this.node, ()=>fish.node.getComponent(Animation).play());
            this.scheduleOnce(() => {
                this.initOne(index + 1)
            }, 0.05)
        }
    }


    public static show(parentNode: Node = null) {

        PrefabLoader.loadPrefab( GameConfig.GameName+"/"+"game/dialog/FishWiki", (loadedResource) => {
            if (!parentNode) {
                parentNode = DialogBase.GetRootCanvas();
            }
            let node: Node = instantiate(loadedResource);
            parentNode.addChild(node);
            node.setPosition(0, 0)
        });
    }
}

