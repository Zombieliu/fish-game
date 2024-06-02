import { _decorator, Component, SpriteFrame } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('TextureMgr')
export default class TextureMgr extends Component {
    @property({type:[SpriteFrame]})
    public Spriteset: SpriteFrame[] = [];
    @property({type:[SpriteFrame]})
    public Spriteset1: SpriteFrame[] = [];
    @property({type:[SpriteFrame]})
    public Spriteset2: SpriteFrame[] = [];
    @property({type:[SpriteFrame]})
    public Spriteset3: SpriteFrame[] = [];
    @property({type:[SpriteFrame]})
    public Spriteset4: SpriteFrame[] = [];
    
    onLoad() {
//        // init logic

    }
}

