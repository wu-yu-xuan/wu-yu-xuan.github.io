const path = require('path');
const paths = require('../config/paths');
const fs = require('fs-extra');

module.exports = async (outputFolder) => {
  const markdownFolderPath = `${paths.appPublic}/markdown`;
  const fileList = await fs.readdir(markdownFolderPath);
  const resultArray = [];
  for (const file of fileList) {
    const fileState = await fs.stat(`${markdownFolderPath}/${file}`);
    if (fileState.isFile && path.extname(file) === '.md') {
      resultArray.push({
        birthTime: fileState.birthtimeMs,
        modifyTime: fileState.mtimeMs,
        path: `/markdown/${file}`,
        title: path.basename(file, '.md')
      });
    }
  }
  await fs.writeFile(`${outputFolder}/markdown/list.json`, JSON.stringify(resultArray));
  console.log('markdown list done');
}