import { _decorator, AudioClip } from 'cc';
import { GameConfig } from "../../game/config/GameConfig";

export default class MusicConfig {
    public static musicKey2Path: Map<string, string> = new Map<string, string>();//资源预加载路径
    
    public static musicKey2Cache:Map<string, AudioClip> = new Map<string, AudioClip>();//资源加载后cache路径
    
    public static init(){
       // //音乐要预加载的配置
        MusicConfig.musicKey2Path.set("background-1", GameConfig.GameName+"/"+"music/background-1");
        MusicConfig.musicKey2Path.set("background-2",  GameConfig.GameName+"/"+"music/background-2");
        MusicConfig.musicKey2Path.set("background-3",  GameConfig.GameName+"/"+"music/background-3");
        MusicConfig.musicKey2Path.set("deadfish_1",  GameConfig.GameName+"/"+"music/deadfish_1");
        MusicConfig.musicKey2Path.set("deadfish_2",  GameConfig.GameName+"/"+"music/deadfish_2");
        MusicConfig.musicKey2Path.set("deadfish_3",  GameConfig.GameName+"/"+"music/deadfish_3");
        MusicConfig.musicKey2Path.set("deadfish_4", GameConfig.GameName+"/"+ "music/deadfish_4");
        MusicConfig.musicKey2Path.set("deadfish_5",  GameConfig.GameName+"/"+"music/deadfish_5");
        MusicConfig.musicKey2Path.set("deadfish_6",  GameConfig.GameName+"/"+"music/deadfish_6");
        MusicConfig.musicKey2Path.set("deadfish_7",  GameConfig.GameName+"/"+"music/deadfish_7");
        MusicConfig.musicKey2Path.set("deadfish_8",  GameConfig.GameName+"/"+"music/deadfish_8");
        MusicConfig.musicKey2Path.set("deadfish_9",  GameConfig.GameName+"/"+"music/deadfish_9");
        MusicConfig.musicKey2Path.set("deadfish_10",  GameConfig.GameName+"/"+"music/deadfish_10");
        MusicConfig.musicKey2Path.set("deadfish_11",  GameConfig.GameName+"/"+"music/deadfish_11");
        MusicConfig.musicKey2Path.set("deadfish_12",  GameConfig.GameName+"/"+"music/deadfish_12");
        MusicConfig.musicKey2Path.set("deadfish_13",  GameConfig.GameName+"/"+"music/deadfish_13");
        MusicConfig.musicKey2Path.set("deadfish_14",  GameConfig.GameName+"/"+"music/deadfish_14");
        MusicConfig.musicKey2Path.set("deadfish_15", GameConfig.GameName+"/"+ "music/deadfish_15");
        MusicConfig.musicKey2Path.set("deadfish_16",  GameConfig.GameName+"/"+"music/deadfish_16");
        MusicConfig.musicKey2Path.set("deadfish_17",  GameConfig.GameName+"/"+"music/deadfish_17");
        MusicConfig.musicKey2Path.set("deadfish_18", GameConfig.GameName+"/"+ "music/deadfish_18");
        MusicConfig.musicKey2Path.set("deadfish_19",  GameConfig.GameName+"/"+"music/deadfish_19");
        MusicConfig.musicKey2Path.set("deadfish_20", GameConfig.GameName+"/"+ "music/deadfish_20");
        MusicConfig.musicKey2Path.set("deadfish_21",  GameConfig.GameName+"/"+"music/deadfish_21");
        MusicConfig.musicKey2Path.set("deadfish_22",  GameConfig.GameName+"/"+"music/deadfish_22");
        MusicConfig.musicKey2Path.set("deadfish_23", GameConfig.GameName+"/"+ "music/deadfish_23");
        MusicConfig.musicKey2Path.set("deadfish_24", GameConfig.GameName+"/"+ "music/deadfish_24");
        MusicConfig.musicKey2Path.set("deadfish_25",  GameConfig.GameName+"/"+"music/deadfish_25");
        MusicConfig.musicKey2Path.set("deadfish_26",  GameConfig.GameName+"/"+"music/deadfish_26");
        MusicConfig.musicKey2Path.set("deadfish_27",  GameConfig.GameName+"/"+"music/deadfish_27");
        MusicConfig.musicKey2Path.set("deadfish_28", GameConfig.GameName+"/"+ "music/deadfish_28");
        MusicConfig.musicKey2Path.set("deadfish_29",  GameConfig.GameName+"/"+"music/deadfish_29");
        MusicConfig.musicKey2Path.set("fire",  GameConfig.GameName+"/"+"music/fire");
    }
}

