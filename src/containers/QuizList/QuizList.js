import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { Loader } from '../../components/UI/Loader/Loader';


export const QuizList = () => {

    const [quizes, setQuizes] = useState([]);
    const [loading, setLoading] = useState(true)
    const renderQuizes = () => {
        return quizes.map(
            quiz=>(
                <li 
                key={quiz.id}
                >
                    <NavLink to={'/quiz/'+quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        )
    }

    useEffect(()=>{
      const fetchData = async()=>{
        try {
            const response = await axios.get('https://react-quiz-22c96-default-rtdb.europe-west1.firebasedatabase.app/quizes.json');

            const fetchQuizes = [];
    
            let { data } = response;
            console.log(data)
            Object.keys(data).forEach((key, index)=>{
                fetchQuizes.push({
                    id: key,
                    name: `Test №${index+1}`
                })

            })
            setLoading(false);
            setQuizes(fetchQuizes);
            
    
           } catch(error) {
               console.error(error)
           }
      }
      fetchData();
    },[]
    )

    return(
        <div className={classes.QuizList}>
           <div>
            <h1>Quizes List</h1>
                {
                    loading
                    ?<Loader/>
                    :<ul>
                        {renderQuizes()}
                    </ul>
                }
           </div>
        </div>
    )
}
