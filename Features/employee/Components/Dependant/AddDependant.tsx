import { TABLE_NAME_RELATIONSHIP } from "@/constants/StatusTableName";
import useAddPersonQuery from "@/Features/person/Components/Hooks/useAddPersonQuery";
import personFormSchemas from "@/Features/person/Components/Validations/PersonFormSchemas";
import { IPerson } from "@/Features/person/Types/IPerson";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
    id: number;
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddDependant = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = personFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IPerson>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddPersonQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IPerson) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Person"
            modal
            style={{ width: "45vw" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="idConceptType" className="w-full">
                        Tipo de concepto
                    </label>
                    <GenericStatusDropDown
                        id="IdStatusRelationship"
                        isValid={!!errors.dependant?.idStatusRelationship}
                        setValue={setValue}
                        watch={watch}
                        isFocus={true}
                        tableName={TABLE_NAME_RELATIONSHIP}
                    />
                    {errors.dependant?.idStatusRelationship && (
                        <small className="p-invalid text-danger">
                            {errors.dependant?.idStatusRelationship.message?.toString()}
                        </small>
                    )}

                    <label htmlFor="name" className="w-full">
                        Nombre
                    </label>
                    <input
                        type="text"
                        {...register("firstName")}
                        className="w-full"
                    />
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddDependant;
