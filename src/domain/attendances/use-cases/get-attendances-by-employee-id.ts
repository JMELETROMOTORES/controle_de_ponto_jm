import { Either, left, right } from "@/core/either";
import { IUseCase } from "@/core/protocols/IUseCase";
import { NotFoundError } from "@/domain/employee/errors/Not-found-error";
import { Attendance } from "../entities/attendances";
import { AttendanceRepository } from "../repositories/attendance-repository";
import { AttendancesEmployees } from "../entities/value-objects/attendances-with-employees";


interface getSchedulesByIdUseCaseRequest {
    id: string;
}

type getSchedulesByIdUseCaseResponse = Either<
    NotFoundError,
    {
        attendances: AttendancesEmployees[];
    }
>;

export class GetSchedulesByEmployeeIdUseCase
    implements IUseCase<getSchedulesByIdUseCaseRequest, getSchedulesByIdUseCaseResponse>
{
    constructor(private attendanceRepository: AttendanceRepository) {}

    async execute({
        id,
    }: getSchedulesByIdUseCaseRequest): Promise<getSchedulesByIdUseCaseResponse> {
        const attendances = await this.attendanceRepository.findByEmployeeId(id);

        if (!attendances) {
            return left(new NotFoundError());
        }

        return right({
          attendances,
        });
    }
}

