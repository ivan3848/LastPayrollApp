import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useConceptQuery from "@/Features/concept/Hooks/useConceptQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePayrollConfigurationQuery from "../Hooks/usePayrollConfigurationQuery";
import { IPayrollConfiguration } from "../Types/IPayrollConfiguration";
import payrollConfigurationFormSchema from "../Validation/payrollConfigurationFormSchema";
import "./styles/box.css";
import React from "react";
import EditButton from "@/Features/Shared/Components/EditButton";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IPayrollConfiguration) => void;
    handleDelete: (entity: IPayrollConfiguration) => void;
}

const PayrollConfigurationTable = ({
    submitted,
    handleAdd,
    handleEdit,
}: Props) => {
    const [payrollConfiguration, setSelectedPayrollConfig] =
        useState<IPayrollConfiguration | null>(null);

    const { params } = useParamFilter();
    const { data } = usePayrollConfigurationQuery(params, [submitted]);
    const [selectedARSConcept, setSelectedARSConcept] = useState<number | null>(
        null
    );

    useEffect(() => {
        if (data?.items.length > 0) {
            setSelectedPayrollConfig(data.items[0]);
        }
    }, [data]);

    const { editEntityFormSchema } = payrollConfigurationFormSchema();
    const {
        watch,
        formState: { errors },
    } = useForm<IPayrollConfiguration>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: payrollConfiguration!,
    });

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);

    const formatPercentage = (value: number) => `${value} %`;

    const renderInputText = (label: string, value: any | number) => (
        <div className="box">
            <p className="bold">{label}</p>
            <InputText className="box" value={value} disabled />
        </div>
    );

    const renderDropDown = (
        label: string,
        idValueEdit: number,
        setState: (value: any) => void
    ) => (
        <div className="box">
            <p className="bold">{label}</p>
            <GenericDropDown
                id={"idConcept"}
                isValid={!!errors.idPayrollConfiguration}
                text="name"
                idValueEdit={idValueEdit}
                useQuery={useConceptQuery}
                setValue={setState}
                watch={watch}
                isDisabled={true}
            />
        </div>
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Configuración de Nómina</h3>

            <EditButton
                handleEdit={() => handleEdit(payrollConfiguration!)}
                entity={payrollConfiguration}
            />
        </div>
    );

    return (
        <>
            {header}
            {payrollConfiguration && (
                <div className="scrollable-container scrollable-container:hover">
                    <div className="grid-container" id="idPayrollConfiguration">
                        {renderInputText(
                            "Tope AFP",
                            formatCurrency(payrollConfiguration.topAFP)
                        )}
                        {renderInputText(
                            "Tope ARL",
                            formatCurrency(payrollConfiguration.topARL)
                        )}
                        {renderInputText(
                            "Tope ARS",
                            formatCurrency(payrollConfiguration.topARS)
                        )}
                        {renderInputText(
                            "Salario Mínimo",
                            formatCurrency(payrollConfiguration.minimumSalary!)
                        )}
                        {renderInputText(
                            "Porcentaje AFP",
                            formatPercentage(
                                payrollConfiguration.percentageAFP!
                            )
                        )}
                        {renderInputText(
                            "Porcentaje ARL",
                            formatPercentage(
                                payrollConfiguration.arlToPercentage!
                            )
                        )}
                        {renderInputText(
                            "Porcentaje ARS",
                            formatPercentage(
                                payrollConfiguration.percentageARS!
                            )
                        )}
                        {renderInputText(
                            "Porcentaje Infotep",
                            formatPercentage(
                                payrollConfiguration.infotepPercentage!
                            )
                        )}
                        {renderInputText(
                            "Porcentaje Infotep Especial",
                            formatPercentage(
                                payrollConfiguration.infotepSpecial!
                            )
                        )}
                        {renderInputText(
                            "Porcentaje de gastos AFP",
                            formatPercentage(
                                payrollConfiguration.afpToExpensePercentage!
                            )
                        )}
                        {renderInputText(
                            "Porcentaje de gastos ARS",
                            formatPercentage(
                                payrollConfiguration.arsToExpensePercentage!
                            )
                        )}
                        {renderDropDown(
                            "Concepto Salario",
                            payrollConfiguration.salary,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Infotep",
                            payrollConfiguration.infotep,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto AFP",
                            payrollConfiguration.afp,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto ARS",
                            payrollConfiguration.ars,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto ARL",
                            payrollConfiguration.arl,
                            setSelectedARSConcept
                        )}

                        {renderDropDown(
                            "Concepto AFP empleador débito",
                            payrollConfiguration.afpCompanyDebit!,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto ARS empleador débito",
                            payrollConfiguration.arsCompanyDebit!,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto AFP empleador crédito",
                            payrollConfiguration.afpCompanyCredit!,
                            setSelectedARSConcept
                        )}

                        {renderDropDown(
                            "Concepto ARS empleador crédito",
                            payrollConfiguration.arsCompanyCredit!,
                            setSelectedARSConcept
                        )}

                        {renderDropDown(
                            "Concepto ARL empleador crédito",
                            payrollConfiguration.arlCompanyCredit!,
                            setSelectedARSConcept
                        )}

                        {renderDropDown(
                            "Concepto ARL empleador débito",
                            payrollConfiguration.arlCompanyDebit!,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto ISR",
                            payrollConfiguration.isr,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Navidad",
                            payrollConfiguration.christmasSalary,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Bonificación",
                            payrollConfiguration.bonification,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Preaviso",
                            payrollConfiguration.notice,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Cesantia",
                            payrollConfiguration.unemployment,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto ISR a Favor",
                            payrollConfiguration.isrInFavor,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Vacaciones",
                            payrollConfiguration.vacation,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Deuda Periodo Anterior",
                            payrollConfiguration.previousPeriodDebt,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto Deuda Pendiente",
                            payrollConfiguration.outstandingDebt,
                            setSelectedARSConcept
                        )}

                        {renderDropDown(
                            "Concepto bonificación de empleador",
                            payrollConfiguration.bonificationCompany,
                            setSelectedARSConcept
                        )}

                        {renderDropDown(
                            "Concepto salario de navidad empleador",
                            payrollConfiguration.christmasSalaryCompany,
                            setSelectedARSConcept
                        )}
                        {renderDropDown(
                            "Concepto INFOTEP empleador",
                            payrollConfiguration.infotepCompany,
                            setSelectedARSConcept
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default PayrollConfigurationTable;
