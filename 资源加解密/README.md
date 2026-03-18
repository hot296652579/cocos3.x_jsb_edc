# cocos-jsc-endecryptor
# 加密 解密脚本(只针对图片)
- decrypt-res.js 解密资源 递归目录所有的图片
- encrypt-res.js 加密资源 递归目录所有的图片

# COCOS CREATOR 原生资源加解密方式
- 修改引擎代码(3.8.1)
    - Windows中,找到引擎代码中 `C:\ProgramData\cocos\editors\Creator\3.8.1\resources\resources\3d\engine\native\cocos\platform\Image` 文件
    - 替换 `Image.cpp` 文件