import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericMultiSelect from "@/Features/Shared/Components/GenericMultiSelect";
import useAccountingAccountQuery from "@/Features/accountingAccount/Hooks/useAccountingAccountQuery";
import useConceptQuery from "@/Features/concept/Hooks/useConceptQuery";
import useCostCenterQuery from "@/Features/costCenter/Hooks/useCostCenterQuery";
import useDepartmentQuery from "@/Features/departments/Hooks/useDepartmentQuery";
import useEmployeeQuery from "@/Features/employee/Hooks/useEmployeeQuery";
import usePayrollPayQuery from "@/Features/payrollPay/Hook/usePayrollPayQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { useForm } from "react-hook-form";
import IFilterReport from "../Types/IFilterReport";
import useReportStore from "../store/useReportStore";
import FilterEntityFormSchema from "../Validations/FilterEntityFormSchema";

interface Props {
    setFilter: (data: IFilterReport) => void;
}
const ReportToolkit = ({ setFilter }: Props) => {
    const [visible, setVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState<number>();
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [selectedConcepts, setSelectedConcepts] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedCostCenters, setSelectedCostCenters] = useState([]);
    const { filterEntityFormSchema } = FilterEntityFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IFilterReport>({
        resolver: zodResolver(filterEntityFormSchema),
    });

    const handlePositionChange = (data: []) => {
        setSelectedPositions(data);
    };

    const handleConceptChange = (data: []) => {
        setSelectedConcepts(data);
    };

    const handleEmployeeChange = (data: []) => {
        setSelectedEmployees(data);
    };

    const handleCostCenterChange = (data: []) => {
        setSelectedCostCenters(data);
    };

    const reportOptions = [
        { key: 12, name: "Acumulados" },
        // { key: 2, name: "Comparativo de Nomina" },
        { key: 11, name: "Conceptos de Nómina" },
        { key: 17, name: "Costo" },
        { key: 15, name: "Data Consolidada" },
        { key: 19, name: "Dependientes" },
        { key: 23, name: "Desvinculados" },
        { key: 6, name: "Empleados" },
        { key: 13, name: "Gastos de Nomina" },
        // { key: 9, name: "Horas Extras Resumen" },
        // { key: 10, name: "Horas Extras Detalle" },
        { key: 16, name: "Horas Retroactivas" },
        { key: 20, name: "Horas Extras" },
        { key: 21, name: "Horas no laboradas" },
        { key: 26, name: "Historial de Empleados" },
        { key: 8, name: "Incentivos" },
        { key: 18, name: "Licencias" },
        { key: 1, name: "Pago por cheque" },
        { key: 4, name: "Pago por banco" },
        { key: 5, name: "Prestamos" },
        { key: 22, name: "Ponches" },
        { key: 27, name: "Permiso" },
        { key: 14, name: "Seguro Medico" },
        { key: 24, name: "Seguro de Dependiente" },
        { key: 7, name: "Vacaciones" },
        // { key: 28, name: "Sabana Reporte de Nómina" },
        { key: 108, name: "Centro de Costo" },
        { key: 109, name: "Total de Impuesto" },
        { key: 110, name: "Beneficios" },
        { key: 111, name: "Pago Neto" },
        { key: 112, name: "Departamentos" },
        { key: 113, name: "Posiciones" },
    ];

    const {
        setSelectedReport: setSelectedReportFromToolKit,
        selectedReport: selectedReportFromToolKit,
    } = useReportStore();

    const getSelectedReport = (e: DropdownChangeEvent) => {
        setSelectedReport(e.value);
        if (e.value === undefined) {
            setSelectedReportFromToolKit("");
            return;
        }
        setSelectedReportFromToolKit(e.target.value.name);
    };

    const onSubmit = (data: any) => {
        data.position = selectedPositions;
        data.conceptCode = selectedConcepts;
        data.idsEmployee = selectedEmployees;
        data.idCostCenter = selectedCostCenters;
        setFilter(data as IFilterReport);
    };

    return (
        <>
            <div className="card">
                <Dropdown
                    className="mr-2"
                    value={selectedReport}
                    onChange={(e) => getSelectedReport(e)}
                    options={reportOptions}
                    optionLabel="name"
                    showClear
                    showFilterClear
                    placeholder="Selecciona un Reporte"
                    filter
                />

                {selectedReportFromToolKit !== "" && (
                    <Button
                        label="Filtros"
                        icon="pi pi-filter"
                        onClick={() => setVisible(true)}
                        className="p-button-secondary"
                        style={{ minWidth: "10rem" }}
                    />
                )}
            </div>

            <Dialog
                modal={false}
                header="Filtros"
                visible={visible}
                position={"top"}
                style={{ width: "50vw" }}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                    setSelectedPositions([]);
                    setSelectedConcepts([]);
                    setSelectedEmployees([]);
                    setSelectedCostCenters([]);
                }}
                draggable
                resizable
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12">
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="start">Fecha de Inicio</label>
                                <Calendar
                                    id="start"
                                    onChange={(e) =>
                                        setValue("start", e.value!)
                                    }
                                    showIcon
                                    showButtonBar
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="end">Fecha Final</label>
                                <Calendar
                                    id="end"
                                    onChange={(e) => setValue("end", e.value!)}
                                    showIcon
                                    showButtonBar
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label
                                    htmlFor="idPayrollPay"
                                    className="w-full"
                                >
                                    Nomina
                                </label>
                                <GenericDropDown
                                    id="idPayrollPay"
                                    isValid={false}
                                    text="payrollName"
                                    placeholder="Seleccione una nomina..."
                                    useQuery={usePayrollPayQuery}
                                    setValue={setValue}
                                    watch={watch}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="position" className="w-full">
                                    Posición
                                </label>
                                <GenericMultiSelect
                                    id="position"
                                    placeholder="Seleccione..."
                                    useQuery={usePositionQuery}
                                    optionLabel="name"
                                    onChange={handlePositionChange}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="conceptCode" className="w-full">
                                    Concepto
                                </label>
                                <GenericMultiSelect
                                    id="conceptCode"
                                    placeholder="Seleccione..."
                                    useQuery={useConceptQuery}
                                    alterFetchName="conceptCode"
                                    optionLabel="name"
                                    onChange={handleConceptChange}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label
                                    htmlFor="idsEmployees"
                                    className="w-full"
                                >
                                    Empleados
                                </label>
                                <GenericMultiSelect
                                    id="idsEmployees"
                                    placeholder="Seleccione..."
                                    useQuery={useEmployeeQuery}
                                    optionLabel="employeeName"
                                    alterFetchName="idEmployee"
                                    onChange={handleEmployeeChange}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label
                                    htmlFor="idCostCenter"
                                    className="w-full"
                                >
                                    Centro de costo
                                </label>
                                <GenericMultiSelect
                                    id="idCostCenter"
                                    placeholder="Seleccione..."
                                    useQuery={useCostCenterQuery}
                                    optionLabel="description"
                                    alterFetchName="idCostCenter"
                                    onChange={handleCostCenterChange}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label
                                    htmlFor="idAccountingAccount"
                                    className="w-full"
                                >
                                    Cuenta contable
                                </label>
                                <GenericDropDown
                                    id="idAccountingAccount"
                                    onChange={() => handleSubmit(onSubmit)}
                                    isValid={false}
                                    text="name"
                                    placeholder="Seleccione..."
                                    useQuery={useAccountingAccountQuery}
                                    setValue={setValue}
                                    watch={watch}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label
                                    htmlFor="idDepartment"
                                    className="w-full"
                                >
                                    Departamento
                                </label>
                                <GenericDropDown
                                    id="idDepartment"
                                    isValid={false}
                                    text="name"
                                    placeholder="Seleccione..."
                                    useQuery={useDepartmentQuery}
                                    setValue={setValue}
                                    watch={watch}
                                />
                            </div>
                            <>
                                {/* <div className="field col-12 md:col-6">
                                <label
                                    htmlFor="idIncentive"
                                    className="w-full"
                                >
                                    Incentivo
                                </label>
                                <GenericDropDown
                                    id="idIncentive"
                                    isValid={!!errors.idIncentive}
                                    text="name"
                                    placeholder="Seleccione..."
                                    useQuery={useIncentiveQuery}
                                    setValue={setValue}
                                    watch={watch}
                                />
                            </div> */}
                                {/* <div className="field col-12 md:col-6">
                                <label
                                    htmlFor="idPayrollPayCompare"
                                    className="w-full"
                                >
                                    Nomina a comparar
                                </label>
                                <GenericDropDown
                                    id="idPayrollPay"
                                    isValid={!!errors.idPayrollPayCompare}
                                    text="payrollName"
                                    placeholder="Seleccione..."
                                    useQuery={usePayrollPayQuery}
                                    setValue={setValue}
                                    watch={watch}
                                />
                            </div> */}
                            </>
                        </div>
                    </div>
                    <div className="flex justify-content-end mt-0">
                        <Button
                            icon="pi pi-filter"
                            label="Aplicar"
                            type="submit"
                        />
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default ReportToolkit;
