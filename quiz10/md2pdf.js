// 引入Node.js内置模块
const fs = require('fs');
const path = require('path');
// 引入md-to-pdf工具
const { mdToPdf } = require('md-to-pdf');

// 定义要处理的文件夹路径（这里是脚本所在的当前文件夹，可自行修改）
const targetDir = __dirname;

// 读取文件夹中的所有文件
fs.readdir(targetDir, async (err, files) => {
  if (err) {
    console.error('读取文件夹失败：', err);
    return;
  }

  // 筛选出所有.md后缀的文件
  const mdFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');

  if (mdFiles.length === 0) {
    console.log('当前文件夹下没有找到MD文件！');
    return;
  }

  console.log(`找到${mdFiles.length}个MD文件，开始转换为PDF...`);

  // 遍历每个MD文件，逐个转换
  for (const mdFile of mdFiles) {
    try {
      // 拼接MD文件的完整路径
      const mdPath = path.join(targetDir, mdFile);
      // PDF文件的名称：和MD文件同名，后缀改为.pdf
      const pdfFileName = path.basename(mdFile, '.md') + '.pdf';
      const pdfPath = path.join(targetDir, pdfFileName);

      // 执行转换
      const pdf = await mdToPdf({ path: mdPath }, { dest: pdfPath });

      console.log(`✅ 转换成功：${mdFile} → ${pdfFileName}`);
    } catch (error) {
      console.error(`❌ 转换失败：${mdFile}，错误信息：`, error.message);
    }
  }

  console.log('\n🎉 所有MD文件转换任务执行完毕！');
});