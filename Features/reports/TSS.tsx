"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import ExcelJS from "exceljs";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    getTemplateForAutodetermination,
    getTemplateForBonus,
    getTemplateForNewsFile,
    getTemplateForRawAutodetermination,
    getTemplateForRawNewsFile,
    getTemplateForRectify,
} from "../employee/Services/employeeService";
import IFilterTSS from "./Types/IFilterTSS";
import FilterTSSFormSchema from "./Validations/FilterTSSFormSchema";

const TSS = () => {
    const { filterTSSFormSchema } = FilterTSSFormSchema();

    const {
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IFilterTSS>({
        resolver: zodResolver(filterTSSFormSchema),
    });

    const [selectedReport, setSelectedReport] = useState<any>();
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

    const getDateToFilter = (data: Date) => {
        if (!data) {
            return {};
        }
        const start = new Date(data.getFullYear(), data.getMonth(), 1);
        const end = new Date(data.getFullYear(), data.getMonth() + 1, 1);
        return { start, end };
    };

    const executeTSSExcelTemplate = async (
        filter: IFilterTSS,
        filename: string,
        ws: string
    ) => {
        setLoading(true);
        try {
            const dirRelativeToPublicFolder = "report";
            const fileName = filename;
            const filePath = `/${dirRelativeToPublicFolder}/${fileName}`;

            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(`File not found: ${filePath}`);
            }

            const fileBuffer = await response.arrayBuffer();
            const file = new File([fileBuffer], fileName, {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(await file.arrayBuffer());

            switch (ws) {
                case "Reporte de bonificación":
                    const dataTemplateForBonus =
                        await getTemplateForBonus.getForTSS(filter);
                    let count1 = 15;

                    const worksheetTemplateForBonus = workbook.getWorksheet(
                        "Plantilla de Bonificación"
                    );

                    worksheetTemplateForBonus!.getCell(`D${9}`).value =
                        new Date(filter.start!)
                            .toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                            })
                            .split("/")
                            .join("") ?? "N/A";

                    dataTemplateForBonus.forEach((employee: any) => {
                        const item = dataTemplateForBonus.find(
                            (x: any) => x.idEmployee === employee.idEmployee
                        )!;

                        worksheetTemplateForBonus!.getCell(`B${count1}`).value =
                            item.identification.replace(/-/g, "").length === 11
                                ? "C"
                                : "N";
                        worksheetTemplateForBonus!.getCell(`C${count1}`).value =
                            item.identification.replace(/-/g, "") ?? "N/A";
                        worksheetTemplateForBonus!.getCell(
                            `D${count1}`
                        ).value = `${item.firstName} ${item.middleName} ${item.firstLastName} ${item.secondLastName}`;
                        worksheetTemplateForBonus!.getCell(
                            `E${count1}`
                        ).value = `${item.firstLastName}`;
                        worksheetTemplateForBonus!.getCell(
                            `F${count1}`
                        ).value = `${item.secondLastName}`;
                        worksheetTemplateForBonus!.getCell(`G${count1}`).value =
                            item.sex < 0 ? "F" : "M";
                        worksheetTemplateForBonus!.getCell(`H${count1}`).value =
                            new Date(item.birthDate!)
                                .toLocaleDateString("en-GB")
                                .split("/")
                                .join("") ?? "N/A";
                        worksheetTemplateForBonus!.getCell(`I${count1}`).value =
                            item.totalPay ?? 0.0;
                        count1++;
                    });

                    break;
                case "Reporte de rectificación":
                    const dataTemplateForRectify =
                        await getTemplateForRectify.getForTSS(filter);

                    let count2 = 14;

                    const worksheetTemplateForRectify = workbook.getWorksheet(
                        "Plantilla de rectificativa"
                    );

                    worksheetTemplateForRectify!.getCell(`D${8}`).value =
                        new Date(filter.start!)
                            .toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                            })
                            .split("/")
                            .join("") ?? "N/A";

                    dataTemplateForRectify.forEach((employee: any) => {
                        const item = dataTemplateForRectify.find(
                            (x: any) => x.idEmployee === employee.idEmployee
                        )!;

                        if (item.isrSalary <= 0.0 && item.otherProfit <= 0.0)
                            return;

                        worksheetTemplateForRectify!.getCell(
                            `B${count2}`
                        ).value = "N";
                        worksheetTemplateForRectify!.getCell(
                            `C${count2}`
                        ).value =
                            item.identification.replace(/-/g, "").length === 11
                                ? "C"
                                : "N";
                        worksheetTemplateForRectify!.getCell(
                            `D${count2}`
                        ).value = item.identification.replace(/-/g, "");
                        worksheetTemplateForRectify!.getCell(
                            `E${count2}`
                        ).value = item.names
                            ?.replace("ü", "u")
                            .replace(".", "")
                            .replace(".", "");
                        worksheetTemplateForRectify!.getCell(
                            `F${count2}`
                        ).value = item.firstLastName
                            ?.replace("ü", "u")
                            .replace(".", "");
                        worksheetTemplateForRectify!.getCell(
                            `G${count2}`
                        ).value = item.secondLastName
                            ?.replace("ü", "u")
                            .replace(".", "");
                        worksheetTemplateForRectify!.getCell(
                            `H${count2}`
                        ).value = item.sex < 0 ? "F" : "M";
                        worksheetTemplateForRectify!.getCell(
                            `I${count2}`
                        ).value =
                            new Date(item.birthDate!)
                                .toLocaleDateString("en-GB")
                                .split("/")
                                .join("") ?? "N/A";
                        worksheetTemplateForRectify!.getCell(
                            `L${count2}`
                        ).value =
                            item.isrSalary !== 0.0
                                ? item.isrSalary.toString()
                                : "";
                        worksheetTemplateForRectify!.getCell(
                            `M${count2}`
                        ).value =
                            item.otherProfit !== 0.0
                                ? item.otherProfit.toString()
                                : "";
                        worksheetTemplateForRectify!.getCell(
                            `N${count2}`
                        ).value = item.identification?.replace("-", "");
                        worksheetTemplateForRectify!.getCell(
                            `O${count2}`
                        ).value = "";
                        worksheetTemplateForRectify!.getCell(
                            `P${count2}`
                        ).value = "";
                        worksheetTemplateForRectify!.getCell(
                            `Q${count2}`
                        ).value = "";
                        worksheetTemplateForRectify!.getCell(
                            `R${count2}`
                        ).value = "";
                        worksheetTemplateForRectify!.getCell(
                            `S${count2}`
                        ).value = "";

                        count2++;
                    });
                    break;
                case "Reporte de novedades":
                    const dataTemplateForNewsFile =
                        await getTemplateForNewsFile.getForTSS(filter);

                    let count3 = 10;

                    const worksheetTemplateForNewsFile =
                        workbook.getWorksheet("Rar_Novedades.XLS");

                    worksheetTemplateForNewsFile!.getCell(`B${7}`).value =
                        new Date(filter.start!)
                            .toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                            })
                            .split("/")
                            .join("") ?? "N/A";

                    dataTemplateForNewsFile.forEach((employee: any) => {
                        const item = dataTemplateForNewsFile.find(
                            (x: any) => x.idEmployee === employee.idEmployee
                        )!;

                        const midName =
                            item.middleName?.replace("ü", "u") ?? "";
                        const firstName =
                            item.firstName?.replace("ü", "u") ?? "";
                        const firstLastName =
                            item.firstLastName?.replace("ü", "u") ?? "";
                        const secondLastName =
                            item.secondLastName?.replace("ü", "u") ?? "";
                        const forInDate = item.start
                            ? new Date(item.start)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("")
                            : new Date()
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("");

                        worksheetTemplateForNewsFile!.getCell(
                            `A${count3}`
                        ).value = item.idEmployee;
                        worksheetTemplateForNewsFile!.getCell(
                            `B${count3}`
                        ).value = item.identification.replace(/-/g, "");
                        worksheetTemplateForNewsFile!.getCell(
                            `C${count3}`
                        ).value = `${firstName} ${midName} ${firstLastName} ${secondLastName}`;
                        worksheetTemplateForNewsFile!.getCell(
                            `D${count3}`
                        ).value = `${firstLastName} ${secondLastName}`;
                        worksheetTemplateForNewsFile!.getCell(
                            `E${count3}`
                        ).value = item.sex <= 0 ? "M" : "F";
                        worksheetTemplateForNewsFile!.getCell(
                            `F${count3}`
                        ).value = item.birthDate
                            ? new Date(item.birthDate)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("")
                            : new Date()
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("");
                        worksheetTemplateForNewsFile!.getCell(
                            `G${count3}`
                        ).value =
                            item.infotepSal !== 0.0
                                ? item.infotepSal.toString()
                                : "0.0";
                        worksheetTemplateForNewsFile!.getCell(
                            `H${count3}`
                        ).value =
                            item.salarySS !== 0.0
                                ? item.salarySS.toString()
                                : "0.0";
                        worksheetTemplateForNewsFile!.getCell(
                            `I${count3}`
                        ).value =
                            item.salaryIsr !== 0.0
                                ? item.salaryIsr.toString()
                                : "0.0";
                        worksheetTemplateForNewsFile!.getCell(
                            `J${count3}`
                        ).value =
                            item.otherProfit !== 0.0
                                ? item.otherProfit.toString()
                                : "0.0";
                        worksheetTemplateForNewsFile!.getCell(
                            `L${count3}`
                        ).value =
                            item.isrInFavor !== 0.0
                                ? item.isrInFavor.toString()
                                : "";
                        worksheetTemplateForNewsFile!.getCell(
                            `K${count3}`
                        ).value = item.idZone ?? 1;
                        worksheetTemplateForNewsFile!.getCell(
                            `L${count3}`
                        ).value = item.identification.replace(/-/g, "");
                        worksheetTemplateForNewsFile!.getCell(
                            `M${count3}`
                        ).value = item.newsType;
                        worksheetTemplateForNewsFile!.getCell(
                            `N${count3}`
                        ).value = item.start
                            ? new Date(item.start)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("")
                            : "";
                        worksheetTemplateForNewsFile!.getCell(
                            `O${count3}`
                        ).value = item.end
                            ? new Date(item.end)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("")
                            : "";
                        worksheetTemplateForNewsFile!.getCell(
                            `P${count3}`
                        ).value =
                            item.identification.replace(/-/g, "").length === 11
                                ? "C"
                                : "N";
                        worksheetTemplateForNewsFile!.getCell(
                            `Q${count3}`
                        ).value =
                            item.christmasSalary !== 0.0
                                ? item.christmasSalary.toString()
                                : "0.0";
                        worksheetTemplateForNewsFile!.getCell(
                            `R${count3}`
                        ).value =
                            item.prevCesViat !== 0.0
                                ? item.prevCesViat.toString()
                                : "0.0";
                        count3++;
                    });
                    break;
                case "Plantilla de autodeterminación mensual":
                    const dataTemplateForAutodetermination =
                        await getTemplateForAutodetermination.getForTSS(filter);

                    let count4 = 14;

                    const worksheetTemplateForAutodetermination =
                        workbook.getWorksheet("Plantilla de Autodeterminación");

                    worksheetTemplateForAutodetermination!.getCell(
                        `D${8}`
                    ).value =
                        new Date(filter.start!)
                            .toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                            })
                            .split("/")
                            .join("") ?? "N/A";

                    dataTemplateForAutodetermination.forEach(
                        (employee: any) => {
                            const item = dataTemplateForAutodetermination.find(
                                (x: any) => x.idEmployee === employee.idEmployee
                            )!;

                            worksheetTemplateForAutodetermination!.getCell(
                                `B${count4}`
                            ).value = item.payrollKey;
                            worksheetTemplateForAutodetermination!.getCell(
                                `C${count4}`
                            ).value =
                                item.identification.replace(/-/g, "").length ===
                                11
                                    ? "C"
                                    : "N";
                            worksheetTemplateForAutodetermination!.getCell(
                                `D${count4}`
                            ).value = item.identification.replace(/-/g, "");
                            worksheetTemplateForAutodetermination!.getCell(
                                `E${count4}`
                            ).value =
                                `${item.names} ${item.firstLastName} ${item.secondLastName}`
                                    .replace("ü", "u")
                                    .replace(".", "")
                                    .replace(".", "");
                            worksheetTemplateForAutodetermination!.getCell(
                                `F${count4}`
                            ).value = item.firstLastName
                                ?.replace("ü", "u")
                                .replace(".", "");
                            worksheetTemplateForAutodetermination!.getCell(
                                `G${count4}`
                            ).value = item.secondLastName
                                ?.replace("ü", "u")
                                .replace(".", "");
                            worksheetTemplateForAutodetermination!.getCell(
                                `H${count4}`
                            ).value = item.sex <= 0 ? "M" : "F";
                            worksheetTemplateForAutodetermination!.getCell(
                                `I${count4}`
                            ).value = item.birthDate
                                ? new Date(item.birthDate)
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("")
                                : new Date()
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("");
                            worksheetTemplateForAutodetermination!.getCell(
                                `J${count4}`
                            ).value =
                                item.taxesSalary !== 0.0
                                    ? item.taxesSalary.toString()
                                    : "0.0";
                            worksheetTemplateForAutodetermination!.getCell(
                                `K${count4}`
                            ).value =
                                item.isrSalary !== 0.0
                                    ? item.isrSalary.toString()
                                    : "0.0";
                            worksheetTemplateForAutodetermination!.getCell(
                                `L${count4}`
                            ).value =
                                item.isrInFavor !== 0.0
                                    ? item.isrInFavor.toString()
                                    : "0.0";
                            worksheetTemplateForAutodetermination!.getCell(
                                `M${count4}`
                            ).value = item.contractType;
                            worksheetTemplateForAutodetermination!.getCell(
                                `N${count4}`
                            ).value =
                                item.otherProfit !== 0.0
                                    ? item.otherProfit.toString()
                                    : "0.0";
                            worksheetTemplateForAutodetermination!.getCell(
                                `O${count4}`
                            ).value = "";
                            worksheetTemplateForAutodetermination!.getCell(
                                `R${count4}`
                            ).value =
                                item.christmasSalary !== 0.0
                                    ? item.christmasSalary.toString()
                                    : "0.0";
                            worksheetTemplateForAutodetermination!.getCell(
                                `T${count4}`
                            ).value =
                                item.maintenanceDiscount === 0.0
                                    ? item.infotepSalary.toString()
                                    : "0.0";
                            worksheetTemplateForAutodetermination!.getCell(
                                `U${count4}`
                            ).value =
                                item.infotepSalary !== 0.0
                                    ? item.infotepSalary.toString()
                                    : "0.0";
                            count4++;
                        }
                    );
                    break;
                case "Plantilla de novedades":
                    const dataTemplateForRawNewsFile =
                        await getTemplateForRawNewsFile.getForTSS(filter);

                    let count5 = 14;

                    const worksheetTemplateForRawNewsFile =
                        workbook.getWorksheet("Plantilla de archivo novedades");

                    worksheetTemplateForRawNewsFile!.getCell(`D${8}`).value =
                        new Date(filter.start!)
                            .toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                            })
                            .split("/")
                            .join("") ?? "N/A";

                    dataTemplateForRawNewsFile.forEach((employee: any) => {
                        const item = dataTemplateForRawNewsFile.find(
                            (x: any) => x.idEmployee === employee.idEmployee
                        )!;

                        const midName =
                            item.middleName?.replace("ü", "u") ?? "";
                        const firstName =
                            item.firstName?.replace("ü", "u") ?? "";
                        const firstLastName =
                            item.firstLastName?.replace("ü", "u") ?? "";
                        const secondLastName =
                            item.secondLastName?.replace("ü", "u") ?? "";
                        const forInDate = item.start
                            ? new Date(item.start)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("")
                            : new Date()
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("");
                        const forInEnd = item.end
                            ? new Date(item.end)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("")
                            : "";

                        worksheetTemplateForRawNewsFile!.getCell(
                            `B${count5}`
                        ).value = item.idEmployee;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `C${count5}`
                        ).value = item.newsType;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `D${count5}`
                        ).value = forInDate;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `E${count5}`
                        ).value = forInEnd;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `F${count5}`
                        ).value =
                            item.identification.replace(/-/g, "").length === 11
                                ? "C"
                                : "N";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `G${count5}`
                        ).value = item.identification.replace(/-/g, "");
                        worksheetTemplateForRawNewsFile!.getCell(
                            `H${count5}`
                        ).value = `${firstName} ${midName} ${firstLastName} ${secondLastName}`;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `I${count5}`
                        ).value = firstLastName;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `J${count5}`
                        ).value = secondLastName;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `K${count5}`
                        ).value = item.sex <= 0 ? "M" : "F";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `L${count5}`
                        ).value = item.birthDate
                            ? new Date(item.birthDate)
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("")
                            : new Date()
                                  .toLocaleDateString("en-GB")
                                  .split("/")
                                  .join("");
                        worksheetTemplateForRawNewsFile!.getCell(
                            `M${count5}`
                        ).value =
                            item.salarySS !== 0.0
                                ? item.salarySS.toString()
                                : "0.0";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `N${count5}`
                        ).value = "0.0";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `O${count5}`
                        ).value = "Normal";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `P${count5}`
                        ).value =
                            item.isrInFavor !== 0.0
                                ? item.isrInFavor.toString()
                                : "0.0";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `Q${count5}`
                        ).value =
                            item.otherProfit !== 0.0
                                ? item.otherProfit.toString()
                                : "0.0";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `R${count5}`
                        ).value = "0.0";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `V${count5}`
                        ).value =
                            item.prevCesViat !== 0.0
                                ? item.prevCesViat.toString()
                                : "0.0";
                        worksheetTemplateForRawNewsFile!.getCell(
                            `W${count5}`
                        ).value = 0.0;
                        worksheetTemplateForRawNewsFile!.getCell(
                            `X${count5}`
                        ).value =
                            item.infotepSal !== 0.0
                                ? item.infotepSal.toString()
                                : "0.0";
                        count5++;
                    });
                    break;
                case "Reporte de autodeterminación mensual":
                    const dataTemplateForRawAutodetermination =
                        await getTemplateForRawAutodetermination.getForTSS(
                            filter
                        );

                    let count6 = 10;

                    const worksheetTemplateForRawAutodetermination =
                        workbook.getWorksheet("RawAutoDeterminacio");

                    worksheetTemplateForRawAutodetermination!.getCell(
                        `B${7}`
                    ).value =
                        new Date(filter.start!)
                            .toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                            })
                            .split("/")
                            .join("") ?? "N/A";

                    dataTemplateForRawAutodetermination.forEach(
                        (employee: any) => {
                            const item =
                                dataTemplateForRawAutodetermination.find(
                                    (x: any) =>
                                        x.idEmployee === employee.idEmployee
                                )!;
                            const midName =
                                item.middleName?.replace("ü", "u") ?? "";
                            const firstName =
                                item.firstName?.replace("ü", "u") ?? "";
                            const firstLastName =
                                item.firstLastName?.replace("ü", "u") ?? "";
                            const secondLastName =
                                item.secondLastName?.replace("ü", "u") ?? "";

                            worksheetTemplateForRawAutodetermination!.getCell(
                                `A${count6}`
                            ).value = item.idEmployee;
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `B${count6}`
                            ).value = item.identification.replace(/-/g, "");
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `C${count6}`
                            ).value = `${firstName} ${midName} ${firstLastName} ${secondLastName}`;
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `D${count6}`
                            ).value = `${firstLastName} ${secondLastName}`;
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `E${count6}`
                            ).value = item.sex <= 0 ? "M" : "F";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `F${count6}`
                            ).value = item.birthDate
                                ? new Date(item.birthDate)
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("")
                                : new Date()
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("");
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `G${count6}`
                            ).value =
                                item.infotepSal !== 0.0
                                    ? item.infotepSal.toString()
                                    : "0.0";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `H${count6}`
                            ).value =
                                item.salarySS !== 0.0
                                    ? item.salarySS.toString()
                                    : "0.0";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `I${count6}`
                            ).value =
                                item.salaryIsr !== 0.0
                                    ? item.salaryIsr.toString()
                                    : "0.0";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `J${count6}`
                            ).value =
                                item.otherProfit !== 0.0
                                    ? item.otherProfit.toString()
                                    : "0.0";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `K${count6}`
                            ).value =
                                item.isrInFavor !== 0.0
                                    ? item.isrInFavor.toString()
                                    : "0.0";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `L${count6}`
                            ).value = item.idZone ?? 1;
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `M${count6}`
                            ).value =
                                item.identification.replace(/-/g, "").length ===
                                11
                                    ? "C"
                                    : "N";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `N${count6}`
                            ).value =
                                item.christmasSalary !== 0.0
                                    ? item.christmasSalary.toString()
                                    : "0.0";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `O${count6}`
                            ).value =
                                item.prevCesViat !== 0.0
                                    ? item.prevCesViat.toString()
                                    : "0.0";
                            worksheetTemplateForRawAutodetermination!.getCell(
                                `P${count6}`
                            ).value =
                                item.descPenAli !== 0.0
                                    ? item.descPenAli.toString()
                                    : "0.0";
                            count6++;
                        }
                    );
                    break;
                case "":
                    throw new Error(`Worksheet not found: ${ws}`);
            }

            const buffer = await workbook.xlsx.writeBuffer();

            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (filter: IFilterTSS) => {
        const { start, end } = filter && getDateToFilter(filter.start!);
        filter.start = start;
        filter.end = end;

        if (selectedReport === undefined) {
            toast.current &&
                toast.current.show({
                    severity: "warn",
                    summary: "Aviso",
                    detail: "Selecciona un reporte",
                    life: 3000,
                });

            return;
        }

        const template = getTemplateName(selectedReport.name);

        await executeTSSExcelTemplate(
            filter,
            template === "" ? "" : template,
            selectedReport.name
        );
    };

    const getTemplateName = (templateName: string): string => {
        switch (templateName) {
            case "Reporte de bonificación":
                return "plantilla_bonificacion.xlsx";
            case "Reporte de rectificación":
                return "plantilla_rectificacion.xlsx";
            case "Reporte de novedades":
                return "Raw_Novedades.xlsx";
            case "Plantilla de autodeterminación mensual":
                return "plantilla_autodeterminacion_mensual.xlsx";
            case "Plantilla de novedades":
                return "plantilla_novedades.xlsx";
            case "Reporte de autodeterminación mensual":
                return "reporte_autodeterminacion_mensual.xlsx";
            default:
                return "";
        }
    };

    const reportOptions = [
        { key: 0, name: "Reporte de bonificación" },
        { key: 1, name: "Reporte de rectificación" },
        { key: 2, name: "Reporte de novedades" },
        { key: 3, name: "Plantilla de autodeterminación mensual" },
        { key: 4, name: "Plantilla de novedades" },
        { key: 5, name: "Reporte de autodeterminación mensual" },
    ];

    return (
        <>
            <Toast ref={toast} />

            <Dialog
                visible={loading}
                modal
                onHide={() => setLoading(false)}
                closable={false}
            >
                <div className="flex flex-column align-items-center">
                    <ProgressSpinner />
                    <p className="mt-3">Cargando, por favor, espere...</p>
                </div>
            </Dialog>

            <div className="text-center">
                <h1 className="mb-4" style={{ color: "var(--primary-color)" }}>
                    TSS
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-fluid formgrid grid mb-4">
                    <div className="field col-12 md:col-6">
                        <Calendar
                            id="date"
                            onChange={(e) => setValue("start", e.value!)}
                            showIcon
                            showButtonBar
                        />
                        {errors.start && (
                            <small className="p-invalid text-red-500">
                                {errors.start.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-book"></i>
                            </span>
                            <Dropdown
                                className="mr-2"
                                value={selectedReport}
                                onChange={(e) => setSelectedReport(e.value)}
                                options={reportOptions}
                                optionLabel="name"
                                showClear
                                placeholder="Selecciona un Reporte"
                                filter
                            />
                        </div>
                    </div>
                </div>
                <div className="p-fluid formgrid grid justify-content-end">
                    <div className="field col-4 md:col-2">
                        <Button label="Generar" type="submit" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default TSS;
