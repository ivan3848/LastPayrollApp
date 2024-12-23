import {
    TABLE_NAME_CONTRACT,
    TABLE_NAME_RELATIONSHIP,
} from "@/constants/StatusTableName";
import useContractTypeQuery from "@/Features/contractType/Hooks/useContractTypeQuery";
import useDepartmentQuery from "@/Features/departments/Hooks/useDepartmentQuery";
import useDisabilityQuery from "@/Features/disability/Hooks/useDisabilityQuery";
import useGroupManagerQuery from "@/Features/groupManager/Hooks/useGroupManagerQuery";
import AddHierarchyPositionEmployee from "@/Features/hierarchyPosition/Components/AddHierarchyPositionEmployee";
import usePayrollAreaQuery from "@/Features/payrollArea/Hooks/usePayrollAreaQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import { IPosition } from "@/Features/position/Types/IPosition";
import GenericCheckBox from "@/Features/Shared/Components/GenericCheckBox";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import ImageUploadTemplate from "@/Features/Shared/Components/ImageUploadTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useWorkSchedulerQuery from "@/Features/workScheduler/Hooks/useWorkSchedulerQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import useEmployeeQuery from "../../Hooks/useEmployeeQuery";
import { IEmployee } from "../../Types/IEmployee";
import employeeFormSchemas from "../../Validation/Validations/EmployeeFormSchemas";

interface Props {
    handleAdd: () => void;
    addEmployeeInformation: (updatedEmployee: IEmployee) => void;
    employee?: IEmployee;
    toast: React.MutableRefObject<any>;
}

