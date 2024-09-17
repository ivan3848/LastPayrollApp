"use client";
import TableSkeletonTemplate from '@/Features/Shared/Components/TableSkeletonTemplate';
import useCrudModals from '@/Features/Shared/Hooks/useCrudModals';
import { Toast } from 'primereact/toast';
import React, { Suspense } from 'react'
import PayrollHistoryTable from './PayrollHistoryTable';
import { IPayrollPay } from '@/Features/payrollPay/types/IPayrollPay';
import PayrollPayDetails from './PayrollPayDetails';

const PayrollHistory = () => {

    const {
        setAddEntityDialog,
        addEntityDialog,
        submitted,
        setSubmitted,
        toast,
    } = useCrudModals<IPayrollPay>();

    const handleDetails = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const entityProperties = [
        "Descripción",
        "Tipo de nómina",
        "Fecha de nómina",
        "Fecha Inicio",
        "Fecha Final",
        "Total pagado"
    ];

    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />
                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    {<PayrollHistoryTable
                        submitted={submitted}
                        handleDetails={handleDetails}
                    />}
                </Suspense>

                {addEntityDialog && (
                    <PayrollPayDetails
                        editEntityDialog={addEntityDialog}
                        setEditEntityDialog={setAddEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                )}
            </div>
        </div>
    );
};

export default PayrollHistory