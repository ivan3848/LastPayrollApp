import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { addHours } from "@/Features/Shared/Helpers/DateHelper";
import useEditEntityQuery from "@/Features/Shared/Hooks/useEditEntityQuery";
import EditWorkSchedulerDetail from "@/Features/workSchedulerDetail/Components/EditWorkSchedulerDetail";
import { useWorkSchedulerDetailStore } from "@/Features/workSchedulerDetail/store/workSchedulerDetailStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import workSchedulerService from "../Services/workSchedulerService";
import { IWorkScheduler } from "../Types/IWorkScheduler";
import workSchedulerFormSchemas from "../Validations/WorkSchedulerFormSchemas";
import { IWorkSchedulerDetail } from "@/Features/workSchedulerDetail/Types/IWorkSchedulerDetail";

interface Props {
    entity: IWorkScheduler;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditWorkScheduler = ({
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
    entity,
}: Props) => {
    const { editEntityFormSchema } = workSchedulerFormSchemas();
    const { data: details, clearData } = useWorkSchedulerDetailStore();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IWorkScheduler>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditEntityQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
        service: workSchedulerService,
    });

    const onSubmit = (data: IWorkScheduler) => {
        data.workSchedulerDetail = details.map((detail) => {
            return {
                ...detail,
                start: addHours(detail.start, -4),
                end: addHours(detail.end, -4),
            } as IWorkSchedulerDetail;
        });

        data.idWorkScheduler = entity.idWorkScheduler;
        editEntity.mutate(data);
        clearData();
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "600px" }}
            header="Editar Horario"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Horario
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        autoFocus
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
                    <label htmlFor="workSchedulerCode" className="w-full">
                        Código
                    </label>
                    <InputText
                        {...register("workSchedulerCode")}
                        id="workSchedulerCode"
                        defaultValue={entity.workSchedulerCode}
                        className={classNames({
                            "p-invalid": errors.workSchedulerCode,
                        })}
                    />
                    {errors.workSchedulerCode && (
                        <small className="p-invalid text-danger">
                            {errors.workSchedulerCode.message?.toString()}
                        </small>
                    )}
                </div>
                <EditWorkSchedulerDetail entity={entity} toast={toast} setSubmitted={setSubmitted} />
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditWorkScheduler;
