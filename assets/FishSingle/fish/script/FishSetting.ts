import { _decorator, Slider, Node, Canvas, instantiate, director } from 'cc';
const { ccclass, property } = _decorator;

import EventManager from "../../script/engine/utils/EventManager";
import DialogBase from "../../script/engine/uicomponent/DialogBase";
import MusicPrefab from "../../script/engine/uicomponent/MusicPrefab";
import SoundPrefab from "../../script/engine/uicomponent/SoundPrefab";
import PrefabLoader from "../../script/engine/utils/PrefabLoader";
import { GameConfig } from "../../script/game/config/GameConfig";

@ccclass('FishSetting')
export default class FishSetting extends DialogBase {
    @property({type:Slider})
    private musicSlider:Slider | null = null;
    @property({type:Slider})
    private soundSlider:Slider | null = null;

    onLoadMe(){
        EventManager.instance.addSliderEvent(this.node, this.musicSlider.node, "onMusicSlider", 0);
        EventManager.instance.addSliderEvent(this.node, this.soundSlider.node, "onSoundSlider", 0);
        this.refresh();
    }

    private onMusicSlider(slider: Slider, customEventData) {
        let percent:number = Number(slider.progress.toFixed(3));
        // let maxMoney: number = Math.max(UserInfoModel.userScore - 10, 0)
        // this.nowExchangeNum = Math.floor(maxMoney * this.nowPercent);
        // this.refresh();
        MusicPrefab.changeVolumn(percent);
        this.refresh();
    }

    private onSoundSlider(slider: Slider, customEventData){
        let percent:number = Number(slider.progress.toFixed(3));
        SoundPrefab.changeVolumn(percent);
        this.refresh();
    }

    private refresh(){
        this.musicSlider.progress = MusicPrefab.musicVolumn;
        this.soundSlider.progress = SoundPrefab.soundVolumn;
    }


    public static show(parentNode: Node = null) {
        PrefabLoader.loadPrefab( GameConfig.GameName+"/"+"game/dialog/FishSetting", (loadedResource) => {
            if (!parentNode) {
                parentNode = DialogBase.GetRootCanvas();
            }
            let node: Node = instantiate(loadedResource);
            parentNode.addChild(node);
            node.setPosition(0, 0)
        });
    }
}


