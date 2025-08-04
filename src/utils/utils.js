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

export function find_new_max_key(obj, prev_max_key){ //Finds the current biggest key in an object with numbered keys
    if(prev_max_key in obj){
        return prev_max_key;
    }

    if(Object.keys(obj).length > 0 && prev_max_key != null){
        for(let k=Number(prev_max_key); k >= 0; k-- ){
            if(k in obj){
                return k;
            }
        }
    }
    

    return null;
}


export function find_new_min_key(obj, prev_min_key, max_key){ //Finds the current smallest key in an object with numbered keys
    if(prev_min_key in obj){
        return prev_min_key;
    }

    //console.log((prev_min_key || max_key) == null)
    if(Object.keys(obj).length > 0 && (prev_min_key || max_key) != null){
        for(let k=prev_min_key; k <= max_key; k++ ){
            if(k in obj){
                return k;
            }
        }
    }
    

    return null;
}

export function do_ranges_overlap(aMin,aMax, bMin, bMax){
    return !(aMin>bMax||aMax<bMin)
}