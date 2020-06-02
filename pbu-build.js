/**
 * @author Chenzhyc
 * @description 上传oss 脚本
 */

const path = require('path');
const projectName = path.basename(__dirname);
const aliyunConfig = require('./config/aliyun.oss.config');
const url = require('url');


const fs = require('fs');

function uploadDist(filePath, publicPath) {
    const files = [];
    const co = require('co');
    const OSS = require('ali-oss');
    const client = new OSS({
        region: aliyunConfig.region,
        accessKeyId: aliyunConfig.accessKeyId,
        accessKeySecret: aliyunConfig.accessKeySecret
    });

    client.useBucket(aliyunConfig.bucketPublic);

    uploadFilesRecursive(filePath, publicPath, files);

    co(function* () {
        for (let i = 0; i < files.length; i++) {
            const result = yield client.put(files[i].key, files[i].filePath);
        }
    }).catch(function (err) {
        console.log('UPLOAD Failed!!!', err);
        process.exit(1)
    });
}

function uploadFilesRecursive(filePath, publicPath, files) {
    const ossBaseKey = url.parse(publicPath).pathname;

    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(function(file, index) {
            const curPath = `${filePath}/${file}`;

            if (fs.lstatSync(curPath).isDirectory()) {
                uploadFilesRecursive(curPath, publicPath, files);
            }else {
                console.log(`begin to upload ${ossBaseKey}/${curPath}`);
                files.push({
                    key: `${ossBaseKey}/${curPath}`,
                    filePath: path.resolve(__dirname, curPath)
                })
            }
        })
    }
}

function checkKey(key, publicPath) {
    const request = require('request');
    return new Promise(function(resolve, reject) {
        request(`${url.resolve(publicPath, 'key')}/${key}`, function(err, response, body) {
            if (err) {
                reject(err);
            }

            try {
                const ret = JSON.parse(body);
                resolve(ret);
            } catch (e) {
                reject(e);
            }
        })
    });
}

/**
 * 发布，将dist所有文件上传至oss
 */
function publish() {
    const keyIndex = process.argv.indexOf('-key');
    if (keyIndex === -1) {
        console.warn('param -key required when publish!');
        process.exit(1)
        return;
    }

    if (!process.argv[keyIndex + 1]) {
        console.warn('param -key required when publish!');
        process.exit(1)
        return;
    }
    const publicPath = require('./publicPath.json').publicPath.replace('/dist/', '')
    checkKey(process.argv[keyIndex + 1], publicPath)

    .then((ret) => {
        console.log('KEY PASSED!!!');
        console.log('ABOUT to UPLOAD!!!');
        // uploadDist('dist', publicPath);
    })
    .catch((err) => {
        console.log('WRONG KEY!!!', err);
        process.exit(1)
    })
}

/**
 * 打包前预处理publicPath
 */
function preBuild() {
    const baseUrl = 'https://pbu-public.oss-cn-beijing.aliyuncs.com/webapps/'
    const publicPath = `${baseUrl}${projectName}/${Date.now()}/dist/`
    fs.writeFileSync('publicPath.json',JSON.stringify({publicPath:publicPath}))
    fs.writeFileSync('.umirc.prod.js',`export default{publicPath:"${publicPath}"}`);
}

/**
 * 检查环境变量是否为production
 * @return {Boolean} production true else false
 */
function checkNodeEnv() {
    // const production = process.env.NODE_ENV === 'production';
    const production = 'production';
    //仅production环境才可运行
    if (!production) {
        console.error('pbu-build required production NODE_ENV');
        process.exit(1)
        return false;
    }

    return true;
}

if (process.argv.length > 2 ) {
    switch (process.argv[2]) {
        case 'publish':
            if (checkNodeEnv()) {
                publish()
            }
            break;
        case 'preBuild':
            if (checkNodeEnv()) {
                preBuild();
            }
            break;
    }
}
