import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { Calendar } from "primereact/calendar";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { IProfit } from "./Types/IProfit";
import addProfitService from "./Services/profitService";
import ProfitFormSchema from "./Validation/ProfitFormSchema";
import { CONCEPT_TYPE_BENEFIT } from "@/constants/conceptTypes";
import { IProfitInsert } from "./Types/IProfitInsert";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { IEmployee } from "../../Types/IEmployee";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    employee: IEmployee;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddProfit = ({
    setAddEntityDialog,
    addEntityDialog,
    employee,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = ProfitFormSchema();

    const {
        handleSubmit,
        control,
        register,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IProfitInsert>({
        resolver: zodResolver(addEntityFormSchema)
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addProfitService,
    });

    const onSubmit = (data: IProfit) => {
        data.idEmployee = employee.idEmployee;
        data.idConcept = data.idConcept;
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };
    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Beneficio"
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
                                code={CONCEPT_TYPE_BENEFIT}
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
                        {
                            watch('idConcept') == 691 && (
                                <div className="field col-12 md:col-6 lg:col-4">
                                    <label htmlFor="temporaryDays">Dias Temporales</label>
                                    <GenericInputNumber
                                        id="temporaryDays"
                                        isValid={!!errors.temporaryDays}
                                        setValue={setValue}
                                        watch={watch}
                                        format={false}
                                    />
                                    {errors.temporaryDays && (
                                        <small className="p-invalid text-danger">
                                            {errors.temporaryDays.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            )
                        }

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="amount">Monto</label>
                            <GenericInputNumber
                                id="amount"
                                currentValue={watch('idConcept') == 691 ? watch('temporaryDays')! * (employee.salary / 23.83) : 0}
                                isValid={!!errors.amount}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly={watch('idConcept') == 691}
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

export default AddProfit;
