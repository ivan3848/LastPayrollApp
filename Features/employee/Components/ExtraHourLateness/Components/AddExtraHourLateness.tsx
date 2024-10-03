import { CONCEPT_TYPE_EXTRAHOUR_LATENESS } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { useForm } from "react-hook-form";
import { addExtraHourLatenessService } from "../Services/extraHourLatenessServices";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddExtraHourLateness = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    // const { addEntityFormSchema } = LicensesFormSchema();

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IExtraHourLateness>();

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addExtraHourLatenessService,
    });

    const onSubmit = (data: IExtraHourLateness) => {
        data.idEmployee = id;
        data.idConcept = data.idConcept;
        data.date = data.date;
        data.hourAmount = data.hourAmount;
        data.description = data.description;
        data.typeValue = data.typeValue;

        // addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    let typeValue: string[] = ["Hora extra", "Tardanza"];

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Horas"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
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
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                code={CONCEPT_TYPE_EXTRAHOUR_LATENESS}
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
                            <label htmlFor="hourAmount">
                                Cantidad de horas
                            </label>
                            <div>
                                <GenericInputNumber
                                    id="hourAmount"
                                    isValid={!!errors.hourAmount}
                                    setValue={setValue}
                                    watch={watch}
                                />
                                {errors.hourAmount && (
                                    <small className="p-invalid text-danger">
                                        {errors.hourAmount.message?.toString()}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="isToPay">Tipo</label>
                            <div>
                                <SelectButton
                                    {...register("typeValue")}
                                    value={
                                        watch("typeValue") == "extraHour"
                                            ? "Hora extra"
                                            : "Tardanza"
                                    }
                                    onChange={(e) => {
                                        setValue(
                                            "typeValue",
                                            e.value === "Hora extra"
                                                ? "extraHour"
                                                : "lateness"
                                        );
                                    }}
                                    options={typeValue}
                                />
                            </div>
                        </div>
                        <div className="field col-12 md:col-12 lg:4">
                            <label htmlFor="description">Descripción</label>
                            <InputText
                                id="description"
                                type="text"
                                {...register("description")}
                            />
                            {errors.description && (
                                <small className="p-invalid text-red-500">
                                    {errors.description.message?.toString()}
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

export default AddExtraHourLateness;
