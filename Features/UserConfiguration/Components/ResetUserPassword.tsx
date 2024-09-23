import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import { CACHE_KEY_USER_CONFIGURATION } from "@/constants/cacheKeys";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import conceptFormSchemas from "../../concept/Validations/ConceptFormSchemas";

interface Props {
    id: number;
    endpoint: string;
    userResetPasswordEntityDialog: boolean;
    setUserResetPasswordEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const ResetUserPassword = ({
    id,
    userResetPasswordEntityDialog,
    setUserResetPasswordEntityDialog,
    setSubmitted,
    endpoint,
    toast,
}: Props) => {
    const apiService = new ApiService(endpoint);
    const expireQuery = useExpireSessionQuery([CACHE_KEY_USER_CONFIGURATION]);
    const userResetPasswordRegister = useMutation({
        mutationFn: (id: number) => apiService.post(id),

        onError: (error: any) => {
            setUserResetPasswordEntityDialog(false);
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            setUserResetPasswordEntityDialog(false);
            setSubmitted(true);
            expireQuery();
            toast.current?.show({
                severity: "success",
                summary: "Reseteado!",
                detail: "Contraseña reseteada correctamente",
                life: 3000,
            });
        },
    });

    const handleUserReset = () => {
        userResetPasswordRegister.mutate(id);
    };

    const hideUserResetEntityDialog = () => {
        setUserResetPasswordEntityDialog(false);
    };

    const userResetProductDialogFooter = (
        <>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                onClick={hideUserResetEntityDialog}
            />
            <Button
                label="Confirmar"
                icon="pi pi-check"
                text
                onClick={handleUserReset}
            />
        </>
    );
    return (
        <Dialog
            visible={userResetPasswordEntityDialog}
            style={{ width: "450px" }}
            header="Resetear contraseña"
            modal
            footer={userResetProductDialogFooter}
            onHide={hideUserResetEntityDialog}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                />
                {id && <span>¿Está seguro de resetear la contraseña?</span>}
            </div>
        </Dialog>
    );
};

export default ResetUserPassword;
