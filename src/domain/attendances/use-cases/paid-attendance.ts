import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { EntityFinderService } from "@/domain/services/entity-finder-service";
import { Attendance } from "../entities/attendances";
import { NotFoundEmployeeError } from "../errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../errors/employee-not-have-journey-error";
import { IsSameDayError } from "../errors/is-same-day-error";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { Abonos } from "../entities/value-objects/abonos";

export interface IPaidAttendanceUseCaseDTO {
    rfid: string;
    date: Date;
    absenseReason: string;
}

type IPaidAttendanceUseCaseResponse = Either<
    null | NotFoundEmployeeError,
    {
        abonos: Abonos;
    }
>;
export class PaidAttendanceUseCase
    implements
        IUseCase<
        IPaidAttendanceUseCaseDTO,
        IPaidAttendanceUseCaseResponse
        >
{
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
        private entityFinderService: EntityFinderService,
    ) {}

    async execute({
        rfid,
        date,
        absenseReason
    }: IPaidAttendanceUseCaseDTO): Promise<IPaidAttendanceUseCaseResponse> {
        const result =
            await this.entityFinderService.findEntitiesNoAttendance(rfid);
        if (result.isLeft()) {
            return left(result.value);
        }

        const { employee } = result.value;

        const attendance = Attendance.create({
            rfid,
            date,
            absenseReason,
            paid: true,
            employeeId: employee.id.toString(),
        });

        const abonos = Abonos.create({
            rfid,
            date,
            absenseReason,
            paid: true,
        });
    
    

        await this.attendanceRepository.create(attendance);
        return right({ abonos });
    }
}

