"use client";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import ReportToolkit from "./components/ReportToolkit";
import useReportStore from "./store/useReportStore";
import IFilterReport from "./Types/IFilterReport";
import AccumulateForReportTable from "./components/AccumulateForReportTable";
import VacationForReportTable from "./components/VacationForReportTable";
import DependantInsuranceForReportTable from "./components/DependantInsuranceForReportTable";
import InsuranceForReportTable from "./components/InsuranceForReportTable";
import PermitForReportTable from "./components/PermitForReportTable";
import PunchForReportTable from "./components/PunchForReportTable";
import LeaseForReportTable from "./components/LeaseForReportTable";
import BankPaymentForReportTable from "./components/BankPaymentForReportTable";
import CheckPaymentForReportTable from "./components/CheckPaymentForReportTable";
import LicencesForReportTable from "./components/LicencesForReportTable";
import IncentiveForReportTable from "./components/IncentiveForReportTable";
import EmployeeHistoryForReportTable from "./components/EmployeeHistoryForReportTable";
import ExtraHourForReportTable from "./components/ExtraHourForReportTable";
import RetroactiveHoursForReportTable from "./components/RetroactiveHoursForReportTable";
import EmployeeForReportTable from "./components/EmployeeForReportTable";
import FiredEmployeeForReportTable from "./components/FiredEmployeeForReportTable";
import DependantForReportTable from "./components/DependantForReportTable";
import ConsolidatedDataForReportTable from "./components/ConsolidatedDataForReportTable";
import CostForReportTable from "./components/CostForReportTable";
import CostCenterForReportTable from "./components/CostCenterForReportTable";
import TotalTaxForReportTable from "./components/TotalTaxForReportTable";
import ProfitForReportTable from "./components/ProfitForReportTable";
import NetPayForReportTable from "./components/NetPayForReportTable";
import LatenessForReportTable from "./components/LatenessForReportTable";
import ConceptForReportTable from "./components/ConceptForReportTable";
import DepartmentForReportTable from "./components/DepartmentForReportTable";
import PositionForReportTable from "./components/PositionForReportTable";

interface Props {
    selectedReport: string;
    filterForReport: any;
    setFilterForReport: (value: any) => void;
}
const PayrollPayExpenseForReportTable = dynamic(
    () => import("./components/PayrollPayExpenseForReportTable")
);
const ReportTable = ({
    selectedReport,
    filterForReport,
    setFilterForReport,
}: Props) => {
    const entityProperties = ["Nomina", "Acciones"];
    const reportComponents = {
        "Gastos de Nomina": PayrollPayExpenseForReportTable,
        "Acumulados": AccumulateForReportTable,
        "Vacaciones": VacationForReportTable,
        "Seguro de Dependiente": DependantInsuranceForReportTable,
        "Seguro Medico": InsuranceForReportTable,
        "Permiso": PermitForReportTable,
        "Ponches": PunchForReportTable,
        "Prestamos": LeaseForReportTable,
        "Pago por banco": BankPaymentForReportTable,
        "Pago por cheque": CheckPaymentForReportTable,
        "Licencias": LicencesForReportTable,
        "Incentivos": IncentiveForReportTable,
        "Historial de Empleados": EmployeeHistoryForReportTable,
        "Horas Extras": ExtraHourForReportTable,
        "Horas Retroactivas": RetroactiveHoursForReportTable,
        "Empleados": EmployeeForReportTable,
        "Desvinculados": FiredEmployeeForReportTable,
        "Dependientes": DependantForReportTable,
        "Data Consolidada": ConsolidatedDataForReportTable,
        "Costo": CostForReportTable,
        "Centro de Costo": CostCenterForReportTable,
        "Total de Impuesto": TotalTaxForReportTable,
        "Beneficios": ProfitForReportTable,
        "Pago Neto": NetPayForReportTable,
        "Horas no laboradas": LatenessForReportTable,
        "Conceptos de Nómina": ConceptForReportTable,
        "Departamentos": DepartmentForReportTable,
        "Posiciones": PositionForReportTable,
    };

    const ReportComponent =
        reportComponents[selectedReport as keyof typeof reportComponents];

    return (
        ReportComponent && (
            <Suspense
                fallback={<TableSkeletonTemplate items={entityProperties} />}
            >
                <ReportComponent
                    filterValues={filterForReport}
                    setFilterValues={setFilterForReport}
                />
            </Suspense>
        )
    );
};

export default ReportTable;
