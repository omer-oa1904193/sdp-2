import {SEASONS} from "@/constants.js";

export function range(size, start = 0) {
    return [...Array(size).keys()].map(i => i + start);
}

export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "QAR",
    maximumFractionDigits: 0
});


//from https://stackoverflow.com/a/42196290/14200676
export function encodeUrlQueryParams(data) {
    const params = Object.keys(data).map(key => data[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : "");
    return params.filter(value => !!value).join("&");
}


export function compareMappings(mapping1, mapping2) {
    // noinspection CommaExpressionJS
    const seasonsOrder = SEASONS.reduce((obj, val, idx) => (obj[val] = idx, obj), {});
    if (mapping1.yearOrder === mapping2.yearOrder) {
        return seasonsOrder[mapping1.season] - seasonsOrder[mapping2.season];
    } else {
        return mapping1.yearOrder - mapping2.yearOrder;
    }
}


export function getEarliestMapping(mappings) {
    let latest = null;

    for (let i = 0; i < mappings.length; i++) {
        if (latest === null || compareMappings(mappings[i], latest) < 0)
            latest = mappings[i];
    }

    return latest;
}