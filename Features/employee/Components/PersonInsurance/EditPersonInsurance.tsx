import { CONCEPT_TYPE_BENEFIT, CONCEPT_TYPE_INSURANCE } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useDependanHistoryById from "../Dependant/Hooks/useDependantByIdEmployee";
import useEditPersonInsurance from "./Hooks/useEditPersonInsurance";

interface Props {
    entity: IPersonInsurance;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    id: number;
}

const EditPersonInsurance = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
    id,
}: Props) => {
    const [selectedDependant, setSelectedDependant]
        = React.useState<IPersonInsurance>(entity);

    // const [startDate, setStartDate] = useState<Date>(new Date(entity.startDate));
    // const [endDate, setEndDate] = useState<Date>(new Date(entity.endDate));

    // const { editEntityFormSchema } = dependantFormSchema();

    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [true];

    const { data } = useDependanHistoryById(
        params,
        listOfDependencies,
        id
    );

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "startDate" || key === "endDate") {
                    setValue(key as keyof IPersonInsurance,
                        new Date(entity[key as keyof IPersonInsurance] as Date));
                    return;
                }
                setValue(
                    key as keyof IPersonInsurance,
                    entity[key as keyof IPersonInsurance]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPersonInsurance>({});
    console.log(entity);
    const editEntity = useEditPersonInsurance({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    console.log(selectedDependant);

    const onSubmit = (data: IPersonInsurance) => {
        data.idPersonInsurance = entity.idPersonInsurance;
        data.idEmployee = id;
        data.idPerson = selectedDependant?.idPerson ?? 0;
        data.idConcept = data.idConcept
        data.startDate = data.startDate;
        data.endDate = data.endDate;
        data.idEmployeeAuthorize = id;
        data.amount = data!.amount!;
        data.percentDiscount = data.percentDiscount;

        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            header="Editar seguro al dependiente"
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
                        value={data.find(
                            (item: any) => item.idPerson === selectedDependant.idPerson
                        )}
                        options={data}
                        onChange={(e) => setSelectedDependant(e.value)}
                        optionLabel="firstName"
                        placeholder="Seleccione un Dependiente..."
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
                        idValueEdit={entity.idConcept!}
                        setValue={setValue}
                        watch={watch}
                        code={CONCEPT_TYPE_INSURANCE}
                    />
                    {errors.idConcept && (
                        <small className="p-invalid text-danger">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="amount" className="w-full mt-2">
                        Monto
                    </label>
                    <GenericInputNumber
                        {...register("amount")}
                        id="amount"
                        isValid={!!errors.amount}
                        currentValue={entity.amount}
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
                        id="percentDiscount"
                        isValid={!!errors.percentDiscount}
                        currentValue={entity.percentDiscount}
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
                        id="startDate"
                        value={watch("startDate") ?? new Date(entity?.startDate!)}
                        onChange={(e) => setValue("startDate", e.value!)}
                        showIcon
                        showButtonBar
                        key={entity?.startDate.toString()}
                    />
                    {errors.startDate && (
                        <small className="text-red-600">
                            {errors.startDate.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="endDate" className="block mb-2 mt-2">
                        Fecha final
                    </label>
                    <Calendar
                        id="endDate"
                        {...register("endDate")}
                        value={watch("endDate") ?? new Date(entity.endDate)}
                        onChange={(e) => setValue("endDate", new Date(e.value!))}
                        showIcon
                        key={entity.endDate.toString()}

                    />
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

export default EditPersonInsurance;
