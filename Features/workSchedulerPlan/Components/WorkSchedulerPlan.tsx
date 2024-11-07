import WorkSchedulerPlanTable from "./WorkSchedulerPlanTable";

const WorkSchedulerPlan = () => {
    return (
        <>
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "var(--primary-color)" }}
            >
                PLAN DE HORARIO
            </h2>
            <WorkSchedulerPlanTable />
        </>
    );
};

export default WorkSchedulerPlan;
