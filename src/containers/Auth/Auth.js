import classes from './Auth.module.css';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { useState } from 'react';
import axios from 'axios';

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9] {1,3}\.])|(([a-zA-Z\-0-9]+\.)+[a-zA-z]{2,}))$/;
    return re.test(email);
}

export const Auth = () => {
    // стейт валидации формы
    const[isFormValid, setIsFormValid]=useState(false);
    // стейт полей почты и пароля
    const [formControls, setFormControls] = useState(
        {   
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Enter correct password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6,
                    }

            }
        }
    )
    // авторизация
    const loginHandler = async (event) => {
        try {
            event.preventDefault()
            // параметры автоиризации Firebase
            const registerParams = {
                email: formControls.email.value,
                password: formControls.password.value,
                returnSecureToken: true
            }
            // запрос
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOrMjoUq1vx_IyEqk8JKKWN1tEh753IZc', registerParams)
            const result = response.data;
            // console.log("result", response.data)
        } catch(error) {
            console.error(error)

        }
        
    } 

    //регистрация нового пользователя 
    const registerHandler = async(event) => {
        try {
            event.preventDefault()
            //объект параметров для отправки запроса на регистрацию Firebase
            const registerParams = {
                email: formControls.email.value,
                password: formControls.password.value,
                returnSecureToken: true
            }
            //сам запрос
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOrMjoUq1vx_IyEqk8JKKWN1tEh753IZc', registerParams)
            const result = response.data;
            // console.log("result", response.data)
        } catch(error) {
            console.error(error)

        }

    } 
    const submitHandler = (e) => {
        e.preventDefault();
    }

    const validateContol = (value, validation) => {
        if(!validation) {
            return true
        }

        let isValid = true;

        if(validation.required) {
            isValid=value.trim()!==''&&isValid;
        }

        if(validation.email){
            isValid=validateEmail(value)&&isValid;
        }

        if(validation.minLength){
            isValid=value.length >=validation.minLength&&isValid;
        }
        return isValid;
    }

    const onChangeHandler = (event, controlName) => {
        // console.log(event.target.value, controlName);
        const copyFormControls = {...formControls};
        const control={...copyFormControls[controlName]}

        control.value = event.target.value;
        control.touched=true;
        control.valid=validateContol(control.value, control.validation)
        copyFormControls[controlName]=control;

        let isCopyFormValid = true;

        Object.keys(copyFormControls).forEach(
            name=>{
                isCopyFormValid = copyFormControls[name].valid&&isCopyFormValid;
                // console.log(isCopyFormValid);
                setIsFormValid(isCopyFormValid); 
            })

         
        
        

        setFormControls(
            copyFormControls
        );
        

        

    }

    console.log(formControls.email.value)

    const renderInputs = () => {
        return Object.keys(formControls).map((controlName,index)=>{
            const control = formControls[controlName];
            return (
                <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                errorMessage={control.errorMessage}
                shouldValidate={!!control.validation}
                onChange={event=>onChangeHandler(event,controlName)}
                />

            )
        })

    }

 
    return(
        <div className={classes.Auth}>
            <div>
                <h1>Authorization</h1>
                <form onSubmit={submitHandler} className={classes.AuthForm}>
                    {
                        renderInputs()
                    }
                    <Button 
                    type="success" 
                    disabled={!isFormValid}
                    onClick={loginHandler}>Log in</Button>                     
                    <Button 
                    type="primary"
                    disabled={!isFormValid}
                    onClick={registerHandler}>Log up</Button>                     
                </form>
            </div>
        </div>
    )
}