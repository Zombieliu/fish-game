import { _decorator } from 'cc';
import { FishInfo } from "./FishInfo";

export class FishConfig {
    public static readonly config: ReadonlyArray<FishInfo> = [
        // new FishInfo(1, "蝴蝶鱼", 2, 2),
        // new FishInfo(2, "鲶鱼", 2, 1),
        // new FishInfo(3, "狮子鱼", 2, 2),
        // new FishInfo(4, "条纹鱼", 2, 2),
        // new FishInfo(5, "沙丁鱼", 2, 2),
        // new FishInfo(6, "石斑鱼", 2, 2),
        // new FishInfo(7, "河豚", 3, 1.2),
        // new FishInfo(8, "海螺", 3, 2),
        // new FishInfo(9, "接吻鱼", 3, 1.2),
        // new FishInfo(10, "海姆", 4, 1),
        // new FishInfo(11, "绿鳍鱼", 4, 1.2),
        // new FishInfo(12, "鲎", 4, 1.2),
        // new FishInfo(13, "魔鬼鱼", 5, 0.6),
        // new FishInfo(14, "小海龟", 5, 2),
        // new FishInfo(15, "锤头鲨", 6, 0.5),
        // new FishInfo(16, "金枪鱼", 6, 0.5),
        // new FishInfo(17, "大三元", 6, 0.5),
        // new FishInfo(18, "黄金鲎", 6, 1.2),
        // new FishInfo(19, "大四喜", 7, 0.5),
        // new FishInfo(20, "黄金锤头鲨", 7, 0.5),
        // new FishInfo(21, "金海姆", 7, 0.6),
        // new FishInfo(22, "五福临门", 8, 0.4),
        // new FishInfo(23, "金海龟", 8, 0.7),
        // new FishInfo(24, "金鲨", 8, 0.5),
        // new FishInfo(25, "蓝鲨", 8, 0.5),
        // new FishInfo(26, "美人鱼", 14, 0.4),
        // new FishInfo(27, "金龙", 14, 0.3),
        // new FishInfo(28, "章鱼", 10, 0.5),
        // new FishInfo(29, "电鳗鱼", 3, 0.8),
        new FishInfo(1, "Butterflyfish", 2, 2),
        new FishInfo(2, "Catfish", 2, 1),
        new FishInfo(3, "Lionfish", 2, 2),
        new FishInfo(4, "Striped Fish", 2, 2),
        new FishInfo(5, "Sardine", 2, 2),
        new FishInfo(6, "Grouper", 2, 2),
        new FishInfo(7, "Pufferfish", 3, 1.2),
        new FishInfo(8, "Sea Snail", 3, 2),
        new FishInfo(9, "Kissing Fish", 3, 1.2),
        new FishInfo(10, "Seahorse", 4, 1),
        new FishInfo(11, "Green-finned Fish", 4, 1.2),
        new FishInfo(12, "Horseshoe Crab", 4, 1.2),
        new FishInfo(13, "Stingray", 5, 0.6),
        new FishInfo(14, "Small Sea Turtle", 5, 2),
        new FishInfo(15, "Hammerhead Shark", 6, 0.5),
        new FishInfo(16, "Tuna", 6, 0.5),
        new FishInfo(17, "Tuna", 6, 0.5),
        // new FishInfo(17, "Big Three", 6, 0.5),
        new FishInfo(18, "Golden Horseshoe Crab", 6, 1.2),
        new FishInfo(19, "Golden Horseshoe Crab", 6, 1.2),
        // new FishInfo(19, "Big Four", 7, 0.5),
        new FishInfo(20, "Golden Hammerhead Shark", 7, 0.5),
        new FishInfo(21, "Golden Seahorse", 7, 0.6),
        new FishInfo(22, "Five Blessings", 8, 0.4),
        new FishInfo(23, "Golden Sea Turtle", 8, 0.7),
        new FishInfo(24, "Golden Seahorse", 7, 0.6),
        new FishInfo(25, "Five Blessings", 8, 0.4),
        new FishInfo(26, "Golden Sea Turtle", 8, 0.7),
        // new FishInfo(24, "Golden Shark", 8, 0.5),
        // new FishInfo(25, "Blue Shark", 8, 0.5),
        // new FishInfo(26, "Mermaid", 14, 0.4),
        new FishInfo(27, "Golden Dragon", 14, 0.3),
        new FishInfo(28, "Octopus", 10, 0.5),
        new FishInfo(29, "Electric Eel", 3, 0.8)
    ]
    public static getFishInfoByType(fishType: number) {
        for (let i = 0; i < this.config.length; i++) {
            let fishInfo: FishInfo = this.config[i]
            if (fishInfo.fishType == fishType) {
                return fishInfo;
            }
        }
    }
}

