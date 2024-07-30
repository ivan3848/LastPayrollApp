import { CONCEPT_TYPE_BENEFIT } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddPersonInsuranceQuery from "./Hooks/useAddPersonInsuranceQuery";
import useDependanHistoryById from "../Dependant/Hooks/useDependantByIdEmployee";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Dropdown } from "primereact/dropdown";
import { IDependant } from "../Dependant/Types/IDependant";

interface Props {
    id: number;
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddPersonInsurance = ({
    id,
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {

    const [selectedDependant, setSelectedDependant] = React.useState<IDependant>();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IPersonInsurance>({});

    const addEntity = useAddPersonInsuranceQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IPersonInsurance) => {
        data.idEmployee = id;
        data.idPerson = selectedDependant?.idPerson ?? 0;
        data.idConcept = data.idConcept
        data.startDate = data!.startDate!;
        data.endDate = data!.endDate!;
        data.idEmployeeAuthorize = id;
        data.amount = data!.amount!;
        data.percentDiscount = data.percentDiscount;

        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [];
    const { data } = useDependanHistoryById(
        params,
        listOfDependencies,
        id
    );

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar seguro al empleado"
            modal
            style={{ width: "40vw" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mt-2">
                    <label htmlFor="IdDependant" className="block mb-2">
                        Dependientes
                    </label>
                    <Dropdown
                        value={selectedDependant}
                        options={data}
                        onChange={(e) => setSelectedDependant(e.value)}
                        optionLabel="firstName"
                        placeholder="Seleccione un Dependiente"
                    />
                    {errors.idConcept && (
                        <small className="p-invalid text-danger">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="idBank" className="block mb-2">
                        Seguros
                    </label>
                    <GenericConceptDropDown
                        id="idConcept"
                        isValid={!!errors.idConcept}
                        setValue={setValue}
                        watch={watch}
                        code={CONCEPT_TYPE_BENEFIT}
                    />
                    {errors.idConcept && (
                        <small className="p-invalid text-danger">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="Amount" className="w-full mt-2">
                        Monto
                    </label>
                    <GenericInputNumber
                        {...register("amount")}
                        id="Amount"
                        isValid={!!errors.amount}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.amount && (
                        <small className="text-red-600">
                            {errors.amount.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="idStatusAccountType" className="block mb-2">
                        Descuento
                    </label>
                    <GenericInputNumber
                        {...register("percentDiscount")}
                        id="PercentDiscount"
                        isValid={!!errors.percentDiscount}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.percentDiscount && (
                        <small className="p-invalid text-danger">
                            {errors.percentDiscount.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="startDate" className="block mb-2 mt-2">
                        Fecha de Inicio
                    </label>
                    <Calendar
                        id="StartDate"
                        {...register("startDate")}
                        showIcon
                        onSelect={() =>
                            setValue("startDate", watch("startDate"))
                        }
                    />
                    {errors.startDate && (
                        <small className="text-red-600">
                            {errors.startDate.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="EndDate" className="block mb-2 mt-2">
                        Fecha final
                    </label>
                    <Calendar id="endDate" {...register("endDate")} showIcon />
                    {errors.endDate && (
                        <small className="text-red-600">
                            {errors.endDate.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="mt-2">
                    <DialogFooterButtons hideDialog={hideDialog} />
                </div>
            </form>
        </Dialog>
    );
};

export default AddPersonInsurance;
