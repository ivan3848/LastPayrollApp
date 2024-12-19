import { Page } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import { ILogin } from "../types/ILogin";
import SignIn from "./LoginServerActions";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import ChangePassword from "@/Features/UserConfiguration/Components/newpassword/ChangePassword";
import YourSvg from "@/layout/images/WorkingWithlogoPNG.png";
import Image from "next/image";

const loginFormSchema = z.object({
    username: z
        .string({ required_error: "El email es requerido" })
        .min(2, { message: "El email debe tener al menos 2 caracteres" })
        .max(50, {
            message: "El email debe tener un máximo de 100 caracteres",
        }),
    password: z
        .string({ required_error: "La contraseña es requerida" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(50, {
            message: "La contraseña debe tener un máximo de 50 caracteres",
        }),
});

const Login: Page = () => {
    const toast = useRef<Toast | null>(null);
    const [loading, setLoading] = useState(false); // Step 1: Loading state
    const [user, setUser] = useState<ILogin>();
    const show = (message: string) => {
        toast.current?.show({
            severity: "warn",
            summary: "Error al iniciar sesión",
            detail: message,
            life: 3000,
        });
    };

    const {
        handleSubmit,
        register,
        reset,
        setValue,

        formState: { errors },
    } = useForm<ILogin>({ resolver: zodResolver(loginFormSchema) });

    const [showReset, setShowReset] = useState(false);
    const { setSubmitted } = useCrudModals<ILogin>();
    const onSubmit = async (data: ILogin) => {
        setLoading(true);
        const response = await SignIn(data);

        if (response == "Usuario debe cambiar la contraseña") {
            setUser(data);
            setShowReset(true);
        }
        if (response === "success") {
            window.location.reload();
            reset();
            return;
        }
        setLoading(false);
        show(response);
    };

    const { layoutConfig } = useContext(LayoutContext);
    const dark = layoutConfig?.colorScheme !== "light";

    return (
        <>
            {showReset && (
                <ChangePassword entity={user!} setSubmitted={setSubmitted} />
            )}

            <Toast ref={toast} />
            {!showReset && (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1600 800"
                        className="fixed left-0 top-0 min-h-screen min-w-screen"
                        preserveAspectRatio="none"
                    >
                        <rect
                            fill={
                                dark
                                    ? "var(--primary-900)"
                                    : "var(--primary-500)"
                            }
                            width="1600"
                            height="800"
                        />
                        <path
                            fill={
                                dark
                                    ? "var(--primary-800)"
                                    : "var(--primary-400)"
                            }
                            d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"
                        />
                        <path
                            fill={
                                dark
                                    ? "var(--primary-700)"
                                    : "var(--primary-300)"
                            }
                            d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
                        />
                        <path
                            fill={
                                dark
                                    ? "var(--primary-600)"
                                    : "var(--primary-200)"
                            }
                            d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"
                        />
                        <path
                            fill={
                                dark
                                    ? "var(--primary-500)"
                                    : "var(--primary-100)"
                            }
                            d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"
                        />
                    </svg>
                    <div className="px-5 min-h-screen flex justify-content-center align-items-center">
                        <div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                            <div className="flex justify-content-center mb-6">
                                <Image
                                    src={YourSvg}
                                    alt="specialistNOM logo"
                                    width={150}
                                    height={55}
                                />
                            </div>

                            <div className="mb-4">
                                <div className="text-900 text-2xl font-bold mb-2 ">
                                    Iniciar Sesión
                                </div>
                                <span className="text-600 font-medium">
                                    Por favor, ingrese sus credenciales.
                                </span>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-column">
                                    <span className="w-full mb-4">
                                        <InputText
                                            {...register("username")}
                                            id="username"
                                            type="text"
                                            className="w-full md:w-25rem"
                                            placeholder="email"
                                        />

                                        {errors.username && (
                                            <p className="error-message flex justify-start text-red pt-1">
                                                {errors.username.message?.toString()}
                                            </p>
                                        )}
                                    </span>
                                    <span className="w-full mb-4">
                                        <Password
                                            id="password"
                                            inputClassName="w-full md:w-25rem"
                                            toggleMask
                                            feedback={false}
                                            placeholder="contraseña"
                                            onChange={(e) => {
                                                setValue(
                                                    "password",
                                                    e.target.value
                                                );
                                            }}
                                        />

                                        {errors.password && (
                                            <p className="error-message flex justify-start text-red pt-1">
                                                {errors.password.message?.toString()}
                                            </p>
                                        )}
                                    </span>
                                    <Button
                                        label="Iniciar Sesión"
                                        className="w-full"
                                        type="submit"
                                        loading={loading}
                                        iconPos="right"
                                    ></Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Login;
