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
                    <label htmlFor="idZone" className="w-full">
                        Zona
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
                        Ubicación
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
                {/* <div className="field">
                    <label htmlFor="address" className="w-full">
                        Dirección
                    </label>
                    <InputText
                        {...register("address")}
                        id="address"
                        className={classNames({
                            "p-invalid": errors.address,
                        })}
                    />
                    {errors.address && (
                        <small className="p-invalid text-danger">
                            {errors.address.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="code" className="w-full">
                        Código
                    </label>
                    <InputText
                        {...register("code")}
                        id="code"
                        className={classNames({
                            "p-invalid": errors.code,
                        })}
                    />
                    {errors.code && (
                        <small className="p-invalid text-danger">
                            {errors.code.message?.toString()}
                        </small>
                    )}
                </div> */}
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddConcept;
