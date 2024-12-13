import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useState } from "react";
import ExcelTable from "../../ExcelTable";
import { IMassiveEmployee, massiveEmployeechema } from '../Types/IMassiveEmployee';
import MassiveEmployeeTable from "./MassiveEmployeeTable";
import useAddMassiveEmployeeQuery from "../Hooks/useAddMassiveEmployee";
import RepeatedEmployeeTable from "./RepeatedEmployeeTable";

const MassiveEmployee = () => {
    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isRepeated, setIsRepeated] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [repeateData, setRepeateData] = useState<IMassiveEmployee>();
    const [massiveEmployeeSchemaValue, setMassiveEmployeeSchema] = useState<
        string[]
    >(Object.keys(massiveEmployeechema));

    const {
        setDeleteEntityDialog,
        setAddEntityDialog,
        setSubmitted,
        toast,
        submitted,
        setEntity,
    } = useCrudModals<IMassiveEmployee>();

    const [notExistedEmployeeData, setNotExistedEmployeeData] = useState<
        IMassiveEmployee[]
    >([]);
    const [isExistEmployee, setIsExistEmployee] = useState(false);

    const handleRevert = (entity: IMassiveEmployee) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const addEntity = useAddMassiveEmployeeQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        setNotExistedEmployeeData,
        setIsExistEmployee,
    });

    const handleUpload = async (
        data: any[],
        name: string,
        date: string,
        clear: () => void
    ) => {
        const massiveEmployee = { employeeList: data } as IMassiveEmployee;
        const response = await addEntity.mutateAsync(massiveEmployee) as IMassiveEmployee;
        if (response) {
            setIsRepeated(true);
            setRepeateData(response);
        };
        clear();
    };

    return (
        <>
            <Toast ref={toast} />
            {isVisible ? (
                <div className="inline-flex align-items-center justify-content-center gap-5">
                    <Link
                        href="/massiveChange"
                        className="text-inherit"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={() => {
                            setIsToSendFile(false);
                            setIsVisible(false);
                            setNotExistedEmployeeData([]);
                        }}
                    >
                        <i className="cursor-pointer pi pi-arrow-left"></i>
                    </Link>

                    <h2 className="font-bold white-space-nowrap text-2xl">
                        Cargar Empleados
                    </h2>

                </div>
            ) : (
                <>
                    <div className="inline-flex align-items-center justify-content-center gap-5">
                        <Link
                            href=""
                            className="text-inherit"
                            style={{ textDecoration: "none", color: "inherit" }}
                            onClick={() => {
                                setIsToSendFile(false);
                                setIsVisible(true);
                                setNotExistedEmployeeData([]);
                            }}
                        >
                            <i className="cursor-pointer pi pi-arrow-left"></i>
                        </Link>

                        <h2 className="font-bold white-space-nowrap text-2xl">
                            Cargar Empleados
                        </h2>
                    </div>
                </>
            )}
            {isRepeated && (
                <div className="mb-3">
                    <Button
                        icon="pi pi-fw pi-upload"
                        className="p-button p-button-rounded p-button-outlined"
                        label="Ver empleados repetidos"
                        onClick={() => setShowTable(true)}
                    />
                </div>
            )}
            {showTable && (<RepeatedEmployeeTable
                data={repeateData}
                showTable={showTable}
                setShowTable={setShowTable}
            />)}
            {isToSendFile ? (
                <ExcelTable
                    handleUpload={handleUpload}
                    type={massiveEmployeeSchemaValue}
                    notExistedEmployeeData={notExistedEmployeeData}
                    setIsExistEmployee={setIsExistEmployee}
                    isExistEmployee={isExistEmployee}
                    setNotExistedEmployeeData={setNotExistedEmployeeData}
                />
            ) : (
                <div className="m-2">
                    <Button
                        icon="pi pi-fw pi-upload"
                        className="p-button p-button-rounded p-button-outlined"
                        label="Subir Archivo"
                        onClick={() => {
                            setIsToSendFile(true);
                            setIsVisible(false);
                            setMassiveEmployeeSchema(
                                massiveEmployeeSchemaValue
                            );
                        }}
                    />
                    <div className="m-2">
                        <MassiveEmployeeTable
                            submitted={submitted}
                            handleRevert={handleRevert}
                        />
                    </div>

                </div>
            )}
        </>
    );
};

export default MassiveEmployee;

