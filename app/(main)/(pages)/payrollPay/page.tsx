'use client'
import PayrollManagementView from '@/Features/payrollManagement/Components/PayrollManagement/PayrollManagementView'
import useGetPayrollManagementByIdPayrollArea from '@/Features/payrollManagement/Hooks/useGetLastPayrollManagement';
import PayrollPayView from '@/Features/payrollPay/Components/PayrollPayView';
import usePayrollPayQuery from '@/Features/payrollPay/Hook/usePayrollPayQuery';
import { IPayrollPay } from '@/Features/payrollPay/types/IPayrollPay';
import useCrudModals from '@/Features/Shared/Hooks/useCrudModals';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import React, { useEffect, useState } from 'react'

const PayrollPay = () => {

    const { params } = useParamFilter();
    let { data } = usePayrollPayQuery(params, []);

    const {
        setEditEntityDialog,
        setSubmitted,
        submitted,
        toast,
        setEntity,
        entity,
    } = useCrudModals<IPayrollPay>();

    let { data: configData } = useGetPayrollManagementByIdPayrollArea(params, [], 1);

    const [entityPayrollManagement, setEntityPayrollManagement] = useState<IPayrollManagement>();

    useEffect(() => {
        if (configData) {
            setEntityPayrollManagement(configData);
        }
    }, [configData]);

    useEffect(() => {
        if (data) {
            setEntity(data.items[0]);
            setEditEntityDialog(true);
            setSubmitted(false);
            toast?.current?.show({ severity: 'info', summary: 'Información', detail: 'Registro cargado' });
        }
    }, [data, submitted]);


    return (
        <div className="card">
            <h5 className='mb-4' >NOMINA</h5>
            <PayrollPayView
                entity={entity}
                // setEntity={setEntity}
                entityPayrollManagement={entityPayrollManagement}
                toast={toast}
                setSubmitted={setSubmitted} />
        </div>
    )
}

export default PayrollPay