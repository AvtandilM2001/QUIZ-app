const API = {
    url: 'https://opentdb.com/api.php?amount=10',
    Category: '&category=',
    Difficulty: '&difficulty=',
}

var CategoryCodes = {
    General_Knowledge: '9',
    Entertainment_Books: '10' ,
    Entertainment_Film: '11' ,
    Entertainment_Music: '12' ,
    Entertainment_Musicals_Theatres: '13' ,
    Entertainment_Television: '14' ,
    Entertainment_Vdieo_Games: '15' ,
    Entertainment_Board_Games: '16' ,
    Science_nature: '17' ,
    Science_Computers: '18' ,
    Science_Mathematics: '19' ,
    Mythology: '20' ,
    Sports: '21' ,
    Geography: '22' ,
    History: '23' ,
    Politics: '24' ,
    Arts: '25' ,
    Celebrities: '26' ,
    Animals: '27' ,
    Vehicles: '28' ,
    Entertainment_Comics: '29' ,
    Science_Gadgets: '30' ,
    Entertainment_Japanse_Anime_Manga: '31' ,
    Entertainment_Cartoon_Animations: '32' ,
}

    let difficultyIndex = localStorage.getItem('difficulty');
    let categoryIndex = localStorage.getItem('category');

    var APILINK ;

    if(difficultyIndex === 'Any_Difficulty' && categoryIndex === 'Any_Category'){
        APILINK = API.url
    }else if(difficultyIndex === 'Any_Difficulty' && categoryIndex !== 'Any_Category'){
        APILINK = API.url+API.Category+CategoryCodes[categoryIndex]
    }else if(difficultyIndex !== 'Any_Difficulty' && categoryIndex === 'Any_Category'){
        APILINK = API.url+API.Difficulty+difficultyIndex
    }else if(difficultyIndex !== 'Any_Difficulty' && categoryIndex !== 'Any_Category'){
        APILINK = API.url+API.Category+CategoryCodes[categoryIndex]+API.Difficulty+difficultyIndex
    }
   
    var Answers = [];
    
fetch(APILINK)
    .then(res => res.json())
    .then(data => {
        
        for(let i=0; i<10; i++){
            let id = 'q'+i.toString();
            document.getElementById(`${id}`).innerHTML = data.results[i].question
            Answers[i]=data.results[i].correct_answer;

        
            for(let j=0; j<3; j++){
                if(data.results[i].incorrect_answers[j]){
                    const p = document.createElement('p');
                    p.innerHTML = data.results[i].incorrect_answers[j];
                    document.getElementById(`estimatedAnswers${i.toString()}`).appendChild(p)
                }

            }

            const p = document.createElement('p');
            p.innerHTML = data.results[i].correct_answer;
            document.getElementById(`estimatedAnswers${i.toString()}`).appendChild(p)
        }
       
    })
    
   function countScores(){
        var score = 0;
        for(let i=0; i<10; i++){
            let id = 'a'+i.toString();
            if(document.getElementById(`${id}`).value === Answers[i])score++;
            console.log(document.getElementById(`${id}`).value+ '  ------  ' +Answers[i])
        }
        
        localStorage.setItem('countedScore', score)

    document.getElementById('submitForm').click();
   }

