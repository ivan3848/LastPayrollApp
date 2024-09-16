import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'
import React from 'react'

interface Props {
    entity: IPayrollManagement | undefined;
}

const PayrollConfigurationCard = ({ entity }: Props) => {

    if (entity?.idPayrollManagement == 0
        || entity?.idPayrollManagement == undefined
        || entity.idStatus !== 151)
        return <div className='card'>
            <h4 className='flex' style={{ justifyContent: 'center' }}> No hay configuración de nómina</h4>
        </div>

    return (
        <div className="card">
            <div className="p-fluid formgrid grid"
                style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                }}>

                <div className="field col-12 md:col-2">
                    <label htmlFor="idPayrollArea">
                        <strong>Numero de Nómina</strong>
                    </label>
                    <InputNumber
                        id="payrollNumber"
                        value={entity?.payrollNumber}
                        min={1}
                        format={false}
                        disabled={true}
                    />
                </div>
                <div className="field col-12 md:col-2">
                    <label id="DateChange" htmlFor="DateChange">
                        <strong>Fecha de inicio</strong>
                    </label>
                    <Calendar
                        name="startDate"
                        value={new Date(entity?.payrollPeriodStart!)}
                        showIcon
                        disabled={true}
                    />
                </div><div className="field col-12 md:col-2">
                    <label id="DateChange" htmlFor="DateChange">
                        <strong>Fecha final</strong>
                    </label>
                    <Calendar
                        name="endDate"
                        value={new Date(entity?.payrollPeriodEnd!)}
                        showIcon
                        disabled={true}
                    />
                </div><div className="field col-12 md:col-3">
                    <label id="DateChange" htmlFor="DateChange">
                        <strong>
                            Periodo de retroactividad
                        </strong>
                    </label>
                    <Calendar
                        name='retroactivePeriodLimit'
                        value={new Date(entity?.retroactivePeriodLimit!)}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default PayrollConfigurationCard