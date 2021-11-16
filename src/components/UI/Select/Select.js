import classes from './Select.module.css'

export const Select = (props) => {
    const htmlFor = `${props.label} - ${Math.random()}`

    return(
        <div className={classes.Select}>
            <label htmlFor={htmlFor}></label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >{
                props.options.map((option,index)=> (
                    <option 
                        value={option.value}
                        key={option.value + index}
                    >
                    {option.text}
                    </option>
                ))
            }</select>
        </div>
    )
}