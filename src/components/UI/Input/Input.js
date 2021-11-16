import classes from './Input.module.css';


const isInvalid = ({valid,touched, shouldValidate}) => {
    return !valid && shouldValidate && touched

}

export const Input = props => {
    const inputType = props.type || 'text';
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`;
    if(isInvalid(props)) {
        cls.push(classes.invalid)
    }
    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
            onChange={props.onChange}
            name={htmlFor}
            value={props.value}
            type={inputType}/>

            {
                isInvalid(props) ? <span>{props.errorMessage||'Enter the valid value'}</span>:null
            }
            
        </div>
    )
}