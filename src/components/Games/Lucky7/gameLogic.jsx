const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// class Lucky7Game {


//     constructor() {
//         this.value = 0;
//         this.rollHistory = [];

//     }

//     roll() {
//         let x = getRandomInt(2, 12)
//         this.setValue(x)
//         this.rollHistory.push(x);
//         console.log(this.rollHistory);


//     }

//     setValue(x) {
//         this.value = x;
//     }

//     getValue() {
//         return this.value;
//     }
// }

// export default Lucky7Game
export {getRandomInt}