'use client'
import PayrollManagementView from '@/Features/payrollManagement/Components/PayrollManagement/PayrollManagementView'
import useGetPayrollManagementByIdPayrollArea from '@/Features/payrollManagement/Hooks/useGetLastPayrollManagement';
import useCrudModals from '@/Features/Shared/Hooks/useCrudModals';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import React, { useEffect } from 'react'

const PayrollManagement = () => {

    const { params } = useParamFilter();

    const {
        setSubmitted,
        submitted,
        toast,
        setEntity,
        entity,
    } = useCrudModals<IPayrollManagement>();

    let { data } = useGetPayrollManagementByIdPayrollArea(params, [submitted], 1);

    useEffect(() => {
        if (data) {
            setEntity(data);
            setSubmitted(false);
        }
    }, [data, setEntity, setSubmitted]);

    return (
        <div className="card">
            <h4 className='mb-4' >REGISTRO GESTION CALCULO DE NOMINA</h4>
            <PayrollManagementView
                entity={entity}
                setEntity={setEntity}
                toast={toast}
                submitted={submitted}
                setSubmitted={setSubmitted} />
        </div>
    )
}

export default PayrollManagement