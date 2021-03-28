import {createStore} from 'redux'
import reducer from './reducers'
import {applyMiddleware} from 'redux'
//applyMW - store enhancer, расширитель функционала стор (lesson 151)

import thunkMiddleware from 'redux-thunk'
//тМВ позволяет использовать функции в качетсве action'ov (lesson 152)

//наш рабочий МВ. МВ изначально принимает сторе (некоторым МВ нужно содержимое стор), 
//возвращает функцию, которая принимает диспатч и 
//возвращает функцию, которая принимает экшн.
//Суть МВ в промежуточной обработке и подмене dispatch. Для удобства, выглядит так?
//const logMiddleWare =(store) => (dispatch) => (action) => { но в документации обычно так?
//как ниже. Некст - это следующий МВ (или конечный диспатч), которому будет передан модифицированный экшн.

const logMiddleWare =({getState, action}) => (next) => (action) => {
  console.log(action.type, getState())
  return next(action)
}

const stringMiddleWare = () => (next) => (action)=> {
  if (typeof action === "string"){return next({type: action})}
  else {return next(action)} 
}

//Action creator - функция, которая создает действие (экшн). С ней работает thunк.
const delayedActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => {
        dispatch({type: 'DELAYED_ACTION!'} )
    }, timeout);
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleWare, logMiddleWare))

store.dispatch('HELLO_WORLD!')
//
store.dispatch(delayedActionCreator(2000))

export default store