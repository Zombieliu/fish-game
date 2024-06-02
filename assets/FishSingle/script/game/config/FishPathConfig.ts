import { Vec2, _decorator } from 'cc';
import { FishPathInfo } from "./FishPathInfo";
import RandomUtil from "../../engine/utils/RandomUtil";
import { FishMapInfo } from "./FishMapInfo";
import { FishMap } from "./FishMap";
import { Logger } from "../../engine/utils/Logger";

export class FishPathConfig {
    private static mapConfig: Array<Array<Array<number>>> = [
        [[1, 1, 1, -425, 387], [1, 1, 1, -487, 352], [1, 1, 1, -541, 307], [1, 1, 1, -589, 263], [1, 1, 1, -623, 232], [1, 1, 1, -654, 172], [1, 1, 1, -671, 134], [1, 1, 1, -693, 92], [1, 1, 1, -697, 35], [1, 1, 1, -706, -19], [1, 1, 1, -707, -92], [1, 1, 1, -701, -136], [1, 1, 1, -702, -177], [1, 1, 1, -686, -230], [1, 1, 1, -637, -257], [1, 1, 1, -559, -272], [1, 1, 1, -471, -278], [1, 1, 1, -408, -259], [1, 1, 1, -337, -226], [1, 1, 1, -325, -170], [1, 1, 1, -322, -99], [1, 1, 1, -336, -39], [1, 1, 1, -370, 7], [1, 1, 1, -412, 59], [1, 1, 1, -532, 69], [1, 1, 1, -613, 82], [1, 1, 1, -470, 63], [1, 1, 1, 241, 402], [1, 1, 1, 184, 357], [1, 1, 1, 143, 335], [1, 1, 1, 81, 285], [1, 1, 1, 27, 229], [1, 1, 1, -9, 167], [1, 1, 1, -39, 126], [1, 1, 1, -47, 57], [1, 1, 1, -74, -10], [1, 1, 1, -62, -66], [1, 1, 1, -74, -118], [1, 1, 1, -85, -201], [1, 1, 1, -30, -240], [1, 1, 1, 10, -271], [1, 1, 1, 135, -273], [1, 1, 1, 79, -280], [1, 1, 1, 202, -280], [1, 1, 1, 266, -276], [1, 1, 1, 276, -274], [1, 1, 1, 307, -259], [1, 1, 1, 316, -244], [1, 1, 1, 327, -226], [1, 1, 1, 335, -195], [1, 1, 1, 337, -142], [1, 1, 1, 321, -53], [1, 1, 1, 271, -13], [1, 1, 1, 188, 27], [1, 1, 1, 123, 46], [1, 1, 1, 59, 57], [1, 1, 1, 17, 60], [1, 1, 1, 323, -101], [1, 1, 1, 732, 329], [1, 1, 1, 669, 283], [1, 1, 1, 613, 218], [1, 1, 1, 567, 185], [1, 1, 1, 558, 163], [1, 1, 1, 507, 95], [1, 1, 1, 468, 35], [1, 1, 1, 456, -18], [1, 1, 1, 451, -80], [1, 1, 1, 447, -164], [1, 1, 1, 458, -234], [1, 1, 1, 505, -267], [1, 1, 1, 578, -281], [1, 1, 1, 657, -291], [1, 1, 1, 708, -291], [1, 1, 1, 769, -291], [1, 1, 1, 812, -290], [1, 1, 1, 847, -275], [1, 1, 1, 860, -236], [1, 1, 1, 853, -160], [1, 1, 1, 826, -95], [1, 1, 1, 794, -46], [1, 1, 1, 754, -7], [1, 1, 1, 671, 26], [1, 1, 1, 630, 59], [1, 1, 1, 584, 80]],
        [[2, 1, 1, -784, 353], [2, 1, 1, -693, 356], [2, 1, 1, -614, 354], [2, 1, 1, -510, 354], [2, 1, 1, -422, 354], [2, 1, 1, -456, 287], [2, 1, 1, -510, 199], [2, 1, 1, -562, 139], [2, 1, 1, -600, 82], [2, 1, 1, -636, 38], [2, 1, 1, -688, -17], [2, 1, 1, -745, -92], [2, 1, 1, -764, -152], [2, 1, 1, -815, -216], [2, 1, 1, -166, 341], [2, 1, 1, -17, 343], [2, 1, 1, 89, 343], [2, 1, 1, 246, 331], [2, 1, 1, 326, 348], [2, 1, 1, -180, 310], [2, 1, 1, -144, 209], [2, 1, 1, -112, 151], [2, 1, 1, -74, 55], [2, 1, 1, -48, 0], [2, 1, 1, 4, -91], [2, 1, 1, 40, -153], [2, 1, 1, 85, -201], [2, 1, 1, 102, -247], [3, 1, 1, 595, 319], [3, 1, 1, 664, 322], [3, 1, 1, 799, 318], [3, 1, 1, 968, 319], [3, 1, 1, 963, 107], [3, 1, 1, 955, -21], [3, 1, 1, 948, -157], [3, 1, 1, 940, -231], [3, 1, 1, 795, -245], [3, 1, 1, 685, -248], [3, 1, 1, 610, -252], [3, 1, 1, 523, -253], [3, 1, 1, 172, 128], [3, 1, 1, -357, 30], [3, 1, 1, 582, 23]],
    
        [[5,1,1,-888,405],[5,1,1,-806,410],[5,1,1,-718,404],[5,1,1,-658,406],[5,1,1,-661,286],[5,1,1,-661,224],[5,1,1,-664,142],[5,1,1,-688,-2],[5,1,1,-687,-69],[5,1,1,-697,-120],[5,1,1,-981,410],[5,1,1,-503,150],[5,1,1,-432,146],[5,1,1,-362,149],[5,1,1,-259,148],[5,1,1,-192,149],[5,1,1,-341,359],[5,1,1,-353,256],[5,1,1,-354,203],[5,1,1,-361,72],[5,1,1,-371,-23],[5,1,1,-387,-79],[5,1,1,18,277],[5,1,1,7,159],[5,1,1,-7,94],[5,1,1,-19,-3],[5,1,1,-27,-80],[5,1,1,177,164],[5,1,1,248,172],[5,1,1,355,170],[5,1,1,153,29],[5,1,1,230,30],[5,1,1,327,32],[6,1,1,548,371],[6,1,1,682,374],[6,1,1,833,373],[6,1,1,942,374],[6,1,1,935,289],[6,1,1,924,143],[6,1,1,903,65],[6,1,1,887,-44],[6,1,1,857,-157],[6,1,1,526,109],[6,1,1,612,108],[6,1,1,761,94],[6,1,1,710,260],[6,1,1,673,177],[6,1,1,661,10],[6,1,1,634,-61],[6,1,1,617,-138],[7,1,1,340,-259],[7,1,1,485,-254],[7,1,1,622,-254],[7,1,1,816,-251]],
        [[9,1,1,-513,150],[9,1,1,-636,237],[9,1,1,-811,250],[9,1,1,-860,145],[9,1,1,-850,-54],[9,1,1,-801,-154],[9,1,1,-673,-268],[9,1,1,-498,-294],[9,1,1,-358,-223],[9,1,1,-207,-127],[9,1,1,-72,15],[9,1,1,-88,196],[9,1,1,-240,285],[9,1,1,-334,185],[9,1,1,466,151],[9,1,1,310,202],[9,1,1,213,246],[9,1,1,106,83],[9,1,1,141,-54],[9,1,1,241,-252],[9,1,1,388,-285],[9,1,1,605,-295],[9,1,1,771,-226],[9,1,1,846,-125],[9,1,1,893,51],[9,1,1,865,195],[9,1,1,665,207],[17,1,1,-461,2],[17,1,1,515,-49]],
        [[19,1,1,-785,31],[19,1,1,905,16],[20,1,1,-242,34],[20,1,1,228,12],[20,1,1,-30,303],[20,1,1,-109,-292],[20,1,1,425,-301],[20,1,1,537,265],[20,1,1,-604,317],[20,1,1,-634,-285]],
        [[21,1,1,-757,94],[21,1,1,646,55],[21,1,1,-41,376],[21,1,1,-102,-315],[21,1,1,-76,83],[21,1,1,-437,300],[21,1,1,-434,-155],[21,1,1,314,-154],[21,1,1,435,249]],
        [[22,1,1,-548,65],[22,1,1,747,61],[22,1,1,95,63]],
        [[23,1,1,-431,384],[23,1,1,-766,89],[23,1,1,-415,-232],[23,1,1,-72,135],[23,1,1,721,414],[23,1,1,328,77],[23,1,1,1025,60],[23,1,1,677,-247],[23,1,1,104,390],[23,1,1,84,-265]],
        [[24,1,1,-429,353],[24,1,1,241,323],[24,1,1,-472,46],[24,1,1,-27,35],[24,1,1,563,39],[24,1,1,-268,-245],[24,1,1,172,-260]],
        [[25,1,1,-595,276],[25,1,1,115,291],[25,1,1,-192,-64],[25,1,1,464,-46],[25,1,1,191,-280],[25,1,1,884,-319]],
        [[26,1,1,-681,441],[26,1,1,685,426],[26,1,1,-46,140],[26,1,1,-494,-207],[26,1,1,497,-238]],
        [[27,1,1,-431,345],[27,1,1,569,311],[27,1,1,112,-12],[27,1,1,-298,-271],[27,1,1,678,-244]],
        [[28,1,1,-454,8],[28,1,1,597,1],[28,1,1,46,431],[28,1,1,44,-227]],
        [[2,1,1,-557,409],[2,1,1,-648,382],[2,1,1,-732,338],[2,1,1,-809,236],[2,1,1,-861,157],[2,1,1,-865,18],[2,1,1,-835,-37],[2,1,1,-787,-86],[2,1,1,-746,-115],[2,1,1,-683,-181],[2,1,1,-575,-206],[2,1,1,-494,-204],[2,1,1,-442,-157],[2,1,1,-403,-111],[2,1,1,-387,11],[2,1,1,-356,94],[2,1,1,-472,330],[2,1,1,-407,260],[2,1,1,-395,195],[2,1,1,-214,51],[2,1,1,-139,52],[2,1,1,-77,51],[2,1,1,-21,51],[2,1,1,67,50],[2,1,1,107,50],[2,1,1,-40,332],[2,1,1,-43,207],[2,1,1,-60,154],[2,1,1,-60,5],[2,1,1,-82,-71],[2,1,1,-77,-195],[5,1,1,427,311],[5,1,1,578,314],[5,1,1,779,315],[5,1,1,862,315],[5,1,1,884,123],[5,1,1,879,-108],[5,1,1,778,-183],[5,1,1,672,-181],[5,1,1,564,-179],[5,1,1,407,-178],[5,1,1,297,8],[5,1,1,625,48],[5,1,1,379,92]],
    ]
    private static formatMapConfig: Array<FishMap> = [
    ]
    private static config: Array<Array<Array<number>>> = [
//        // 左边开始
        [[-1309, 528], [-1144, 438], [-1081, 411], [-947, 327], [-801, 241], [-683, 154], [-539, 69], [-394, -23], [-230, -115], [-115, -207], [45, -280], [247, -364], [497, -457], [627, -511], [762, -578], [885, -667], [1068, -773]],
        [[-1295, 534], [-1144, 438], [-1081, 411], [-906, 326], [-696, 274], [-462, 223], [-213, 198], [-1, 172], [156, 178], [396, 194], [576, 216], [753, 233], [936, 279], [1182, 350], [1314, 418]],
        [[-1295, 534], [-1144, 438], [-1081, 411], [-906, 326], [-696, 274], [-462, 223], [-213, 198], [-1, 172], [199, 150], [417, 111], [635, 10], [827, -42], [1020, -131], [1189, -170], [1309, -198]],
        [[-1295, 534], [-1111, 514], [-1015, 454], [-864, 403], [-671, 387], [-450, 354], [-219, 311], [11, 274], [213, 270], [471, 212], [642, 172], [835, 88], [1013, -2], [1212, -99], [1309, -198]],
        [[-1275, -118], [-1129, -19], [-1024, 42], [-858, 129], [-677, 225], [-448, 277], [-219, 311], [11, 274], [213, 270], [510, 320], [596, 350], [772, 391], [887, 426], [1066, 513], [1164, 710]],
        [[-1299, -618], [-1143, -521], [-1033, -496], [-726, -425], [-489, -360], [-245, -293], [-8, -210], [212, -134], [385, -65], [552, 7], [705, 96], [904, 176], [1090, 273], [1208, 355], [1308, 435]],
        [[-1275, -118], [-1060, -69], [-938, -85], [-729, -59], [-551, -48], [-397, -2], [-203, -1], [46, 61], [228, 105], [506, 159], [630, 208], [784, 266], [935, 228], [1157, 174], [1329, 163]],
        [[-1288, -220], [-1113, -194], [-945, -195], [-709, -162], [-502, -200], [-313, -211], [-144, -186], [128, -135], [314, 14], [571, 56], [727, 132], [851, 203], [1050, 141], [1255, 58], [1326, 20]],
        [[-1288, -220], [-1113, -194], [-945, -195], [-709, -162], [-502, -200], [-313, -211], [-144, -186], [132, -144], [406, -196], [644, -272], [884, -272], [993, -283], [1090, -319], [1242, -341], [1329, -396]],
        [[-1288, -220], [-1113, -194], [-916, -213], [-710, -238], [-501, -273], [-297, -289], [-101, -312], [173, -324], [419, -339], [653, -362], [889, -390], [1011, -407], [1095, -418], [1238, -539], [1317, -663]],
        [[-1314, -508], [-1123, -480], [-917, -443], [-708, -379], [-514, -361], [-300, -319], [-101, -307], [155, -256], [398, -248], [645, -219], [787, -178], [980, -165], [1086, -103], [1093, 280], [1026, 371], [868, 631], [648, 787]],
        [[-1314, -508], [-1130, -281], [-898, -160], [-693, -141], [-561, -91], [-384, -43], [-187, 48], [119, 32], [298, -95], [519, -135], [744, -156], [868, -97], [1033, 55], [1093, 280], [1026, 371], [868, 631], [648, 787]],
        [[-1314, -508], [-1130, -281], [-898, -160], [-693, -141], [-561, -91], [-384, -43], [-187, 48], [119, 32], [298, -95], [519, -135], [744, -156], [872, -200], [1060, -391], [1150, -492], [1301, -461]],
//        //右边开始
        [[1286, -293], [1149, -184], [952, -147], [795, -130], [536, -45], [476, 57], [467, 300], [408, 500], [405, 701]],
        [[1345, 34], [1189, -69], [978, -94], [820, -115], [443, -66], [267, -29], [66, -79], [-219, -287], [-271, -693]],
        [[1345, 34], [1189, -69], [978, -94], [820, -115], [443, -66], [267, -29], [66, -79], [-215, -156], [-444, -100], [-725, -92], [-963, -68], [-1169, -46], [-1325, -40]],
        [[1345, 34], [1189, -69], [978, -94], [820, -115], [443, -66], [267, -29], [66, -79], [-215, -156], [-454, -156], [-719, -199], [-981, -264], [-1180, -291], [-1320, -367]],
        [[1345, 34], [1189, -69], [978, -94], [820, -115], [413, -128], [258, -147], [60, -161], [-254, -250], [-493, -278], [-707, -320], [-961, -408], [-1160, -449], [-1309, -524]],
        [[1345, 34], [1189, -69], [978, -94], [820, -115], [439, -173], [267, -185], [109, -251], [-211, -307], [-428, -408], [-596, -448], [-847, -604], [-1019, -589], [-1241, -695]],
        [[1345, 34], [1189, -69], [951, -68], [512, -86], [159, -142], [-56, -144], [-362, -160], [-569, -143], [-772, -35], [-898, 66], [-1070, 219], [-1181, 292], [-1289, 558]],
        [[1345, 34], [1189, -69], [951, -68], [512, -86], [159, -142], [-56, -144], [-310, -118], [-530, -84], [-654, -2], [-806, 84], [-905, 246], [-1008, 375], [-1021, 750]],
        [[1297, 542], [1181, 330], [1041, 250], [676, 110], [429, -12], [5, -105], [-310, -118], [-530, -84], [-654, -2], [-806, 84], [-905, 246], [-1008, 375], [-1021, 750]],
        [[1297, 542], [1181, 330], [1041, 250], [676, 110], [429, -12], [7, -105], [-310, -118], [-530, -84], [-655, -18], [-806, 84], [-927, 189], [-1073, 291], [-1318, 474]],
        [[1297, 542], [1181, 330], [1041, 250], [676, 110], [429, -12], [7, -105], [-310, -118], [-530, -84], [-631, -85], [-775, -77], [-923, -28], [-1133, -46], [-1294, -10]],
        [[1297, 542], [1181, 330], [1041, 250], [676, 110], [429, -12], [243, -126], [-141, -203], [-340, -201], [-500, -218], [-616, -254], [-854, -240], [-1115, -272], [-1312, -336]],
        [[1297, 542], [1181, 330], [1041, 250], [676, 110], [429, -12], [243, -126], [-141, -203], [-307, -229], [-398, -281], [-562, -321], [-647, -446], [-930, -540], [-1073, -726]],
        [[1293, -558], [1192, -467], [1069, -395], [948, -305], [733, -245], [243, -126], [-141, -203], [-307, -229], [-398, -281], [-562, -321], [-647, -446], [-930, -540], [-1073, -726]],
        [[1293, -558], [1192, -467], [1069, -395], [948, -305], [733, -245], [243, -126], [-141, -203], [-307, -229], [-398, -281], [-568, -262], [-857, -301], [-1055, -406], [-1353, -380]],
        [[1293, -558], [1192, -467], [1069, -395], [948, -305], [733, -245], [243, -126], [-141, -203], [-307, -229], [-426, -197], [-590, -195], [-905, -120], [-1100, -72], [-1300, 225]],
        [[1293, -558], [1192, -467], [1069, -395], [948, -305], [733, -245], [243, -126], [-141, -203], [-307, -229], [-497, -179], [-633, -130], [-917, 33], [-1079, 184], [-1220, 412]],
        [[1293, -558], [1192, -467], [1069, -395], [948, -305], [733, -245], [243, -126], [-141, -203], [-307, -229], [-461, -55], [-602, -25], [-857, 181], [-921, 416], [-909, 805]],
//        //下往上
        [[-279, -786], [-92, -667], [45, -582], [618, -388], [436, -239], [176, -173], [-141, -203], [-307, -229], [-461, -55], [-602, -25], [-857, 181], [-921, 416], [-909, 805]],
        [[-279, -786], [-92, -667], [45, -582], [618, -388], [436, -239], [176, -173], [126, -95], [-26, -92], [-157, 40], [-362, 152], [-543, 358], [-721, 502], [-401, 770]],
        [[-279, -786], [-78, -718], [133, -652], [618, -388], [436, -239], [392, -130], [254, -77], [194, -49], [79, 44], [60, 214], [-85, 418], [-140, 630], [-401, 770]],
        [[-279, -786], [-78, -718], [133, -652], [618, -388], [459, -232], [392, -130], [304, -80], [267, -2], [222, 130], [253, 319], [330, 465], [544, 684], [858, 803]],
        [[841, -837], [683, -745], [672, -600], [618, -388], [459, -232], [392, -130], [304, -80], [267, -2], [222, 130], [253, 319], [330, 465], [544, 684], [858, 803]],
    ]
    private static formatConfig: Array<FishPathInfo> = [
    ];

