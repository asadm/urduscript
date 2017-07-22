// URDU.js headers
import {
  sach,
  galat, 
  samjho, 
  agar,
  jabtak,
	likho,
	tareeka,
	har
} from './src/keywords'

/////////////////////////////////
/*
samjho naam = "asad"
har (a=0; a<3; a++){
	salaam(naam)
}

*/
samjho sabNaam = ["asad","ahmed"]
har sabNaam k naam per{
	likho(naam)
}

//salaam(naam)
/*
tareeka salaam(naam){
	agar (naam === "ahmed"){
		likho("oye ahmed")
	}
	warnaagar (naam === "asad"){
		likho("oye asad")
	}
	warna {
		likho("mein kisi " + naam + " ko nai janta!")
	}
}

/*
agar (naam){
	likho("salaam " + naam)
}
warna {
	likho("Naam khali hai")
}
*/

/*
samjho a = 10
jabtak( a>0 ){
	agar ( a%2 ){
		likho("even", a)
	}
	warna{
		likho("odd", a)
	}
	a--
}
*/