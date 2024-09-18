"use client";
import useGetPayrollManagementByIdPayrollArea from "@/Features/payrollManagement/Hooks/useGetLastPayrollManagement";
import PayrollPayView from "@/Features/payrollPay/Components/PayrollPayView";
import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import React, { useEffect, useState } from "react";

const PayrollPay = () => {
    const {
        setSubmitted,
        toast,
    } = useCrudModals<IPayrollPay>();

    const { params } = useParamFilter();

    let { data: configData } = useGetPayrollManagementByIdPayrollArea(
        params,
        [],
        0
    );

    const [entityPayrollManagement, setEntityPayrollManagement] = useState<IPayrollManagement>();

    useEffect(() => {
        if (configData) {
            setEntityPayrollManagement(configData);
        }
    }, [configData]);

    return (
        <div className="card">
            <h4 className="mb-4 ml-3">NÓMINA</h4>
            <PayrollPayView
                entityPayrollManagement={entityPayrollManagement}
                setEntityPayrollManagement={setEntityPayrollManagement}
                toast={toast}
                setSubmitted={setSubmitted}
            />
        </div>
    );
};

export default PayrollPay;
