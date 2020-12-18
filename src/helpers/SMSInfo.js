export function sms_count(text) {
    const nonLatinPattern = /[\u0400-\u04FF\{\}\[\]\\\|\^\~\€]/;
    let sms_total = 0
    const len = text.length;
    let divider;

    if (nonLatinPattern.test(text)) {
        sms_total = len > 70 ? Math.ceil(len / 67) : 1;
        divider = sms_total > 1 ? 67 : 70
    } else {
        sms_total = len > 160 ? Math.ceil(len / 153) : 1;
        divider = sms_total > 1 ? 153 : 160
    }

    return { length: (divider * sms_total) - len, total: sms_total }
};