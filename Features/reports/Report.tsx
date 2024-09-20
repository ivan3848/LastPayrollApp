"use client";
import { useState } from "react";
import ReportToolkit from "./components/ReportToolkit";
import ReportTable from "./ReportTable";
import useReportStore from "./store/useReportStore";
import IFilterReport from "./Types/IFilterReport";

const Report = () => {
    const { selectedReport } = useReportStore();
    const [filterForReport, setFilterForReport] =
        useState<IFilterReport | null>({});

    return (
        <div>
            <div className="w-full">
                <ReportToolkit setFilter={setFilterForReport} />

                <ReportTable
                    selectedReport={selectedReport}
                    filterForReport={filterForReport}
                    setFilterForReport={setFilterForReport}
                />
            </div>
        </div>
    );
};

export default Report;
