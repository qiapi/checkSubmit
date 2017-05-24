var fs = require('fs');
var path = require('path');
var readline = require('readline');

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

function readSyncByRl(tips) {
    tips = tips || '> ';
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

var readDirfile = readSyncByRl("请输入要查找的文件夹的完整路径（注意：路径名中的斜杠请使用左斜杠'/'）:");
readDirfile.then((res) => {
    readSubmit(res);
});
function readSubmit(dir) {
    var files = fs.readdirSync(dir);
    var filenames =[];
    files.forEach(function(filename){
        var fullname = path.join(dir,filename);
        var stats = fs.statSync(fullname);
        if(stats.isDirectory()) filename += '/';
        filename = filename.substring(0, filename.indexOf("."));
        filenames.push(filename);
    });
    console.log('\n'+'下面是路径中的文件:');
    filenames.forEach(function(filename){
        console.log(filename);
    });

    var classmates =[];
    var readName = readSyncByRl('\n'+"请提供名单完整路径（注意：路径名中的斜杠请使用左斜杠'/'）:");
    readName.then((res) => {
        var text = fs.readFileSync(res,'utf8');
        text.split(/\r?\n/).forEach(function (name) {
            classmates.push(name);
        });
        console.log("提供的名单文件中的名字：")
        classmates.forEach(function(name){
            console.log(name);
        });

        var newArr = classmates.filter(function(name){
        for(var i = 0; i< filenames.length;i++){
        if(filenames[i].indexOf(name)!==-1){
            return false;
        }
        }
        return true;
        });
        console.log('\n'+'未交:');
        newArr.forEach(function(name){
            console.log(name);
        });
    });
}


    


