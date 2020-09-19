var sieve = function(n) {
    var array = [];
    var upperLimit = Math.sqrt(n);
    var primes = [2];

    for (var i = 0; i < n; i++)
        array.push(1);

    for (var i = 3; i <= upperLimit; i += 2) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i * 2)
            array[j] = 0;
        }
    }

    for (var i = 3; i < n; i += 2) {
        if(array[i]) {
            primes.push(i);
        }
    }

    return primes;
};
window.addEventListener('DOMContentLoaded', function(e) {
    document.querySelector('#submit').addEventListener('click', function(e) {
        e.preventDefault();

        let hidden = document.querySelector('#hidden');
        let numbers = document.querySelector('#numbers');

        while(numbers.firstChild)
            numbers.removeChild(numbers.firstChild);

        let number = document.forms[0]['number'].value;

        document.querySelector('#limit').innerHTML = number;
        hidden.classList.remove('hidden');

        sieve(number).forEach(num => {
            let div = document.createElement('div');
            numbers.appendChild(div).innerHTML = num;
        });
    });
});