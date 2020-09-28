/***
 * Skrypt do sita Eratostenesa.
 * Zawiera on logikę, która używana jest do załadowania i wykonania działań na stronie generowanej przez plik index.html.
 **/
/**
 * Funkcja wyznacza kolejne liczby pierwsze w zakresie 1 - n.
 * Dla przypomnienia:
 * Liczba pierwsza, to liczba, która ma dwa dokładnie dwa dzielniki całkowite: jeden i samą siebie.
 * 
 * @param {number} n Zakres przesiewania.
 */
var sieve = function(n) {
	/**
	 * Tutaj funkcja została zadeklarowana w postaci zmiennej,
	 * co oznaczone jest słowem kluczowym var.
	 * Oczywiście nie jest to jedyny sposób deklaracji funkcji.
	 * Drugim sposobem jest - tak jak to ma miejsce
	 * w innych językach programowania - użycie słowa kluczowego function.
	 * W powyższym przypadku wyglądałoby to następująco:
	 * function sieve(n) {
	 * 	// Tutaj "ciało" funkcji znajdujące się poniżej tego komentarza blokowego.
	 * }
	 * Trzecim sposobem deklaracji funkcji jest utworzenie funkcji anonimowej - o tym za chwilę.
	 */
	/**
	 * Zmienna lokalna, która przechowuje tablicę wszystkich liczb z zakresu,
	 * który będzie przesiewany przez sito.
	 */
	let array = [];
	/**
	 * Górny limit przesiewania.
	 */
	let upperLimit = Math.sqrt(n);
	/**
	 * Tablica liczb pierwszych.
	 * Elementem, który już w niej istnieje jest cyfra 2, która jest jedyna parzystą liczbą pierwszą.
	 */
	let primes = [2];

	/**
	 * Pętle w języku programowania służą do wykonywania określonych poleceń określoną ilość razy.
	 * Pętla for użyta poniżej posiada trzy argumenty oddzielone średnikami.
	 * Są to:
	 * 1. Inicjalizacja licznika, który później będzie wykorzystywany do określenia liczby przebiegów pętli.
	 * 2. Warunek, którego spełnienie spowoduje wyjście z pętli.
	 * 3. Operacja na liczniku.
	 * 
	 * W tym przypadku pętla ma za zadanie wstawić tyle elementów do tablicy array
	 * zadeklarowanej powyżej, jaką wartość przyjął argument n funkcji.
	 */
	for (let i = 0; i < n; i++)
		array.push(1);

	/**
	 * "Ciało" pętli jak też wszystkich innych struktur języków programowania
	 * ujmuje się zwykle w nawiasy klamrowe, jak w pętli poniżej.
	 * Wyjątkiem jest sytuacja, kiedy w pętli czy innej strukturze
	 * (np. instrukcji warunkowej if) mamy do wykonania tylko jedno polecenie.
	 * Taka sytuacja miała miejsce w powyższej pętli.
	 */
	/**
	 * Pętla for umieszczona poniżej wykonuje na każdej z liczb działania,
	 * które mają na celu sprawdzenie ich "pierwszości".
	 * W przypadku kiedy liczba nie jest liczbą pierwszą, w jej miejsce wstawiane jest zero,
	 * co później zostanie odczytane jako logiczna wartość false.
	 */
	for (let i = 3; i <= upperLimit; i += 2) {
		if (array[i]) {
			for (let j = i * i; j < n; j += i * 2)
				array[j] = 0;
		}
	}

	/**
	 * W poniższej pętli for wykorzystana zostaje tablica wygenerowana powyżej.
	 * Liczby, które nie są zerami, co warunek if(array[i]) odczytuje jako prawdę
	 * (wszystkie liczby powyżej zera są odczytywane jako wartość logiczna true - prawda),
	 * zostają wstawione do tablicy liczb pierwszych.
	 */
	for (let i = 3; i < n; i += 2) {
		if(array[i])
			primes.push(i);
	}

	/**
	 * Słowo kluczowe return służy do określenia zwracanej przez funkcję wartości.
	 * W tym przypadku zwracana jest tablica liczb pierwszych - primes.
	 */
	return primes;
};
/**
 * Skrypt umieszczony poniżej służy do obsługi formularza na stronie.
 * Pierwsze, co dobrze jest wykonać, to zadbać o to,
 * aby ładowanie skryptu mogło odbyć się w dowolnym miejscu na stronie.
 * Dlatego użyte zostało zdarzenie DOMContentLoaded przypisane do okna przeglądarki (element window).
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Samo zdarzenie DOMContentLoaded sprawdza, czy cała zawartość obiektu HTML została już wczytana.
 * DOM jest to skrót od Document Object Model, a więc obiektowego modelu dokumentu.
 * Oznacza to, że dokument HTML, którym jest nasza strona jest obiektem (zbiorem) znaczników,
 * które są ze sobą powiązane. Można to na wiele sposobów wykorzystać.
 * Między innymi do celów interakcji pomiędzy tymi elementami, co za chwilę opisze w skrypcie.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Metoda addEventListener() przyjmuje dwa argumenty:
 * 1. Nasłuchiwane zdarzenie.
 * 2. Funkcja do wykonania, kiedy wystąpi zdarzenie nasłuchiwane w metodzie.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Pierwszym argumentem w tym przypadku jest opisany wyżej DOMContentLoaded.
 * Pozwala to na załadowanie pliku ze skryptem w dowolnym miejscu na stronie.
 * Dlaczego to takie ważne?
 * Ponieważ skrypty operujące na elementach strony "widzą" tylko te znaczniki,
 * które zostały załadowane przed wywołaniem skryptu.
 * Jeśli skrypt zostanie załadowany na początku strony, to właściwie nie ma on na czym operować,
 * ponieważ strona nie została jeszcze wczytana - jedynie znaczniki meta i ewentualnie arkusz stylów.
 * Więc, jeśli pierwszego nasłuchiwania by nie było,
 * to następne nasłuchiwanie (element o właściwości id="submit") wyprodukowałoby błąd,
 * ponieważ ten element jeszcze - w momencie ładowania skryptu - nie istniał.
 * Rozwiązaniem tego problemu byłoby załadowanie skryptu na dole strony,
 * po wczytaniu ostatniego znacznika sekcji <body>.
 * 
 * Tutaj drugi argument został zadeklarowany jako funkcja anonimowa. Jak można zauważyć,
 * nie posiada ona nazwy, a jedynie słowo kluczowe function z nawiasami klamrowymi.
 * Oznacza to, że tej funkcji nie można wykorzystać w innym miejscu kodu.
 * Funkcje anonimowe są dobrym rozwiązaniem w przypadkach, kiedy kod wewnątrz tej funkcji
 * ma zastosowanie tylko w określonym miejscu.
 * Przykładowo poniżej, gdzie wszystkie wykonywane wewnątrz operacje zależą od tego,
 * czy zostanie wywołane zdarzenie wczytania pełnego drzewa dokumentu.
 */
