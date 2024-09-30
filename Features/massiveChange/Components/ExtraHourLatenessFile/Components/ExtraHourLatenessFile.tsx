import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useState } from "react";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import ExcelTable from "../../ExcelTable";
import useAddExtraHourLatenessDataQuery from "../Hooks/useAddExtraHourLatenessDataQuery";
import ExtraHourLatenessTable from "./ExtraHourLatenessTable";


export const extraHourLatenessDataSchema: Object = {
    idConcept: 0,
    hourAmount: 0,
    typeValue: 0,
    description: "",
    date: Date.now(),
};

const ExtraHourLatenessFile = () => {

    const [isToSendFile, setIsToSendFile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [extraHourLatenessDataSchemaValue, setExtraHourLatenessDataSchema] =
        useState<string[]>(Object.keys(extraHourLatenessDataSchema));

    const {
        setDeleteEntityDialog,
        setAddEntityDialog,
        setSubmitted,
        toast,
        entity,
        deleteEntityDialog,
        submitted,
        setEntity,
    } = useCrudModals<IExtraHourLatenessData>();

    const [notExistedEmployeeData, setNotExistedEmployeeData] = useState<
        IExtraHourLatenessData[]
    >([]);
    const [isExistEmployee, setIsExistEmployee] = useState(false);

    const handleRevert = (entity: IExtraHourLatenessData) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const addEntity = useAddExtraHourLatenessDataQuery({
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
        const extraHourLatenessFile = {
            description: name,
            dateExecute: new Date(date),
            isPaid: false,
        } as IExtraHourLatenessData;

        addEntity.mutate(extraHourLatenessFile);
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
                        Horas Extras y Tardanzas
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
                            Horas Extras y Tardanzas
                        </h2>
                    </div>
                </>
            )}
            {isToSendFile ? (
                <ExcelTable
                    handleUpload={handleUpload}
                    type={extraHourLatenessDataSchemaValue}
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
                            setExtraHourLatenessDataSchema(
                                extraHourLatenessDataSchemaValue
                            );
                        }}
                    />
                    <div className="m-2">
                        <ExtraHourLatenessTable
                            submitted={submitted}
                            handleRevert={handleRevert}
                        />
                    </div>
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idExtraHourLatenessData ?? 0}
                            endpoint="employee/extraHourLatenessFile"
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

export default ExtraHourLatenessFile;
