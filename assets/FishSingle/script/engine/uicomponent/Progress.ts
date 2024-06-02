import { _decorator, Component, Label, ProgressBar } from 'cc';
const {ccclass, property} = _decorator;

import {Logger} from "../utils/Logger";

@ccclass('Progress')
export default class Progress extends Component {
    @property(Label)
    public percentLable: Label;
    
    @property(ProgressBar)
    public bar: ProgressBar;

    onLoad() {
        this.bar.node.active = false;
        this.bar.progress = 0;
    }

    start(){
        
    }

    updatePercent(current,filePercent){
        //this.percentLable.string =  filePercent.toFixed(2);
    }

    updatefileTotal(current,filePercent){
        if(!this.bar.node.active) this.bar.node.active = true;
        var nowPercent = Math.round( (current/filePercent)*100);
        var curMB = this.getMB(current);
        var totalMB = this.getMB(filePercent);
        // this.percentLable.string = "正在更新 " + nowPercent + "%" + " ( " + curMB + " / "+totalMB +" MB)";
        nowPercent = Math.min(nowPercent, 100);
        this.percentLable.string = "正在更新 " + nowPercent + "%";
        var percent = (current/filePercent);
        this.bar.progress = percent;
    }

    public updateProgress(current, total, msg: string ="正在加载资源，此过程不消耗流量...") {
        this.bar.node.active = true;
        // this.setMsg(msg+ current + "/" + total);
        this.setMsg(msg);
        this.bar.progress = current / total;
    }

    getMB(bytes){
        bytes /= 1024;
        bytes /= 1024;
        return bytes.toFixed(2);
    }

    public setMsg(msg: string = "游戏加载中，请稍后...") {
        this.percentLable.string = msg;
    }
}

