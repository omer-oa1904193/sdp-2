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
