"use client";
import newPasswordFormSchema from "@/Features/UserConfiguration/Components/newpassword/newPasswordFormSchema";
import { ILogin } from "@/app/(full-page)/auth/types/ILogin";
import useResetPasswordQuery from "@/Features/UserConfiguration/Service/useResetPasswordQuery";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

interface Props {
    entity: ILogin;
    setSubmitted: (value: boolean) => void;
}

const ChangePassword = ({ entity, setSubmitted }: Props) => {
    const toast = useRef<Toast | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { resetPasswordFormSchema } = newPasswordFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: zodResolver(resetPasswordFormSchema),
    });

    const editEntity = useResetPasswordQuery({
        toast,
        setSubmitted,
        reset,
    });

    const simulateLoading = (callback: () => void) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            callback();
        }, 2000);
    };

    const onSubmit = (data: ILogin) => {
        data.username = entity?.username;

        if (data.oldPassword !== data.newPassword) {
            return toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Las contraseñas no coinciden",
                life: 3000,
            });
        }
        simulateLoading(() => {
            editEntity.mutate(data);
        });
    };

    const handleCancel = () => {
        simulateLoading(() => {
            location.reload();
        });
    };

    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig?.colorScheme !== "light";

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1600 800"
                className="fixed left-0 top-0 min-h-screen min-w-screen"
                preserveAspectRatio="none"
            >
                <rect
                    fill={dark ? "var(--primary-900)" : "var(--primary-500)"}
                    width="1600"
                    height="800"
                />
                <path
                    fill={dark ? "var(--primary-800)" : "var(--primary-400)"}
                    d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"
                />
                <path
                    fill={dark ? "var(--primary-700)" : "var(--primary-300)"}
                    d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
                />
                <path
                    fill={dark ? "var(--primary-600)" : "var(--primary-200)"}
                    d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"
                />
                <path
                    fill={dark ? "var(--primary-500)" : "var(--primary-100)"}
                    d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"
                />
            </svg>

            <div className="px-5 min-h-screen flex justify-content-center align-items-center">
                <div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                    <div className="mb-4">
                        <div className="text-900 text-xl font-bold mb-2">
                            Nueva Contraseña
                        </div>
                        <span className="text-600 font-medium">
                            Entre nueva contraseña
                        </span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-column">
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-lock z-2"></i>
                                <Password
                                    id="oldPassword"
                                    className="w-full"
                                    type="text"
                                    inputClassName="w-full md:w-25rem"
                                    placeholder="Contraseña antigua"
                                    value={watch("oldPassword")}
                                    toggleMask
                                    onChange={(e) =>
                                        setValue("oldPassword", e.target.value)
                                    }
                                    inputStyle={{ paddingLeft: "2.5rem" }}
                                />
                                {errors.oldPassword && (
                                    <p className="error-message flex justify-start text-red pt-1">
                                        {errors.oldPassword.message?.toString()}
                                    </p>
                                )}
                            </span>

                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-lock z-2"></i>
                                <Password
                                    id="newPassword"
                                    className="w-full"
                                    type="text"
                                    inputClassName="w-full md:w-25rem"
                                    placeholder="Nueva contraseña"
                                    toggleMask
                                    onChange={(e) =>
                                        setValue("newPassword", e.target.value)
                                    }
                                    inputStyle={{ paddingLeft: "2.5rem" }}
                                />
                                <div className="">
                                    {errors.newPassword && (
                                        <p className="error-message flex justify-start text-red pt-1">
                                            {errors.newPassword.message?.toString()}
                                        </p>
                                    )}
                                </div>
                            </span>

                            <div className="flex flex-wrap gap-2 justify-content-between">
                                <Button
                                    label="Cancel"
                                    outlined
                                    className="flex-auto"
                                    loading={loading}
                                    onClick={handleCancel}
                                />
                                <Button
                                    label="Submit"
                                    className="flex-auto"
                                    loading={loading}
                                    type="submit"
                                />
                            </div>

                            {Toast && <Toast ref={toast} />}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
