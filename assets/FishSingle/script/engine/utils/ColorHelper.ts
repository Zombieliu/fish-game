import { _decorator, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColorHelper')
export default class ColorHelper {
    public static getColor(hexStr: string): Color {
         let color: Color = Color.BLACK;
         return color.fromHEX(hexStr);
    }
}

