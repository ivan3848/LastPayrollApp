import { Divider } from 'primereact/divider';
import React from 'react'

interface Props {
    entity: any;
    data: any;
}

const TotalsCard = ({ data, entity }: Props) => {

    const [resume, setResume] = React.useState({
        totalDeduction: 0,
        totalProfit: 0,
        totalPay: 0,
    });

    React.useEffect(() => {
        data.items?.forEach((item: any) => {
            setResume({
                totalDeduction: item.totalDeduction ?? 0,
                totalProfit: item.totalProfit ?? 0,
                totalPay: entity.totalPay ?? 0,
            });
        });

    }, [data.items, entity]);

    return (
        <div className="card">
            <Divider align="center">
                <h5>Periodo de Nómina # {entity.payrollNumber} - {entity.payrollName} </h5>
            </Divider>
            <div className='flex gap-3 justify-content-evenly'>
                <div className="p-col-12">
                    <h4>RD${resume.totalProfit}</h4>
                    <i>Total de Ingresos</i>
                </div>
                <div className="p-col-12">
                    <h4>RD${resume.totalDeduction}</h4>
                    <i>Total Deducciones</i>
                </div>
                <div className="p-col-12">
                    <h4>RD${resume.totalPay}</h4>
                    <i>Total Pagado</i>
                </div>
            </div>
        </div>
    )
}

export default TotalsCard