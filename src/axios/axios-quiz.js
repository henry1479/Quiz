import axios from 'axios';

//создаем объект конфигурации для обращения к серверу
export default axios.create({
    baseURL: 'https://react-quiz-22c96-default-rtdb.europe-west1.firebasedatabase.app/'
})