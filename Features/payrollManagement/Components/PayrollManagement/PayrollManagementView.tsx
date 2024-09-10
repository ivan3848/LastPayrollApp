'use client'
import { TABLE_NAME_PAYROLLMANAGEMENT } from '@/constants/StatusTableName'
import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons'
import GenericInputNumber from '@/Features/Shared/Components/GenericInputNumber'
import GenericStatusDropDown from '@/Features/Shared/Components/GenericStatusDropDown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { lastPayrollManagementService, payrollManagementByPayrollAreService } from '../../payrollManagementService'
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter'
import useGetPayrollManagementByIdPayrollArea from '../../Hooks/useGetLastPayrollManagement'
import { InputNumber } from 'primereact/inputnumber'


const PayrollManagement = () => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [];

    const getPeriodData = payrollManagementByPayrollAreService;
    const [configData, setConfigData] = useState<IPayrollManagement | undefined>();

    const { data } = useGetPayrollManagementByIdPayrollArea(
        params,
        listOfDependencies,
        1
    );

    const getLastPayroll = async (payNumber: number) => {
        const test = await lastPayrollManagementService.getById(payNumber) as IPayrollManagement;
        setConfigData(test);
        getPeriod();
    }

    useEffect(() => {
        if (data) {
            Object.keys(data).forEach((key) => {
                if (key === "lastModifiedDate" || key === "payrollPeriodStart"
                    || key === "date" || key === "payrollPeriodEnd") {
                    setValue(key as keyof IPayrollManagement,
                        new Date(data[key as keyof IPayrollManagement] as Date));
                    return;
                }
                setValue(
                    key as keyof IPayrollManagement,
                    data[key as keyof IPayrollManagement]
                );
            });
        }
    }, [data, configData]);

    const getData = async (period: IPayrollManagementByPayrollArea) => {
        const payrollMangement = await getPeriodData.post(period) as IPayrollManagement;
        console.log(payrollMangement);
        // payrollMangement && setConfigData(payrollMangement);
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IPayrollManagement>();

    const onSubmit = (data: IPayrollManagement) => {
        data.idPayrollArea = data.idPayrollArea;
        data.idStatus = data?.idStatus!;
        data.payrollNumber = data.payrollNumber;
        data.date = data.date;
        data.retroactivePeriodLimit = data.payrollPeriodStart;
        data.payrollPeriodStart = data.payrollPeriodStart;
        data.payrollPeriodEnd = data.payrollPeriodEnd;

        console.log("test", data);
        return;
    }

    const getPeriod = () => {
        const payArea = watch("payrollNumber");
        const year = new Date(watch("date")).getFullYear();
        const month = new Date(watch("date")).getMonth();

        const period: IPayrollManagementByPayrollArea = {
            idPayrollArea: 1,
            date: new Date(new Date(year, month, payArea)),
        };
        getData(period);
    }

    let options: string[] = ['Mensual', 'Quincenal'];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)
            }>
            <div className="col-12">
                <div className="card">
                    <div className="field col-12 md:col-5">
                        <label htmlFor="idPayrollArea">
                            <strong>Area de Nómina</strong>
                        </label>
                        <SelectButton
                            {...register("idPayrollArea")}
                            value={data?.idPayrollArea === (watch("idPayrollArea") ?? 'Mensual')}
                            onChange={(e) => {
                                setValue("idPayrollArea", e.value == 'Quincenal' ? 1 : 2);
                            }}
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
                                            idValueEdit={data?.idStatus}
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
                                    <div className="field col-12 md:col-12">
                                        <label htmlFor="payrollState" className='flex'>
                                            <strong>Per. Cálculo de nómina</strong>
                                        </label>
                                        <Divider layout="horizontal" className='mt-0' />
                                        <div className="flex">
                                            <div className="field col-12 md:col-6 lg:col-3">
                                                <InputNumber
                                                    id="payrollNumber"
                                                    value={data?.payrollNumber}
                                                    onChange={(e: any) => {
                                                        setValue("payrollNumber", e.value);
                                                        getLastPayroll(e.value);
                                                    }}
                                                    min={1}
                                                    format={false}
                                                    allowEmpty
                                                    showButtons
                                                />
                                                {errors.payrollNumber && (
                                                    <small className="p-invalid text-danger">
                                                        {errors.payrollNumber.message?.toString()}
                                                    </small>
                                                )}
                                            </div>
                                            <div className="field col-12 md:col-6 lg:col-3">
                                                <Calendar
                                                    id="date"
                                                    {...register("date")}
                                                    value={watch("date")}
                                                    onChange={(e) => {
                                                        setValue("date", e.value!);
                                                        getPeriod();
                                                    }}
                                                    showIcon
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
                                                    value={watch("payrollPeriodStart") ?? new Date}
                                                    onChange={(e) => {
                                                        setValue("payrollPeriodStart", e.value!);
                                                    }}
                                                    showIcon
                                                    disabled={true}
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
                                                    value={watch("payrollPeriodEnd") ?? new Date}
                                                    onChange={(e) => {
                                                        setValue("payrollPeriodEnd", e.value!);
                                                    }}
                                                    showIcon
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
                                    idValueEdit={data?.idStatus}
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