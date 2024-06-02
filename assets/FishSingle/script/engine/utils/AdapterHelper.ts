import { Canvas, error, log, ResolutionPolicy, sys, view, _decorator } from 'cc';
import DialogBase from '../uicomponent/DialogBase';
const { ccclass, property } = _decorator;

import {Logger} from "./Logger";

@ccclass('AdapterHelper')
export default class AdapterHelper {
    public static winSizeWidth:number;
    public static winSizeHeiht:number;
    public static fixApdater() {
        log("v3.6没找到接口修改 fitHeight、fitWidth, 先在项目里写死fitHeight=true");
        return;
        let framesize = view.getFrameSize();
        if(!this.winSizeWidth){
            this.winSizeWidth = screen.width;   
            this.winSizeHeiht = screen.height;
        }
        let designsize = view.getDesignResolutionSize();
        let canvas: Canvas = DialogBase.GetRootCanvas().getComponent(Canvas);
        
        let ratio: number = framesize.height / framesize.width;
        let designRatio: number = designsize.height / designsize.width;
        if (ratio > designRatio) {
            //canvas.fitHeight = false;
            //canvas.fitWidth = true;
            error("v3.6没找到接口修改 fitHeight、fitWidth, 先在项目里写死fitHeight=true");
        } else {
            //canvas.fitHeight = true;
            //canvas.fitWidth = false;
            error("v3.6没找到接口修改 fitHeight、fitWidth, 先在项目里写死fitHeight=true");
        }
    }
}

