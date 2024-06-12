import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import useToolWorkDefinitionQuery from "@/Features/toolWorkDefinition/Hooks/useToolWorkDefinitionQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddToolWorkPositionQuery from "../Hooks/useAddToolWorkPositionQuery";
import { IToolWorkPosition } from "../Types/IToolWorkPosition";
import toolWorkPositionFormSchemas from "../Validations/ToolWorkPositionFormSchemas";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddToolWorkPosition = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = toolWorkPositionFormSchemas();

    const {
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IToolWorkPosition>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddToolWorkPositionQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IToolWorkPosition) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "450px" }}
            header="Agregar Herramienta De Posición"
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
                        useQuery={usePositionQuery}
                        setValue={setValue}
                        watch={watch}
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
                        useQuery={useToolWorkDefinitionQuery}
                        setValue={setValue}
                        watch={watch}
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

export default AddToolWorkPosition;
