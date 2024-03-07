import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { JourneyRepository } from "@/domain/journey/repositories/journey-repository";
import { Attendance } from "../entities/attendances";
import { NotFoundAttendanceError } from "../errors/Not-found-attendance-error";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../errors/employee-not-have-journey-error";
import { IDateProvider } from "../providers/IDateProvider";
import { AttendanceRepository } from "../repositories/attendance-repository";

export interface IRegisterLunchEndAttendanceDTO {
    id: string;
    rfid: string;
    lunchEnd: Date;
}

type RegistertLunchEndAttendanceUseCaseResponse = Either<
    NotFoundAttendanceError | NotFoundEmployeeError | EmployeeNotHaveAJourney,
    {
        attendance: Attendance;
    }
>;
export class RegisterLunchEndAttendanceUseCase
    implements
        IUseCase<
            IRegisterLunchEndAttendanceDTO,
            RegistertLunchEndAttendanceUseCaseResponse
        >
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private readonly dayjsProvider: IDateProvider,
        private readonly employeeRepository: EmployeeRepository,
        private readonly journeyRepository: JourneyRepository,
    ) {}

    async execute({
        id,
        rfid,
        lunchEnd,
    }: IRegisterLunchEndAttendanceDTO): Promise<RegistertLunchEndAttendanceUseCaseResponse> {
        const attendance = await this.attendanceRepository.findById(id);

        if (!attendance) {
            return left(new NotFoundAttendanceError());
        }

        const employee = await this.employeeRepository.findByRfid(rfid);

        if (!employee) {
            return left(new NotFoundEmployeeError());
        }

        const journey = await this.journeyRepository.findById(
            employee.journeyId.toString(),
        );

        if (!journey) {
            return left(new EmployeeNotHaveAJourney());
        }

        const delayWithLunchTime =
            this.dayjsProvider.calculateDelayWithLunchTime(
                journey.lunch_time_tolerance,
                attendance.lunchStart,
                lunchEnd,
            );

        attendance.lunchEnd = lunchEnd;
        attendance.delay += delayWithLunchTime;

        await this.attendanceRepository.save(attendance);

        return right({ attendance });
    }
}

