import { Attendance } from "@/domain/attendances/entities/attendances";
import {
    AttendanceRepository,
    IListAttendancesRequest,
    IListAttendancesResponse,
} from "@/domain/attendances/repositories/attendance-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaAttendanceMapper } from "../mappers/prisma-attendance-mapper";
import { PrismaAttendancesEmployeesMapper } from "../mappers/prism-attendance-with-employee-mapper";
import { AttendancesEmployees } from "@/domain/attendances/entities/value-objects/attendances-with-employees";

class AttendancePrismaRepository implements AttendanceRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }

    async findByRfid(rfid: string): Promise<Attendance | null> {
        const attendance = await this.prismaClient.attendance.findFirst({
            where: {
                rfid: rfid,
            },
        });
        if (!attendance) {
            return null;
        }

        return PrismaAttendanceMapper.toDomain(attendance);
    }

    async findByEmployeeId(employeeId: string): Promise<AttendancesEmployees[] | null> {
        const attendancesP = await this.prismaClient.attendance.findMany({
            where: {
                employeeId,
            },
            include: {
                employee: true,
            }
        });
        if (!attendancesP) {
            return null;
        }

        const attendances = await Promise.all(
            attendancesP.map(async (attendanceP) => {
                return PrismaAttendancesEmployeesMapper.toDomain(attendanceP);
            }),
        );

        return attendances;
    }
    async findById(id: string): Promise<Attendance | null> {
        const attendancesP = await this.prismaClient.attendance.findFirst({
            where: {
                id,
            },
        });
        if (!attendancesP) {
            return null;
        }

        return PrismaAttendanceMapper.toDomain(attendancesP);
    }

     async findByDateAndRfid(date: Date, rfid: string): Promise<Attendance | null> {
    
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); 
        
        const attendance = await this.prismaClient.attendance.findFirst({
            where: {
                rfid: rfid,
                date: {
                    gte: startOfDay, // Início do dia
                    lt: endOfDay, // Fim do dia
                },
            },
        });
        
        console.log('repositorio')

    console.log(attendance);
        if (!attendance) {
            return null;
        }

        return PrismaAttendanceMapper.toDomain(attendance);
    }

    async create(attendance: Attendance): Promise<void> {
        const data = PrismaAttendanceMapper.toPrisma(attendance);

        await this.prismaClient.attendance.create({ data });
    }

    async save(attendance: Attendance): Promise<void> {
        const data = PrismaAttendanceMapper.toPrisma(attendance);

        await this.prismaClient.attendance.update({
            where: {
                id: attendance.id.toString(),
            },
            data,
        });

    }

    async delete(attendance: Attendance): Promise<void> {
        await this.prismaClient.attendance.delete({
            where: {
                id: attendance.id.toString(),
            },
        });
    }

    async generateReport(rfid: string, startDate: Date, endDate: Date): Promise<Attendance[] | null> {

        const attendancesP = await this.prismaClient.attendance.findMany({
            where: {
                rfid: rfid,
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    
        if (!attendancesP) return null;

        const attendances = await Promise.all(
            attendancesP.map(async (attendanceP) => {
                return PrismaAttendanceMapper.toDomain(attendanceP);
            }),
        );

        return attendances;
    }

    async list({
        search,
        limit,
        offset,
    }: IListAttendancesRequest): Promise<IListAttendancesResponse | null> {
        const where = search
            ? {
                  OR: [
                      {
                          employeeId: {
                              contains: search,
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.attendance.count({});

        const attendancesP = await this.prismaClient.attendance.findMany({
            take: limit,
            skip: offset,
            where,
            include: {
                employee: true,
            }
        });

        if (!attendancesP) return null;

        const attendances = await Promise.all(
            attendancesP.map(async (attendanceP) => {
                return PrismaAttendancesEmployeesMapper.toDomain(attendanceP);
            }),
        );

        return {
            attendances,
            count,
        };
    }
}

export { AttendancePrismaRepository };

