"use client";
import PayrollManagementView from "@/Features/payrollManagement/Components/PayrollManagement/PayrollManagementView";
import useGetPayrollManagementByIdPayrollArea from "@/Features/payrollManagement/Hooks/useGetLastPayrollManagement";
import PayrollPayView from "@/Features/payrollPay/Components/PayrollPayView";
import usePayrollPayQuery from "@/Features/payrollPay/Hook/usePayrollPayQuery";
import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import React, { useEffect, useState } from "react";

const PayrollPay = () => {
    const { params } = useParamFilter();

    let { data } = usePayrollPayQuery(params, []);
    let { data: configData } = useGetPayrollManagementByIdPayrollArea(
        params,
        [],
        1
    );

    const {
        setEditEntityDialog,
        setSubmitted,
        submitted,
        toast,
        setEntity,
        entity,
    } = useCrudModals<IPayrollPay>();

    const [entityPayrollManagement, setEntityPayrollManagement] =
        useState<IPayrollManagement>();

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
            toast?.current?.show({
                severity: "info",
                summary: "Información",
                detail: "Registro cargado",
            });
        }
    }, [data, setEditEntityDialog, setEntity, setSubmitted, submitted, toast]);

    return (
        <div className="card">
            <h4 className="mb-4 ml-3">NÓMINA</h4>
            <PayrollPayView
                entity={entity}
                // setEntity={setEntity}
                entityPayrollManagement={entityPayrollManagement}
                setEntityPayrollManagement={setEntityPayrollManagement}
                toast={toast}
                setSubmitted={setSubmitted}
            />
        </div>
    );
};

export default PayrollPay;
