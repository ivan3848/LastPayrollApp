import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericCheckBox from "@/Features/Shared/Components/GenericCheckBox";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import useAccountingAccountQuery from "@/Features/accountingAccount/Hooks/useAccountingAccountQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditConceptQuery from "../Hooks/useEditConceptQuery";
import { IConcept } from "../Types/IConcept";
import conceptFormSchemas from "../Validations/ConceptFormSchemas";
import { TABLE_NAME_CONCEPT_TYPE } from "@/constants/StatusTableName";

interface Props {
    entity: IConcept;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditConcept = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = conceptFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IConcept>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditConceptQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IConcept) => {
        data.idConcept = entity.idConcept;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            header="Editar Concepto"
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
                        tableName={TABLE_NAME_CONCEPT_TYPE}
                        idValueEdit={entity.idConceptType}
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
                        defaultValue={entity.name}
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
                        defaultValue={entity.conceptCode}
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
                        idValueEdit={entity.idAccountingAccount}
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

                <div className="field">
                    <label htmlFor="percentValue" className="w-full">
                        Porcentaje
                    </label>
                    <GenericInputNumber
                        {...register("percentValue")}
                        id="percentValue"
                        isValid={!!errors.percentValue}
                        currentValue={entity.percentValue}
                        minValue={0}
                        maxValue={100}
                        setValue={setValue}
                        watch={watch}
                        prefix=""
                        suffix="%"
                    />
                    {errors.percentValue && (
                        <small className="p-invalid text-danger">
                            {errors.percentValue.message?.toString()}
                        </small>
                    )}
                </div>

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
                        currentValue={entity.amount}
                    />
                    {errors.amount && (
                        <small className="p-invalid text-danger">
                            {errors.amount.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isSpecial"
                                text="Especial"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.isSpecial}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isBonification"
                                text="Bonificación"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.isBonification}
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isCommission"
                                text="Comisión"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.isCommission}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isOnlySecondPayroll"
                                text="Último pago de mes"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.isOnlySecondPayroll}
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isForChargeTaxIsr"
                                text="Para ISR"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.isForChargeTaxIsr}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isForChargeTax"
                                text="Para TSS"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.isForChargeTax}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="beforeIsr"
                                text="Excluir de ISR"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.beforeIsr}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="toProjectTax"
                                text="Proyectar TSS"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.toProjectTax}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="toProjectIsr"
                                text="Proyectar ISR"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.toProjectIsr}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid">

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isCompany"
                                text="Compañía"
                                watch={watch}
                                setValue={setValue}
                                currentValue={entity.isCompany}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditConcept;
