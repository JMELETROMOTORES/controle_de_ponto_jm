import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
    try {
        const user = await prisma.user.create({
            data: {
                nome: employee.nome,
                email: employee.email,
                // Outros campos necessários
            },
        });
        console.log('Usuário criado:', user);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
}

async function migrateUsers() {
    const employees = await fetchEmployees();
    for (const employee of employees) {
        await createUser(employee);
    }
}

migrateUsers();