window.addEventListener('DOMContentLoaded', function() {
	/**
	 * document jest obiektem odnoszącym się do całego drzewa dokumentu HTML (DOM).
	 * Metoda querySelector() jest jednym ze sposobów uzyskiwania dostępu
	 * do konkretnego elementu w drzewie dokumentu.
	 * Jako argument przyjmuje ona oznaczenie elementu.
	 * Zwraca on zawsze tylko pierwszy element, który pasuje do podanego w argumencie selektora.
	 * Może to być, jak w poniższym przykładzie, identyfikator (właściwość id w znaczniku),
	 * może to też być klasa albo cały znacznik, np div.
	 * Aby określić element, oznaczamy go dokładnie w taki sam sposób,
	 * jak w CSS, czyli dla identyfikatorów oznaczeniem jest # (płotek), dla klas jest to . (kropka),
	 * a kiedy chcemy odnieść się do znacznika, po prostu wpisujemy jego nazwę.
	 * Przykład:
	 * 	document.querySelector('#identyfikator') wykona dalsze operacje dla podanego identyfikatora.
	 * 	document.querySelector('.klasa') wykona dalsze operacje dla pierwszego elementu z podaną klasą.
	 * 	document.querySelector('div') wykona operacje dla pierwszego elementu danego typu na stronie.
	 * 	document.querySelector('div.klasa') wykona operacje dla pierwszego elementu danego typu na stronie, które posiada podaną klasę.
	 * Argumentem tej funkcji może być więcej niż jeden selektor. Wystarczy kolejne selektory oddzielić przecinkiem.
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Poniższą metodę querySelector('#submit') możemy zastąpić metodą getElementById('submit').
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Podobnie jak powyżej w przypadku zdarzenia wczytania DOM, tak i tutaj zastosowane zostało nasłuchiwanie zdarzenia.
	 * Tym razem dotyczy ono jednego elementu (który ma właściwość id="submit"), co zostało zaznaczone powyżej.
	 * Nasłuchiwanym zdarzeniem jest tutaj kliknięcie tego elementu.
	 * Funkcja zwrotna (również anonimowa) posiada w deklaracji argument e. Jest to zmienna przechowująca informacje o zdarzeniu.
	 * W wielu przypadkach, wykonanie zdarzenia da określonym elemencie wywołuje jakąś domyślną akcję.
	 * Tutaj elementem nasłuchiwanym jest przycisk wysyłający dane z formularza (submit).
	 */
	document.querySelector('#submit').addEventListener('click', function(e) {
		/**
		 * Domyślną akcją tego przycisku jest przeładowanie strony na podaną w parametrze action znacznika <form>.
		 * Aby zapobiec wykonaniu domyślnej akcji, konieczne jest odwołanie się do zdarzenia (w czym pomaga zmienna e).
		 * Metoda preventDefault() służy właśnie do powstrzymania wykonania domyślnej akcji na elemencie.
		 */
		e.preventDefault();

		/**
		 * Deklaracja zmiennych używanych później w kodzie.
		 * Zmienne te przyjmują wartości wybranych elementów.
		 * W komentarzu liniowym po inicjalizacji zmiennej wstawiony został alternatywny kod o tym samym działaniu,
		 * który wykorzystuje metodę getElementById() do przechwycenia określonego elementu.
		 */
		/**
		 * Ukryty element sekcji wyświetlającej wynik działania skryptu.
		 */
		let hidden = document.querySelector('#hidden'); // let document.getElementById('hidden');
		/**
		 * Pole, w którym wyświetlony zostanie efekt działania skryptu.
		 */
		let numbers = document.querySelector('#numbers'); // let document.getElementById('numbers');

		/**
		 * Pętla while wykonuje określona przez argument liczbę powtórzeń.
		 * Dopóki argument jest spełniony, pętla pracuje.
		 * W tym przypadku ma ona za zadanie usunięcie wszystkich elementów z określonego elementu nadrzędnego.
		 * Cel wykonania tej operacji jest taki, że kiedy zmieniony zostanie argument w polu formularza,
		 * wynik działania skryptu wywołany wcześniej musi zostać usunięty, aby liczby się nie dublowały.
		 */
		while(numbers.firstChild)
			numbers.removeChild(numbers.firstChild);

		/**
		 * Zmienna number przyjmuje wartość pola formularza, w którym znajduje się docelowa liczba elementów do przesiania.
		 */
		let number = document.forms[0]['number'].value;

		/**
		 * Pole innerHTML wstawia podaną treść w określonym elemencie.
		 * Tutaj przechwycony przez metodę querySelector() element o id="limit" wstawia górny zakres do przesiania.
		 */
		document.querySelector('#limit').innerHTML = number;
		/**
		 * Element id="hidden" domyślnie jest ukryty, jednak po wpisaniu liczby w polu i przesłaniu formularza,
		 * klasa .hidden zostaje usunięta i element staje się widoczny.
		 */
		hidden.classList.remove('hidden');

		/**
		 * Wywołanie wcześniej zadeklarowanej funkcji sieve(), która przyjmuje argument number.
		 * Ponieważ zwraca ona tablicę, można bezpośrednio na niej wykonywać operacje przypisane do tablic.
		 * Tutaj wykorzystana została metoda forEach, która dla każdego elementu tablicy wykona określone polecenia.
		 * Jako argument ta metoda przyjmuje funkcję zwrotną (callback),
		 * której pierwszym argumentem jest wartość pojedynczego elementu tablicy (tutaj: num).
		 */
		sieve(number).forEach(num => {
			/**
			 * DOM pozwala nie tylko na interakcję pomiędzy elementami, ale także tworzenie nowych elementów dynamicznie.
			 * Poniżej zastosowana została metoda createElement(), która tworzy podany w argumencie element.
			 * Nie dodaje go jednak do drzewa dokumentu.
			 * Wykonanie metody appendChild() przy określonym elemencie DOM umieszcza wewnątrz niego utworzony wcześniej element.
			 * Pole innerHTML dodaje do tworzonego elementu <div> liczbę pierwszą wygenerowana przez skrypt.
			 */
			/**
			 * Tworzony element div, w którym zostanie wyświetlona liczba.
			 */
			let col = document.createElement('div');
			col.classList.add('col-xxs-12', 'col-xs-12', 'col-s-12', 'col-m-6', 'col-l-6', 'col-xl-3', 'col-xxl-1', 'text-right');
			numbers.appendChild(col).appendChild(document.createElement('div')).innerHTML = num;
		});
	});
});