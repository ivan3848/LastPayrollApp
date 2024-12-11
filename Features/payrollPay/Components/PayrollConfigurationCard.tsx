import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import React from "react";

interface Props {
    entity: IPayrollManagement | undefined;
    isTest?: boolean;
}

const PayrollConfigurationCard = ({ entity, isTest }: Props) => {
    if (isTest) {
        return (
            <div className="card">
                <h4 className="flex" style={{ justifyContent: "center" }}>
                    {" "}
                    Nómina por simulación
                </h4>
            </div>
        );
    }

    if (
        entity?.idPayrollManagement == 0 ||
        entity?.idPayrollManagement == undefined ||
        entity.idStatus !== 151
    )
        return (
            <div className="card">
                <h4 className="flex" style={{ justifyContent: "center" }}>
                    {" "}
                    No hay configuración de nómina
                </h4>
            </div>
        );

    return (
        <div className="card">
            <div
                className="p-fluid formgrid grid"
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                }}
            >
                <Divider align="center" className="mx-6">
                    <h5 className="mt-1">Configuración de nómina</h5>
                </Divider>

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
                </div>
                <div className="field col-12 md:col-2">
                    <label id="DateChange" htmlFor="DateChange">
                        <strong>Fecha final</strong>
                    </label>
                    <Calendar
                        name="endDate"
                        value={new Date(entity?.payrollPeriodEnd!)}
                        showIcon
                        disabled={true}
                    />
                </div>
                <div className="field col-12 md:col-3">
                    <label id="DateChange" htmlFor="DateChange">
                        <strong>Período de retroactividad</strong>
                    </label>
                    <Calendar
                        name="retroactivePeriodLimit"
                        value={new Date(entity?.retroactivePeriodLimit!)}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default PayrollConfigurationCard;
