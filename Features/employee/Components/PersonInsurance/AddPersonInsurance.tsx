import { CONCEPT_TYPE_INSURANCE } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddPersonInsuranceQuery from "./Hooks/useAddPersonInsuranceQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Dropdown } from "primereact/dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonInsuranceFormSchema from "./Validation/PersonInsuranceFormSchema";
import { IConcept } from "@/Features/concept/Types/IConcept";
import useDependanHistoryById from "../Dependant/Hooks/useDependantByIdEmployee";
import { IEmployee } from "../../Types/IEmployee";

interface Props {
    employee: IEmployee;
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

export interface IDependantPerson {
    idPerson: number;
    fullName: string;
}

const AddPersonInsurance = ({
    employee,
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const [listDependats, setListDependats] = React.useState<
        IDependantPerson[]
    >([]);
    const [selectDependant, setSelectDependant] =
        React.useState<IDependantPerson>();
    const [conceptField, setConceptField] = React.useState<IConcept>();

    const { addEntityFormSchema } = PersonInsuranceFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IAddPersonInsurance>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddPersonInsuranceQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const test = () => {
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
    };

    const onSubmit = (data: IAddPersonInsurance) => {
        data.idEmployee = employee.idEmployee;
        data.idPerson = selectDependant?.idPerson ?? employee.idPerson!;
        data.idConcept = data.idConcept;
        data.startDate = data!.startDate!;
        data.endDate = data!.endDate!;
        data.idEmployeeAuthorize = employee.idEmployee;
        data.amount = conceptField?.amount!;
        data.percentDiscount = conceptField?.percentValue!;

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
        employee.idEmployee!
    );

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar seguro al empleado"
            modal
            style={{ width: "40vw" }}
            className="p-fluid"
            onHide={hideDialog}
            onShow={test}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mt-2">
                    <label htmlFor="idPerson" className="block mb-2">
                        Asegurado
                    </label>
                    <Dropdown
                        value={selectDependant}
                        options={listDependats}
                        onChange={(e) => setSelectDependant(e.value)}
                        optionLabel="fullName"
                        defaultValue={employee?.idPerson}
                        placeholder="Seleccione un Asegurado..."
                    />
                    {errors.idConcept && (
                        <small className="text-red-600">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="idConcept" className="block mb-2">
                        Seguros
                    </label>
                    <GenericConceptDropDown
                        id={"idConcept"}
                        code={CONCEPT_TYPE_INSURANCE}
                        isValid={!!errors.idConcept}
                        watch={watch}
                        setValue={setValue}
                        setData={setConceptField}
                    />
                    {errors.idConcept && (
                        <small className="text-red-600">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="percentDiscount" className="block mb-2">
                        Descuento
                    </label>
                    <GenericInputNumber
                        id="percentDiscount"
                        isValid={!!errors.percentDiscount}
                        setValue={setValue}
                        watch={watch}
                        isReadOnly={true}
                        currentValue={conceptField?.percentValue}
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
                        currentValue={
                            (conceptField?.amount || 0) *
                            (watch("percentDiscount") / 100)
                        }
                        id="amount"
                        isValid={!!errors.amount}
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
                    <label htmlFor="endDate" className="block mb-2 mt-2">
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
