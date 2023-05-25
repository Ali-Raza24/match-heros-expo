import moment from "moment";

export function generateLoopOfNumbers(number) {
    const arr = [];
    for (let i = 1; i <= number; i++) {
        arr.push(i);
    }
    return function () {
        return arr;
    }
}

export const gameStartsAtFormatedDate = (dateTime) => {
    return moment(dateTime).format('DD. MMM YYYY HH:mm')
}

export const getMinHour = () => {
    const date = new Date();
    date.setHours(9, 0, 0, 0);
    return date.getHours();
}