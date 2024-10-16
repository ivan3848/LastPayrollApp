import { CONCEPT_TYPE_PERMIT } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { addPermitService } from "./Services/PermitService";
import PermitFormSchema from "./Validation/PermitFormSchema";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddPermit = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = PermitFormSchema();

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IPermit>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addPermitService,
    });

    const onSubmit = (data: IPermit) => {
        data.idEmployee = id;
        data.idConcept = data.idConcept;
        data.idEmployeeAuthorize = id;
        data.idEmployeeRegister = id;
        data.hourAmount = data.hourAmount;
        data.amount = data.amount;
        data.startDateTime = data.startDateTime;
        data.endDateTime = data.endDateTime;
        data.isPaid = data.isPaid ?? false;
        data.isToPay = data.isToPay ?? false;

        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Permisos"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                code={CONCEPT_TYPE_PERMIT}
                                isValid={!!errors.idConcept}
                                watch={watch}
                                setValue={setValue}
                            />
                            {errors.idConcept && (
                                <small className="p-invalid text-danger">
                                    {errors.idConcept.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="startDateTime">Fecha De incio</label>
                            <Calendar
                                id="startDateTime"
                                onChange={(e) => setValue("startDateTime", e.value!)}
                                showIcon
                                showButtonBar
                                showTime
                                hourFormat="12"
                            />
                            {errors.startDateTime && (
                                <small className="p-invalid text-red-500">
                                    {errors.startDateTime.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="endDateTime">Fecha Final</label>
                            <Calendar
                                id="endDateTime"
                                onChange={(e) => setValue("endDateTime", e.value!)}
                                showIcon
                                showButtonBar
                                showTime
                                hourFormat="12"
                            />
                            {errors.endDateTime && (
                                <small className="p-invalid text-red-500">
                                    {errors.endDateTime.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="percentDiscount" className="block mb-2">
                                Cantidad de horas
                            </label>
                            <GenericInputNumber
                                id="hourAmount"
                                isValid={!!errors.hourAmount}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly={true}
                                prefix="Horas: "
                                currentValue={
                                    (new Date(watch("endDateTime")).getTime() -
                                        new Date(watch("startDateTime")).getTime()) /
                                    (1000 * 60 * 60)
                                }
                            />
                            {errors.hourAmount && (
                                <small className="text-red-600">
                                    {errors.hourAmount.message?.toString()}
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

export default AddPermit;
