import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import employeeFormSchemas from "../Validations/EmployeeFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useDepartmentQuery from "@/Features/departments/Hooks/useDepartmentQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useEmployeeQuery from "../Hooks/useEmployeeQuery";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useWorkSchedulerQuery from "@/Features/workScheduler/Hooks/useWorkSchedulerQuery";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { TABLE_NAME_CONTRACT } from "@/constants/StatusTableName";
import useContractTypeQuery from "@/Features/contractType/Hooks/useContractTypeQuery";
import useGroupManagerQuery from "@/Features/groupManager/Hooks/useGroupManagerQuery";

interface Props {
    setEmployee: (value: IEmployee) => void;
    setStep: (value: number) => void;
}

const AddEmployee = ({ setEmployee, setStep }: Props) => {
    const { addEntityFormSchema } = employeeFormSchemas();
    const { setFilters, params, setAllData } = useParamFilter();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IEmployee>({
        resolver: zodResolver(addEntityFormSchema),
    });

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

    const onSubmit = (data: IEmployee) => {
        console.log(data);
        setEmployee(data);
        setStep(2);
        return;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idEmployee">Código De Empleado</label>
                        <GenericInputNumber
                            id="idEmployee"
                            isValid={!!errors.idEmployee}
                            setValue={setValue}
                            watch={watch}
                            minValue={1}
                        />

                        {errors.idEmployee && (
                            <small className="p-invalid text-red-500">
                                {errors.idEmployee.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idDepartment">Departamento</label>
                        <GenericDropDown
                            id="idDepartment"
                            isValid={!!errors.idDepartment}
                            text="name"
                            useQuery={useDepartmentQuery}
                            setValue={setValue}
                            watch={watch}
                            onChange={onDepartmentChange}
                        />
                        {errors.idDepartment && (
                            <small className="p-invalid text-red-500">
                                {errors.idDepartment.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idPosition">Posición</label>
                        <GenericDropDown
                            id="idPosition"
                            isValid={!!errors.idPosition}
                            text="name"
                            useQuery={usePositionQuery}
                            setValue={setValue}
                            watch={watch}
                            isDisabled={!watch("idDepartment")}
                            param={params}
                            onChange={onPositionChange}
                        />
                        {errors.idPosition && (
                            <small className="p-invalid text-red-500">
                                {errors.idPosition.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idHierarchyPositionManager">
                            Supervisor
                        </label>
                        <GenericDropDown
                            id="idHierarchyPosition"
                            isValid={!!errors.idHierarchyPositionManager}
                            text="employeeName"
                            useQuery={useEmployeeQuery}
                            setValue={setValue}
                            watch={watch}
                            isDisabled={!watch("idPosition")}
                            param={params}
                            onChange={onPositionManagerChange}
                        />
                        {errors.idHierarchyPositionManager && (
                            <small className="p-invalid text-red-500">
                                {errors.idHierarchyPositionManager.message?.toString()}
                            </small>
                        )}
                    </div>

                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="functionDescription">
                            Descripción De Función
                        </label>
                        <InputTextarea
                            id="functionDescription"
                            autoResize
                            {...register("functionDescription")}
                        />
                        {errors.functionDescription && (
                            <small className="p-invalid text-red-500">
                                {errors.functionDescription.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idPayrollArea">Area De Nómina</label>
                        {/* <GenericDropDown
                            id="idPayrollArea"
                            isValid={!!errors.idPayrollArea}
                            setValue={setValue}
                            watch={watch}
                            text="name"
                            useQuery={useNationalityQuery}
                        /> */}
                        {errors.idPayrollArea && (
                            <small className="p-invalid text-red-500">
                                {errors.idPayrollArea.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idWorkScheduler">Horario</label>
                        <GenericDropDown
                            id="idWorkScheduler"
                            isValid={!!errors.idWorkScheduler}
                            setValue={setValue}
                            watch={watch}
                            text="name"
                            useQuery={useWorkSchedulerQuery}
                        />
                        {errors.idWorkScheduler && (
                            <small className="p-invalid text-red-500">
                                {errors.idWorkScheduler.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="salary">Salario</label>
                        <GenericInputNumber
                            id="salary"
                            minValue={0}
                            isValid={!!errors.salary}
                            setValue={setValue}
                            watch={watch}
                        />
                        {errors.salary && (
                            <small className="p-invalid text-red-500">
                                {errors.salary.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="startDate">Fecha De Inicio</label>
                        <Calendar
                            id="startDate"
                            value={watch("startDate")}
                            onChange={(e) => setValue("startDate", e.value!)}
                            showIcon
                        />
                        {errors.startDate && (
                            <small className="p-invalid text-red-500">
                                {errors.startDate.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="endWorkDate">
                            Fecha De Termino (opcional)
                        </label>
                        <Calendar
                            id="endWorkDate"
                            value={watch("endWorkDate")}
                            onChange={(e) => setValue("endWorkDate", e.value!)}
                            showIcon
                        />
                        {errors.endWorkDate && (
                            <small className="p-invalid text-red-500">
                                {errors.endWorkDate.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="email">Correo Empresarial</label>
                        <InputText
                            id="email"
                            type="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <small className="p-invalid text-red-500">
                                {errors.email.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idContractType">Tipo De Contrato</label>
                        <GenericDropDown
                            id="idContractType"
                            isValid={!!errors.idContractType}
                            setValue={setValue}
                            watch={watch}
                            text="description"
                            useQuery={useContractTypeQuery}
                        />
                        {errors.idContractType && (
                            <small className="p-invalid text-red-500">
                                {errors.idContractType.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idStatusActionClass">
                            Medida De Contratación
                        </label>
                        <GenericStatusDropDown
                            id="idStatusActionClass"
                            isValid={!!errors.idStatusActionClass}
                            setValue={setValue}
                            watch={watch}
                            isFocus={true}
                            tableName={TABLE_NAME_CONTRACT}
                        />
                        {errors.idStatusActionClass && (
                            <small className="p-invalid text-red-500">
                                {errors.idStatusActionClass.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idGroupManager">Grupo</label>
                        <GenericDropDown
                            id="idGroupManager"
                            isValid={!!errors.idGroupManager}
                            setValue={setValue}
                            watch={watch}
                            text="name"
                            useQuery={useGroupManagerQuery}
                        />
                        {errors.idGroupManager && (
                            <small className="p-invalid text-red-500">
                                {errors.idGroupManager.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-content-end">
                <Button
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    // label="Siguiente"
                    className="p-button-primary"
                />
            </div>
        </form>
    );
};

export default AddEmployee;
