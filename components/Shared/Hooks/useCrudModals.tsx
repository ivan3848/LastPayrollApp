import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

function useCrudModals<T>() {
    const [entityDialog, setEntityDialog] = useState(false);
    const [deleteEntityDialog, setDeleteEntityDialog] = useState(false);
    const [entity, setEntity] = useState<T | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast | null>(null);
    const dt = useRef<DataTable<any>>(null);

    return {
        entityDialog,
        setEntityDialog,
        deleteEntityDialog,
        setDeleteEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
        dt,
    };
}

export default useCrudModals;
