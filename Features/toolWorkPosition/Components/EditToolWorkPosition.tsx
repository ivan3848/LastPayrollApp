
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useEditToolWorkPositionQuery from "../Hooks/useEditToolWorkPositionQuery";
import { IToolWorkPosition } from "../Types/IToolWorkPosition";
import toolWorkPositionFormSchemas from "../Validations/ToolWorkPositionFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import useToolWorkDefinitionQuery from "@/Features/toolWorkDefinition/Hooks/useToolWorkDefinitionQuery";

interface Props {
    entity: IToolWorkPosition;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditToolWorkPosition = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = toolWorkPositionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IToolWorkPosition>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data: dataPosition } = usePositionQuery(params, []);
    const { data: dataToolWorkDefinition } = useToolWorkDefinitionQuery(params, []);

    const editEntity = useEditToolWorkPositionQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IToolWorkPosition) => {
        data.idPositionToolWorkDefinition = entity.idPositionToolWorkDefinition;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Herramienta De Posición"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="idPosition" className="w-full">
                        Posición
                    </label>
                    <GenericDropDown
                        id="idPosition"
                        isValid={!!errors.idPosition}
                        text="name"
                        data={dataPosition.items}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idPosition}
                    />
                    {errors.idPosition && (
                        <small className="p-invalid text-danger">
                            {errors.idPosition.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idToolWorkDefinition" className="w-full">
                        Herramienta de posición
                    </label>
                    <GenericDropDown
                        id="idToolWorkDefinition"
                        isValid={!!errors.idToolWorkDefinition}
                        text="name"
                        data={dataToolWorkDefinition.items}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idToolWorkDefinition}
                    />
                    {errors.idToolWorkDefinition && (
                        <small className="p-invalid text-danger">
                            {errors.idToolWorkDefinition.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditToolWorkPosition;
