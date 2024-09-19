"use client";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import ReportToolkit from "./components/ReportToolkit";
import useReportStore from "./store/useReportStore";
import IFilterReport from "./Types/IFilterReport";

const PayrollPayExpenseForReportTable = dynamic(
    () => import("./components/PayrollPayExpenseForReportTable")
);

const Report = () => {
    const entityProperties = ["Nomina", "Acciones"];
    const { selectedReport } = useReportStore();
    const [filterForReport, setFilterForReport] =
        useState<IFilterReport | null>({});

    return (
        <div>
            <div className="w-full">
                <ReportToolkit setFilter={setFilterForReport} />
                {selectedReport === "Gastos de Nomina" && (
                    <>
                        <Suspense
                            fallback={
                                <TableSkeletonTemplate
                                    items={entityProperties}
                                />
                            }
                        >
                            <PayrollPayExpenseForReportTable
                                filterValues={filterForReport}
                                setFilterValues={setFilterForReport}
                            />
                        </Suspense>
                    </>
                )}
            </div>
        </div>
    );
};

export default Report;
