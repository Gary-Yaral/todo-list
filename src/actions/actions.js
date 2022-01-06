export const removeTask = (id) => {
  return {
    type: '@task/removed',
    payload: {
      id
    }
  }
}


export let newTask = (value) => {
  return {
    type: '@task/added',
    payload: {
      id: +new Date(),
      value,
      done: false
    }
  }  
}
export let strokeTask = (id, isDone) => {
  return {
      type: '@task/stroked',
      payload: {
        id,
        done: isDone     
      }
  }
}

export let updateTask = (id, value) => {
  return {
      type: '@task/updated',
      payload: {
        id,
        value    
      }
  }
}
