import { AbsenceAllowance } from "@/domain/absence-allowance/entities/absence-allowance";
import { AbsenceAllowanceRepository, IListAbsenceAllowancesRequest, IListAbsenceAllowancesResponse } from "@/domain/absence-allowance/repositories/absence-allowance-repository";


export class InMemoryAbsenceAllowanceRepository implements AbsenceAllowanceRepository {
    public items: AbsenceAllowance[] = [];

    async findById(id: string): Promise<AbsenceAllowance | null> {
        const absenceallowance = this.items.find(
            (absenceallowance) => absenceallowance.id.toString() === id,
        );

        return absenceallowance || null;
    }


    async save(absenceallowance: AbsenceAllowance): Promise<void> {
        const index = this.items.findIndex((p) => p.id.equals(absenceallowance.id));

        this.items[index] = absenceallowance;
    }

    async create(absenceallowance: AbsenceAllowance): Promise<void> {
        this.items.push(absenceallowance);
    }

    async delete(absenceallowance: AbsenceAllowance): Promise<void> {
        this.items = this.items.filter((p) => !p.id.equals(absenceallowance.id));
    }

    async findByEmployeeId(employeeId: string): Promise<AbsenceAllowance[]> {
        return this.items.filter((absenceallowance) => absenceallowance.employeeId === employeeId);
    }

    async list({
        search,
        limit,
        offset,
    }: IListAbsenceAllowancesRequest): Promise<IListAbsenceAllowancesResponse> {
        let filteredAbsenceAllowances = this.items;

        if (search) {
            filteredAbsenceAllowances = this.items.filter((user) =>
                user.reason.toLowerCase().includes(search.toLowerCase()),
            );
        }

        const startIndex = offset || 0;
        const endIndex = startIndex + (limit || this.items.length);
        const paginatedAbsenceAllowances = filteredAbsenceAllowances.slice(
            startIndex,
            endIndex,
        );
        return {
            absenceallowances: paginatedAbsenceAllowances,
            count: this.items.length,
        };
    }
}

