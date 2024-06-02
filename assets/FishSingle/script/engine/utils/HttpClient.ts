import { _decorator } from 'cc';
const { ccclass } = _decorator;

import LoadingPrefab from "../uicomponent/LoadingPrefab";
import VersionManager from "./VersionManager";
import { Logger } from "./Logger";

@ccclass('HttpClient')
export default class HttpClient {
   
    public static instance: HttpClient ;//= new HttpClient();

    //example
    // HttpClient.instance.request("http://localhost:8080/haohttp/test", ()=>{
    //     console.log("http 请求 end=============");
    // }, {"nickName":"jhao", "hh":1, "id":9527});

    private methodType: string = "GET";

    private responseType: XMLHttpRequestResponseType = "json";

    private xhr: XMLHttpRequest;

    // --GET  or  POST
    public setMethod(method: string = "GET") {
        this.methodType = method;
    }

    public setParams(paramsObj: object): string {
        let resParams = "";
        let nowIndex = 1;
        for (const key in paramsObj) {
            if (paramsObj.hasOwnProperty(key)) {
                if (nowIndex == 1) {
                    resParams += key + "=" + paramsObj[key];
                }
                else {
                    resParams += "&" + key + "=" + paramsObj[key];
                }
                nowIndex += 1;
            }
        }
        Logger.log(this, "resParam===============", resParams);
        return resParams;
    }


    public setResponseType(responseType: XMLHttpRequestResponseType) {
        this.responseType = responseType;
    }

    public setContentType() {
    }

    public request(url: string, callback: Function, params: any = null, timeOut: number = 5 * 1000) {
        if (params && this.methodType == "GET") {
            let getParams: string = this.setParams(params);
            // getParams = StringUtil:encodeURI(params)
            getParams = encodeURI(getParams);
            url += "?" + getParams;
        }
         this.xhr = new XMLHttpRequest() // http请求  fget    
        //this.xhr = cc.loader.getXMLHttpRequest();
        let xhr: XMLHttpRequest = this.xhr;
        xhr.responseType = this.responseType;
        xhr.timeout = timeOut;
        // xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.onreadystatechange = () => {
            Logger.log(this, "status======", xhr.status, xhr.readyState, xhr.statusText);
            // if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = xhr.response;
                Logger.log(this, "http response1============", xhr);
                try {
                    let testJson = JSON.stringify(response)
                    Logger.log(this, "http response json============", testJson);
                    if (callback) {
                        callback(true, response);
                        callback = null;
                    }
                } catch (error) {
                    Logger.error(this, "http response json=====error=======", error);
                    if (callback) {
                        callback(false);
                        callback = null;
                    }
                }
            } else if (xhr.readyState == 4 && xhr.status == 301) {//域名转移
                Logger.log(this, "http response222============", xhr.getResponseHeader("Location"));
                // console.log("http response333============", xhr.getAllResponseHeaders());
                if(HttpClient.instance == null)
                    HttpClient.instance = new HttpClient();
                HttpClient.instance.request(xhr.getResponseHeader("Location"), callback);
            }
            else if (xhr.readyState == 4 && xhr.status == 404) {
                Logger.log(this, "http onError============");
                if (callback) {
                    callback(false);
                    callback = null;
                }
            }
            else {
                Logger.log(this, "onreadystatechange else====", xhr.status, xhr.readyState, xhr.response);
                if (xhr.readyState == 4) {
                    Logger.log(this, "http onError else============");
                    if (callback) {
                        callback(false);
                        callback = null;
                    }
                }
            }
        };
        xhr.onprogress = () => {
            Logger.log(this, "http onprogress===", xhr.status, xhr.readyState, xhr.response);
        }
        xhr.onerror = () => {
            Logger.log(this, "http onError============");
            if (callback) {
                callback(false);
                callback = null;
            }
        }
        xhr.ontimeout = () => {
            Logger.log(this, "http ontimeout============");
            if (callback) {
                callback(false);
                callback = null;
            }
        }
        Logger.log(this, "http request==============", url);
        Logger.log(this, "http request======method========", this.methodType);
        Logger.log(this, "http request======params========", params);
        xhr.open(this.methodType, url, true);
        xhr.setRequestHeader("content-type", "text/plain;charset=UTF-8")
        xhr.send(params);
    }

    public getInfo(callback: Function = null) {
      
    }
}

