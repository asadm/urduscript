// URDU.js headers
import {
	sach,
	galat, 
	samjho, 
	agar,
	jabtak,
	bolo
} from './src/keywords'

/*import {
	bolo
} from './src/primitives'*/
/////////////////////////////////

samjho naam = "ahmed"

agar (naam){
	bolo("salaam " + naam)
}
warna {
	bolo("kon ho bhai?")
}


samjho a = 10
jabtak(a>0){
	agar (a%2){
		bolo("even", a)
	}
	warna{
		bolo("odd", a)
	}
	a--
}