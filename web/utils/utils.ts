export const fetcher = (url: string, options?: {[prop: string]: any}) => {
    return fetch(url, options).then(res=>res.json())
}

export function isNullString(str: string|null|undefined) {
    if (str === undefined || str === null || str === '') {
        return true
    }
    return false
}


interface fetcherPostParam {
    url: string
    payload: {[prop: string]: any} | undefined
}
export const fetcherPost = ({url='', payload=undefined}: fetcherPostParam) => {
    const options: {[prop: string]: any} = {
        method: payload ? "POST" : "GET",
        ...(payload && {body: payload}),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    return fetch(url, options).then(r => r.json());
};


export const isArray = (v: string) => {
    if (v.constructor.name == 'Array') {
        return true
    }

    return false
}

export function shorter(s: string|undefined|null) {
    if (isNullString(s)) {
        return ''
    }
    if (s==undefined) {
        return ''
    }
    if (s.length > 8) {
        return s.slice(0, 6) + '...' + s.slice(-4)
    } else {
        return s
    }
}

export function trimLast(s: string, len = 10) {
    if (s.length > len) {
        return s.slice(0, len - 2) + '..'
    } else {
        return s
    }
}

export function sortByToInt(sortBy: string) {
    if (sortBy === 'RankLowToHigh') {
        return 0
    } else if (sortBy === 'RankHighToLow') {
        return 1
    } else if (sortBy === 'NftIdLowToHigh') {
        return 2
    } else if (sortBy === 'NftIdHighToLow') {
        return 3
    } else {
        return 0
    }
}

export function formatFloat(f: number|undefined) {
    if (!f) {
        return ''
    }

    let s = f.toFixed(2)
    if (s.endsWith('.00')) {
        return s.substr(0, s.length - 3)
    } else if (s.endsWith('0')) {
        return s.substr(0, s.length - 1)
    } else {
        return s
    }
}

export function formatLargeNumber(f: number|undefined) {
    if (!f) {
        return ''
    }
    if (f > 1000000) {
        return formatFloat(f / 1000000) + "m"
    } else if (f > 1000) {
        return formatFloat(f / 1000) + "k"
    } else {
        return formatFloat(f)
    }
}

export function formatNumberWithComer(n: number) {
    if (n < 1000) {
        return n.toString()
    } else if (n < 1000000) {
        var s = n.toString()

    }
}