// domain/value-objects/LunchTime.ts

export class LunchTime {
    constructor(
        private readonly start: Date,
        private readonly end: Date,
    ) {
        if (end <= start) {
            throw new Error("End time must be after start time");
        }
    }

    getStart(): Date {
        return this.start;
    }

    getEnd(): Date {
        return this.end;
    }
}

