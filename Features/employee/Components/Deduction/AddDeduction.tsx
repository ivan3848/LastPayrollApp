import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { Calendar } from "primereact/calendar";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { CONCEPT_TYPE_DEDUCTION } from "@/constants/conceptTypes";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { IDeductionInsert } from "./Types/IDeductionInsert";
import { addDeductionService } from "./Services/deductionService";
import { IDeduction } from "./Types/IDeduction";
import DeductionFormSchema from "./Validation/DeductionFormSchema";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddDeduction = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = DeductionFormSchema();

    const {
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IDeductionInsert>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addDeductionService,
    });

    const onSubmit = (data: IDeduction) => {
        data.idEmployee = id;
        data.idConcept = data.idConcept;
        data.start = data.start;
        data.end = data.end;
        data.amount = data.amount;
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar deducción"
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
                                code={CONCEPT_TYPE_DEDUCTION}
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
                            <label htmlFor="amount">Monto</label>
                            <GenericInputNumber
                                id="amount"
                                isValid={!!errors.amount}
                                setValue={setValue}
                                watch={watch}
                            />
                            {errors.amount && (
                                <small className="p-invalid text-danger">
                                    {errors.amount.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha De incio</label>
                            <Calendar
                                id="start"
                                onChange={(e) => setValue("start", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.start && (
                                <small className="p-invalid text-red-500">
                                    {errors.start.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha Final</label>
                            <Calendar
                                id="end"
                                onChange={(e) => setValue("end", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.end && (
                                <small className="p-invalid text-red-500">
                                    {errors.end.message?.toString()}
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

export default AddDeduction;
