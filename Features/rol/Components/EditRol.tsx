import useRolModuleQuery from "@/Features/rolModule/Hooks/useRolModuleQuery";
import { predefinedModules } from "@/Features/rolModule/Types/IrolDataView";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useEditRolQuery from "../Hooks/useEditRolQuery";
import IRol from "../Types/IRol";
import PickUpList from "./PickUpList";
import rolFormSchema from "../Validation/rolFormSchema";

interface Props {
    setEditEntityDialog: (value: boolean) => void;
    editEntityDialog: boolean;
    id: number;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entity: IRol;
}

const EditRol = ({
    setEditEntityDialog,
    editEntityDialog,
    toast,
    setSubmitted,
    entity,
}: Props) => {
    const { editEntityFormSchema } = rolFormSchema();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IRol>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditRolQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const { params } = useParamFilter(500);
    const [source, setSource] = useState<IRol[]>([]);
    const [target, setTarget] = useState<IRol[]>([]);
    const { data, isLoading, error } = useRolModuleQuery(params, []);

    useEffect(() => {
        if (data && data.items) {
            const initialSource = predefinedModules.filter(
                (item) =>
                    !target.some(
                        (targetItem) => targetItem.module === item.module
                    )
            );
            setSource(initialSource);
        }
    }, [data, target]);

    useEffect(() => {
        if (entity && data?.items) {
            reset({ description: entity.description });
            const initialTarget = entity.rolModule;

            const filteredSource = predefinedModules.filter(
                (item) =>
                    !initialTarget!.some(
                        (targetItem) => targetItem.module === item.module
                    )
            );

            setTarget(initialTarget!);
            setSource(filteredSource);
        }
    }, [entity, data, reset]);

    const onChange = (e: { source: IRol[]; target: IRol[] }) => {
        setSource(e.source);
        setTarget(e.target);
    };

    const onSubmit = (formData: IRol) => {
        formData.idRol = entity.idRol;
        formData.rolModule = target;
        formData.description = entity.description;

        if (target.length === 0) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Debe seleccionar al menos un modulo",
                life: 3000,
            });
            return;
        }
        editEntity.mutate(formData);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const itemTemplate = (data: IRol, onToggle: (item: IRol) => void) => {
        return (
            <div
                className="flex flex-wrap p-2 gap-3"
                onClick={() => onToggle(data)}
                style={{ cursor: "pointer" }}
            >
                <div className="flex-1 flex flex-column gap-2">
                    <div className="flex flex-column">
                        <span className="font-bold">{data.module}</span>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-box text-sm"></i>
                            <span>
                                Puede Editar: {data.canWrite ? "Si" : "No"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "55vw" }}
            header="Editar Configuración de Usuario"
            modal
            className="p-fluid m-auto"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field col-12 md:col-6 lg:col-4">
                    <label htmlFor="description" className="w-full">
                        Descrimpción
                    </label>
                    <InputText
                        {...register("description")}
                        id="description"
                        autoFocus
                        className={errors.description ? "p-invalid" : ""}
                        disabled={true}
                    />
                    {errors.description && (
                        <small className="p-invalid text-danger">
                            {errors.description.message?.toString()}
                        </small>
                    )}
                </div>

                <div id="rolModuleId">
                    <div className="p-fluid formgrid grid" id="rolModuleId">
                        <PickUpList
                            source={source}
                            target={target}
                            onChange={onChange}
                            itemTemplate={itemTemplate}
                            isLoading={isLoading}
                            error={error?.message}
                            filterBy="module"
                            dataKey={"module"}
                            pageSize={25}
                        />
                    </div>
                    {errors.module && (
                        <small className="p-invalid text-red-500 text-lg">
                            {errors.module.message?.toString()}
                        </small>
                    )}
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditRol;
