import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useState } from "react";
import ExcelTable from "../../ExcelTable";
import useAddMassiveIncreaseQuery from "../Hooks/useAddMassiveIncreaseQuery";
import {
    IMassiveIncrease,
    massiveIncreaseSchema,
} from "../Types/IMassiveIncrease";
import MassiveIncreaseTable from "./MassiveIncreaseTable";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";

const MassiveIncrease = () => {
    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [massiveIncreaseSchemaValue, setMassiveIncreaseSchema] = useState<
        string[]
    >(Object.keys(massiveIncreaseSchema));
    const {
        setDeleteEntityDialog,
        setAddEntityDialog,
        setSubmitted,
        toast,
        entity,
        deleteEntityDialog,
        submitted,
        setEntity,
    } = useCrudModals<IMassiveIncrease>();

    const [notExistedEmployeeData, setNotExistedEmployeeData] = useState<
        IMassiveIncrease[]
    >([]);
    const [isExistEmployee, setIsExistEmployee] = useState(false);

    const handleRevert = (entity: IMassiveIncrease) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const addEntity = useAddMassiveIncreaseQuery({
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
        const massiveIncrease = {
            name: `${name} - ${date}`,
            chargeDate: date,
            isPaid: false,
            employees: data,
        } as IMassiveIncrease;
        addEntity.mutate(massiveIncrease);
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
                        Aumento Masivo
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
                    type={massiveIncreaseSchemaValue}
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
                            setMassiveIncreaseSchema(
                                massiveIncreaseSchemaValue
                            );
                        }}
                    />
                    <div className="m-2">
                        <MassiveIncreaseTable
                            submitted={submitted}
                            handleRevert={handleRevert}
                        />
                    </div>
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idMassiveIncrease ?? 0}
                            endpoint="employee/massiveIncrease"
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

export default MassiveIncrease;
