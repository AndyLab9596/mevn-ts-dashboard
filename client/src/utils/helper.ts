import jwtDecode from "jwt-decode";

const extractExpirationDate = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp
}

const debounce = (fn: void, delay: number) => {
    let id: number | undefined;

    return () => {
        if (id) clearTimeout(id);
        id = setTimeout(() => {
            fn
        }, delay)
    }
}

export {
    extractExpirationDate,
    debounce
}