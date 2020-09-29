export default class SMSInfo {
    constructor () {
        this.maxLengthSMS = 160
    }

    getLeftSymbols(text) {
        const isKyr = () => /[а-яё]/i.test(text);
        const isLat = () => /[a-z]/i.test(text);

        const { length } = text;


        if (isKyr()) {
            this.maxLengthSMS = 70;
        } else if (isLat()) {
            this.maxLengthSMS = 160;
        } else {

        }

        const multiplier = Math.trunc(length / this.maxLengthSMS) + 1;

        if (multiplier > 1) {
            return (this.maxLengthSMS * multiplier) - length;
        }

        return this.maxLengthSMS - length;
    }

    getCountSMS(text) { return Math.trunc(text.length / this.maxLengthSMS) }
}




