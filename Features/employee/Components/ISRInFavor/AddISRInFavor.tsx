import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { Calendar } from "primereact/calendar";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { IISRInFavor } from "./Types/ISRInFavor";
import ISRInFavorFormSchema from "./Validations/ISRInFavorFormSchema";
import { addISRInFavorService } from "./Service/isrInFavorService";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddISRInFavor = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = ISRInFavorFormSchema();
    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IISRInFavor>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addISRInFavorService,
    });

    const onSubmit = (data: IISRInFavor) => {
        data.idEmployee = id;
        data.originalAmount = data.originalAmount;
        data.date = data.date;
        data.idConcept = 17;
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };
    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar ISR a Favor"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="originalAmount">
                                Monto Original
                            </label>
                            <GenericInputNumber
                                id="originalAmount"
                                isValid={!!errors.originalAmount}
                                setValue={setValue}
                                watch={watch}
                            />
                            {errors.originalAmount && (
                                <small className="p-invalid text-danger">
                                    {errors.originalAmount.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="date">Fecha</label>
                            <Calendar
                                id="date"
                                onChange={(e) => setValue("date", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.date && (
                                <small className="p-invalid text-red-500">
                                    {errors.date.message?.toString()}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddISRInFavor;
