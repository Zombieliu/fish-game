import { _decorator, Node, Material, Color, UIRenderer, Vec2, UITransform } from 'cc';
import ShaderMaterialPrefab from "../../game/prefab/ShaderMaterialPrefab";
import { Logger } from "./Logger";

export default class ShaderHelper {
 /**
     * 清除所有shader
     * @param showNode 
     * @param material 
     */
 public static clearAllEffect(showNode: Node, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).default) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            renderComponent.setMaterial(material, 0)
        });
    });
}


/**
 * 设置图片灰白程度
 * @param showNode 
 * @param material 
 * @param grayLevel  [0.0, 1.0]
 */
public static setGrayEffect(showNode: Node, grayLevel: number = 1, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).grayMaterial) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        material.setProperty("grayLevel", grayLevel);
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            material.setProperty("grayLevel", grayLevel);
            renderComponent.setMaterial(material, 0)
        });
    });
}


/**
 * 播放变灰过程动画
 */
public static showGrayMv(showNode: Node) {
    let grayValue: number = 0.5;
    let intervalId = setInterval(() => {
        grayValue += 0.01;
        if (grayValue >= 1) {
            grayValue = 1;
            clearInterval(intervalId)
        }
        if (showNode) {
            ShaderHelper.setGrayEffect(showNode, grayValue)
        }
    }, 1)
}


/**
 * 设置图片老化
 * @param showNode 
 * @param grayLevel  [0.0, 1.0]
 * @param material 
 */
public static setOldPhotoEffect(showNode: Node, grayLevel: number = 1, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).oldPhoto) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        material.setProperty("oldLevel", grayLevel);
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            material.setProperty("oldLevel", grayLevel);
            renderComponent.setMaterial(material, 0)
        });
    });
}


/**
 * 播放变灰过程动画
 */
public static showOldPhotoMv(showNode: Node) {
    let grayValue: number = 0;
    let intervalId = setInterval(() => {
        grayValue += 0.01;
        if (grayValue >= 1) {
            grayValue = 1;
            clearInterval(intervalId)
        }
        if (showNode) {
            ShaderHelper.setOldPhotoEffect(showNode, grayValue)
        }
    }, 1)
}


/**
* 增加内发光特效
* showNode:要增加特效的节点或者他的子节点
* material:发光特效材质 
* materialParam: {}
* materialParam.glowColor:cc.v4(r,g,b,a)  颜色rbga值的结构体
* materialParam.glowColorSize:这里为约束一下值发光宽度值在 [0.0, 0.1] 因为 0.1+ 之后的效果可能不明显，也可以自己尝试修改,个人测试感觉0.01效果最佳
* materialParam.glowThreshold:这里为约束一下值发光阈值值在 [0.0, 0.5] 因为 0.5+ 之后的效果可能就是其他效果，个人感觉0.1效果最佳
*/
public static setGlowInner(showNode: Node, materialParam: any, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).glowInner) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        material.setProperty("glowColor", materialParam.glowColor);
        material.setProperty("glowColorSize", materialParam.glowColorSize);
        material.setProperty("glowThreshold", materialParam.glowThreshold);
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            material.setProperty("glowColor", materialParam.glowColor);
            material.setProperty("glowColorSize", materialParam.glowColorSize);
            material.setProperty("glowThreshold", materialParam.glowThreshold);
            renderComponent.setMaterial(material, 0)
        });
    });
}

/**
 * 设置不同颜色的发光
 * @param showNode 
 * @param color 
 */
public static setCommonGlowInner(showNode: Node, color: Color = Color.WHITE) {
    this.setGlowInner(showNode, { "glowColor": color, "glowColorSize": 0.015, "glowThreshold": 0.1 })
}


/**
 * 播放被攻击闪烁过程动画
 */
public static showFlash(showNode: Node, totalFlashTimes: number = 1) {
    let timeCount: number = 0;
    let color: Color = Color.WHITE;
    let flashTimes: number = 0;
    let intervalId = setInterval(() => {
        timeCount += 1;
        if (timeCount % 50 == 0) {
            let tempCount: number = timeCount / 50;
            if (tempCount % 2 == 0) {
                color.a = 100
                this.setGlowInner(showNode, { "glowColor": color, "glowColorSize": 0.1, "glowThreshold": 0 })
            } else {
                flashTimes++;
                this.setGlowInner(showNode, { "glowColor": color, "glowColorSize": 0, "glowThreshold": 0 })
                if (flashTimes > totalFlashTimes) {
                    clearInterval(intervalId)
                }
            }
        }
    }, 1)
}

/**
 * 马赛克
 * @param showNode 
 * @param materialParam 
 * @param material 
 */
