// src/domain/services/EntityFinderService.ts

import { Either, left, right } from "@/core/either";

import { Employee } from "@/domain/employee/entities/employee";
import { Journey } from "@/domain/journey/entities/journey";

import { Attendance } from "../attendances/entities/attendances";
import { NotFoundAttendanceError } from "../attendances/errors/Not-found-attendance-error";
import { NotFoundEmployeeError } from "../attendances/errors/Not-found-employee-error";
import { EmployeeNotHaveAJourney } from "../attendances/errors/employee-not-have-journey-error";
import { AttendanceRepository } from "../attendances/repositories/attendance-repository";
import { EmployeeRepository } from "../employee/repositories/employee-repository";
import { JourneyRepository } from "../journey/repositories/journey-repository";

export class EntityFinderService {
    constructor(
        private attendanceRepository: AttendanceRepository,
        private employeeRepository: EmployeeRepository,
        private journeyRepository: JourneyRepository,
    ) {}

    async findEntities(
        date: Date,
        rfid: string,
    ): Promise<
        Either<
            | NotFoundAttendanceError
            | NotFoundEmployeeError
            | EmployeeNotHaveAJourney,
            { attendance: Attendance; employee: Employee; journey: Journey }
        >
    > {
        const attendance = await this.attendanceRepository.findByDateAndRfid(date, rfid);
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

        return right({ attendance, employee, journey });
    }

    async findEntitiesNoAttendance(
        rfid: string,
    ): Promise<
        Either<
            | NotFoundAttendanceError
            | NotFoundEmployeeError
            | EmployeeNotHaveAJourney,
            { employee: Employee; journey: Journey }
        >
    > {
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

        return right({ employee, journey });
    }

    async findEntitiesId(
        id: string,
        rfid: string,
    ): Promise<
        Either<
            | NotFoundAttendanceError
            | NotFoundEmployeeError
            | EmployeeNotHaveAJourney,
            { attendance: Attendance; employee: Employee; journey: Journey }
        >
    > {
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

        return right({ attendance, employee, journey });
    }
    
}

