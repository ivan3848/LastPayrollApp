'use client'
import PayrollManagementView from '@/Features/payrollManagement/Components/PayrollManagement/PayrollManagementView'
import useGetPayrollManagementByIdPayrollArea from '@/Features/payrollManagement/Hooks/useGetLastPayrollManagement';
import useCrudModals from '@/Features/Shared/Hooks/useCrudModals';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import React, { useEffect } from 'react'

const PayrollManagement = () => {

    const { params } = useParamFilter();
    let { data } = useGetPayrollManagementByIdPayrollArea(params, [], 1);

    const {
        setEditEntityDialog,
        setSubmitted,
        submitted,
        toast,
        setEntity,
        entity,
    } = useCrudModals<IPayrollManagement>();

    useEffect(() => {
        if (data) {
            setEntity(data);
            setEditEntityDialog(true);
            setSubmitted(false);
            toast?.current?.show({ severity: 'info', summary: 'Información', detail: 'Registro cargado' });
        }
    }, [data, submitted]);

    return (
        <div className="card">
            <h5 className='mb-4' >REGISTRO GESTION CALCULO DE NOMINA</h5>
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