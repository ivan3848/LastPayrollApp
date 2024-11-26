"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getTemplateForDGT } from "../employee/Services/employeeService";
import GenericDropDown from "../Shared/Components/GenericDropDown";
import useZoneQuery from "../zone/Hooks/useZoneQuery";
import IFilterDGT from "./Types/IFilterDGT";
import FilterDGTFormSchema from "./Validations/FilterDGTFormSchema";

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
    const [isDgt5, setIsDgt5] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

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

    const handleToggleDGT5 = () => {
        setIsDgt5(!isDgt5);
    };

    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getDateToFilter = (data: Date) => {
        if (!data) {
            return {};
        }
        const start = new Date(data.getFullYear(), data.getMonth(), 1);
        const end = new Date(
            data.getFullYear(),
            data.getMonth(),
            daysInMonth(data.getFullYear(), data.getMonth())
        );
        const year = data.getFullYear();
        return { start, end, year };
    };

    const executeDGTExcelTemplate = async (
        filter: IFilterDGT,
        filename: string
    ) => {
        setLoading(true);
        try {
            await getTemplateForDGT.downloadDGT(
                filter,
                filename,
                "application/vnd.ms-excel.sheet.macroEnabled.12"
            );
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

    const onSubmit = async (filter: IFilterDGT) => {
        const { start, end, year } = getDateToFilter(filter.start!);
        Object.assign(filter, {
            start,
            end,
            year,
            isDgt2,
            isDgt3,
            isDgt4,
            isDgt12,
            isDgt5,
        });
        await executeDGTExcelTemplate(filter, "Plantilla_General_mt.xlsm");
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
                                {...register("identification")}
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
                    <div className="field col-8 md:col-2">
                        <label htmlFor="dgt5" className="mr-2 font-bold">
                            DGT5
                        </label>
                        <InputSwitch
                            id="dgt5"
                            checked={isDgt5}
                            onChange={handleToggleDGT5}
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
