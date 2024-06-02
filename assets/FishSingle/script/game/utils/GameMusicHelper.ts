import { _decorator } from 'cc';
import SoundPrefab from "../../engine/uicomponent/SoundPrefab";
import MusicPrefab from "../../engine/uicomponent/MusicPrefab";
import RandomUtil from "../../engine/utils/RandomUtil";

export default class GameMusicHelper {
    public static playBg(){
        let randomIndex:number = RandomUtil.nextInt(1, 3);
        MusicPrefab.play("background-"+randomIndex);
    }

    public static playFishDead(fishType:number){
        SoundPrefab.play("deadfish_"+fishType);
    }

    public static playFire() {
        SoundPrefab.play("fire");
    }
}
