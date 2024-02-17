import { PrismaClient } from "@prisma/client";

export const seedProduct = async (prisma: PrismaClient) => {
    const categoriesP = await prisma.product.findMany();
    if (categoriesP.length > 0) {
        await prisma.product.deleteMany();
    }

    await prisma.product.create({
        data: {
            name: "iPhone 13",
            description: "Latest iPhone with advanced features",
            price: 999,
            inStock: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "MacBook Pro 16-inch",
            description: "Powerful laptop for professionals",
            price: 2399,
            inStock: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "iPad Air 5",
            description: "Thin and lightweight tablet with A15 Bionic chip",
            price: 599,
            inStock: 18,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "AirPods Pro",
            description: "Premium noise-canceling earbuds",
            price: 249,
            inStock: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "iMac 27-inch",
            description: "Colorful all-in-one desktop with M1 chip",
            price: 1799,
            inStock: 12,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "Apple TV 4K",
            description: "High-quality streaming device with A12 Bionic chip",
            price: 179,
            inStock: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "Mac mini",
            description: "Compact desktop with M1 chip",
            price: 699,
            inStock: 22,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "HomePod mini",
            description: "Compact smart speaker with Siri",
            price: 99,
            inStock: 40,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "Apple Pencil (2nd generation)",
            description: "Precision stylus for iPad",
            price: 129,
            inStock: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    await prisma.product.create({
        data: {
            name: "Magic Keyboard",
            description: "Wireless keyboard with trackpad for iPad and Mac",
            price: 299,
            inStock: 18,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
};

