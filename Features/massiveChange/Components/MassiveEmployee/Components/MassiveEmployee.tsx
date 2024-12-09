import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useState } from "react";
import ExcelTable from "../../ExcelTable";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import { IMassiveEmployee, massiveEmployeechema } from "../Types/IMassiveEmployee";
import MassiveEmployeeTable from "./MassiveEmployeeTable";
import useAddMassiveEmployeeQuery from "../Hooks/useAddMassiveEmployee";

const MassiveEmployee = () => {

    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [massiveEmployeeSchemaValue, setMassiveEmployeeSchema] = useState<
        string[]
    >(Object.keys(massiveEmployeechema));

    const {
        setDeleteEntityDialog,
        setAddEntityDialog,
        setSubmitted,
        toast,
        entity,
        deleteEntityDialog,
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

    const handleUpload = (
        data: any[],
        name: string,
        date: string,
        clear: () => void
    ) => {
        const massiveEmployee = {
            name: `${name} - ${date}`,
            chargeDate: date,
            isPaid: false,
            employees: data,
        } as IMassiveEmployee;
        addEntity.mutate(massiveEmployee);
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
                            Aumento Masivo
                        </h2>
                    </div>
                </>
            )}
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
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idMassiveEmployee ?? 0}
                            endpoint="employee/massiveEmployee"
                            deleteEntityDialog={deleteEntityDialog}
                            setDeleteEntityDialog={setDeleteEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default MassiveEmployee;

// function useAddMassiveEmployeeQuery(arg0: {
//     toast: MutableRefObject<Toast | null>;
//     setAddEntityDialog: Dispatch<SetStateAction<boolean>>;
//     setSubmitted: Dispatch<SetStateAction<boolean>>;
//     setNotExistedEmployeeData: Dispatch<SetStateAction<IMassiveEmployee[]>>;
//     setIsExistEmployee: Dispatch<SetStateAction<boolean>>;
// }) {
//     throw new Error("Function not implemented.");
// }

