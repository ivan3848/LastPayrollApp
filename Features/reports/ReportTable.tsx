"use client";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AccumulateForReportTable from "./components/AccumulateForReportTable";
import BankPaymentForReportTable from "./components/BankPaymentForReportTable";
import CheckPaymentForReportTable from "./components/CheckPaymentForReportTable";
import ConceptForReportTable from "./components/ConceptForReportTable";
import ConsolidatedDataForReportTable from "./components/ConsolidatedDataForReportTable";
import CostCenterForReportTable from "./components/CostCenterForReportTable";
import CostForReportTable from "./components/CostForReportTable";
import DepartmentForReportTable from "./components/DepartmentForReportTable";
import DependantForReportTable from "./components/DependantForReportTable";
import DependantInsuranceForReportTable from "./components/DependantInsuranceForReportTable";
import EmployeeForReportTable from "./components/EmployeeForReportTable";
import EmployeeHistoryForReportTable from "./components/EmployeeHistoryForReportTable";
import ExtraHourForReportTable from "./components/ExtraHourForReportTable";
import FiredEmployeeForReportTable from "./components/FiredEmployeeForReportTable";
import IncentiveForReportTable from "./components/IncentiveForReportTable";
import InsuranceForReportTable from "./components/InsuranceForReportTable";
import LatenessForReportTable from "./components/LatenessForReportTable";
import LeaseForReportTable from "./components/LeaseForReportTable";
import LicencesForReportTable from "./components/LicencesForReportTable";
import NetPayForReportTable from "./components/NetPayForReportTable";
import PermitForReportTable from "./components/PermitForReportTable";
import PositionForReportTable from "./components/PositionForReportTable";
import ProfitForReportTable from "./components/ProfitForReportTable";
import PunchForReportTable from "./components/PunchForReportTable";
import RetroactiveHoursForReportTable from "./components/RetroactiveHoursForReportTable";
import TotalTaxForReportTable from "./components/TotalTaxForReportTable";
import VacationForReportTable from "./components/VacationForReportTable";

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
        Acumulados: AccumulateForReportTable,
        Vacaciones: VacationForReportTable,
        "Seguro de Dependiente": DependantInsuranceForReportTable,
        "Seguro Medico": InsuranceForReportTable,
        Permiso: PermitForReportTable,
        Ponches: PunchForReportTable,
        Prestamos: LeaseForReportTable,
        "Pago por banco": BankPaymentForReportTable,
        "Pago por cheque": CheckPaymentForReportTable,
        Licencias: LicencesForReportTable,
        Incentivos: IncentiveForReportTable,
        "Historial de Empleados": EmployeeHistoryForReportTable,
        "Horas Extras": ExtraHourForReportTable,
        "Horas Retroactivas": RetroactiveHoursForReportTable,
        Empleados: EmployeeForReportTable,
        Desvinculados: FiredEmployeeForReportTable,
        Dependientes: DependantForReportTable,
        "Data Consolidada": ConsolidatedDataForReportTable,
        Costo: CostForReportTable,
        "Centro de Costo": CostCenterForReportTable,
        "Total de Impuesto": TotalTaxForReportTable,
        Beneficios: ProfitForReportTable,
        "Pago Neto": NetPayForReportTable,
        "Horas no laboradas": LatenessForReportTable,
        "Conceptos de Nómina": ConceptForReportTable,
        Departamentos: DepartmentForReportTable,
        Posiciones: PositionForReportTable,
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
