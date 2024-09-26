import useContabilizationDifference from '@/Features/payrollPay/Hook/useContabilizationDifference';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import React, { use, useEffect, useState } from 'react'

interface Props {
    idPayrollPay: number;
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
}

const ContabilizationDifference = ({ idPayrollPay, isVisible, setIsVisible }: Props) => {

    const { params } = useParamFilter(6);
    const { data } = useContabilizationDifference(params, [], idPayrollPay);

    const hideDialog = () => {
        setIsVisible(false);
    };

    return (
        <Dialog
            visible={isVisible}
            onHide={hideDialog}
            style={{ width: "450px" }}
            header="Diferencia de Contabilización"
            modal
            className="p-fluid"
        >
            <div className="card">
                <Divider align="center">
                    <h5>Montos finales</h5>
                </Divider>
                <div className='flex gap-3 justify-content-evenly'>
                    <div className="p-col-12">
                        <h4>RD${data.debit}</h4>
                        <i>Total de Ingresos</i>
                    </div>
                    <div className="p-col-12">
                        <h4>RD${data.credit}</h4>
                        <i>Total Deducciones</i>
                    </div>
                    <div className="p-col-12">
                        <h4>RD${data.difference}</h4>
                        <i>Total Pagado</i>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ContabilizationDifference