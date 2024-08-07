import ExcelJS from "exceljs";
import { useState } from "react";

const useExcelTable = () => {
    const [excelData, setExcelData] = useState<any[]>([]);
    const [firstElement, setFirstElement] = useState<any[]>([]);

    const onSelect = (e: any) => {
        const file = e.files[0];
        const reader = new FileReader();

        reader.onload = async (event: any) => {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(event.target.result);
            const worksheet = workbook.getWorksheet(1);
            const json: any[] = [];
            const dynamicVariables: { [key: string]: number } = {};

            worksheet?.eachRow((row) => {
                const rowValues = row.values as any;
                const value = rowValues.filter(
                    (element: any) => element !== undefined
                );
                json.push(value);
            });

            const firstElement = json
                .shift()
                .filter(
                    (element: any[], index: number) =>
                        element.at(index) !== undefined
                ) as string[];

            setFirstElement(firstElement);

            firstElement.forEach((value, index) => {
                dynamicVariables[value] = index;
            });

            const processResult = async () => {
                const result = json.map((element) => {
                    const dynamicObject: { [key: string]: any } = {};
                    firstElement.forEach((key) => {
                        let value = key.toLowerCase();
                        dynamicObject[value] = element[dynamicVariables[key]];
                    });
                    return dynamicObject;
                });
                setExcelData(result);
            };

            processResult();
        };

        reader.readAsArrayBuffer(file);
    };
    return { firstElement, excelData, onSelect };
};

export default useExcelTable;
