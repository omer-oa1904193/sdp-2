import {SEASONS, SEASONS_ORDER} from "@/constants.js";

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

export function compareSemesters(semester1, semester2) {
    let [season1, year1] = semester1.split(" ");
    year1 = Number(year1);
    let [season2, year2] = semester2.split(" ");
    year2 = Number(year2);
    // noinspection CommaExpressionJS
    const seasonsOrder = SEASONS_ORDER.reduce((obj, val, idx) => (obj[val] = idx, obj), {});
    if (year1 === year2) {
        return seasonsOrder[season1] - seasonsOrder[season2];
    } else {
        return year1 - year2;
    }
}


export function compareMappings(mapping1, mapping2) {
    return compareSemesters(`${mapping1.season} ${mapping1.year}`, `${mapping2.season} ${mapping2.year}`);
}


export function getEarliestMapping(mappings) {
    let latest = null;

    for (let i = 0; i < mappings.length; i++) {
        if (latest === null || compareMappings(mappings[i], latest) < 0)
            latest = mappings[i];
    }

    return latest;
}

export function getNextMajorTerm(semester) {
    let [season, year] = semester.split(" ");
    year = Number(year);
    let nextSeason;
    let nextYear;

    if (season === SEASONS.SPRING || season === SEASONS.SUMMER) {
        nextYear = year;
        nextSeason = SEASONS.FALL;
    } else if (season === SEASONS.FALL || season === SEASONS.WINTER) {
        nextSeason = SEASONS.SPRING;
        nextYear = year + 1;
    }

    return `${nextSeason} ${nextYear}`;
}