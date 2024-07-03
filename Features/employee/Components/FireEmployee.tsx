import React, { useState } from 'react'
import { IEmployee } from '../Types/IEmployee'
import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons'
import GenericDropDown from '@/Features/Shared/Components/GenericDropDown'
import GenericStatusDropDown from '@/Features/Shared/Components/GenericStatusDropDown'
import { Calendar } from 'primereact/calendar'
import { InputTextarea } from 'primereact/inputtextarea'
import useEmployeeQuery from '../Hooks/useEmployeeQuery'
import { useForm } from 'react-hook-form'
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter'
import { InputSwitch } from 'primereact/inputswitch'

interface Props {
    employee: IEmployee
}

const FireEmployee = ({ employee }: Props) => {
    const { setFilters, params, setAllData } = useParamFilter();
    const [pagoNavidad, setPagoNavidad] = useState(false);
    const [notice, setNotice] = useState(false);
    const [vacation, setVacation] = useState(false);
    const [unemployment, setUnemployment] = useState(false);

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IPositionSalary>();

    // const changePositionSalaryEdit = useChangePositionSalaryQuery({
    //     toast,
    //     setAddEntityDialog,
    //     setSubmitted,
    //     reset,
    // });

    const onFormSubmit = (data: IPositionSalary) => {
        // changePositionSalaryEdit.mutate(data);
        return;
    }

    return (
        <div className="grid">
            <div className="col-12 mx-auto">
                <div className="card">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <h4 style={{ marginBottom: '30px' }}>Desvincular Empleado</h4>
                        <div className="p-fluid formgrid grid" style={{ marginTop: '15px', display: 'flex', justifyContent: "space-evenly", width: "100%" }}>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="IdChangeManager" className="w-full">
                                    Medida
                                </label>
                                <GenericDropDown
                                    id="idHierarchyPositionManager"
                                    isValid={!!errors.idHierarchyPositionManager}
                                    text="name"
                                    useQuery={useEmployeeQuery}
                                    setValue={setValue}
                                    watch={watch}
                                    param={params}
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
                                <label id='DateChange' htmlFor="DateChange">Fecha de inicio</label>
                                <Calendar value={new Date()} showIcon />
                            </div>
                        </div>
                        <div className="p-fluid formgrid grid" style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', justifyContent: "space-evenly", width: "100%" }}>
                            <div className="field col-12 md:col-3">
                                <h6>Pago de Navidad</h6>
                                <InputSwitch
                                    checked={pagoNavidad}
                                    onChange={(e) => setPagoNavidad(e.value ?? false)}
                                />
                                <h6>Pre-Aviso</h6>
                                <InputSwitch
                                    checked={notice}
                                    onChange={(e) => setNotice(e.value ?? false)}
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <h6>Ha tomado vacaciones este año?</h6>
                                <InputSwitch
                                    checked={vacation}
                                    onChange={(e) => setVacation(e.value ?? false)}
                                />
                                <h6>Cesantia</h6>
                                <InputSwitch
                                    checked={unemployment}
                                    onChange={(e) => setUnemployment(e.value ?? false)}
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="Description">Descripción</label>
                                <InputTextarea
                                    {...register("Description")}
                                    id="Description"
                                    placeholder='Ingrese descripción...' rows={3} cols={30} />
                            </div>
                        </div>
                        <DialogFooterButtons hideDialog={() => { }} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FireEmployee