'lang sweet.js';

// true
export syntax sach = function (ctx) {
    return #`true`;
}

// false
export syntax galat = function (ctx) {
    return #`false`;
}

// if
export syntax agar = function (ctx) {
    let ifparam = ctx.next().value
    let ifblock = ctx.next().value;
    let warnas = ctx.next().value;
    let elseblock = ctx.next().value;
    
    if (warnas.value.token.value === "warna"){
        return #`if ${ifparam} ${ifblock} else ${elseblock}`;
    }
    return #`if ${ifparam} ${ifblock}`;
}


// var
export syntax samjho = function (ctx) {
    return #`var`;
}

// while
export syntax jabtak = function (ctx) {
    let wparam = ctx.next().value
    let wblock = ctx.next().value;
    return #`while ${wparam} ${wblock}`;
}

// console.log
export syntax bolo = function (ctx) {
    let params = ctx.next().value
    //let wblock = ctx.next().value;
    return #`console.log ${params}`;
}