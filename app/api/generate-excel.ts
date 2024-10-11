import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const templatePath = path.resolve('./public', 'report', 'Raw_Novedades.xlsx');

    if (!fs.existsSync(templatePath)) {
        res.status(404).json({ error: `Template file not found: ${templatePath}` });
        return;
    }

    try {
        const fileBuffer = fs.readFileSync(templatePath);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(fileBuffer as any);

        const worksheet = workbook.getWorksheet(1);

        mockData.forEach((data, index) => {

            const row = worksheet!.getRow(index + 2);
            row.getCell(1).value = data.idEmployee;
            row.getCell(2).value = data.position;
            row.commit();
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Generated_Report.xlsx');
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ error: 'Error generating Excel file' });
    }
};

export default handler;