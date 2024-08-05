import { CONCEPT_TYPE_INSURANCE } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useDependanHistoryById from "../Dependant/Hooks/useDependantByIdEmployee";
import useEditPersonInsurance from "./Hooks/useEditPersonInsurance";
import PersonInsuranceFormSchema from "./Validation/PersonInsuranceFormSchema";
import { IDependantPerson } from "./AddPersonInsurance";
import { IConcept } from "@/Features/concept/Types/IConcept";
import { IEmployee } from "../../Types/IEmployee";

interface Props {
    entity: IPersonInsurance;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    employee: IEmployee;
}

const EditPersonInsurance = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
    employee,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [true];
    const { editEntityFormSchema } = PersonInsuranceFormSchema();

    const [listDependats, setListDependats] = React.useState<IDependantPerson[]>([]);
    const [selectDependant, setSelectDependant] = React.useState<IDependantPerson>();
    const [conceptField, setConceptField] = React.useState<IConcept>();

    const { data } = useDependanHistoryById(
        params,
        listOfDependencies,
        employee.idEmployee!
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
    } = useForm<IPersonInsurance>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditPersonInsurance({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IPersonInsurance) => {
        data.idEmployee = entity.idEmployee;
        data.idPerson = selectDependant?.idPerson ?? entity.idPerson!;
        data.idConcept = data.idConcept
        data.startDate = data!.startDate!;
        data.endDate = data!.endDate!;
        data.idEmployeeAuthorize = employee.idEmployee;
        data.amount = data?.amount!;
        data.percentDiscount = conceptField?.percentValue! ?? entity.percentDiscount;

        editEntity.mutate(data);
        return;
    };

    const dependantList = () => {
        const tes = [];
        tes.push({
            idPerson: +employee.idPerson!,
            fullName: employee.employeeName!,
        });
        for (let i = 0; i < data.length; i++) {
            tes.push({
                idPerson: +data[i].idPerson!,
                fullName: data[i].fullName!,
            });
        }
        setListDependats(tes);
    }

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
            onShow={dependantList}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mt-2">
                    <label htmlFor="idPerson" className="block mb-2">
                        Asegurado
                    </label>
                    <Dropdown
                        value={listDependats.find(
                            (item) => item.idPerson === (watch("idPerson") ?? entity.idPerson))
                        }
                        options={listDependats}
                        onChange={(e) => setSelectDependant(e.value)}
                        optionLabel="fullName"
                        placeholder="Seleccione un Asegurado..."
                    />
                    {errors.idConcept && (
                        <small className="text-red-600">
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
                        setData={setConceptField}
                    />
                    {errors.idConcept && (
                        <small className="text-red-600">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="percentDiscount" className="block mb-2">
                        Descuento
                    </label>
                    <GenericInputNumber
                        id="percentDiscount"
                        isValid={!!errors.percentDiscount}
                        currentValue={conceptField?.percentValue ?? entity.percentDiscount}
                        setValue={setValue}
                        watch={watch}
                        isReadOnly={true}
                    />
                    {errors.percentDiscount && (
                        <small className="text-red-600">
                            {errors.percentDiscount.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="amount" className="w-full mt-2">
                        Monto
                    </label>
                    <GenericInputNumber
                        id="amount"
                        isValid={!!errors.amount}
                        currentValue={(conceptField?.amount || 0) * (watch("percentDiscount") / 100)}
                        setValue={setValue}
                        watch={watch}
                        isReadOnly={true}
                    />
                    {errors.amount && (
                        <small className="text-red-600">
                            {errors.amount.message?.toString()}
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
