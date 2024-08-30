'use client'
import { TABLE_NAME_PAYROLLMANAGEMENT } from '@/constants/StatusTableName'
import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons'
import GenericInputNumber from '@/Features/Shared/Components/GenericInputNumber'
import GenericStatusDropDown from '@/Features/Shared/Components/GenericStatusDropDown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Divider } from 'primereact/divider'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { payrollManagementByPayrollAreService } from '../../payrollManagementService'
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter'
import useGetPayrollManagementByIdPayrollArea from '../../Hooks/useGetLastPayrollManagement'

interface DropdownItem {
    name: string;
    code: number;
}

const PayrollManagement = () => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [];

    const getPeriodData = payrollManagementByPayrollAreService;
    const { data } = useGetPayrollManagementByIdPayrollArea(
        params,
        listOfDependencies,
        1
    )

    console.log(data);

    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const [payrollManagementData, setPayrollManagementData] = useState<IPayrollManagement>();

    const getData = async (period: IPayrollManagementByPayrollArea) => {
        const payrollMangement = await getPeriodData.post(period) as IPayrollManagement;
        setPayrollManagementData(payrollMangement);
    }

    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: "Habilitar Nómina", code: 151 },
            { name: "Editar Nómina", code: 152 },
        ],
        []
    );

    const options = ['Mensual', 'Quincenal'];
    const [payrollArea, setPayrollArea] = useState(options[0]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IPayrollManagement>({
        defaultValues: {
            payrollNumber: payrollManagementData?.payrollNumber,
            idPayrollArea: payrollManagementData?.idPayrollArea,
            idStatus: payrollManagementData?.idStatus,
            retroactivePeriodLimit: payrollManagementData?.retroactivePeriodLimit,
            date: payrollManagementData?.date,
            payrollPeriodStart: payrollManagementData?.payrollPeriodStart,
            payrollPeriodEnd: payrollManagementData?.payrollPeriodEnd,
            modifiedByEmployeeId: payrollManagementData?.modifiedByEmployeeId,
            lastModifiedDate: payrollManagementData?.lastModifiedDate,
            process: payrollManagementData?.process
        },
    });

    const onSubmit = (data: IPayrollManagement) => {
        data.idPayrollArea = payrollArea == "Mensual" ? 2 : 1;
        data.idStatus = dropdownItem?.code!;
        data.payrollNumber = data.payrollNumber;
        data.date = data.date;
        data.retroactivePeriodLimit = data.payrollPeriodStart;
        data.payrollPeriodStart = data.payrollPeriodStart;
        data.payrollPeriodEnd = data.payrollPeriodEnd;

        console.log("test", data);
        return;
    }

    const hideDialog = () => {
        console.log(false);
    };

    const getPeriod = () => {
        const payrollNumber = watch("payrollNumber");
        const year = new Date(watch("date")).getFullYear();
        const month = new Date(watch("date")).getMonth();

        const period: IPayrollManagementByPayrollArea = {
            idPayrollArea: payrollNumber,
            date: new Date(year, month, payrollNumber),
        };
        getData(period);
    }

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
                            value={payrollArea}
                            options={options}
                            onChange={(e) => {
                                setPayrollArea(e.value);
                            }}
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
                                        <Dropdown
                                            id="idStatus"
                                            value={dropdownItem}
                                            onChange={(e) => setDropdownItem(e.value)}
                                            options={dropdownItems}
                                            optionLabel="name"
                                            placeholder="Elija un estado"

                                        ></Dropdown>
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
                                                <GenericInputNumber
                                                    id="payrollNumber"
                                                    setValue={setValue}
                                                    isValid={false}
                                                    watch={watch}
                                                    prefix=''
                                                    format={false}
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
                                            placeholder="Proceso..."
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
                                        value={new Date}
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
                                    <InputText placeholder="Usuario" />
                                    {errors.idPayrollArea && (
                                        <small className="p-invalid text-danger">
                                            {errors.idPayrollArea.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="field col-12 md:col-6 lg:col-3">
                                <div className="p-inputgroup">
                                    <Button label="El" />
                                    <InputText placeholder="nombre..." />
                                    {errors.idPayrollArea && (
                                        <small className="p-invalid text-danger">
                                            {errors.idPayrollArea.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="field col-12 md:col-6 lg:col-4">
                                <Button label="Hora" />
                                <Calendar
                                    id="start"
                                    showIcon
                                    showButtonBar
                                    value={new Date}
                                />
                                {errors.idPayrollArea && (
                                    <small className="p-invalid text-danger">
                                        {errors.idPayrollArea.message?.toString()}
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
                                    id="idStatusAccountType"
                                    isValid={!!errors.idStatus}
                                    setValue={setValue}
                                    idValueEdit={dropdownItem?.code}
                                    watch={watch}
                                    isFocus={true}
                                    isReadOnly={true}
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
                    <DialogFooterButtons hideDialog={hideDialog} />
                </div>
            </div>
        </form>
    )
}

export default PayrollManagement