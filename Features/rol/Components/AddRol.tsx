import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import userConfigurationFormSchema from "../../UserConfiguration/Validation/userFormSchema";
import useRolQuery from "../Hooks/useRolQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import PickUpListForRoles from "./PickUpListForRoles";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { useEffect, useState } from "react";
import IRol from "@/Features/rol/Types/IRol";
import { IInsertUser } from "@/Features/UserConfiguration/Types/IInsertUser";
import { userInsertService } from "@/Features/UserConfiguration/Service/userService";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddRol = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = userConfigurationFormSchema();

    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IInsertUser>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: userInsertService,
    });
    const { params } = useParamFilter();
    const [source, setSource] = useState<IRol[]>([]);
    const [target, setTarget] = useState<IRol[]>([]);
    const { data, isLoading, error } = useRolQuery(params, []);
    const onChange = (e: any) => {
        setSource(e.source);
        setTarget(e.target);
    };
    const onSubmit = (data: IInsertUser) => {
        data.idEmployee = id;
        addEntity.mutate(data);
    };

    useEffect(() => {
        if (data && data.items) {
            setSource(data.items);
        }
    }, [data]);

    const hideDialog = () => {
        setAddEntityDialog(false);
    };
    const itemTemplate = (data: IRol) => {
        return (
            <div className="flex flex-wrap p-2 gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <div className="flex flex-column">
                        <span className="font-bold">{data.module}</span>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag text-sm"></i>
                            <span>
                                Puede Editar: {data.canWrite ? "Si" : "No"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <span className="font-bold text-900">{data.module}</span>
                </div>
            </div>
        );
    };
    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "55vw" }}
            header="Agregar Configuración de Usuario"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <PickUpListForRoles
                            source={source}
                            target={target}
                            onChange={onChange}
                            itemTemplate={itemTemplate}
                            isLoading={isLoading}
                            error={error?.message}
                            dataKey="rolModuleId"
                            filterBy="module"
                        />
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddRol;
