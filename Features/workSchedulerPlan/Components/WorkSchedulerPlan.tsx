import React from "react";
import WorkSchedulerPlanTable from "./WorkSchedulerPlanTable";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const WorkSchedulerPlan = () => {
    return (
        <>
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "var(--primary-color)" }}
            >
                PLAN DE HORARIO
            </h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                }}
            >
                <InputNumber placeholder="Number" />
                <Calendar placeholder="Start Date" />
                <Calendar placeholder="End Date" />
            </div>
            <div style={{ marginTop: "20p</div>x" }}></div>
            <WorkSchedulerPlanTable />
        </>
    );
};

export default WorkSchedulerPlan;
