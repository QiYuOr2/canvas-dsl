const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

const source = path.resolve(__dirname, '../dist');
const dest = path.resolve(__dirname, '../example/utils/canvas-dsl');

/**
 * 监听打包后文件的变化
 */
const watch = (dir, cb) => {
  let shouldReplace = false;
  fs.watch(dir, (event, filename) => {
    if (event === 'change') {
      console.log(`[${filename}改变]`);
      shouldReplace = true;
    }
    setTimeout(() => {
      if (shouldReplace) {
        shouldReplace = false;
        console.time('[替换文件]');
        cb();
      }
    }, 1000);
  });
};

/**
 * 将打包好的文件塞到示例中
 */
const replace = () => {
  fs.removeSync(dest);
  fs.copySync(source, dest);
  console.timeEnd('[替换文件]');
};

const preview = () => {
  replace();
  watch(source, () => {
    replace();
  });
};

const launchWebpack = () => {
  const webpack = spawn('npm', ['run', 'build:dev'], { cwd: path.resolve(__dirname, '../') });

  webpack.stdout.on('data', (data) => {
    console.log('\x1B[36m%s\x1B[0m', data.toString());
  });

  webpack.stderr.on('data', (data) => {
    console.log('\x1B[31m%s\x1B[0m', data.toString());
  });

  webpack.on('close', (code) => {
    console.log('\x1B[36m%s\x1B[0m', `child process exited with code ${code}`);
  });
};

launchWebpack();
setTimeout(() => {
  preview();
}, 500);
