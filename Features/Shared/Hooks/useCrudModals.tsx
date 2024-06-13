import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

function useCrudModals<T>() {
    const [addEntityDialog, setAddEntityDialog] = useState(false);
    const [editEntityDialog, setEditEntityDialog] = useState(false);
    const [deleteEntityDialog, setDeleteEntityDialog] = useState(false);
    const [entity, setEntity] = useState<T | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast | null>(null);
    const dt = useRef<DataTable<any>>(null);

    return {
        deleteEntityDialog,
        setDeleteEntityDialog,
        addEntityDialog,
        setAddEntityDialog,
        editEntityDialog,
        setEditEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
        dt,
    };
}

export default useCrudModals;
