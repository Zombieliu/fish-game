import { tween, Node } from 'cc';

export default class TimeHelper {
    public static exeNextFrame(node: Node, callback: Function){
        tween(node).delay(0.02).call(callback).start();
    }
}