public static setMosaic(showNode: Node, materialParam: any, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).mosaic) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        material.setProperty("xBlockCount", materialParam.xBlockCount);
        material.setProperty("yBlockCount", materialParam.yBlockCount);
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            material.setProperty("xBlockCount", materialParam.xBlockCount);
            material.setProperty("yBlockCount", materialParam.yBlockCount);
            renderComponent.setMaterial(material, 0)
        });
    });
}


/**
* 播放被攻击闪烁过程动画
*/
public static showMosaicMv(showNode: Node, callback: Function = null) {
    let masaicTimes: number = 500;
    let intervalId = setInterval(() => {
        masaicTimes -= 2;
        this.setMosaic(showNode, { "xBlockCount": masaicTimes, "yBlockCount": masaicTimes })
        if (masaicTimes <= 30) {
            clearInterval(intervalId)
            if (callback) {
                callback();
            }
        }
    }, 1)
}

/**
 * 设置圆角剪切
 * @param showNode 
 * @param roundCornerRadius [0, 1] 
 */
public static setRoundCornerCrop(showNode: Node, roundCornerRadius: number = 0.1, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).roundCornerCrop) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        // material.setProperty("roundCornerRadius", roundCornerRadius);
        material.setProperty("xRadius", roundCornerRadius);
        material.setProperty("yRadius", roundCornerRadius);
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            // material.setProperty("roundCornerRadius", roundCornerRadius);
            material.setProperty("xRadius", roundCornerRadius);
            material.setProperty("yRadius", roundCornerRadius);
            renderComponent.setMaterial(material, 0)
        });
    });
}

/**
 * 设置闪光
 * @param showNode 
 * @param lightColor  光颜色
 * @param lightWidth 光的宽度
 * @param lightAngle 光的角度
 * @param enableGradient 
 * @param cropAlpha 
 * @param enableFog 
 * @param material 
 */
public static setFlashLight(showNode: Node, lightColor: Color, lightWidth: number, lightAngle: number = 0, enableGradient: boolean = true, cropAlpha: boolean = true, enableFog: boolean = false, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).flashLight) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        material.setProperty("lightColor", lightColor);
        material.setProperty("lightWidth", lightWidth);
        material.setProperty("lightAngle", lightAngle);
        material.setProperty("enableGradient", enableGradient ? 1 : 0);
        material.setProperty("cropAlpha", cropAlpha ? 1 : 0);
        material.setProperty("enableFog", enableFog ? 1 : 0);
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            material.setProperty("lightColor", lightColor);
            material.setProperty("lightWidth", lightWidth);
            material.setProperty("lightAngle", lightAngle);
            material.setProperty("enableGradient", enableGradient ? 1 : 0);
            material.setProperty("cropAlpha", cropAlpha ? 1 : 0);
            material.setProperty("enableFog", enableFog ? 1 : 0);
            renderComponent.setMaterial(material, 0)
        });
    });
}

/**
 * 玩家升级shader动画
 * @param showNode 
 * @param callback 
 */
public static showFlashLightMv(showNode: Node, callback: Function = null) {
    let nowClor: Color = new Color(0, 0, 0, 255);
    let colorIndex: number = 0;
    let lightAngle: number = 0;
    let intervalId = setInterval(() => {
        if (colorIndex == 0) {
            nowClor.r = nowClor.r + 2;
            if (nowClor.r >= 255) {
                colorIndex += 1;
            }
        } else if (colorIndex == 1) {
            nowClor.g = nowClor.g + 2
            if (nowClor.g >= 255) {
                colorIndex += 1;
            }
        } else {
            nowClor.b = nowClor.b + 2
            if (nowClor.b >= 255) {
                clearInterval(intervalId)
                ShaderHelper.clearAllEffect(showNode)
                if (callback) {
                    callback();
                }
                return;
            }
        }
        lightAngle += 1;
        this.setFlashLight(showNode, nowClor, 1, lightAngle);
    }, 1)
}


public static setFlag(showNode: Node, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).flag) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            renderComponent.setMaterial(material, 0)
        });
    });
}

/**
 * 设置高斯模糊
 * @param showNode 
 * @param material 
 */
public static setGaussian(showNode: Node, material: Material = ShaderMaterialPrefab.instance.getComponent(ShaderMaterialPrefab).gaussian) {
    showNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
        let tran = renderComponent.node.getComponent(UITransform);
        material.setProperty("textureSize", new Vec2(tran.contentSize.width, tran.contentSize.height));
        renderComponent.setMaterial(material, 0)
    });
    showNode.children.forEach(childNode => {
        childNode.getComponents(UIRenderer).forEach((renderComponent: UIRenderer) => {
            let tran = renderComponent.node.getComponent(UITransform);
            material.setProperty("textureSize", new Vec2(tran.contentSize.width, tran.contentSize.height));
            // material.setProperty("textureSize", cc.v2(showNode.width, showNode.height));
            renderComponent.setMaterial(material, 0)
        });
    });
}
}

