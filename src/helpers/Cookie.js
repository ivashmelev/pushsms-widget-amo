export default class Cookie {
    set(name, value, options = {}) {
        options = {
            path: '/',
            ...options,
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        for (const optionKey in options) {
            updatedCookie += `; ${optionKey}`;
            const optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += `=${optionValue}`;
            }
        }

        document.cookie = updatedCookie;
    }

    get(cookie) {
        try {
            const cookies = document.cookie.split(';');

            const element = cookies.find((el) => el.includes(cookie));

            return element.split('=')[1];
        } catch {
            return false;
        }
    }

    delete(cookie) {
        this.set(cookie, '', {
            'max-age': -1,
        });
    }
}
