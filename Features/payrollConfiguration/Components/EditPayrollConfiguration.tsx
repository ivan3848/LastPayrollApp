import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useConceptQuery from "@/Features/concept/Hooks/useConceptQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useEditPayrollConfiguration from "../Hooks/useEditPayrollConfiguration";
import { IPayrollConfiguration } from "../Types/IPayrollConfiguration";
import payrollConfigurationFormSchema from "../Validation/payrollConfigurationFormSchema";
import GenericDropDownConfiguration from "./GenericDropDownConfiguration";
import "./styles/box.css";
import { Calendar } from "primereact/calendar";

interface Props {
    entity: IPayrollConfiguration;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditPayrollConfiguration: React.FC<Props> = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}) => {
    const { editEntityFormSchema } = payrollConfigurationFormSchema();

    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPayrollConfiguration>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditPayrollConfiguration({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "start" || key === "end") {
                    entity[key as keyof IPayrollConfiguration] &&
                        setValue(
                            key,
                            new Date(
                                entity[
                                    key as keyof IPayrollConfiguration
                                ] as Date
                            )
                        );
                } else {
                    entity[key as keyof IPayrollConfiguration] &&
                        setValue(
                            key as keyof IPayrollConfiguration,
                            entity[key as keyof IPayrollConfiguration]
                        );
                }
            });
        }
    }, [entity, setValue]);

    const onSubmit = (data: IPayrollConfiguration) => {
        console.log(typeof entity.isrBreak);
        data.idPayrollConfiguration = entity.idPayrollConfiguration;
        data.bonificationBreak = entity.bonificationBreak;
        data.seniorityIncentiveBreak = entity.seniorityIncentiveBreak;
        data.end = new Date();
        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const renderDropDown = (
        label: string,
        idValueEdit: number,
        id: string,
        idToset: string
    ) => (
        <div className="box">
            <label htmlFor="minimumSalary" className="bold">
                {label}
            </label>
            <GenericDropDownConfiguration
                id={id}
                isValid={!!errors.ars}
                text="name"
                useQuery={useConceptQuery}
                setValue={setValue}
                watch={watch}
                idValueEdit={idValueEdit}
                idToSet={idToset}
            />
        </div>
    );

    const renderInput = (
        label: string,
        id: string,
        error: boolean,
        suffixUpDate?: string
    ) => (
        <>
            <label htmlFor={label} className="bold">
                {label}
            </label>
            <GenericInputNumber
                id={id}
                isValid={error}
                setValue={setValue}
                watch={watch}
                prefix={suffixUpDate ? "" : "RD$ "}
                suffix={suffixUpDate ? suffixUpDate : ""}
            />
        </>
    );

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "80vw" }}
            header="Editar Configuración de Nómina"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="scrollable-container scrollable-container:hover">
                    <div className="grid-container" id="idPayrollConfiguration">
                        <div className="box">
                            {renderInput("Tope AFP", "topAFP", !!errors.topAFP)}
                            {errors.topAFP && (
                                <small className="p-invalid text-danger">
                                    {errors.topAFP.message?.toString()}
                                </small>
                            )}
                            {errors.isrBreak && (
                                <small className="p-invalid text-danger">
                                    {errors.isrBreak.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            {renderInput("Tope ARL", "topARL", !!errors.topARL)}

                            {errors.topARL && (
                                <small className="p-invalid text-danger">
                                    {errors.topARL.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="box">
                            {renderInput("Tope ARS", "topARS", !!errors.topARS)}

                            {errors.topARS && (
                                <small className="p-invalid text-danger">
                                    {errors.topARS.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="box">
                            {renderInput(
                                "Salario Mínimo",
                                "minimumSalary",
                                !!errors.minimumSalary
                            )}
                            {errors.minimumSalary && (
                                <small className="p-invalid text-danger">
                                    {errors.minimumSalary.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="box">
                            {renderInput(
                                "Porcentaje AFP",
                                "percentageAFP",
                                !!errors.percentageAFP,
                                " %"
                            )}
                            {errors.percentageAFP && (
                                <small className="p-invalid text-danger">
                                    {errors.percentageAFP.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            {renderInput(
                                "Porcentaje ARL",
                                "percentageAFP",
                                !!errors.percentageARL,
                                " %"
                            )}
                            {errors.percentageARL && (
                                <small className="p-invalid text-danger">
                                    {errors.percentageARL.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            {renderInput(
                                "Porcentaje ARS",
                                "percentageARS",
                                !!errors.percentageAFP,
                                " %"
                            )}
                            {errors.percentageARS && (
                                <small className="p-invalid text-danger">
                                    {errors.percentageARS.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            {renderInput(
                                "Porcentaje Infotep",
                                "infotepPercentage",
                                !!errors.infotepPercentage,
                                " %"
                            )}
                            {errors.infotepPercentage && (
                                <small className="p-invalid text-danger">
                                    {errors.infotepPercentage.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="box">
                            {renderInput(
                                "Porcentaje Infotep Especial",
                                "infotepSpecial",
                                !!errors.infotepSpecial,
                                " %"
                            )}
                            {errors.infotepSpecial && (
                                <small className="p-invalid text-danger">
                                    {errors.infotepSpecial.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            {renderInput(
                                "Porcentaje de gastos AFP",
                                "afpToExpensePercentage",
                                !!errors.afpToExpensePercentage,
                                " %"
                            )}
                            {errors.afpToExpensePercentage && (
                                <small className="p-invalid text-danger">
                                    {errors.afpToExpensePercentage.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            {renderInput(
                                "Porcentaje de gastos ARS",
                                "arsToExpensePercentage",
                                !!errors.arsToExpensePercentage,
                                " %"
                            )}
                            {errors.arsToExpensePercentage && (
                                <small className="p-invalid text-danger">
                                    {errors.arsToExpensePercentage.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            <label htmlFor="start">Fecha De Inicio</label>

                            <Calendar
                                id="start"
                                value={watch("start") ?? entity?.start}
                                onChange={(e) => setValue("start", e.value!)}
                                showIcon
                                showButtonBar
                                key={entity?.start?.toString()}
                            />
                            {errors.start && (
                                <small className="p-invalid text-red-500">
                                    {errors.start.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="box">
                            <label htmlFor="end">Fecha De Inicio</label>

                            <Calendar
                                id="end"
                                value={watch("end") ?? entity?.end}
                                onChange={(e) => setValue("end", e.value!)}
                                showIcon
                                showButtonBar
                                key={entity?.end?.toString()}
                            />
                            {errors.end && (
                                <small className="p-invalid text-red-500">
                                    {errors.end.message?.toString()}
                                </small>
                            )}
                        </div>
                        {renderDropDown(
                            "Concepto Salario",
                            entity.salary,
                            "salary",
                            "salary"
                        )}

                        {renderDropDown(
                            "Concepto Infotep",
                            entity.infotep,
                            "infotep",
                            "infotep"
                        )}
                        {renderDropDown(
                            "Concepto AFP",
                            entity.afp,
                            "afp",
                            "afp"
                        )}
                        {renderDropDown(
                            "Concepto ARS",
                            entity.ars,
                            "ars",
                            "ars"
                        )}
                        {renderDropDown(
                            "Concepto ARL",
                            entity.arl,
                            "arl",
                            "arl"
                        )}

                        {renderDropDown(
                            "Concepto AFP empleador débito",
                            entity.afpCompanyDebit,
                            "afpCompanyDebit",
                            "afpCompanyDebit"
                        )}
                        {renderDropDown(
                            "Concepto ARS empleador débito",
                            entity.arsCompanyDebit,
                            "arsCompanyDebit",
                            "arsCompanyDebit"
                        )}
                        {renderDropDown(
                            "Concepto AFP empleador crédito",
                            entity.afpCompanyCredit,
                            "afpCompanyCredit",
                            "afpCompanyCredit"
                        )}

                        {renderDropDown(
                            "Concepto ARS empleador crédito",
                            entity.arsCompanyCredit,
                            "arsCompanyCredit",
                            "arsCompanyCredit"
                        )}
                        {renderDropDown(
                            "Concepto ARL empleador crédito",
                            entity.arlCompanyCredit,
                            "arlCompanyCredit",
                            "arlCompanyCredit"
                        )}
                        {renderDropDown(
                            "Concepto ARL empleador débito",
                            entity.arlCompanyDebit,
                            "arlCompanyDebit",
                            "arlCompanyDebit"
                        )}

                        {renderDropDown(
                            "Concepto ISR",
                            entity.isr,
                            "isr",
                            "isr"
                        )}
                        {renderDropDown(
                            "Concepto Navidad",
                            entity.christmasSalary,
                            "christmasSalary",
                            "christmasSalary"
                        )}
                        {renderDropDown(
                            "Concepto Bonificación",
                            entity.bonification,
                            "bonification",
                            "bonification"
                        )}
                        {renderDropDown(
                            "Concepto Preaviso",
                            entity.notice,
                            "notice",
                            "notice"
                        )}
                        {renderDropDown(
                            "Concepto Cesantia",
                            entity.unemployment,
                            "unemployment",
                            "unemployment"
                        )}
                        {renderDropDown(
                            "Concepto ISR a Favor",
                            entity.isrInFavor,
                            "isrInFavor",
                            "isrInFavor"
                        )}
                        {renderDropDown(
                            "Concepto Vacaciones",
                            entity.vacation,
                            "vacation",
                            "vacation"
                        )}
                        {renderDropDown(
                            "Concepto Deuda Periodo Anterior",
                            entity.previousPeriodDebt,
                            "previousPeriodDebt",
                            "previousPeriodDebt"
                        )}
                        {renderDropDown(
                            "Concepto Deuda Pendiente",
                            entity.outstandingDebt,
                            "outstandingDebt",
                            "outstandingDebt"
                        )}

                        {renderDropDown(
                            "Concepto bonificación de empleador",
                            entity.bonificationCompany,
                            "bonificationCompany",
                            "bonificationCompany"
                        )}
                        {renderDropDown(
                            "Concepto salario de navidad empleador",
                            entity.christmasSalaryCompany,
                            "christmasSalaryCompany",
                            "christmasSalaryCompany"
                        )}
                        {renderDropDown(
                            "Concepto INFOTEP empleador",
                            entity.infotepCompany,
                            "infotepCompany",
                            "infotepCompany"
                        )}
                        {renderDropDown(
                            "Concepto salario por pagar débito",
                            entity.salaryToPayEmployee,
                            "salaryToPayEmployee",
                            "salaryToPayEmployee"
                        )}
                        {renderDropDown(
                            "Concepto salario por pagar crédito",
                            entity.salaryToPayCompany,
                            "salaryToPayCompany",
                            "salaryToPayCompany"
                        )}
                    </div>
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditPayrollConfiguration;
