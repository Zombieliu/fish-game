import { _decorator, Component, Tween, tween,sys} from 'cc';
const { ccclass, property } = _decorator;

import { FishPathInfo } from "../../script/game/config/FishPathInfo";
import FishManager from "../../script/game/manager/FishManager";
import { FishInfo } from "../../script/game/config/FishInfo";
import { NETWORK, PACKAGE_ID, WORLD_ID } from '../../../Scripts/chain/config';

@ccclass('FishBase')
export default class FishBase extends Component {
    public fishInfo:FishInfo;
    public fishType: number = 1;
    public blood:number = 1;
    public fishPathInfo: FishPathInfo;
    public isDead: boolean;
    onLoad() {
    }
    start() {

    }
    public async playDeadMv() {
        const obelisk_sdk = window.obelisk;
        const metadata = await obelisk_sdk.loadMetadata(NETWORK, PACKAGE_ID);
        console.log(metadata);

        const privateKey = '62f3f0ced77b2c2d6cc879b77faa0dbb8be58326155d8d80c6c8ae4496c1448c'
        // new obelisk class
        const obelisk = new obelisk_sdk.Obelisk({
        networkType: NETWORK,
        packageId: PACKAGE_ID,
        metadata: metadata,
        secretKey: privateKey,
        });

        const tx = new obelisk_sdk.TransactionBlock();
        console.log(this);

        // let fish_name = 'fish';
        let fish_name = this.fishInfo.name;

        let fish_image = this.fishInfo.fishType.toString();

        const params = [tx.pure(fish_name),tx.pure(fish_image)];

        const result = await obelisk.tx.fish_system.catch_fish(tx, params);
        console.log(result);

        console.log(this);
        this.isDead = true;
        this.scheduleOnce(()=>{
        FishManager.instance.killFish(this)
        }, 1.5)
        tween(this.node)
        .repeatForever(
        tween().by(0.6, { angle: -360 })
        ).start()
    }
    onDisable() {
        //this.node.stopAllActions();
        Tween.stopAllByTarget(this.node);
        this.unscheduleAllCallbacks();
    }
}

