export const typeCodeToString = (code) =>{
    switch (code) {
        case 0:
        return ''
        case 1:
        return 'boolean'
        case 2:
        return 'input'
        default: return''
    }
}

export const stringToTypeCode = (string) =>{
    switch (string) {
        case 'boolean':
        return 1
        case 'input':
        return 2
        default: return 0
    }
}


export const makeNumberNice = (id) =>{
    if(id+1<10){
       return `0${id+1}.`
   }else{
       return `${id+1}.`
   }
}

export const doesCardExist = (id, cards) =>{
   return cards[id]?true:false
}