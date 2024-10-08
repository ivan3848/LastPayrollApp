'use server'
import fs from 'fs';
import path from 'path';

export const mockData = [
    {
        idEmployee: 1,
        identification: "123-45-6789",
        firstName: "John",
        middleName: "A.",
        firstLastName: "Doe",
        secondLastName: "Smith",
        sex: true,
        nationality: "American",
        birthDate: new Date(1990, 1, 1),
        salary: 50000,
        startDate: new Date(2020, 1, 1),
        occupation: "Developer",
        position: "Senior Developer",
        vacation: { start: new Date(2021, 6, 1), end: new Date(2021, 6, 15) },
        workSchedulerCode: "WS123",
        idZone: 1,
        education: "Bachelor's",
        disability: "None",
    },
    {
        idEmployee: 2,
        identification: "123-45-6789",
        firstName: "John",
        middleName: "A.",
        firstLastName: "Doe",
        secondLastName: "Smith",
        sex: true,
        nationality: "American",
        birthDate: new Date(1990, 1, 1),
        salary: 50000,
        startDate: new Date(2020, 1, 1),
        occupation: "Developer",
        position: "Senior Developer",
        vacation: { start: new Date(2021, 6, 1), end: new Date(2021, 6, 15) },
        workSchedulerCode: "WS123",
        idZone: 1,
        education: "Bachelor's",
        disability: "None",
    },
    {
        idEmployee: 3,
        identification: "123-45-6789",
        firstName: "John",
        middleName: "A.",
        firstLastName: "Doe",
        secondLastName: "Smith",
        sex: true,
        nationality: "American",
        birthDate: new Date(1990, 1, 1),
        salary: 50000,
        startDate: new Date(2020, 1, 1),
        occupation: "Developer",
        position: "Senior Developer",
        vacation: { start: new Date(2021, 6, 1), end: new Date(2021, 6, 15) },
        workSchedulerCode: "WS123",
        idZone: 1,
        education: "Bachelor's",
        disability: "None",
    },
];

export const handler = () => {
    const dirRelativeToPublicFolder = 'report';
    const fileName = 'Raw_Novedades.xlsx';
    const filePath = path.resolve('./public', dirRelativeToPublicFolder, fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const fileBuffer = fs.readFileSync(filePath);
    const file = new File([fileBuffer], fileName, {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    console.log(file)

    return file;
};
