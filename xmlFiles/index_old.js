const fs = require ('fs');
const parser = require('xml2json');

const Update = [];

fs.readFile('./xmlFiles/survey.xml',(err,data)=>{
    const json = JSON.parse(parser.toJson(data,{reversible: true}));
    let answers = json.Survey.Answer;
    //console.log(...initialState.items,answers);
    for (let i = 0; i < answers.length; i++){
        let answer = answers[i];
        answer.AnswerId = i;
        Update.push({ 
            Update: i,
            '$t': i
        });
        
    }
    json.Survey.Update = Update;
    //console.log(json.Survey.Question.QuestionText);
    const stringified = JSON.stringify(json);
    const xml = parser.toXml(stringified);
    fs.writeFile('survey-fixed.xml',xml,(err,data)=>{
        if (err){
            console.log(err);
        }
        else{
            console.log('updated!');
        }
    });
});

