import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import React from "react";
import { useForm } from "react-hook-form";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import useDepartmentQuery from "@/Features/departments/Hooks/useDepartmentQuery";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useChangePositionSalaryQuery from "../hooks/useChangePositionSalary";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useEmployeeQuery from "../hooks/useEmployeeQuery";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const HierarchyPositionSalary = (
    employee: IEmployee,
    { toast, setSubmitted, setAddEntityDialog }: Props
) => {
    const { setFilters, params, setAllData } = useParamFilter();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IPositionSalary>();

    const changePositionSalaryEdit = useChangePositionSalaryQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onFormSubmit = (data: IPositionSalary) => {
        changePositionSalaryEdit.mutate(data);
        return;
    };

    const onDepartmentChange = () => {
        setFilters([{ column: "idDepartment", value: watch("idDepartment") }]);
        setAllData(true);
    };

    const onPositionChange = () => {
        setFilters([{ column: "idPosition", value: watch("idPosition") }]);
        setAllData(true);
    };

    const onPositionManagerChange = () => {
        setFilters([{ column: "idPosition", value: watch("idPosition") }]);
        setAllData(true);
    };

    return (
        <div className="grid">
            <div className="col-12 mx-auto">
                <div className="card">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <h4 style={{ marginBottom: "30px" }}>
                            Cambiar Posición
                        </h4>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <label htmlFor="Salary" className="w-full">
                                    Salario
                                </label>
                                <GenericInputNumber
                                    currentValue={employee.salary}
                                    id="salary"
                                    isValid={!!errors.salary}
                                    setValue={setValue}
                                    watch={watch}
                                />
                                {errors.salary && (
                                    <small className="p-invalid text-danger">
                                        {errors.salary.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label
                                    htmlFor="idDepartment"
                                    className="w-full"
                                >
                                    Departamento
                                </label>
                                <GenericDropDown
                                    id="idDepartment"
                                    isValid={!!errors.idDepartment}
                                    idValueEdit={employee.idDepartment}
                                    text="name"
                                    useQuery={useDepartmentQuery}
                                    setValue={setValue}
                                    watch={watch}
                                    onChange={onDepartmentChange}
                                />
                                {errors.idDepartment && (
                                    <small className="p-invalid text-danger">
                                        {errors.idDepartment.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="idPosition" className="w-full">
                                    Posición
                                </label>
                                <GenericDropDown
                                    id="idPosition"
                                    isValid={!!errors.idPosition}
                                    text="name"
                                    useQuery={usePositionQuery}
                                    idValueEdit={employee.idPosition}
                                    setValue={setValue}
                                    watch={watch}
                                    isDisabled={!watch("idDepartment")}
                                    param={params}
                                    onChange={onPositionChange}
                                />
                                {errors.idPosition && (
                                    <small className="p-invalid text-danger">
                                        {errors.idPosition.message?.toString()}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <label
                                    htmlFor="IdChangeManager"
                                    className="w-full"
                                >
                                    Supervisor
                                </label>
                                <GenericDropDown
                                    id="idHierarchyPositionManager"
                                    isValid={
                                        !!errors.idHierarchyPositionManager
                                    }
                                    text="name"
                                    useQuery={useEmployeeQuery}
                                    idValueEdit={
                                        employee.idHierarchyPositionManager
                                    }
                                    setValue={setValue}
                                    watch={watch}
                                    isDisabled={!watch("idPosition")}
                                    param={params}
                                    onChange={onPositionManagerChange}
                                />
                                {errors.idHierarchyPositionManager && (
                                    <small className="p-invalid text-danger">
                                        {errors.idHierarchyPositionManager.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="idStatus" className="w-full">
                                    Motivo
                                </label>
                                <GenericStatusDropDown
                                    id="IdNewStatus"
                                    isValid={!!errors.IdNewStatus}
                                    setValue={setValue}
                                    watch={watch}
                                    isFocus={true}
                                    tableName="SalaryNewsStatus"
                                />
                                {errors.IdNewStatus && (
                                    <small className="p-invalid text-danger">
                                        {errors.IdNewStatus.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label id="DateChange" htmlFor="DateChange">
                                    Fecha de inicio
                                </label>
                                <Calendar value={new Date()} showIcon />
                            </div>
                        </div>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <label htmlFor="Description">Descripción</label>
                                <InputTextarea
                                    {...register("Description")}
                                    id="Description"
                                    placeholder="Ingrese descripción..."
                                    rows={3}
                                    cols={30}
                                />
                            </div>
                        </div>
                        <DialogFooterButtons hideDialog={() => {}} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(HierarchyPositionSalary);
