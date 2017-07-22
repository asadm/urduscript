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
    let warnas = ctx.next();
    let result = #`if ${ifparam} ${ifblock}`;
    while(!warnas.done){
			if (warnas.value.value.token.value === "warna"){
				let elseblock = ctx.next().value;
				result = result.concat(#`else ${elseblock}`)
			}

			if (warnas.value.value.token.value === "warnaagar"){
				let elseifparam = ctx.next().value;
				let elseifblock = ctx.next().value;

				result = result.concat(#`else if ${elseifparam} ${elseifblock}`)
				
				
			}

			warnas = ctx.next();
    }
    //console.log("warnas",warnas.value.token.value)
    
    return result
    //return #`if ${ifparam} ${ifblock}`;
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
export syntax likho = function (ctx) {
    let params = ctx.next().value
    //let wblock = ctx.next().value;
    return #`console.log ${params}`;
}

// function
export syntax tareeka = function (ctx) {
	let fname = ctx.next().value
	let fparam = ctx.next().value
	let fblock = ctx.next().value;

  return #`function ${fname} ${fparam} ${fblock}`;
}

// for and foreach loop
export syntax har = function (ctx) {
	let fparam = ctx.next().value
	
	if (fparam.type==="RawSyntax"){
		//foreach
		let fparamk = ctx.next().value;
		let fparamvar = ctx.next().value;
		let fblock = ctx.next().value;
		//ignore 'per' or 'pe' if present
		if (fblock.type==="RawSyntax" 
				&& fblock.value.token.value==="per"
				&& fblock.value.token.value==="pe"
			){
			fblock = ctx.next().value;
		}
		return #`for (var ${fparamvar} of ${fparam}) ${fblock}`;
	}
	else{
		let fblock = ctx.next().value;
		return #`for ${fparam} ${fblock}`;
	}
}