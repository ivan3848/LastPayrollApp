import React, { useState } from "react";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { InputSwitch } from "primereact/inputswitch";
import { IEmployee } from "@/Features/employee/Types/IEmployee";

interface Props {
    employee: IEmployee;
}

interface ICoverPosition {
    IdEmployee: number;
    FiredDate: Date;
    Comment: string;
    IsTakenVacation: boolean;
    IsUnemployment: boolean;
    IsPreview: boolean;
    IsNotice: boolean;
    IsChristmasPayment: boolean;
    IdStatusFired: number;
    IdCancelationType: number;
}

const CoverPosition = ({ employee }: Props) => {
    const { setFilters, params, setAllData } = useParamFilter();
    const [pagoNavidad, setPagoNavidad] = useState(false);
    const [notice, setNotice] = useState(false);
    const [vacation, setVacation] = useState(false);
    const [unemployment, setUnemployment] = useState(false);

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ICoverPosition>();

    const onFormSubmit = (data: ICoverPosition) => {
        return;
    };

    return (
        <div className="grid">
            <div className="col-12 mx-auto">
                <div className="card">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <h4 style={{ marginBottom: "30px" }}>
                            Información del suplente
                        </h4>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <label htmlFor="idStatus" className="w-full">
                                    Motivo
                                </label>
                                <GenericStatusDropDown
                                    id="IdCancelationType"
                                    isValid={!!errors.IdCancelationType}
                                    setValue={setValue}
                                    watch={watch}
                                    isFocus={true}
                                    tableName="SalaryNewsStatus"
                                />
                                {errors.IdCancelationType && (
                                    <small className="p-invalid text-danger">
                                        {errors.IdCancelationType.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label id="DateChange" htmlFor="DateChange">
                                    Fecha de inicio
                                </label>
                                <Calendar
                                    {...register("FiredDate")}
                                    name="FiredDate"
                                    value={new Date()}
                                    showIcon
                                />
                            </div>
                        </div>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <h6>Pago de Navidad</h6>
                                <InputSwitch
                                    {...register("IsChristmasPayment")}
                                    name="IsChristmasPayment"
                                    checked={pagoNavidad}
                                    onChange={(e) =>
                                        setPagoNavidad(e.value ?? false)
                                    }
                                />
                                <h6>Pre-Aviso</h6>
                                <InputSwitch
                                    {...register("IsNotice")}
                                    name="IsNotice"
                                    checked={notice}
                                    onChange={(e) =>
                                        setNotice(e.value ?? false)
                                    }
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <h6>Ha tomado vacaciones este año?</h6>
                                <InputSwitch
                                    {...register("IsTakenVacation")}
                                    name="IsTakenVacation"
                                    checked={vacation}
                                    onChange={(e) =>
                                        setVacation(e.value ?? false)
                                    }
                                />
                                <h6>Cesantia</h6>
                                <InputSwitch
                                    {...register("IsUnemployment")}
                                    name="IsUnemployment"
                                    checked={unemployment}
                                    onChange={(e) =>
                                        setUnemployment(e.value ?? false)
                                    }
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="Description">Descripción</label>
                                <InputTextarea
                                    {...register("Comment")}
                                    id="Comment"
                                    placeholder="Ingrese descripción..."
                                    rows={3}
                                    cols={30}
                                />
                            </div>
                        </div>
                        <DialogFooterButtons hideDialog={() => {}} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CoverPosition;
