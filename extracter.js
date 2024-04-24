const fs = require('fs');
const path = require('path');

const sourceFolder = 'C:/Users/D-Redouane/Desktop/anais/sol mini projet 1aaw';
const outputFile = './output.txt';
const extensions = [
        // '.py',
        // '.env',
        // '.exemple',
        // '.replit',
        // '.gitignore',
        '.js',
        '.ejs',
        // '.json',
        // '.md',
        // '.txt',
        //'.css'
    ]; // files that end with .java or .css



function concatenateFiles(folderPath, outputFilePath, depth = 0) {
  const files = fs.readdirSync(folderPath);

  let fileContent = '';
  let folderContent = '';
  let subfolderContent = ''; 

  files.forEach(file => {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      subfolderContent = concatenateFiles(filePath, outputFilePath, depth + 1);

      if (subfolderContent && subfolderContent.trim()) {
        folderContent += `\n\n\n\n\n\n\n\n// ${'  '.repeat(depth)}${file}\n${subfolderContent}\n\n`;
      } else {
        folderContent += subfolderContent;
      }
    } else {
      for (const extension of extensions) {
        if (file.endsWith(extension)) {
          const fileContentToAdd = fs.readFileSync(filePath, 'utf-8');
          fileContent += `\n\n\n\n\n\n\n\n// ${path.join(folderPath, file)}\n${fileContentToAdd}`;
          break;
        }
      }
    }
  });

  const content = folderContent + '\n\n' + fileContent;
  fs.appendFileSync(outputFilePath, content, 'utf-8');
}

concatenateFiles(sourceFolder, outputFile);
console.log('Files concatenated successfully!');
