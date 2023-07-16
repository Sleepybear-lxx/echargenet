
packet='''GET / HTTP/1.1
Host: www.baidu.com
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BIDUPSID=9300B3657AD046EB0575646A13B682D1; PSTM=1687064975; BAIDUID=9300B3657AD046EB94412E8EEA75E51F:FG=1; BD_UPN=12314753; BAIDUID_BFESS=9300B3657AD046EB94412E8EEA75E51F:FG=1; BD_HOME=1; H_PS_PSSID=36560_39027_39024_38943_38880_38958_38955_38967_38915_38973_38801_38986_38636_26350_38570_22159; delPer=0; BD_CK_SAM=1; PSINO=2; H_PS_645EC=7de0S69wUpWD3u95EBjOGfOIU3J4pJkQ7%2BwY1Lzw3MD%2BXS9Jd6boPVuUh5k; BA_HECTOR=2k20ak0l8l8h21a18ga58h2c1iacmha1o; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; ZFY=6BJNj8QhTVLEKvLsSjCGD3tvbrhM:ApQ4TmvsUvViHgo:C; channel=baidusearch; baikeVisitId=9f1bcbb5-ea64-4d88-88fe-e2f641f6c941
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.5615.138 Safari/537.36
sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"
accept: */*
'''

# test='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

command="ifconfig"
print(f"原始命令为{command}")
index=""
for sub_chr in command:
    # print(packet.find(sub_chr))
    sub_index_raw=packet.find(sub_chr)
    sub_index=str(sub_index_raw)
    sub_index_len=str(len(sub_index))
    index=index+sub_index_len+sub_index

encry_command=index
# 索引长度+索引值

print(f"加密后的命令为{encry_command}")

#还原command

i=0
original_command=""

while i<len(encry_command):
    # original_command=
    # print(f"i={i}")
    encry_command_index=int(encry_command[i])
    encry_command_len=encry_command[i+1:i+1+encry_command_index]
    original_command=original_command+packet[int(encry_command_len)]
    # print(encry_command_index,encry_command_len)
    i=i+1+encry_command_index
    # print(f"i移动为{i}")

print(f"还原后的命令为{original_command}")