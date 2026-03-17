# cocos-jsc-endecryptor
# 使用方式
1.删除掉项目目录 decryptOutput目录,encryptOutput目录
2.添加需要解密加密的jsc文件到项目目录

# 命令
1.解密命令 (cocoscreator构建出的jsc文件是加密的,需要解密才能查看)
    python edc.py decrypt --path index.jsc --nozip true
1.加密命令 (xxx表示加密密钥)
    python edc.py encrypt --path decryptOutput/decrypt.js --key "xxx" --nozip true //不压缩
    python edc.py encrypt --path decryptOutput/decrypt.js --key "xxx" //默认压缩