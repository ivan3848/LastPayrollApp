import ExcelJS from "exceljs";
import { useState } from "react";

const useExcelTable = () => {
    const [excelData, setExcelData] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [file, setFile] = useState<any | null>(null);
    const clearData = () => {
        setExcelData([]);
    };

    const onSelect = (e: any, variables: string[]) => {
        const file = e.files[0];
        setFile(file);
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

            const headers = json.shift() as string[];

            setHeaders(headers);

            variables.forEach((value, index) => {
                dynamicVariables[value] = index;
            });

            const processResult = async () => {
                const result = json.map((element) => {
                    const dynamicObject: { [key: string]: any } = {};
                    variables.forEach((key) => {
                        let value = key.toLowerCase();
                        dynamicObject[value] = element[dynamicVariables[key]];
                    });
                    return dynamicObject;
                });
                // const data = {
                //     name: file.name,
                //     chargeDate: file.lastModifiedDate,
                //     //isPaid: true,
                //     employees: result,
                // };
                // console.log(data);

                setExcelData(result);
            };

            processResult();
        };

        reader.readAsArrayBuffer(file);
    };
    return { headers, excelData, onSelect, clearData, file };
};

export default useExcelTable;
