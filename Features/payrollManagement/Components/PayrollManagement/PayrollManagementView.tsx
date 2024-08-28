'use client'
import GenericInputNumber from '@/Features/Shared/Components/GenericInputNumber'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Divider } from 'primereact/divider'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

interface DropdownItem {
    name: string;
    code: string;
}

const PayrollManagement = () => {
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: "Habilitar Nómina", code: "Option1" },
            { name: "Editar Nómina", code: "Option2" },
        ],
        []
    );

    const options = ['Mensual', 'Quincenal'];
    const [value, setValue] = useState(options[0]);

    const {
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<IPayrollManagement>();

    return (
        <div className="col-12">
            <div className="card">
                <div className="field col-12 md:col-5">
                    <label htmlFor="state">
                        <strong>Area de Nómina</strong>
                    </label>
                    <SelectButton
                        value={value}
                        onChange={(e) => setValue(e.value)}
                        options={options}
                    />
                </div>
                <div className="card">
                    <div className="flex">

                        <div className="mt-7 col-12 md:col-4">
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-8">
                                    <label htmlFor="payrollState">
                                        <strong>Estado de Nómina</strong>
                                    </label>
                                    <Dropdown
                                        id="payrollState"
                                        value={dropdownItem}
                                        onChange={(e) => setDropdownItem(e.value)}
                                        options={dropdownItems}
                                        optionLabel="name"
                                        placeholder="Elija un estado"
                                    ></Dropdown>
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
                                                id="amount"
                                                setValue={setValue}
                                                isValid={false}
                                                watch={watch}
                                                prefix=''
                                                format={false}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-6 lg:col-3">
                                            <GenericInputNumber
                                                id="amount"
                                                setValue={setValue}
                                                isValid={false}
                                                watch={watch}
                                                currentValue={2024}
                                                prefix=''
                                                format={false}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-6 lg:col-4">
                                            <Calendar
                                                id="start"
                                                onChange={(e) => setValue("start")}
                                                showIcon
                                                showButtonBar
                                                value={new Date}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-6 lg:col-4">
                                            <Calendar
                                                id="start"
                                                onChange={(e) => setValue("start")}
                                                showIcon
                                                showButtonBar
                                                value={new Date}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field col-12 md:col-9">

                                <div className="p-inputgroup flex-1">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-chart-bar"></i>
                                    </span>
                                    <InputText placeholder="Proceso..." />
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
                                        id="amount"
                                        setValue={setValue}
                                        isValid={false}
                                        watch={watch}
                                        prefix=''
                                        format={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex">
                            <div className="field col-12 md:col-6 lg:col-6">
                                <GenericInputNumber
                                    id="amount"
                                    setValue={setValue}
                                    isValid={false}
                                    watch={watch}
                                    prefix=''
                                    format={false}
                                />
                            </div>
                            <div className="field col-12 md:col-6 lg:col-6">
                                <Calendar
                                    id="start"
                                    onChange={(e) => setValue("start")}
                                    showIcon
                                    showButtonBar
                                    value={new Date}
                                />
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
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 lg:col-3">
                            <div className="p-inputgroup">
                                <Button label="El" />
                                <InputText placeholder="nombre..." />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <Button label="Hora" />
                            <Calendar
                                id="start"
                                onChange={(e) => setValue("start")}
                                showIcon
                                showButtonBar
                                value={new Date}
                            />
                        </div>
                    </div>
                    <div className="col-12 md:col-5">
                        <div className="p-inputgroup">
                            <Button label="Estado de nomina" />
                            <InputText placeholder="Estado de..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayrollManagement