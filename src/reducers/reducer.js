export function taskReducer(state = [], action) {
  switch (action.type) {
    case '@task/added':
      return [...state, action.payload];
    case '@task/removed':
      return state.filter(task => task.id !== parseInt(action.payload.id));
    case '@task/stroked':
    return state.map(task => {
      if(task.id === parseInt(action.payload.id)){
        return {...task, done: action.payload.done};
      }  
      return task;
    })
    
    case '@task/updated':
    return state.map(task => {
      if(task.id === parseInt(action.payload.id)){
        return {...task, value: action.payload.value};
      }  
      return task;
    })

    default: 
    return state;
  }
}