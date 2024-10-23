"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
            switch (ws) {
                case "Reporte de bonificación":
                    await getTemplateForBonus.downloadTSS(
                        filter,
                        filename,
                        "application/vnd.ms-excel.sheet.macroEnabled.12"
                    );
                    break;
                case "Reporte de rectificación":
                    await getTemplateForRectify.downloadTSS(
                        filter,
                        filename,
                        "application/vnd.ms-excel.sheet.macroEnabled.12"
                    );
                    break;
                case "Reporte de novedades":
                    await getTemplateForNewsFile.downloadTSS(
                        filter,
                        filename,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    );
                    break;
                case "Plantilla de autodeterminación mensual":
                    await getTemplateForAutodetermination.downloadTSS(
                        filter,
                        filename,
                        "application/vnd.ms-excel.sheet.macroEnabled.12"
                    );
                    break;
                case "Plantilla de novedades":
                    await getTemplateForRawNewsFile.downloadTSS(
                        filter,
                        filename,
                        "application/vnd.ms-excel.sheet.macroEnabled.12"
                    );
                    break;
                case "Reporte de autodeterminación mensual":
                    await getTemplateForRawAutodetermination.downloadTSS(
                        filter,
                        filename,
                        "application/vnd.ms-excel.sheet.macroEnabled.12"
                    );
                    break;
                case "":
                    throw new Error(`Worksheet not found: ${ws}`);
            }
        } catch (error) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: `${error}`,
            });
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
                return "plantilla_bonificacion_v1.3.xlsm";
            case "Reporte de rectificación":
                return "plant_rec_ir_v3_1.6.xlsm";
            case "Reporte de novedades":
                return "Raw_Novedades_v1.0.xlsx";
            case "Plantilla de autodeterminación mensual":
                return "plant_autodeterminacion_mens_v4.8.xlsm";
            case "Plantilla de novedades":
                return "plant_nov_v4.7.xlsm";
            case "Reporte de autodeterminación mensual":
                return "AD_RawTemplate.xlsm";
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
