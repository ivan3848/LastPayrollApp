import useRolModuleQuery from "@/Features/rolModule/Hooks/useRolModuleQuery";
import { predefinedModules } from "@/Features/rolModule/Types/IrolDataView";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import rolService from "../Service/rolService";
import IRol from "../Types/IRol";
import PickUpList from "./PickUpList";
import rolFormSchema from "../Validation/rolFormSchema";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { CACHE_KEY_ROL } from "@/constants/cacheKeys";
import { Toast } from "primereact/toast";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    submitted: boolean;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddRol = ({ setAddEntityDialog, addEntityDialog, toast }: Props) => {
    const { addEntityFormSchema } = rolFormSchema();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IRol>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        service: rolService,
    });

    const { params } = useParamFilter(500);
    const [source, setSource] = useState<IRol[]>([]);
    const [target, setTarget] = useState<IRol[]>([]);
    const { data, isLoading, error } = useRolModuleQuery(params, []);

    const onChange = (e: { source: IRol[]; target: IRol[] }) => {
        setSource(e.source);
        setTarget(e.target);
    };

    const expireQuery = useExpireSessionQuery([CACHE_KEY_ROL]);
    const onSubmit = (data: IRol) => {
        if (target.length === 0) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Debe seleccionar al menos un modulo",
                life: 3000,
            });
            return;
        }

        data.rolModule = target;
        addEntity.mutateAsync(data).then(() => {
            expireQuery();
        });
        setAddEntityDialog(false);
    };

    useEffect(() => {
        setSource(predefinedModules);
    }, [predefinedModules]);

    const hideDialog = () => {
        setAddEntityDialog(false);
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
            visible={addEntityDialog}
            style={{ width: "55vw" }}
            header="Agregar Rol"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field col-12 md:col-6 lg:col-4">
                    <label htmlFor="description">Description</label>
                    <InputText
                        id="description"
                        type="text"
                        {...register("description")}
                    />
                    {errors.description && (
                        <small className="p-invalid text-red-500 text-lg">
                            {errors.description.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="col-12" id="rolModuleId">
                    <div className="p-fluid formgrid grid " id="rolModuleId">
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
                        {errors.module && (
                            <small className="p-invalid text-red-500 text-lg">
                                {errors.module.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddRol;
