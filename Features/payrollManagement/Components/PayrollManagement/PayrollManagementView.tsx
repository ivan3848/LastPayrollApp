
'use client'
import { TABLE_NAME_PAYROLLMANAGEMENT } from '@/constants/StatusTableName'
import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons'
import GenericInputNumber from '@/Features/Shared/Components/GenericInputNumber'
import GenericStatusDropDown from '@/Features/Shared/Components/GenericStatusDropDown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Divider } from 'primereact/divider'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
    payrollManagementByPayrollAreService,
    payrollManagementByPayrollNumberService
} from '../../payrollManagementService'

interface Props {
    entity: IPayrollManagement | null;
    setEntity: (entity: IPayrollManagement) => void;
}

const PayrollManagement = ({ entity, setEntity }: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IPayrollManagement>({
        defaultValues: {
            date: new Date(),
        },
    });

    const initialPayrollNumber = useRef<number | null>(null);

    // const addEntity = useAddPayrollManagement({
    //     toast,
    //     setEditEntityDialog,
    //     setSubmitted,
    //     reset,
    // });

    const getLastPayroll = async (payNumber: number) => {
        const payrollArea = watch("idPayrollArea");
        const date = watch("date");

        const period: IPayrollManagementByPayrollNumber = {
            payrollNumber: payNumber,
            idPayrollArea: payrollArea ?? 1,
            PayrollYear: new Date(date.getFullYear(), date.getMonth(), payNumber),
        };
        const payrollData = await payrollManagementByPayrollNumberService.post(period) as IPayrollManagement;
        setEntity(payrollData);
    };

    const getData = async (period: IPayrollManagementByPayrollArea) => {
        try {
            const payrollManagement = await payrollManagementByPayrollAreService.post(period) as IPayrollManagement;
            setEntity(payrollManagement);
        } catch (error: any) {
            // toast.current?.show({
            //     severity: "warn",
            //     summary: "Error",
            //     detail: error.response.data,
            //     life: 3000,
            // });
            console.error("Failed to fetch period data:", error);
        }
    };

    const payrollNumber = watch("payrollNumber");

    const getPeriod = () => {
        const payrollNumb = watch("payrollNumber");
        const date = watch("date");

        if (!payrollNumb || !date) return;

        const period: IPayrollManagementByPayrollArea = {
            idPayrollArea: 1,
            date: new Date(date.getFullYear(), date.getMonth(), payrollNumb),
        };
        getData(period);
    };

    const updateFormValues = (data: IPayrollManagement) => {
        Object.entries(data).forEach(([key, value]) => {
            if (["lastModifiedDate", "payrollPeriodStart",
                "date", "payrollPeriodEnd"].includes(key)) {
                value = new Date(value);
            }
            setValue(key as keyof IPayrollManagement, value);
        });
    };

    useEffect(() => {
        if (entity) {
            updateFormValues(entity);
        }
    }, [entity]);

    useEffect(() => {
        if (payrollNumber && initialPayrollNumber.current === null) {
            initialPayrollNumber.current = payrollNumber;
        }
    }, [payrollNumber]);

    const onSubmit = (data: IPayrollManagement) => {
        data.idPayrollArea = data.idPayrollArea.toString() === 'Mensual' ? 2 : 1;
        data.lastModifiedDate = new Date();

        console.log(data);
        // addEntity.mutate(data);
    };

    let options: string[] = ['Mensual', 'Quincenal'];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
                <div className="card">
                    <div className="field col-12 md:col-5">
                        <label htmlFor="idPayrollArea">
                            <strong>Area de Nómina</strong>
                        </label>
                        <SelectButton
                            {...register("idPayrollArea")}
                            value={options[watch("idPayrollArea") === 1 ? 1 : 0]}
                            onChange={(e) => setValue("idPayrollArea", e.value)}
                            options={options}
                        />
                        {errors.idPayrollArea && (
                            <small className="p-invalid text-danger">
                                {errors.idPayrollArea.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="card">
                        <div className="flex">
                            <div className="col-12 md:col-4">
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-8">
                                        <label htmlFor="idStatus">
                                            <strong>Estado de Nómina</strong>
                                        </label>
                                        <Divider layout="horizontal" className='mt-0' />
                                        <GenericStatusDropDown
                                            id="idStatus"
                                            isValid={!!errors.idStatus}
                                            idValueEdit={entity?.idStatus}
                                            setValue={setValue}
                                            watch={watch}
                                            isFocus={true}
                                            tableName={TABLE_NAME_PAYROLLMANAGEMENT}
                                        />
                                        {errors.idStatus && (
                                            <small className="p-invalid text-danger">
                                                {errors.idStatus.message?.toString()}
                                            </small>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-7">
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12">
                                        <label htmlFor="payrollState" className='flex'>
                                            <strong>Per. Cálculo de nómina</strong>
                                        </label>
                                        <Divider layout="horizontal" className='mt-0' />
                                        <div className="flex">
                                            <div className="field col-12 md:col-6 lg:col-3">
                                                <InputNumber
                                                    id="payrollNumber"
                                                    value={payrollNumber || initialPayrollNumber.current}
                                                    onChange={(e) => {
                                                        setValue("payrollNumber", e.value!);
                                                        getLastPayroll(e.value!);
                                                    }}
                                                    min={1}
                                                    format={false}
                                                    showButtons
                                                />
                                                {errors.payrollNumber && (
                                                    <small className="p-invalid text-danger">
                                                        {errors.payrollNumber.message?.toString()}
                                                    </small>
                                                )}
                                            </div>
                                            <div className="field col-12 md:col-3">
                                                <Calendar
                                                    id='date'
                                                    showIcon
                                                    showButtonBar
                                                    value={watch("date") ?? new Date()}
                                                    onChange={(e) => {
                                                        if (e.value) {
                                                            setValue("date", e.value);
                                                        }
                                                    }}
                                                    dateFormat='yy'
                                                />
                                                {errors.date && (
                                                    <small className="p-invalid text-danger">
                                                        {errors.date.message?.toString()}
                                                    </small>
                                                )}
                                            </div>
                                            <div className="field col-12 md:col-6 lg:col-4">
                                                <Calendar
                                                    id="payrollPeriodStart"
                                                    {...register("payrollPeriodStart")}
                                                    value={watch("payrollPeriodStart")
                                                        ?? new Date(entity?.payrollPeriodStart!)}
                                                    onChange={(e) => setValue("payrollPeriodStart", e.value!)}
                                                    showIcon
                                                    disabled
                                                />
                                                {errors.payrollPeriodStart && (
                                                    <small className="p-invalid text-danger">
                                                        {errors.payrollPeriodStart.message?.toString()}
                                                    </small>
                                                )}
                                            </div>
                                            <div className="field col-12 md:col-6 lg:col-4">
                                                <Calendar
                                                    id="payrollPeriodEnd"
                                                    {...register("payrollPeriodEnd")}
                                                    value={watch("payrollPeriodEnd")
                                                        ?? new Date(entity?.payrollPeriodEnd!)}
                                                    onChange={(e) => setValue("payrollPeriodEnd", e.value!)}
                                                    showIcon
                                                    disabled
                                                />
                                                {errors.payrollPeriodEnd && (
                                                    <small className="p-invalid text-danger">
                                                        {errors.payrollPeriodEnd.message?.toString()}
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="field col-12 md:col-9">
                                    <div className="p-inputgroup flex-1">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-chart-bar"></i>
                                        </span>
                                        <InputText
                                            {...register("process")}
                                            placeholder="Proceso..."
                                            id="process"
                                            disabled={true}
                                        />
                                        {errors.process && (
                                            <small className="p-invalid text-danger">
                                                {errors.process.message?.toString()}
                                            </small>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="col-12 md:col-4">
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-8">
                                        <label htmlFor="payrollState">
                                            <strong>Periodo de retroactividad</strong>
                                        </label>
                                        <GenericInputNumber
                                            id="retroactivePeriodLimit"
                                            setValue={setValue}
                                            isValid={!!errors.retroactivePeriodLimit}
                                            currentValue={watch("payrollNumber")}
                                            watch={watch}
                                            prefix=''
                                            format={false}
                                        />
                                        {errors.retroactivePeriodLimit && (
                                            <small className="p-invalid text-danger">
                                                {errors.retroactivePeriodLimit.message?.toString()}
                                            </small>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex">
                                <div className="field col-12 md:col-6 lg:col-4">
                                    <Calendar
                                        id='date'
                                        showIcon
                                        showButtonBar
                                        value={watch("date") ?? new Date()}
                                        disabled={true}
                                        dateFormat='yy'
                                    />
                                </div>
                                <div className="field col-12 md:col-6 lg:col-6">
                                    <Calendar
                                        id="payrollPeriodEnd"
                                        showIcon
                                        showButtonBar
                                        value={watch("payrollPeriodEnd") ?? new Date()}
                                        disabled={true}
                                    />
                                    {errors.payrollPeriodEnd && (
                                        <small className="p-invalid text-danger">
                                            {errors.payrollPeriodEnd.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 className='mt-6'>Última modificación de nómina</h5>
                    <div className="card">
                        <div className="flex">
                            <div className="col-12 md:col-5">
                                <div className="p-inputgroup">
                                    <Button label="Por" />
                                    <InputText
                                        {...register("modifiedByEmployeeId")}
                                        placeholder="ID de empleado"
                                        id="modifiedByEmployeeId"
                                        disabled={true}
                                    />
                                    {errors.modifiedByEmployeeId && (
                                        <small className="p-invalid text-danger">
                                            {errors.modifiedByEmployeeId.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="field col-12 md:col-6 lg:col-3">
                                <div className="p-inputgroup">
                                    <Button label="El" />
                                    <InputText
                                        {...register("employee")}
                                        placeholder="Usuario"
                                        id="employee"
                                        disabled={true}
                                    />
                                    {errors.employee && (
                                        <small className="p-invalid text-danger">
                                            {errors.employee.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="field col-12 md:col-6 lg:col-4">
                                <Button label="Hora" />
                                <Calendar
                                    id='lastModifiedDate'
                                    showIcon
                                    showButtonBar
                                    value={watch("lastModifiedDate")}
                                    disabled={true}
                                />
                                {errors.lastModifiedDate && (
                                    <small className="p-invalid text-danger">
                                        {errors.lastModifiedDate.message?.toString()}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="col-12 md:col-5">
                            <label htmlFor="payrollState">
                                <strong>Estado de nómina</strong>
                            </label>
                            <div className="p-inputgroup mt-2">
                                <GenericStatusDropDown
                                    id="idStatus"
                                    isValid={!!errors.idStatus}
                                    idValueEdit={entity?.idStatus}
                                    setValue={setValue}
                                    watch={watch}
                                    isFocus={true}
                                    tableName={TABLE_NAME_PAYROLLMANAGEMENT}
                                    isReadOnly={true}
                                />
                                {errors.idStatus && (
                                    <small className="p-invalid text-danger">
                                        {errors.idStatus.message?.toString()}
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooterButtons hideDialog={() => { }} />
                </div>
            </div>
        </form>
    )
}

export default PayrollManagement
