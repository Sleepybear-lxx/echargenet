import base64
import time
import json
import execjs
import requests
from gmssl import sm3


get_method="GET"
post_method="POST"
header_timestamp=int(time.time() * 1000)


print(f"header stamp :{header_timestamp}")

headers={
"Host":"applite-evone-wx.echargenet.com",
"Accept": "*/*",
"Accept-Encoding": "gzip, deflate, br",
"Content-Type": "application/json;charset=UTF-8",
"Referer":"https://servicewechat.com/touristappid/devtools/page-frame.html",
"Sec-Fetch-Dest":"empty",
"Sec-Fetch-Mode":"cors",
"Sec-Fetch-Site":"cross-site",
"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1 wechatdevtools/1.06.2303220 MicroMessenger/8.0.5 webview/",
"channel": "ecdwx",
"timestamp": None,
"userToken": "",
"x-evone-api": "1.0.0",
"x-evone-area": "",
"x-evone-auth-ticket": "",
"x-evone-device": "unknow",
"x-evone-meta-appid": "",
"x-evone-profile": "1",
    # todo id
"x-evone-request-id": "2fd072bb2a1447ffa36d11e2149ea4f4",
"x-evone-version": "8.0.5",
}
r={}

# todo body
body={"id":"300000000100000036"}
# todo url
url="https://applite-evone-wx.echargenet.com/echargeapi/open/station/stationInfo"

# url="http://101.43.249.34:8090/nima"
headers["timestamp"]=str(header_timestamp)
packet={
    "method":post_method,
    "body":body,
    "headers":headers
}

proxies={
    "http":"127.0.0.1:8083",
    "https":"127.0.0.1:8083"
}




def sm3_res(message):
    # print(message)
    msg_list = [i for i in message]
    hash_hex = sm3.sm3_hash(msg_list)
    # print("sm3--------")
    # print(hash_hex)
    return hash_hex
    # print(hash_hex)



def append_content_function(r):
    res_list=[]
    dic_sort = sorted(r.items(), key=lambda x: x[0])
    dic_sort_list=[]
    dic_sort_dic={}
    for i in dic_sort:
        dic_sort_list.append(i[0])
    for i in range(len(dic_sort_list)):
        dic_sort_dic[dic_sort_list[i]]=r[dic_sort_list[i]]
        # print(i)
    # print(dic_sort_list)
    # print(dic_sort_dic)
    for i in dic_sort_dic:
        res_list.append(i)
        res_list.append(dic_sort_dic[i])
    return "".join(res_list)



def r_gen():
    for key in packet["headers"]:
        if key.startswith("x-evone"):
            r[key]=packet["headers"][key]


def enc1(data):
    with open("./enc1/nima.js", "r") as f:
        js_com = execjs.compile(f.read())
    return js_com.call("g",data)



def enc2(data):
    with open("./enc2/s4.js", "r") as f:
        js_com = execjs.compile(f.read())
    # print(data)
    return js_com.call("ballle",data)



def http_request():
    res=requests.post(url=url,headers=headers,data=json.dumps(body,separators={",",":"}),)

    print(res.text)

    # pass



def main():
    r_gen()
    print(r)
    data1_to_enc,data2_to_enc=function2()
    enc1_res=enc1(data1_to_enc)
    enc2_res=enc2(data2_to_enc)
    # print(enc2_res)
    headers["x-evone-signature"]="EVOneUni:"+enc1_res+":"+enc2_res
    print(headers)
    http_request()



def function2():
    enc_timestamp=int(time.time() * 1000)
    enc_timestamp_evone=str(enc_timestamp)+"evone"
    list_=[]
    json_data=json.dumps(packet["body"],separators=(',', ':'))
    list_.append(enc_timestamp_evone)
    list_.append("\n")
    list_.append(packet["method"])
    list_.append("\n")
    json_data_2_bs64=base64.b64encode(bytes(json_data,encoding="utf-8"))
    list_.append(sm3_res(json_data_2_bs64).upper())
    list_.append("\n")
    list_.append(packet["headers"]["Content-Type"])
    list_.append("\n")
    list_.append(str(enc_timestamp))
    list_.append("\n")
    list_.append(append_content_function(r))
    return enc_timestamp_evone,"".join(list_)


if __name__ == '__main__':
    main()