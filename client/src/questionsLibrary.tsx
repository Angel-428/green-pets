import { QuestionsType } from "../types";

const questionsArr : Array <QuestionsType> = [
    {
        name: "start",
        question: "Let's find you a new green pet!",
        options: [{text:"Begin", value: ""}],
        isAnswered: null
      },
    {
        name: 'indoor',
        question: 'Are you looking for an indoor or outdoor plant?',
        options: [{text:'Outdoor', value: "outdoor"},{text:'Indoor', value:"indoor"}],
        isAnswered: false
      },
    {
        name: 'watering',
        question: 'How green is your thumb?',
        options: [
          {text:``, value: 2}, 
          {text:``, value: 3},
          {text:``, value: 4}
        ],
        isAnswered: false
      }
    ];

    export default questionsArr;