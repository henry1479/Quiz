import React from 'react';
import classes from './Quiz.module.css';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import { FinishedQuiz } from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import { Loader } from '../../components/UI/Loader/Loader';

export class Quiz extends React.Component {
    state = {
        results: {}, 
        isFinished: false,
        questionNumber: 0,
        answerState: null,
        quiz: [],
        loading: true,
    }

    onAnswerClickHandler = id => {
        // нужно для избежания ошибки
        // двойного клика на правильном ответе 
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') {
                return
            }

        }
        //получаем текщий вопрос
        const question = this.state.quiz[this.state.questionNumber];
        const results = this.state.results;

        // если ответ правильный
        // переход на след. вопрос
        // обновление свойства 
        // answerState на success
        // console.log(question.rightAnswerId)
        if(id === question.rightAnswerId) {
            if(!results[question.id]) {
                results[question.id]='success';
            }


            this.setState({
                ...this.state,
                answerState: {[id]:'success'}
            })

            const timeOut = setTimeout(()=>{
            // если вопросы кончились,
            // закончить опрос
                if(this.quizIsFinished()) {
                    // console.log('finished')

                    this.setState({
                        ...this.state,
                        isFinished: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        questionNumber: this.state.questionNumber+1,
                        answerState: null,
                        results
                    })

                }
            
                clearTimeout(timeOut)
            }, 1000)
        } else {
            results[question.id]='error';
            // если ответ неправильный,
            // то answerState в error

            this.setState({
                ...this.state,
                answerState: {[id]:'error'}
            })

          
            const errorTimeout=setTimeout(()=>{
                if(this.quizIsFinished()) {
                    // console.log('finished')

                    this.setState({
                        ...this.state,
                        isFinished: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        answerState: null,
                        questionNumber: this.state.questionNumber+1,
                        results
                    })

                }

                clearTimeout(errorTimeout)
            },
            
            
            1000);
        
        }
       
    }

    onRetryHandler = () => {
        this.setState({
            questionNumber: 0,
            answerState: null,
            isFinished: false,
            results: {},
        })

    }

    quizIsFinished(){
        return this.state.questionNumber+1 === this.state.quiz.length
    }

    //получение данных с сервера
    async componentDidMount() {
       try {
        const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
        const quiz = response.data;
        console.log('response', response)
        this.setState({
            quiz,
            loading: false,
        })
       } catch(error){
        console.log(error)
       }
    }



    render () {
        return (
            <div className={classes.Quiz}>
               
                <div className={classes.QuizWrapper}>
                <h1>Answer all questions!</h1>

                {
                    this.state.loading
                    ?<Loader/>
                    :
                    this.state.isFinished? 
                    <FinishedQuiz
                     results={this.state.results}
                     quiz={this.state.quiz}
                     onRetry={this.onRetryHandler}
 
                    />:
                     <ActiveQuiz 
                     answers={this.state.quiz[this.state.questionNumber].answers}
                     question={this.state.quiz[this.state.questionNumber].question}
                     onAnswerClick={this.onAnswerClickHandler}
                     questionsNumber={this.state.quiz.length}
                     questionNumber= {this.state.questionNumber+1}
                     state={this.state.answerState}
                     />   
                }
                </div>
            </div>
        )
    }
}

