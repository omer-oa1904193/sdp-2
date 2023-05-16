import {Season} from "./models/enums/Season.js";

export function getNextMajorTerm(season: Season, year: number): [Season, number] {
    let nextSeason: Season;
    let nextYear: number;

    if (season == Season.SPRING || season == Season.SUMMER) {
        nextYear = year;
        nextSeason = Season.FALL;
    } else if (season == Season.FALL || season == Season.WINTER) {
        nextSeason = Season.SPRING;
        nextYear = year + 1;
    } else throw new Error("Unexpected arguments");

    return [nextSeason, nextYear];
}

export function getNthNextMajorTerm(startingSeason: Season, startingYear: number, n: number): [Season, number] {
    let endSeason: Season = startingSeason;
    let endYear: number = startingYear;

    for (let i = 1; i <= n; i++)
        [endSeason, endYear] = getNextMajorTerm(endSeason, endYear);

    return [endSeason, endYear];
}