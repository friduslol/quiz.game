// Array med Studenter
const students = [
    {
        name: "Amanda Olsson",
        image: "images/amanda-olsson.jpg"
    },
    {
        name: "Emma Andersson",
        image: "images/emma-andersson.jpg"
    },
    {
        name: "Lisa Hansson",
        image: "images/lisa-hansson.jpg"
    },
    {
        name: "Oskar Anderberg",
        image: "images/oskar-anderberg.jpg"
    },
    {
        name: "Simon Bergstrand",
        image: "images/simon-bergstrand.jpg"
    },
    {
        name: "Tricia Hartmann",
        image: "images/tricia-hartmann.jpg"
    }
];

// variabler
let score = 0;
const images = students.length;
let corrAnswers;
let quizStudents;
const quiz = document.querySelector("#form");
const result = document.querySelector("#result");

// för att få ut random studenter
const randomNumber = function(max) {
        return Math.floor(Math.random() * max);
};

// för att kasta om ordning
const shuffleArray = function(array) {
        for (let i = array.length - 1; i > 0; i--){
                const j = randomNumber(i+1);
                [array[i], array[j]] = [array[j], array[i]];
        }
};

// Html-template
const addHtml = (array => {
        const output = array.map((student, index) =>
                `<div class="game">
                        <div class="img-container">
                                <img src="${student.image}" alt="student">
                        </div>

                        <div class="radio-container">
                                ${(student.alts)
                                .map((alt, altIndex) =>`<div class="radio">
                                                <input type="radio" value="${alt}" id="${index + "" + altIndex}" name="${student.name}">
                                                <label>${alt}</label>
                                            </div>`)
                                .join('')}
                        </div>
                </div>`
        );

        return output.join("");
});


const startQuiz = () => {
    // nollställer innehållet
    quiz.querySelector(".questions").innerHTML = "";

    // tar fram foto
    shuffleArray(students);
    quizStudents = students.slice(0, images);
    // dom rätta namnen
    corrAnswers = quizStudents.map(student => student.name);

        // alternativ till varje bild
        quizStudents.forEach((student, index) => {
                // array med foto och rätt student
                const questionAlts = [student.name];
                // ta bort rätt student
                const possibleFalseAlts = students.filter((student, i) => {
                    if (i === index) {
                        return false;
                    } else {
                        return true;
                    }
                });

                // rört om i grytan
                shuffleArray(possibleFalseAlts);
                // väljer ut 3 studenter
                for(let i = 0; i < 3; i++){
                        questionAlts.push(possibleFalseAlts[i].name);
                }
                // blanda array med alternativ
                shuffleArray(questionAlts);
                // går igenom och jämför om true sätter till i
                student.corrIndex = -1;
                for(let i = 0; i < 4; i++){
                    if (questionAlts[i]== student.name) {
                        student.corrIndex = i;
                    }
                }
                // lägger till alternativen
                student.alts = questionAlts;
        })
        // lägger ut på sidan
        quiz.querySelector(".questions").innerHTML = addHtml(quizStudents);
};

startQuiz();

// hindrar formuläret att skickas
quiz.addEventListener("submit", e => {
    e.preventDefault();

    // för varje student-index slår ihop med rätt svar, för att kolla att den rätta radiobtn är vald, lägger till 1 poäng för varje rätt svar
    quizStudents.forEach((student, index) => {
       if (document.getElementById(index.toString() + student.corrIndex.toString()).checked) {
        // lägger till poängen som spelaren fick
        ++score;
       }
    })

    // lägger ut på sidan hur många rätt och hur många foton
    result.querySelector("#score").innerHTML = score.toString();
    // sätter score till noll så att spelaren inte kan spamma btn för poäng
    score = 0;
    result.querySelector("#images").innerHTML = images;
});



