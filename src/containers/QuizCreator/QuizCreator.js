import classes from './QuizCreator.module.css';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { createControl, validate, validateForms } from '../../form/formFramework';
import { useState } from 'react';
import { Auxillary } from '../../hoc/Layout/Auxillary/Auxillary';
import { Select  } from '../../components/UI/Select/Select';
import axios from 'axios';
import cors from 'cors';


const createOptionControl = (number) => {
    return createControl({
        label: `Variant ${number}`,
        errorMessage: 'The value is not be nothing',
        id: number,
    },
    {required: true})
}


const createFormControl = () => ({
    question: createControl({
        label: 'Enter the question',
        errorMessage: 'The question is not be nothing'
    },
    {required: true}),
    option_1: createOptionControl(1),
    option_2: createOptionControl(2),
    option_3: createOptionControl(3),
    option_4: createOptionControl(4),
})


export const QuizCreator = () => {


    const[quiz, setQuiz] = useState([]);
    const[formControls,setFormControls] = useState(createFormControl());
    const [isFormValid, setIsFormValid] = useState(false);
    const[rightAnswerId, setRightAnswerId] = useState(1);

  

    const addQuestionHandler = (event) => {
        event.preventDefault()
        const copyQuiz = quiz.concat();
        const index = copyQuiz.length + 1;
        const {question, option_1, option_2, option_3, option_4} = formControls;
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: rightAnswerId,
            answers: [
                {text: option_1.value, id: option_1.id},
                {text: option_2.value, id: option_2.id},
                {text: option_3.value, id: option_3.id},
                {text: option_4.value, id: option_4.id}
            ]

        }
        copyQuiz.push(questionItem);
        setQuiz(copyQuiz);
        setIsFormValid(false);
        setRightAnswerId(1);
        setFormControls(createFormControl())
    }

    const createQuizHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://react-quiz-22c96-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', quiz);
            console.log(response.data);
            setQuiz([]);
            setIsFormValid(false);
            setRightAnswerId(1);
            setFormControls(createFormControl());

        }catch(error){
            console.error(error)
        }

    }

    const onChangeHandler = (value, controlName) => {
        const copyFormControls = {...formControls};
        const control={...copyFormControls[controlName]}

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);
        copyFormControls[controlName] = control;
       
        setIsFormValid(validateForms(copyFormControls))
        setFormControls(copyFormControls)
    }

    const onChangeSelect = event => {
        console.log(event.target.value);
        setRightAnswerId(+event.target.value)
    }

    const select = <Select
        label="Choose right answer"
        value={rightAnswerId}
        onChange={onChangeSelect}
        options = {
            [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]
        }

    />

    const renderControls = () => {
        return Object.keys(formControls).map((controlName,index)=>{
            const control = formControls[controlName];
            // console.log('control', control)
            return (
               <Auxillary key={controlName + index}>
                    <Input
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event=>onChangeHandler(event.target.value, controlName)}
                    />
                    {
                        index === 0 ? <hr/> : null
                    }
               </Auxillary>
            )
        })



    }

    return(
        <div className={classes.QuizCreator}>
            <div>
            <h1>Quiz creator</h1>
            <form onSubmit={(event)=>{event.preventDefault()}}>
                {
                    renderControls()
                }

                { select }
                <Button
                    type="primary"
                    onClick={addQuestionHandler}
                    disabled={!isFormValid}
                >
                    Add question
                </Button>
                <Button
                    type="success"
                    onClick={createQuizHandler}
                    disabled={quiz.length === 0}
                >
                    Create test
                </Button>
            </form>
            </div>
        </div>
    )
}