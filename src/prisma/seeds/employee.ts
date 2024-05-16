import { PrismaClient } from "@prisma/client";

export const seedEmployee = async (prisma: PrismaClient) => {
    const getJourneyId = async (JourneyName: string) => {
        const department = await prisma.journey.findFirst({
            where: { name: JourneyName },
        });

        if (!department) {
            throw new Error(`Department not found: ${JourneyName}`);
        }

        return department.id;
    };

    await prisma.employee.create({
        data: {
            name: "Valdir Gomes",
            position: "Assistente Mecânico",
            journeyId: await getJourneyId("Jornada padrão"),
            rfid: "0000965412",
            imgUrl: "https://i.imgur.com/mW4wv9G.jpg",
        },
    });

    await prisma.employee.create({
        data: {
            name: "Marcelo de Souza",
            position: "Auxiliar Mecânico",
            journeyId: await getJourneyId("Jornada padrão"),
            rfid: "0000944538",
            imgUrl: "https://i.imgur.com/6Rl3z0i.jpg",
        },
    });

    await prisma.employee.create({
        data: {
            name: "Lucas da Silva Braganca",
            position: "Auxiliar Mecânico",
            journeyId: await getJourneyId("Jornada padrão"),
            rfid: "0001105030",
            imgUrl: "https://i.imgur.com/crm7qF7.jpg",
        },
    });

    await prisma.employee.create({
        data: {
            name: "Jadir Moreira da Silva",
            position: "Assistente Elétrico",
            journeyId: await getJourneyId("Jornada padrão"),
            rfid: "0001538763",
            imgUrl: "https://i.imgur.com/nDLyBaA.jpg",
        },
    });

    await prisma.employee.create({
        data: {
            name: "Jadeilson da Silva Lima",
            position: "Auxiliar Elétrico",
            journeyId: await getJourneyId("Jornada padrão"),
            rfid: "0001439039",
            imgUrl: "https://i.imgur.com/biKp2NX.jpg",
        },
    });

    await prisma.employee.create({
        data: {
            name: "Vitor bruno da Silva Godoy",
            position: "Auxiliar Administrativo",
            journeyId: await getJourneyId("Jornada padrão"),
            rfid: "0001236814",
            imgUrl: "https://i.imgur.com/09kb29j.jpg",
        },
    });
};
