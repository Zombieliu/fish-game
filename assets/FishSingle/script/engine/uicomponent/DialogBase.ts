import { _decorator, Component, Node, Widget, director } from 'cc';
const { ccclass } = _decorator;

import DarkLayer from "./DarkLayer";
import { Logger } from "../utils/Logger";
import { UIRoot } from '../../game/utils/UIRoot';

@ccclass('DialogBase')
export default class DialogBase extends Component {
    private static LocalZOrder: number = 5;
    private darkLayer: Node | null = null;

    //private static _canvas: Node;
    public static GetRootCanvas(): Node{
        //if(DialogBase._canvas == null)
        //    DialogBase._canvas = director.getScene().getChildByName('Canvas');
        //return DialogBase._canvas;
        return UIRoot.Instance.node;
    }
    onLoad() {
        DialogBase.LocalZOrder += 1;
        let closeLayer:Node = this.node.getChildByName("closeLayer")
        if(closeLayer){
            let closeLayerWidget: Widget = closeLayer.getComponent(Widget);
            if(closeLayerWidget){
                closeLayerWidget.target = DialogBase.GetRootCanvas();
                closeLayerWidget.left = 0;
                closeLayerWidget.right = 0;
                closeLayerWidget.top = 0;
                closeLayerWidget.bottom = 0;
            }
        }
        this.onLoadMe();
    }

    onLoadMe() {

    }

    start(isPlayMv: boolean = false) {
        this.darkLayer = DarkLayer.getDarkLayer();
        this.node.insertChild(this.darkLayer, 0); //this.node.addChild(this.darkLayer, -1);
        if (isPlayMv) {
            this.node.setScale(0, 0);
        } else {
            this.onStartMe();
        }
    }

    onStartMe() {

    }

    onClickClose() {
        this.node.destroy();
    }

    update(dt) {
        this.onUpdateMe(dt);
    }

    onUpdateMe(dt) {

    }

    onDestroy() {
        DialogBase.LocalZOrder -= 1;
        this.onDestroyMe();
    }

    onDestroyMe() {

    }
}

