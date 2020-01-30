const fs = require('fs');
const path = require('path');
const fullFileName = path.resolve(__dirname, 'a.json');

/*
// 使用 cb 解决异步问题
read1(fullFileName, (content)=>{
  console.log(1);
  const fullFileName = path.resolve(__dirname, content.nextFile);
  read1(fullFileName, (content)=>{
    const fullFileName = path.resolve(__dirname, content.nextFile);
    read1(fullFileName, (content)=>{
      console.log(content);
    })
  })
});

function read1(filePath, cb){
  fs.readFile(filePath, (err, data)=>{
    if(err){
      console.error(err);
      return;
    }
    cb(JSON.parse(data.toString()));
  })
}
 */


/*
// 使用 promise 解决异步问题
function read2(filePath){
  return new Promise((resolve, reject)=>{
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  })
}


// 错误使用链式 promise 的方式, 这个和回调的代码结构几乎没有区别
read2(fullFileName).then((fileContent)=>{
  const fullFileName = path.resolve(__dirname, fileContent.nextFile);


  read2(fullFileName).then((fileContent)=>{
    const fullFileName = path.resolve(__dirname, fileContent.nextFile);


    read2(fullFileName).then((fileContent)=>{
      console.log(fileContent)
    })
  })
});

// 正确使用链式 promise 的方式, 核心就是返回的是一个 promise
read2(fullFileName).then((fileContent)=>{
  const fullFileName = path.resolve(__dirname, fileContent.nextFile);
  return read2(fullFileName)
}).then((fileContent)=>{
  const fullFileName = path.resolve(__dirname, fileContent.nextFile);
  return read2(fullFileName)
}).then((fileContent)=>{
  console.log('fileContent', fileContent);
})


 */


// 使用 async / await
async function read3(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
}


async function getFileContent(fullFileName){
  try{
    const aFileContent = await read3(fullFileName);
    const bFullFileName = path.resolve(__dirname, aFileContent.nextFile);

    const bFileContent = await read3(bFullFileName);
    const cFullFileName = path.resolve(__dirname, bFileContent.nextFile);

    const cFileContent = await read3(cFullFileName);

    console.log(cFileContent);

  }catch(err){
    console.log(err);
  }
}

getFileContent(fullFileName);

