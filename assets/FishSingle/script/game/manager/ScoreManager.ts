import { _decorator, Component, Prefab, NodePool, Vec2, instantiate, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import ScorePrefab from "../prefab/ScorePrefab";
import FishUI from "../../../fish/script/FishUI";

@ccclass('ScoreManager')
export default class ScoreManager extends Component {
    public static instance: ScoreManager = null;
    @property({ type: Prefab })
    private scrorePrefab: Prefab | null = null;
    private scorePool: NodePool;
    onLoad() {
        ScoreManager.instance = this;
        this.scorePool = new NodePool();

    }

    public addScore(score: number, p: Vec2) {
        let scorePrefab: ScorePrefab = this.createScore(score)
        this.node.addChild(scorePrefab.node)
        scorePrefab.node.setPosition(new Vec3(p.x, p.y, 0))
        scorePrefab.init(score)
        scorePrefab.playMoveEffect(new Vec2(-472.398, -547.481), () => {
            this.destroyScore(scorePrefab)
            FishUI.instance.score += score;
            FishUI.instance.refreshScore();
        })
    }


    private createScore(score: number): ScorePrefab {
        let scoreNode: Node;
        if (this.scorePool && this.scorePool.size() > 0) {
            scoreNode = this.scorePool.get();
        } else {
            scoreNode = instantiate(this.scrorePrefab)
        }
        return scoreNode.getComponent(ScorePrefab)
    }


    private destroyScore(scorePrefab: ScorePrefab) {
        this.scorePool.put(scorePrefab.node);
    }

    onDisable() {

    }
    onDestroy() {
        ScoreManager.instance = null;
    }
}

