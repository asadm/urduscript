'lang sweet.js';

// null
export syntax khali = ctx => #`null`
export syntax khaali = ctx => #`null`

// true
export syntax sahi = ctx => #`true`

// false
export syntax galat = ctx => #`false`
export syntax ghalat = ctx => #`false`

// if
export syntax agar = function (ctx) {
	
    let ifparam = ctx.next().value
    let ifblock = ctx.next().value;
    let warnas = ctx.next();
    let ctxCounter = 3;
    let result = #`if ${ifparam} ${ifblock}`;
    while(!warnas.done){
		var isWarna = false;
			

			if (warnas.value.value.token.value === "warna"){
				let elseblock = ctx.next().value;
				result = result.concat(#`else ${elseblock}`)
				//isWarna = true;
				return result;
			}

			if (warnas.value.value.token.value === "warnaagar"){
				let elseifparam = ctx.next().value;
				let elseifblock = ctx.next().value;
				ctxCounter += 2
				result = result.concat(#`else if ${elseifparam} ${elseifblock}`)
				isWarna = true;
				
			}

			if (!isWarna) {
				// we fetched something beyond this code block. reset context and fwd correctly.
				ctx.reset()
				while (--ctxCounter){
					ctx.next()
				}
				
				return result;
			}

			warnas = ctx.next();
			ctxCounter++;
    }
    //console.log("warnas",warnas.value.token.value)
    
    return result
    //return #`if ${ifparam} ${ifblock}`;
}

// var
export syntax rakho = ctx => #`var`

// while
export syntax jabtak = function (ctx) {
    let wparam = ctx.next().value
    let wblock = ctx.next().value;
    return #`while ${wparam} ${wblock}`;
}

// console.log
export syntax likho = ctx => #`console.log ${ctx.next().value}`

// alert
export syntax _testAlert = ctx => #`alert ${ctx.next().value}`

// prompt (only works on browser right now)
export syntax pucho = ctx => #`prompt ${ctx.next().value}`

// function
export syntax kaam = function (ctx) {
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
				&& (fblock.value.token.value==="per" || fblock.value.token.value==="pe")
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

// return
export syntax bhejo = ctx => #`return ${ctx.next().value}`;

//do while
export syntax karo = function(ctx) {
	let dblock = ctx.next().value;
	let jabtak = ctx.next();
	if(jabtak.value != null){
		if(jabtak.value.value.token.value === "jabtak"){
		//console.log(jabtak.value.value.token.value);
		let jabtakparams = ctx.next().value;
		return #`do ${dblock} while ${jabtakparams}`;
		} else {
			return #`console.log("galti: karo ke liye jabtak hona lazmi hai!")`;
		}
	} else {
		return #`console.log("galti: karo ke liye jabtak hona lazmi hai!")`;
	}

}

// break
export syntax rukjao = (ctx) => #`break`;
