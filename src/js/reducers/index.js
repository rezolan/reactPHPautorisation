import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import posts from './posts';
import login from './login';
// console.log(routerReducer)
// Reducer - это обработчик события, мы можем создавать под определенные логически вязаные
// действия свой редьюсер, например в случае с нашим репозиторием, я создал

// Собираем все редьюсеры в один большой, для того чтобы в
// дальнейшем передать его в store.
// Ложить его в store нужно для того чтобы при вызове какого-то события - это событие обработалось нужным нам редьюсером.
const reducers = combineReducers({
    posts,
	  login,
    routing: routerReducer 
});

export default reducers;