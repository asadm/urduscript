// URDU.js headers
import {
  sach,
  galat, 
  samjho, 
  agar,
  jabtak,
	likho,
	tareeka
} from './src/keywords'

/////////////////////////////////

samjho naam = "asad"
salaam(naam)

tareeka salaam(naam){
	agar (naam === "ahmed"){
		likho("oye ahmed")
	}
	warnaagar (naam === "asad"){
		likho("oye asad")
	}
	warna {
		likho("naam to likhen?")
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