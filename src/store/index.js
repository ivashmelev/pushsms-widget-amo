export const PUSHSMSURL = 'api.pushsms.ru';
export const isDev = false;

if (process.env.NODE_ENV === 'production') {
    // PUSHSMSURL = 'staging.api.pushsms.ru';
    // isDev = true;
}