const AddEmployee = ({ addEmployeeInformation, employee, toast }: Props) => {
    const { addEntityFormSchema } = employeeFormSchemas();
    const { setFilters, params, setAllData } = useParamFilter();
    const {
        setFilters: setFiltersManager,
        params: paramsManager,
        setAllData: setAllDataManager,
    } = useParamFilter();

    const [addHierarchyPosition, setAddHierarchyPosition] = useState(false);
    const [position, setPosition] = useState<IPosition>();
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IEmployee>({
        defaultValues: {},
        resolver: zodResolver(addEntityFormSchema),
    });

    const onDepartmentChange = () => {
        setFilters([{ column: "idDepartment", value: watch("idDepartment") }]);
        setAllData(true);
    };

    const OnPositionChange = (e: any) => {
        setPosition(e.target.value as IPosition);

        e.target.value?.idVacancy
            ? setValue("idHierarchyPosition", e.target.value?.idVacancy)
            : setAddHierarchyPosition(true);

        setFiltersManager([
            {
                column: "idPosition",
                value: position?.idPositionManager,
            },
        ]);
        setAllDataManager(true);
    };

    const onSubmit = (data: IEmployee) => {
        if (watch("idHierarchyPosition")) {
            addEmployeeInformation(data);
        } else {
            setValue("idPosition", undefined);
        }
        return;
    };

    return (
        <>
            <AddHierarchyPositionEmployee
                addEntityDialog={addHierarchyPosition}
                setAddEntityDialog={setAddHierarchyPosition}
                position={position}
                toast={toast}
                setPositionValue={setValue}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-4 mb-3">
                            <label htmlFor="photo">Imagen Del Empleado</label>
                            <ImageUploadTemplate
                                setValue={setValue}
                                employeeImage={employee?.employeeImage}
                            />
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idEmployee">
                                Código De Empleado
                            </label>
                            <InputText
                                onChange={(e) =>
                                    setValue("idEmployee", +e.target.value)
                                }
                                id="idEmployee"
                                type="number"
                                defaultValue={employee?.idEmployee}
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
                                idValueEdit={employee?.idDepartment}
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
                                onChange={OnPositionChange}
                                idValueEdit={employee?.idPosition}
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
                                id="idEmployee"
                                isValid={!!errors.idEmployeeManager}
                                text="employeeName"
                                useQuery={useEmployeeQuery}
                                setValue={setValue}
                                watch={watch}
                                isDisabled={!watch("idPosition")}
                                param={paramsManager}
                                idValueEdit={employee?.idEmployeeManager}
                                idToSet="idEmployeeManager"
                            />
                            {errors.idEmployeeManager && (
                                <small className="p-invalid text-red-500">
                                    {errors.idEmployeeManager.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idPayrollArea">
                                Área de Nómina
                            </label>
                            <GenericDropDown
                                id="idPayrollArea"
                                isValid={!!errors.idPayrollArea}
                                setValue={setValue}
                                watch={watch}
                                text="name"
                                useQuery={usePayrollAreaQuery}
                                idValueEdit={employee?.idPayrollArea}
                            />
                            {errors.idPayrollArea && (
                                <small className="p-invalid text-red-500">
                                    {errors.idPayrollArea.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="functionDescription">
                                Descripción De Función
                            </label>
                            <InputText
                                {...register("functionDescription")}
                                id="functionDescription"
                                type="text"
                                defaultValue={employee?.functionDescription}
                            />
                            {errors.functionDescription && (
                                <small className="p-invalid text-red-500">
                                    {errors.functionDescription.message?.toString()}
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
                                idValueEdit={employee?.idWorkScheduler}
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
                                currentValue={employee?.salary}
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
                                value={
                                    watch("startDate") ?? employee?.startDate
                                }
                                onChange={(e) =>
                                    setValue("startDate", e.value!)
                                }
                                showIcon
                                showButtonBar
                            />
                            {errors.startDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.startDate.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="endWorkDate">
                                Fecha De Termino
                            </label>
                            <Calendar
                                id="endWorkDate"
                                value={
                                    watch("endWorkDate") ??
                                    employee?.endWorkDate
                                }
                                onChange={(e) =>
                                    setValue("endWorkDate", e.value!)
                                }
                                showIcon
                                showButtonBar
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
                                defaultValue={employee?.email}
                            />
                            {errors.email && (
                                <small className="p-invalid text-red-500">
                                    {errors.email.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idContractType">
                                Tipo De Contrato
                            </label>
                            <GenericDropDown
                                id="idContractType"
                                isValid={!!errors.idContractType}
                                setValue={setValue}
                                watch={watch}
                                text="description"
                                useQuery={useContractTypeQuery}
                                idValueEdit={employee?.idContractType}
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
                                tableName={TABLE_NAME_CONTRACT}
                                idValueEdit={employee?.idStatusActionClass}
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
                                idValueEdit={employee?.idGroupManager}
                            />
                            {errors.idGroupManager && (
                                <small className="p-invalid text-red-500">
                                    {errors.idGroupManager.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idDisability">Discapacidad</label>
                            <GenericDropDown
                                id="idDisability"
                                isValid={!!errors.idDisability}
                                setValue={setValue}
                                watch={watch}
                                text="name"
                                useQuery={useDisabilityQuery}
                                idValueEdit={employee?.idDisability}
                            />
                            {errors.idDisability && (
                                <small className="p-invalid text-red-500">
                                    {errors.idDisability.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-2 mt-6">
                            <div className="field-checkbox">
                                <GenericCheckBox
                                    id="workRelation"
                                    text="Labor Directa"
                                    watch={watch}
                                    setValue={setValue}
                                    currentValue={employee?.workRelation}
                                />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 lg:col-2 mt-6">
                            <div className="field-checkbox">
                                <GenericCheckBox
                                    id="sindicate"
                                    text="Sindicato"
                                    watch={watch}
                                    setValue={setValue}
                                    currentValue={employee?.sindicate}
                                />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 lg:col-2 mt-6">
                            <div className="field-checkbox">
                                <GenericCheckBox
                                    id="extraHours"
                                    text="Genera Horas Extras"
                                    watch={watch}
                                    setValue={setValue}
                                    currentValue={employee?.extraHours}
                                />
                            </div>
                        </div>

                        <div className="card col-12 my-5 py-4">
                            <h3>Contacto De Emergencia</h3>
                            <div className="p-fluid formgrid grid mt-5">
                                <div className="field col-12 md:col-6 lg:col-4">
                                    <label htmlFor="idStatusRelationShip">
                                        Tipo de relación
                                    </label>
                                    <GenericStatusDropDown
                                        id="idStatusRelationship"
                                        isValid={!!errors.idStatusRelationship}
                                        tableName={TABLE_NAME_RELATIONSHIP}
                                        setValue={setValue}
                                        watch={watch}
                                        isFocus={true}
                                        idValueEdit={
                                            employee?.idStatusRelationship
                                        }
                                    />
                                    {errors.idStatusRelationship && (
                                        <small className="p-invalid text-red-500">
                                            {errors.idStatusRelationship.message?.toString()}
                                        </small>
                                    )}
                                </div>
                                <div className="field col-12 md:col-6 lg:col-4">
                                    <label htmlFor="contactName">
                                        Nombre Completo
                                    </label>
                                    <InputText
                                        id="contactName"
                                        type="text"
                                        {...register("contactName")}
                                        defaultValue={employee?.contactName}
                                    />
                                    {errors.contactName && (
                                        <small className="p-invalid text-red-500">
                                            {errors.contactName.message?.toString()}
                                        </small>
                                    )}
                                </div>
                                <div className="field col-12 md:col-6 lg:col-4">
                                    <label htmlFor="contactNumber">
                                        Número de contacto
                                    </label>
                                    <InputMask
                                        {...register("contactNumber")}
                                        mask="999-999-9999"
                                        id="contactNumber"
                                        defaultValue={employee?.contactNumber}
                                        key={employee?.contactNumber}
                                    />
                                    {errors.contactNumber && (
                                        <small className="p-invalid text-red-500">
                                            {errors.contactNumber.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-content-end">
                    <Button
                        icon="pi pi-save"
                        label="Contratar"
                        className="p-button-primary"
                    />
                </div>
            </form>
        </>
    );
};

export default AddEmployee;
