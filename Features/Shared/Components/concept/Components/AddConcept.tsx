import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useZoneQuery from "@/Features/zone/Hooks/useZoneQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddConceptQuery from "../Hooks/useAddConceptQuery";
import { IConcept } from "../Types/IConcept";
import conceptFormSchemas from "../Validations/ConceptFormSchemas";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import useAccountingAccountQuery from "@/Features/accountingAccount/Hooks/useAccountingAccountQuery";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { Checkbox } from "primereact/checkbox";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddConcept = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = conceptFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IConcept>({
        resolver: zodResolver(addEntityFormSchema),
    });

    let inputsToShow: string[] = ["percentValue", "amount", "isSpecial", "isBonification", "isCommission"];

    // 4855	Beneficio
    // 4856	Deducción
    // 4857	Tipo de hora
    // 4858	Seguro
    // 4859	Nómina
    // 4860	Préstamo

    switch (watch("idConceptType")) {
        case 4855:
            // inputsToShow = [];
            break;

        default:
            break;
    }

    const addEntity = useAddConceptQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IConcept) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Concepto"
            modal
            style={{ width: "450px" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="idConceptType" className="w-full">
                        Tipo de concepto
                    </label>
                    <GenericStatusDropDown
                        id="idConceptType"
                        isValid={!!errors.idConceptType}
                        setValue={setValue}
                        watch={watch}
                        isFocus={true}
                        tableName="ConceptType"
                    />
                    {errors.idConceptType && (
                        <small className="p-invalid text-danger">
                            {errors.idConceptType.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Concepto
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        autoFocus
                        className={classNames({
                            "p-invalid": errors.name,
                        })}
                    />
                    {errors.name && (
                        <small className="p-invalid text-danger">
                            {errors.name.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="conceptCode" className="w-full">
                        Código de concepto
                    </label>
                    <InputText
                        {...register("conceptCode")}
                        id="conceptCode"
                        className={classNames({
                            "p-invalid": errors.conceptCode,
                        })}
                    />
                    {errors.conceptCode && (
                        <small className="p-invalid text-danger">
                            {errors.conceptCode.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="idAccountingAccount" className="w-full">
                        Cuenta contable
                    </label>
                    <GenericDropDown
                        id="idAccountingAccount"
                        isValid={!!errors.idAccountingAccount}
                        text="name"
                        useQuery={useAccountingAccountQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idAccountingAccount && (
                        <small className="p-invalid text-danger">
                            {errors.idAccountingAccount.message?.toString()}
                        </small>
                    )}
                </div>

                {inputsToShow.includes("percentValue") && (
                    <div className="field">
                        <label htmlFor="percentValue" className="w-full">
                            Porcentaje
                        </label>
                        <GenericInputNumber
                            {...register("percentValue")}
                            id="percentValue"
                            isValid={!!errors.percentValue}
                            minValue={0}
                            maxValue={100}
                            setValue={setValue}
                            watch={watch}
                        />
                        {errors.percentValue && (
                            <small className="p-invalid text-danger">
                                {errors.percentValue.message?.toString()}
                            </small>
                        )}
                    </div>
                )}

                {inputsToShow.includes("amount") && (
                    <div className="field">
                        <label htmlFor="amount" className="w-full">
                            Monto
                        </label>
                        <GenericInputNumber
                            {...register("amount")}
                            id="amount"
                            isValid={!!errors.amount}
                            setValue={setValue}
                            watch={watch}
                        />
                        {errors.percentValue && (
                            <small className="p-invalid text-danger">
                                {errors.percentValue.message?.toString()}
                            </small>
                        )}
                    </div>
                )}

                <div className="grid">
                    <div className="col-12 md:col-4">
                        {inputsToShow.includes("isSpecial") && (
                            <div className="field-checkbox">
                                <Checkbox
                                    inputId="isSpecial"
                                    name="isSpecial"
                                    value="isSpecial"
                                    checked={watch("isSpecial")}
                                    onChange={(e) =>
                                        setValue("isSpecial", e.checked!)
                                    }
                                />
                                <label htmlFor="isSpecial">Especial</label>
                            </div>
                        )}
                    </div>

                    <div className="col-12 md:col-4">
                        {inputsToShow.includes("isBonification") && (
                            <div className="field-checkbox">
                                <Checkbox
                                    inputId="isBonification"
                                    name="isBonification"
                                    value="isBonification"
                                    checked={watch("isBonification")}
                                    onChange={(e) =>
                                        setValue("isBonification", e.checked!)
                                    }
                                />
                                <label htmlFor="isBonification">
                                    Bonificación
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="col-12 md:col-4">
                        {inputsToShow.includes("isCommission") && (
                            <div className="field-checkbox">
                                <Checkbox
                                    inputId="isCommission"
                                    name="isCommission"
                                    value="isCommission"
                                    checked={watch("isCommission")}
                                    onChange={(e) =>
                                        setValue("isCommission", e.checked!)
                                    }
                                />
                                <label htmlFor="isCommission">Comisión</label>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddConcept;
