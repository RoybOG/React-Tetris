export function isNumber(value) {
  return !isNaN(Number(value));
}


export function min_null(a,b){
    if(a ==null || b==null){
        return a||b;
    }
    return Math.min(a,b)

}

export function max_null(a,b){
    if(a ==null || b==null){
        return a||b;
    }
    return Math.max(a,b)

}