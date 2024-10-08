"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GenericDropDown from "../Shared/Components/GenericDropDown";
import useZoneQuery from "../zone/Hooks/useZoneQuery";
import IFilterDGT from "./Types/IFilterDGT";
import FilterDGTFormSchema from "./Validations/FilterDGTFormSchema";
import React from "react";
import ExcelJS from "exceljs";
import {
    getEmployeeForDGT4,
    getEmployeeForDGT2,
    getEmployeeForDGT3,
    getEmployeeForDGT12,
} from "../employee/Services/employeeService";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { set } from "zod";

const DGT = () => {
    const { filterDGTFormSchema } = FilterDGTFormSchema();

    const {
        setValue,
        watch,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IFilterDGT>({
        resolver: zodResolver(filterDGTFormSchema),
    });

    const [isDgt2, setIsDgt2] = useState(false);
    const [isDgt3, setIsDgt3] = useState(false);
    const [isDgt4, setIsDgt4] = useState(false);
    const [isDgt12, setIsDgt12] = useState(false);
    const [count1, setCount1] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleToggleDGT2 = () => {
        setIsDgt2(!isDgt2);
    };

    const handleToggleDGT3 = () => {
        setIsDgt3(!isDgt3);
        isDgt4 && setIsDgt4(!isDgt4);
    };

    const handleToggleDGT4 = () => {
        setIsDgt4(!isDgt4);
        isDgt3 && setIsDgt3(!isDgt3);
    };

    const handleToggleDGT12 = () => {
        setIsDgt12(!isDgt12);
    };

    const getDateToFilter = (data: Date) => {
        if (!data) {
            return {};
        }
        const start = new Date(data.getFullYear(), data.getMonth(), 1);
        const end = new Date(data.getFullYear(), data.getMonth() + 1, 0);
        const year = data.getFullYear();
        return { start, end, year };
    };

    const executeDGTExcelTemplate = async (
        filter: IFilterDGT,
        filename: string,
        ws: string[]
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

            for (const sheet of ws) {
                switch (sheet) {
                    case "Plantilla DGT2":
                        const dataDGT2 = await getEmployeeForDGT2.getForDGT(
                            filter
                        );

                        const worksheet1 =
                            workbook.getWorksheet("Plantilla DGT2")!;

                        let count0DGT2 = 14;

                        const employeesDGT2 = dataDGT2;

                        const groupedEmployees = employeesDGT2.reduce(
                            (acc: any, employee: any) => {
                                (acc[employee.idEmployee] =
                                    acc[employee.idEmployee] || []).push(
                                    employee
                                );
                                return acc;
                            },
                            {}
                        );

                        for (const key in groupedEmployees) {
                            const item: any = groupedEmployees[key];
                            const employee = item[0];

                            if (employee.identification.length > 15) continue;

                            const zone = (() => {
                                switch (employee.idZone) {
                                    case 1:
                                        return "0001";
                                    case 2:
                                        return "0002";
                                    case 3:
                                        return "0006";
                                    case 4:
                                        return "0003";
                                    case 5:
                                        return "0004";
                                    default:
                                        return "0005";
                                }
                            })();

                            worksheet1.getCell(`D${count1}`).value =
                                employee.Identification.replace("-", "")
                                    .length === 11
                                    ? "C"
                                    : "N";
                            worksheet1.getCell(`E${count1}`).value =
                                employee.identification.replace("-", "");
                            worksheet1.getCell(`L${count1}`).value = zone;
                            worksheet1.getCell(`M${count1}`).value =
                                employee.salaryPerHour.toFixed(2);
                            worksheet1.getCell(`CA${count1}`).value = "a";

                            let countExtraHour = 15;
                            const monthDays = new Date(
                                filter.start!.getFullYear(),
                                filter.start!.getMonth(),
                                1
                            );

                            for (let i = 0; i < 31; i++) {
                                const extraHoursInDate = item.filter(
                                    (x: any) =>
                                        new Date(x.Date).getTime() ===
                                        monthDays.getTime() + i * 86400000
                                );

                                if (extraHoursInDate.length > 0) {
                                    let counter = 0;
                                    for (const extraHour of extraHoursInDate) {
                                        worksheet1.getCell(
                                            count1 + counter,
                                            countExtraHour
                                        ).value = extraHour.hourAmount;
                                        worksheet1.getCell(
                                            count1 + counter,
                                            countExtraHour + 1
                                        ).value = extraHour.percent.toFixed(2);
                                        counter++;
                                    }
                                }
                                countExtraHour += 2;
                            }
                            setCount1((prevCount) => prevCount + 1);
                        }

                        break;
                    case "Plantilla DGT3":
                        const data = await getEmployeeForDGT3.getForDGT(filter);

                        const worksheet =
                            workbook.getWorksheet("Plantilla DGT3");

                        let count0 = 14;

                        const employeesDGT3 = data;

                        data.forEach((employee: any) => {
                            const item = employeesDGT3.find(
                                (x: any) => x.idEmployee === employee.idEmployee
                            )!;

                            worksheet!.getCell(`B${count0}`).value =
                                item.description ?? "N/A";
                            worksheet!.getCell(`C${count0}`).value =
                                item.identification?.replace("-", "") ?? "N/A";
                            worksheet!.getCell(`D${count0}`).value =
                                item.identification?.replace("-", "").length ===
                                11
                                    ? "C"
                                    : "N";
                            worksheet!.getCell(`E${count0}`).value =
                                item.identification?.replace("-", "") ?? "N/A";
                            worksheet!.getCell(
                                `F${count0}`
                            ).value = `${item.firstName} ${item.middleName}`;
                            worksheet!.getCell(
                                `G${count0}`
                            ).value = `${item.firstLastName}`;
                            worksheet!.getCell(
                                `H${count0}`
                            ).value = `${item.secondLastName}`;
                            worksheet!.getCell(`I${count0}`).value =
                                item.sex ?? "N/A";
                            worksheet!.getCell(`J${count0}`).value =
                                item.nationality ?? "N/A";
                            worksheet!.getCell(`K${count0}`).value =
                                new Date(item.birthDate!)
                                    .toLocaleDateString("en-GB")
                                    .replace(" ", "/") ?? "N/A";
                            worksheet!.getCell(`L${count0}`).value =
                                item.salary;
                            worksheet!.getCell(`M${count0}`).value =
                                new Date(item.startDate!)
                                    .toLocaleDateString("en-GB")
                                    .replace(" ", "/") ?? "N/A";
                            worksheet!.getCell(`N${count0}`).value = "N/A";
                            worksheet!.getCell(`O${count0}`).value =
                                item?.position ?? "N/A";
                            worksheet!.getCell(`P${count0}`).value = "N/A";
                            worksheet!.getCell(`Q${count0}`).value =
                                item?.vacation?.start ?? "N/A";
                            worksheet!.getCell(`R${count0}`).value =
                                item?.vacation?.end ?? "N/A";
                            worksheet!.getCell(`S${count0}`).value =
                                item?.idPosition ?? "N/A";
                            worksheet!.getCell(`T${count0}`).value = "N/A";
                            worksheet!.getCell(`AF${count0}`).value = "N/A";
                            worksheet!.getCell(`AG${count0}`).value = "N/A";
                            count0++;
                        });
                        break;
                    case "Plantilla DGT4":
                        const dataDGT4 = await getEmployeeForDGT4.getForDGT(
                            filter
                        );

                        const worksheetDGT4 =
                            workbook.getWorksheet("Plantilla DGT4");

                        let count0DGT4 = 14;
                        const employeesDGT4 = dataDGT4;

                        dataDGT4.forEach((employee: any) => {
                            const item = employeesDGT4.find(
                                (x: any) => x.idEmployee === employee.idEmployee
                            )!;

                            worksheetDGT4!.getCell(`B${count0DGT4}`).value =
                                item.description ?? "N/A";
                            worksheetDGT4!.getCell(`C${count0DGT4}`).value =
                                item.identification?.replace("-", "") ?? "N/A";
                            worksheetDGT4!.getCell(`D${count0DGT4}`).value =
                                item.identification?.replace("-", "").length ===
                                11
                                    ? "C"
                                    : "N";
                            worksheetDGT4!.getCell(`E${count0DGT4}`).value =
                                item.identification?.replace("-", "") ?? "N/A";
                            worksheetDGT4!.getCell(
                                `F${count0DGT4}`
                            ).value = `${item.firstName} ${item.middleName}`;
                            worksheetDGT4!.getCell(
                                `G${count0DGT4}`
                            ).value = `${item.firstLastName}`;
                            worksheetDGT4!.getCell(
                                `H${count0DGT4}`
                            ).value = `${item.secondLastName}`;
                            worksheetDGT4!.getCell(`I${count0DGT4}`).value =
                                item.sex ?? "N/A";
                            worksheetDGT4!.getCell(`J${count0DGT4}`).value =
                                item.nationality ?? "N/A";
                            worksheetDGT4!.getCell(`K${count0DGT4}`).value =
                                new Date(item.birthDate!)
                                    .toLocaleDateString("en-GB")
                                    .replace(" ", "/") ?? "N/A";
                            worksheetDGT4!.getCell(`L${count0DGT4}`).value =
                                item.salary ?? "N/A";
                            worksheetDGT4!.getCell(`M${count0DGT4}`).value =
                                new Date(item.startDate!)
                                    .toLocaleDateString("en-GB")
                                    .replace(" ", "/") ?? "N/A";
                            worksheetDGT4!.getCell(`N${count0DGT4}`).value =
                                "N/A";
                            worksheetDGT4!.getCell(`O${count0DGT4}`).value =
                                item.position ?? "N/A";
                            worksheetDGT4!.getCell(`P${count0DGT4}`).value =
                                "N/A";
                            worksheetDGT4!.getCell(`Q${count0DGT4}`).value =
                                item.vacation?.start ?? "N/A";
                            worksheetDGT4!.getCell(`R${count0DGT4}`).value =
                                item.vacation?.end ?? "N/A";
                            worksheetDGT4!.getCell(`S${count0DGT4}`).value =
                                item.idPosition ?? "N/A";
                            worksheetDGT4!.getCell(`T${count0DGT4}`).value =
                                "N/A";
                            worksheetDGT4!.getCell(`AF${count0DGT4}`).value =
                                "N/A";
                            worksheetDGT4!.getCell(`AG${count0DGT4}`).value =
                                "N/A";
                            count0DGT4++;
                        });
                        break;
                    case "Plantilla DGT12":
                        const dataDGT12 = await getEmployeeForDGT12.getForDGT(
                            filter
                        );

                        const worksheetDGT12 =
                            workbook.getWorksheet("Plantilla DGT4");

                        let count0DG12 = 14;
                        const employeesDGT12 = dataDGT12;

                        dataDGT12.forEach((employee: any) => {
                            const item = employeesDGT12.find(
                                (x: any) => x.idEmployee === employee.idEmployee
                            )!;

                            worksheetDGT12!.getCell(`B${count0DG12}`).value =
                                item.identification?.replace("-", "").length ===
                                11
                                    ? "C"
                                    : "N";
                            worksheetDGT12!.getCell(`C${count0DG12}`).value =
                                item.identification?.replace("-", "") ?? "N/A";
                            worksheetDGT12!.getCell(`D${count0DG12}`).value =
                                item.idZone ?? "N/A";
                            worksheetDGT12!.getCell(`E${count0DG12}`).value =
                                item.date
                                    ?.toLocaleDateString("en-GB")
                                    .replace(" ", "/") ?? "N/A";
                            count0DG12++;
                        });
                        break;
                    default:
                        throw new Error(`Worksheet not found: ${sheet}`);
                }
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
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (filter: IFilterDGT) => {
        const { start, end, year } = filter && getDateToFilter(filter.start!);
        filter.start = start;
        filter.end = end;
        filter.year = year;

        const workSheets = getWorksheet();
        await executeDGTExcelTemplate(filter, "TemplateDGT.xlsx", workSheets);
    };

    const getWorksheet = () => {
        const workSheetToAccess: string[] = [];

        if (isDgt3) {
            workSheetToAccess.push("Plantilla DGT3");
        }
        if (isDgt4) {
            workSheetToAccess.push("Plantilla DGT4");
        }
        if (isDgt12) {
            workSheetToAccess.push("Plantilla DGT12");
        }
        if (isDgt2) {
            workSheetToAccess.push("Plantilla DGT2");
        }
        return workSheetToAccess;
    };

    return (
        <>
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
                    DGT
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-fluid formgrid grid mb-4">
                    <div className="field col-12 md:col-6">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-qrcode"></i>
                            </span>

                            <InputText
                                {...register("companyId")}
                                placeholder="RNC o Cédula de la empresa"
                            />
                        </div>
                    </div>
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
                                <i className="pi pi-objects-column"></i>
                            </span>
                            <InputText disabled placeholder="RNL" />
                        </div>
                    </div>
                    <div className="field col-12 md:col-6">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-home"></i>
                            </span>
                            <GenericDropDown
                                id="idZone"
                                isValid={!!errors.idZone}
                                text="name"
                                placeholder="Seleccione una Localidad"
                                useQuery={useZoneQuery}
                                setValue={setValue}
                                watch={watch}
                            />
                        </div>
                        {errors.idZone && (
                            <small className="p-invalid text-red-500">
                                {errors.idZone.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>

                <div className="p-fluid formgrid grid justify-content-center">
                    <div className="field col-8 md:col-2">
                        <label htmlFor="dgt2" className="mr-2 font-bold">
                            DGT2
                        </label>
                        <InputSwitch
                            id="dgt2"
                            checked={isDgt2}
                            onChange={handleToggleDGT2}
                        />
                    </div>
                    <div className="field col-8 md:col-2">
                        <label htmlFor="dgt3" className="mr-2 font-bold">
                            DGT3
                        </label>
                        <InputSwitch
                            id="dgt3"
                            checked={isDgt3}
                            onChange={handleToggleDGT3}
                        />
                    </div>
                    <div className="field col-8 md:col-2">
                        <label htmlFor="dgt4" className="mr-2 font-bold">
                            DGT4
                        </label>
                        <InputSwitch
                            id="dgt4"
                            checked={isDgt4}
                            onChange={handleToggleDGT4}
                        />
                    </div>
                    <div className="field col-8 md:col-2">
                        <label htmlFor="dgt12" className="mr-2 font-bold">
                            DGT12
                        </label>
                        <InputSwitch
                            id="dgt12"
                            checked={isDgt12}
                            onChange={handleToggleDGT12}
                        />
                    </div>
                </div>
                <div className="p-fluid formgrid grid justify-content-end">
                    <div className="field col-4 md:col-2">
                        <Button severity="info" label="Generar" type="submit" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default DGT;
