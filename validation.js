export const emailExists = (list,email)=>{
    return list.some(user => user.email === email);
}

export const userExists = (list,email,password)=>{
    return list.some(user => user.email === email && user.password === password);
}

export const validForChange = (list, id, password)=>{
    //check if id exist first
    return list.some(user => user.id === id && user.password === password);
    
}


export const loginWithEmailAndPassword = (list,email,password)=>{
    const tempList = list.filter(user => user.email === email && user.password === password);
    return tempList[0];
}

export const fetchUser = (list,id)=>{
    const tempList = list.filter(user => user.id === id);
    return tempList[0];
}

export const updateEmail = (list,id,email)=>{
    //get the user first
    const uList = list.filter(user => user.id === id);
    let user = uList[0];

    const tempList = list.filter(user => user.id !== id);
    return [
        ...tempList,
        {...user,email : email }
    ]
}

export const updateUsername = (list,id,username)=>{
    //get the user first
    const uList = list.filter(user => user.id === id);
    let user = uList[0];

    const tempList = list.filter(user => user.id !== id);
    return [
        ...tempList,
        {...user,username : username }
    ]
    
}

export const updatePassword = (list,id,password)=>{
    //get the user first
    const uList = list.filter(user => user.id === id);
    let user = uList[0];

    const tempList = list.filter(user => user.id !== id);
    return [
        ...tempList,
        {...user,password : password }
    ]
}

export const deletUser = (list,id)=>{
    const tempList = list.filter(user => user.id !== id);
    return tempList;
}