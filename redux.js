function createStore(reducer,initialState={}) {
    let  state = initialState;
    const listeners = [];

    return {
        getState(){
            return {...state}
        },
        dispatch(action){
            const nextState = reducer(action,{...state});
            if(state !== nextState){
                state = nextState;
                listeners.forEach(l=> l())
            }
        },

        subscribe(listener){
            listeners.push(listener);
            //---------------------for unsubscription-----------------------
            // return ()=>{
            //     const rest =  listeners.splice(listeners.length-1,1)
            //     return rest;
            // }
            
        },
    }
}
//Counter Reducer
const Counter = (action,state = {count :0})=>{
    switch(action.type){
        case "INCREMENT":
            return {
                ...state,
                count:state.count + 1
            };
        case "DECREMENT":
            // console.log(state.count+"asdf")
            return{
                ...state,
                count : state.count - 1
            };
        default:
            return state;

    }

}

//Happy Reducer
const Happy = (action,state={happy:true})=>{
    switch(action.type){
    case 'PLAY':
        return {
            ...state,
            happy:true
        }
    case 'HOMEWORK':{
        return {
            ...state,
            happy:false
        }
    }
    default:
        return state;
    }
}


function combineReducers(reducers){
    return (action,state = {})=>{
        Object.keys(reducers).forEach(reducerKey =>{
            const reducerFunction = reducers[reducerKey]
            state[reducerKey] = reducerFunction(action,state[reducerKey])
        })
        return state
    }

}

//Combining both reducers
const allReducers = combineReducers({
    Counter,Happy

})

const store = createStore(allReducers);

// This can be replaced with functional components
store.subscribe(()=>{
    console.log("1. I am getting changed!",store.getState())
})

store.dispatch({type:"INCREMENT"});
store.dispatch({type:"INCREMENT"});
store.dispatch({type:"DECREMENT"});
store.dispatch({type:"HOMEWORK"});
console.log(store.getState());

