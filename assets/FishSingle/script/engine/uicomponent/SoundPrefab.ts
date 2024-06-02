import { _decorator, Component, Prefab, NodePool, Node, instantiate, loader, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

import { Logger } from "../utils/Logger";
import PrefabLoader from "../utils/PrefabLoader";
import LocalStorage from "../utils/LocalStorage";
import EventManager from "../utils/EventManager";
import CommonEvent from "../config/CommonEvent";
import MusicConfig from "../config/MusicConfig";
import { GameConfig } from "../../game/config/GameConfig";
// /**
//  * 音效
//  * Ios暂时有bug，弃用
//  */

@ccclass('SoundPrefab')
export default class SoundPrefab extends Component {
    private static prefab: Prefab | null = null;
    private static SOUND_VOLUMN_KEY: string = "soundVolumn";
    public static soundVolumn: number = 1;
    private static Pool_Init_Num: number = 30;
    private static pool: NodePool = new NodePool();
    private static nowAudioNodeList: Array<Node> = [];
    private audioName: string = "";
    private audioUrl: string = "";
    private static getAudioNode() {
        let node: Node = null;
        // if (this.pool.size() > 0) {

        //     node = this.pool.get();
        // } else {
        node = instantiate(this.prefab);
        // }
        return node;
    }

    public static play(key: string) {
        let url: string = MusicConfig.musicKey2Path.get(key);
        if (url) {
            loader.loadRes(url, AudioClip, (error: Error, clip: AudioClip) => {
                if (error) {
                    Logger.warn(this, "load sound error===", error.message);
                } else {
                    if (clip) {
                        let audioNode: Node = this.getAudioNode();
                        if (audioNode) {
                            audioNode.getComponent(AudioSource).clip = clip;
                            audioNode.getComponent(AudioSource).volume = SoundPrefab.soundVolumn;
                            audioNode.getComponent(AudioSource).loop = false;
                            audioNode.getComponent(AudioSource).currentTime = 0;//rewind();
                            audioNode.getComponent(AudioSource).play();
                            audioNode.getComponent(SoundPrefab).audioName = key;
                            audioNode.getComponent(SoundPrefab).audioUrl = url;
                            this.nowAudioNodeList.push(audioNode);
                        }
                    }
                }
            });
        } else {
            Logger.warn(this, "播放不存在的music=", key);
        }
    }

    public static changeVolumn(nowVolumn: number) {
        this.soundVolumn = nowVolumn;
        for (let i = 0; i < this.nowAudioNodeList.length; i++) {
            let audioNode: Node = this.nowAudioNodeList[i];
            let audioSource: AudioSource = audioNode.getComponent(AudioSource);
            if (audioSource.playing) {
                audioSource.volume = nowVolumn;
            }
        }
        LocalStorage.setItem(SoundPrefab.SOUND_VOLUMN_KEY, SoundPrefab.soundVolumn.toString());
    }

    private static preInit() {
        EventManager.instance.addListener(CommonEvent.Event_FrameUpdate, this.updateFrame, this)
        SoundPrefab.soundVolumn = parseFloat(LocalStorage.getItem(SoundPrefab.SOUND_VOLUMN_KEY));
        if (isNaN(SoundPrefab.soundVolumn)) {
            SoundPrefab.soundVolumn = 1;
        }
    }

    private static updateFrame() {
        for (let i = 0; i < this.nowAudioNodeList.length; i++) {
            let audioNode: Node = this.nowAudioNodeList[i];
            let audioSource: AudioSource = audioNode.getComponent(AudioSource);
            if (!audioSource.playing) {
                SoundPrefab.nowAudioNodeList.splice(i, 1);
            }
        }
    }

    public static preLoad(): Promise<void> {
        return new Promise((resolve, reject) => {

            PrefabLoader.loadPrefab(GameConfig.GameName+"/"+"share/uicomponent/SoundPrefab", (loadedResource: Prefab) => {
                SoundPrefab.prefab = loadedResource;
                this.preInit();
                // for (let i = 0; i < this.Pool_Init_Num; i++) {
                //     let tempNode: cc.Node = cc.instantiate(loadedResource);
                //     this.pool.put(tempNode);
                // }
                resolve();
            });
        })
    }

    public static destory() {
        EventManager.instance.removeListener(CommonEvent.Event_FrameUpdate, this.updateFrame)
        for (let i = 0; i < this.nowAudioNodeList.length; i++) {
            let audioNode: Node = this.nowAudioNodeList[i];
            audioNode.getComponent(AudioSource).stop();
            audioNode.getComponent(AudioSource).destroy();
        }
        this.nowAudioNodeList = [];
        this.pool.clear();
    }
}

