
const getFisrtName = (fullname) => {
    return fullname.split(' ')[0];
}

const getLastName = (fullname) => fullname.split(' ')[1]

const name = 'carlos abraao';

console.log(getLastName(name));

const user = {
    name : 'Carlos',
    cities : ['Fortaleza', 'RJ', 'Teresina'],
    printPlacesLived() {
        return this.cities.map((city) => this.name + ' has lived in ' + city);
    }
}
console.log(user.printPlacesLived());

const multiplier = {
    numbers : [12, 13, 50],
    multiplyBy : 13,
    multiply(){
        return this.numbers.map((number) => number*this.multiplyBy);
    }
}

console.log(multiplier.multiply());