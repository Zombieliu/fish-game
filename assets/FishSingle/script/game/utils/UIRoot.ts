import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIRoot')
export class UIRoot extends Component {
    public static Instance;
    onLoad(){
        UIRoot.Instance = this;
    }
    onDestroy(){
        UIRoot.Instance = null;
    }
}


