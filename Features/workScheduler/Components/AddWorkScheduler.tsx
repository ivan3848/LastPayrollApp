import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import workSchedulerService from "../Services/workSchedulerService";
import { IWorkScheduler } from "../Types/IWorkScheduler";
import workSchedulerFormSchemas from "../Validations/WorkSchedulerFormSchemas";
import AddWorkSchedulerDetail from "@/Features/workSchedulerDetail/Components/AddWorkSchedulerDetail";
import { useWorkSchedulerDetailStore } from "@/Features/workSchedulerDetail/store/workSchedulerDetailStore";
import { addHours } from "@/Features/Shared/Helpers/DateHelper";
import { IWorkSchedulerDetail } from "@/Features/workSchedulerDetail/Types/IWorkSchedulerDetail";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddWorkScheduler = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = workSchedulerFormSchemas();
    const { data: details, clearData } = useWorkSchedulerDetailStore();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IWorkScheduler>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
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
        addEntity.mutate(data);
        clearData();
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "600px" }}
            header="Agregar Horario"
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
                <AddWorkSchedulerDetail />
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddWorkScheduler;
