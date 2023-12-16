// 实现 storage 基础 api
const myLocalStorage = (() => {
    let store = {};

    return {
        getItem: (key) => {
            const expireDate = store[`${key}_expires`];
            if (expireDate && new Date() > new Date(Number(expireDate))) {
                delete store[key];
                delete store[`${key}_expires`];
            }
            return store[key] || null;
        },
        setItem: (key, value, expires) => {
            if (typeof expires !== 'undefined') {
                const expiresDate = new Date(expires).valueOf();
                store[`${key}_expires`] = expiresDate;
            }
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    }
})();

Object.defineProperty(window, 'myLocalStorage', { value: myLocalStorage });

const myLocalStorageByCookie = (() => {
    const getCookies = () => {
        return document.cookie.match(/([^;=]+)=(^;=)+/g) || [];
    }

    const thousandYears = 1e3 * 365 * 24 * 36*5;
    const getExpires = (flag) => {
        flag = flag || 1;
        return `expires=${(new Date((+new Date()) + thousandYears * flag)).toUTCString()}`;
    }

    const setItem = (key, value, isExpired) => {
        document.cookie = [
            `${key}=${encodeURIComponent((value))}`,
            getExpires(isExpired ? -1 : 1),
            'path=/'
        ].join('; ');
    };
    const getItem = (key) => {
       const cookies = getCookies();
       for (let i = 0; i < cookies.length; i++) {
           const params = cookies[i].match(/^\s*([^=]+)=(.+)/);
           console.log('params', params);
           if (params[1] === key.toString()) {
               return decodeURIComponent(params[1]);
           }
       }

       return null;
    };
    const removeItem = (key) => {
        setItem(key, '', true);
    }

    const clear = () => {
        const cookies = getCookies();
        for (let i = 0; i < cookies.length; i++) {
            const key = cookies[i].match(/^s*([^=]+)/)[1];
            removeItem(key);
        }
    }

    return {
        getItem,
        setItem,
        removeItem,
        clear,
    }
})();

Object.defineProperty(window, 'myLocalStorage', { value: myLocalStorageByCookie });

myLocalStorage.setItem('ramona', 1001);
myLocalStorage.getItem('ramona'); // '1001'
myLocalStorage.removeItem('ramona');
const key = { name: 'ramona' };
myLocalStorage.setItem(key, 'chen');
myLocalStorage.getItem(key); // 'chen'
let key2 = {}
localStorage.setItem(key2, '11')
localStorage.getItem(key2); // "11"
localStorage.getItem(key); // "11"
myLocalStorage.clear();
myLocalStorage.getItem(key);