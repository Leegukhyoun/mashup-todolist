import React, {createContext, useReducer, useContext, useRef} from "react";

const initialTodos = [
    {
        id : 1,
        text : '프로젝트 생성하기',
        done: false,
    },
    {
        id : 2,
        text : '컴포넌트 스타일링하기',
        done: true,
    },
    {
        id : 3,
        text : 'Context만들기',
        done: false,
    },
    {
        id : 4,
        text : '기능구현하기',
        done: false,
    },
];


function todoReducer(state, action){
    switch(action.type){
        //action타입이 CREATE면 action객체의 todo를 
        //state 배열에 추가하기
        case 'CREATE':
            return state.concat(action.todo);

        //action타입이 TOGGLE이면 action 개체의 id를 받는다
        //받아와서 state항목의 id와 일치하면 
        //일치하는 항목의 done을 반전시킨다
        case 'TOGGLE' :
            return state.map(todo=>todo.id === action.id ? {...todo, done : !todo.done} : todo);

        //action 타입이 REMOVE면 action 개체의 id를
        //state 배열 항목의 id와 비교하여
        //일치하지 않는 항목만 새 배열로 반환한다
        case 'REMOVE':
            return state.filter(todo=>action.id !== todo.id);

        default:
            return state;
    }
}


//컨텍스트 생성
const TodoStateContext = createContext();

const TodoDispatchContext = createContext();

const TodoNextIdContext = createContext();

export function TodoProvider({children}){
    const nextId = useRef(5);
    const [ state, dispatch ] = useReducer(todoReducer, initialTodos);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children};
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}


//커스텀 Hook
export function useTodoState(){
    return useContext(TodoStateContext);
}

export function useTodoDispatch(){
    return useContext(TodoDispatchContext);
}

export function useTodoNextId(){
    return useContext(TodoNextIdContext);
}