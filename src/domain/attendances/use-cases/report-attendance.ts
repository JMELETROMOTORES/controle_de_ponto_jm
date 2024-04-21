import { Either } from "@/core/either";
import { Attendance } from "../entities/attendances";

type ReportUseCaseResponse = Either<
    null,
    {
        attendance: Attendance;
    }
>;

