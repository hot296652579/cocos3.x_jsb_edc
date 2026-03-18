const fs = require('fs');
const path = require('path');

// 加密密钥（自定义，建议8位以上）
const SECRET_KEY = 0x99;
// 需要加密的资源目录（根据你的项目路径调整）
const RES_DIR = path.join(__dirname, '../android_01/data');
// 支持的图片文件类型
const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.tiff', '.svg'];
// 忽略的文件类型（避免加密.meta等配置文件）
const IGNORE_EXT = ['.meta', '.DS_Store', '.json', '.txt', '.md', '.xml', '.plist'];

// 异或加密单个文件
function xorEncryptFile(filePath) {
    try {
        // 读取文件字节
        const buffer = fs.readFileSync(filePath);
        // 逐字节异或加密
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] ^= SECRET_KEY;
        }
        // 覆盖写入加密后的文件
        fs.writeFileSync(filePath, buffer);
        console.log(`加密完成：${filePath}`);
    } catch (err) {
        console.error(`加密失败：${filePath}`, err);
    }
}

// 递归遍历目录加密文件
function encryptDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            encryptDir(fullPath); // 递归处理子目录
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            // 只加密图片文件，忽略其他文件类型
            if (IMAGE_EXT.includes(ext) && !IGNORE_EXT.includes(ext)) {
                xorEncryptFile(fullPath);
            }
        }
    });
}

// 执行加密
encryptDir(RES_DIR);
console.log('所有资源加密完成！');