    public static init() {
        this.initNormalConfig();
        this.initMapConfig();
    }

    private static initMapConfig() {
        this.formatMapConfig = [];
        for (let i = 0; i < this.mapConfig.length; i++) {
            let arr: Array<Array<number>> = this.mapConfig[i];
            let fishMapInfoList: Array<FishMapInfo> = []
            for (let j = 0; j < arr.length; j++) {
                let temp: Array<number> = arr[j];
                let fishMapInfo: FishMapInfo = new FishMapInfo(temp[0], temp[1], temp[2], temp[3], temp[4]);
                fishMapInfoList.push(fishMapInfo);
            }
            let fishMap: FishMap = new FishMap(i, fishMapInfoList);
            this.formatMapConfig.push(fishMap);
        }
    }

    public static randomFishMap() {
        let randomIndex: number = RandomUtil.nextInt(0, this.formatMapConfig.length - 1);
        let map: FishMap = this.formatMapConfig[randomIndex];
        return map;
    }

    private static initNormalConfig() {
        this.formatConfig = [];
        let pathId: number = 1;
        for (let i = 0; i < this.config.length; i++) {
            let path: Array<Vec2> = [];
            let flipXPath: Array<Vec2> = [];
            let flipYPath: Array<Vec2> = [];
            for (let j = 0; j < this.config[i].length; j++) {
                let p: Vec2 = new Vec2(this.config[i][j][0], this.config[i][j][1])
                path.push(p);
                let flipXP: Vec2 = new Vec2(-p.x, p.y);
                let flipYP: Vec2 = new Vec2(p.x, -p.y);
                flipXPath.push(flipXP);
                flipYPath.push(flipYP);
            }
            this.formatConfig.push(new FishPathInfo(pathId++, path));
            this.formatConfig.push(new FishPathInfo(pathId++, flipXPath));
            this.formatConfig.push(new FishPathInfo(pathId++, flipYPath));
        }
    }

    public static getPathInfo(pathId: number) {
        for (let i = 0; i < this.formatConfig.length; i++) {
            let pathInfo: FishPathInfo = this.formatConfig[i];
            if (pathInfo.pathId == pathId) {
                return pathInfo
            }
        }
    }

    public static randomPathInfo() {
        let randomIndex: number = RandomUtil.nextInt(0, this.formatConfig.length - 1);
        // let randomIndex: number = 0
        let pathInfo: FishPathInfo = this.formatConfig[randomIndex];
        return pathInfo;
    }
}
