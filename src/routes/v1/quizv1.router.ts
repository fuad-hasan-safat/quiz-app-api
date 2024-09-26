
import { Elysia } from "elysia";

class Quiz {
    constructor(
        public questions = [
            {
                question: "What is the capital of France?",
                answers: ["Paris", "London", "Berlin", "Madrid"],
                correctAnswer: 0,
            },
            {
                question: "What is the capital of Germany?",
                answers: ["Berlin", "Munich", "Hamburg", "Cologne"],
                correctAnswer: 0,
            },
            {
                question: "What is the capital of Italy?",
                answers: ["Rome", "Milan", "Turin", "Florence"],
                correctAnswer: 0,
            },
            {
                question: "What is the capital of Spain?",
                answers: ["Madrid", "Barcelona", "Valencia", "Seville"],
                correctAnswer: 0,
            },
        ]
    ) {}

    add(){

    }
}

export const quizv1 = new Elysia({ prefix: "/quiz" })
    .get("questions", ()=> {
        return new Quiz().questions;
    }, 
 
    {
        beforeHandle(context) {
            console.log('data is valid');
        },
        afterHandle(context) {
            const { path, query, response, request } = context;
            console.log({ path, response, request });
        },
    })
   
