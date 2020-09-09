export default (lengthText) => {
    const maxLengthSMS = 70;
    const multiplier = Math.trunc(lengthText / maxLengthSMS) + 1;

    if (multiplier > 1) {
        return (maxLengthSMS * multiplier) - lengthText;
    }

    return maxLengthSMS - lengthText;
}