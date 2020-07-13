const xlsx = require('xlsx');
const path = require('path');
const rutValidation = require('./actions/rutValidation');
const fileSystem = require('fs');


let dataExcelFile = [];
const dateTime = new Date();
const number = Date.now();
const fullFilePath = path.join(__dirname,'/xlsFiles/CLIENTES.xlsx');

function readFileToJson(workBookFileName){
    const workBook = xlsx.readFile(workBookFileName,{cellDates: true});
    const tabName = workBook.SheetNames;
    
    const workBookSheet = workBook.Sheets[tabName];
    const dataWorkBookSheet = xlsx.utils.sheet_to_json(workBookSheet);
    let arrayDataWorkBookSheet = [];                
    let jsonDataWorkBookSheet = {};
    let t = 2;
    let stringDataWorkBookSheet ='';
    for (let z=0; z<dataWorkBookSheet.length; z++){
        stringDataWorkBookSheet = JSON.stringify(dataWorkBookSheet[z]);
        //console.log(stringDataWorkBookSheet);
        for(let y=0; y<stringDataWorkBookSheet.length; y++){
            stringDataWorkBookSheet = stringDataWorkBookSheet.replace(`${String.fromCharCode(92)}"`,'');
        }
        jsonDataWorkBookSheet = JSON.parse(stringDataWorkBookSheet);        
        //console.log(parseInt(jsonDataWorkBookSheet.RUT));
        let digitoVerificardor = rutValidation(jsonDataWorkBookSheet);
        //console.log(`${digitoVerificardor.toString()}`);
        
        if(digitoVerificardor.toString() === jsonDataWorkBookSheet.DÍGITOVERI){
            arrayDataWorkBookSheet.push(jsonDataWorkBookSheet);            
        }
        t++;
        //console.log(`${z}`)
    }
    
    const newWorkSheet = xlsx.utils.json_to_sheet(arrayDataWorkBookSheet);
    const newWorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newWorkBook,newWorkSheet,'Clientes');
    const writeFilePath = path.join('C:/Users/l_gon/Documents/spacionatural/desarrollo/validarRut/xlsFiles/');
    fileSystem.mkdir(writeFilePath, { recursive: true }, (err) => {
        if (err){
            console.log(`Hubo un error al crear la carpeta ${writeFilePath}`);
        }else{
            xlsx.writeFile(newWorkBook,path.join(writeFilePath,`Consolidado ${dateTime.toISOString().slice(0,10)}_${number}.xlsx`),{cellDates:false});
            console.log('Archivo creado exitosamente');
        }
    });
}

dataExcelFile = readFileToJson(fullFilePath);