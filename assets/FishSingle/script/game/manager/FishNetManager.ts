import { _decorator, Component, Prefab, NodePool, Vec2, instantiate, Vec3, Node } from 'cc';
const { ccclass, property } = _decorator;

import FishNetBase from "../../../fish/script/FishNetBase";

@ccclass('FishNetManager')
export default class FishNetManager extends Component {
    public static instance: FishNetManager = null;
    @property({ type: [Prefab] })
    private netPrefabList: Prefab[] = [];
    private fishNetPool: Array<NodePool> = [];
    onLoad() { 
        FishNetManager.instance = this;
    }

    public addFishNet(netType: number, p:Vec2){
        let fishNet:FishNetBase = this.createFishNet(netType)
        this.node.addChild(fishNet.node)
        fishNet.node.setPosition(new Vec3(p.x, p.y, 0));
        fishNet.playMv();
    }

    private createFishNet(netType: number) {
        let fishNetNode: Node;
        if (this.fishNetPool[netType] && this.fishNetPool[netType].size() > 0) {
            fishNetNode = this.fishNetPool[netType].get();
        } else {
            fishNetNode = instantiate(this.netPrefabList[netType])
        }
        fishNetNode.getComponent(FishNetBase).netType = netType;
        return fishNetNode.getComponent(FishNetBase)
    }

    public destroyFishNet(fishNet: FishNetBase) {
        if (!this.fishNetPool[fishNet.netType]) {
            this.fishNetPool[fishNet.netType] = new NodePool();
        }
        this.fishNetPool[fishNet.netType].put(fishNet.node)
    }

    onDestroy(){
        FishNetManager.instance = null;
    }
}

