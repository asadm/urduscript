// URDU.js headers
import {
  sach,
  galat, 
  rakho, 
  agar,
  jabtak,
	likho,
	kaam,
	har,
	bhejo,
	khali,
	pucho,
	karo
} from './src/keywords'

/////////////////////////////////
/*
samjho naam = "asad"
har (a=0; a<3; a++){
	salaam(naam)
}

*/
/*
samjho sabNaam = ["asad","ahmed"]
har sabNaam k naam per{
	likho(naam)
}
*/
likho(salaam("asad"))
hello()

kaam salaam(naam){
	agar (naam === "ahmed"){
		wapas "oye ahmed"
	}
	warnaagar (naam === "asad"){
		wapas "oye asad"
	}
	warna {
		wapas "mein kisi " + naam + " ko nai janta!"
	}
}

kaam hello(){
	likho("hello")
}

/*
samjho naam = "asad"

agar (naam){
	likho("salaam " + naam)
}
warnaagar(naam===0) {
	likho("Naam khali hai")
}
warna{
	likho("kch")
}

likho ("end")
likho ("asad2")

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
