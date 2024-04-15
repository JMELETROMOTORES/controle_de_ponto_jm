import { Attendance } from "@/domain/attendances/entities/attendances";
import {
    AttendanceRepository,
    IListAttendancesRequest,
    IListAttendancesResponse,
} from "@/domain/attendances/repositories/attendance-repository";
import { PrismaClient } from "@prisma/client";
import { context } from "../context";
import { PrismaAttendanceMapper } from "../mappers/prisma-attendance-mapper";

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
                          name: {
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
        });

        if (!attendancesP) return null;

        const attendances = await Promise.all(
            attendancesP.map(async (attendanceP) => {
                return PrismaAttendanceMapper.toDomain(attendanceP);
            }),
        );

        return {
            attendances,
            count,
        };
    }
}

export { AttendancePrismaRepository };

