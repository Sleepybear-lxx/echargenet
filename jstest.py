import execjs

with open("enc1/nima.js", "r") as f:
    js_com=execjs.compile(f.read())

res1=js_com.call("g","1683647034650evone")
print(res1)


# res2=js_com.call("f","nima")
#
# print(res2)





# 630d6f9e9c603520b2f1c4b7f09bb831c3a31a3124d0e571ff2b31d99318a0bbfd7c16cb0aaf1ba6a5414b7f2cbe2676de5f77cdd32cbeffd51fe274d36f329357ce6b8123ca914921a1bfa544701bdfb876df535732dc41fc9c37f57e5aad49f071390f88a32f07097c54772abb18987aca
#
#
# 044ee8eab2fbf6767e6876941bc8b8761db56d585e458d07202a4cb42de52e480d652a6bad52799b584a5c4fd7a59e38d62b55dc32757560a094c240a51dd097301bd8c83a5c4eb2137b6f2c85e8b2fda36f8641bec68a6af81415a4829b4eee6cb0de2c6d9cdf6ebdfe0eba3ce4360ddc559f
