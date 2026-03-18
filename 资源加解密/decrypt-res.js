const fs = require('fs');
const path = require('path');

// 解密密钥（必须与加密密钥相同）
const SECRET_KEY = 0x99;
// 需要解密的资源目录（根据你的项目路径调整）
// const RES_DIR = path.join(__dirname, '../textures');
const RES_DIR = path.join(__dirname, '../android_01/data');
// 支持的图片文件类型
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.tiff', '.svg'];
// 忽略的文件类型（避免解密.meta等配置文件）
const IGNORE_EXT = ['.meta', '.DS_Store', '.json', '.txt', '.md', '.xml', '.plist'];

// 异或解密单个文件
function xorDecryptFile(filePath) {
    try {
        // 读取加密后的文件字节
        const buffer = fs.readFileSync(filePath);
        // 逐字节异或解密（异或运算的特性：A ^ B ^ B = A）
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] ^= SECRET_KEY;
        }
        // 覆盖写入解密后的文件
        fs.writeFileSync(filePath, buffer);
        console.log(`解密完成：${filePath}`);
    } catch (err) {
        console.error(`解密失败：${filePath}`, err);
    }
}

// 递归遍历目录解密文件
function decryptDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            decryptDir(fullPath); // 递归处理子目录
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            // 只解密图片文件，忽略其他文件类型
            if (IMAGE_EXT.includes(ext) && !IGNORE_EXT.includes(ext)) {
                xorDecryptFile(fullPath);
            }
        }
    });
}

// 执行解密
decryptDir(RES_DIR);
console.log('所有资源解密完成！');