import { _decorator, Component, find, LabelComponent, sys } from "cc";
import { obeliskConfig } from "./obelisk.config";
import { NETWORK, PACKAGE_ID, WORLD_ID } from "./chain/config";

const { ccclass, property } = _decorator;

@ccclass("sui")
export class sui extends Component {
  async start() {
    this.sui_account_create();
  }

  async sui_account_create() {
    // @ts-ignore
    const obelisk_sdk = window.obelisk;
      const metadata = await obelisk_sdk.loadMetadata(NETWORK, PACKAGE_ID);
      const privateKey = '62f3f0ced77b2c2d6cc879b77faa0dbb8be58326155d8d80c6c8ae4496c1448c'
      const obelisk = new obelisk_sdk.Obelisk({
        networkType: NETWORK,
        packageId: PACKAGE_ID,
        metadata: metadata,
        secretKey: privateKey,
      });
      console.log(obelisk.getAddress());
      await obelisk.requestFaucet(obelisk.getAddress(), NETWORK);
    }
    // else {
    //   const metadata = await obelisk_sdk.loadMetadata(NETWORK, PACKAGE_ID);
    //   const obelisk = new obelisk_sdk.Obelisk({
    //     networkType: NETWORK,
    //     packageId: PACKAGE_ID,
    //     metadata: metadata,
    //   });
    //   const component_name = Object.keys(obeliskConfig.schemas)[0];
    //   const component_value = await obelisk.getEntity(WORLD_ID, component_name);
    //   const counter_node = find("Canvas/Camera/counter");
    //   const label = counter_node.getComponent("cc.Label") as LabelComponent;
    //   label.string = `Counter: ${component_value}`;
    // }
  // }

  // async export_wallet() {
  //   // @ts-ignore
  //   const obelisk_sdk = window.obelisk;
  //   const fromB64 = obelisk_sdk.fromB64;
  //   // const decode = JSON.parse(sys.localStorage.getItem("userWalletData"));
  //   const decode = sys.localStorage.getItem("userWalletData");
  //   // const decode_private_key = decode.privateKey;
  //   const decode_private_key = decode
  //   const base_64_privkey = fromB64(decode_private_key);
  //   const keypair = obelisk_sdk.Ed25519Keypair.fromSecretKey(base_64_privkey, {
  //     skipValidation: false,
  //   });
  //   const address = keypair.getPublicKey().toSuiAddress();
  //   console.log(address);
  //   const hex_privkey = Array.prototype.map
  //     .call(base_64_privkey, (x) => ("00" + x.toString(16)).slice(-2))
  //     .join("");
  //   return hex_privkey;
  // }

  async gameStart() {
    // @ts-ignore
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
    const world = tx.pure(WORLD_ID);

    const params = [world];

    const result = await obelisk.tx.counter_system.inc(tx, params);
    console.log(result);
    setTimeout(async () => {
      const metadata = await obelisk_sdk.loadMetadata(NETWORK, PACKAGE_ID);
      const obelisk = new obelisk_sdk.Obelisk({
        networkType: NETWORK,
        packageId: PACKAGE_ID,
        metadata: metadata,
      });
      const component_name = Object.keys(obeliskConfig.schemas)[0];
      const component_value = await obelisk.getEntity(WORLD_ID, component_name);
      const counter_node = find("Canvas/Camera/counter");
      const label = counter_node.getComponent("cc.Label") as LabelComponent;
      label.string = `Counter: ${component_value}`;
    }, 100);
  }

  update(deltaTime: number) {}
}
