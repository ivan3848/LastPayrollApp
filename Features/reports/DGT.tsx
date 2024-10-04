"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "primereact/checkbox";
import React, { useState } from "react";
import conceptFormSchemas from "../concept/Validations/ConceptFormSchemas";
import { IConcept } from "../concept/Types/IConcept";
import { useForm } from "react-hook-form";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import GenericDropDown from "../Shared/Components/GenericDropDown";
import useZoneQuery from "../zone/Hooks/useZoneQuery";
import locationFormSchemas from "../location/Validations/LocationFormSchemas";
import { ILocation } from "../location/Types/ILocation";
import { Button } from "primereact/button";

const DGT = () => {
    const { addEntityFormSchema } = locationFormSchemas();

    const {
        setValue,
        watch,
        formState: { errors },
    } = useForm<ILocation>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const [isDgt2, setIsDgt2] = useState(false);
    const [isDgt3, setIsDgt3] = useState(false);
    const [isDgt4, setIsDgt4] = useState(false);
    const [isDgt12, setIsDgt12] = useState(false);

    const handleToggleDGT2 = () => {
        setIsDgt2(!isDgt2);
    };

    const handleToggleDGT3 = () => {
        setIsDgt3(!isDgt3);
        isDgt4 && setIsDgt4(!isDgt4);
    };

    const handleToggleDGT4 = () => {
        setIsDgt4(!isDgt4);
        isDgt3 && setIsDgt3(!isDgt3);
    };

    const handleToggleDGT12 = () => {
        setIsDgt12(!isDgt12);
    };
    return (
        <>
            <div className="p-fluid formgrid grid mb-4">
                <div className="field col-12 md:col-6">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-qrcode"></i>
                        </span>
                        <InputText placeholder="RNC o Cédula de la empresa" />
                    </div>
                </div>
                <div className="field col-12 md:col-6">
                    <Calendar id="date" showIcon showButtonBar />
                </div>
                <div className="field col-12 md:col-6">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-objects-column"></i>
                        </span>
                        <InputText disabled placeholder="RNL" />
                    </div>
                </div>
                <div className="field col-12 md:col-6">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-home"></i>
                        </span>
                        <GenericDropDown
                            id="idZone"
                            isValid={!!errors.idZone}
                            text="name"
                            placeholder="Seleccione una Localidad"
                            useQuery={useZoneQuery}
                            setValue={setValue}
                            watch={watch}
                        />
                    </div>
                </div>
            </div>

            <div className="p-fluid formgrid grid justify-content-center">
                <div className="field col-8 md:col-2">
                    <label htmlFor="dgt2" className="mr-2 font-bold">
                        DGT2
                    </label>
                    <InputSwitch
                        id="dgt2"
                        checked={isDgt2}
                        onChange={handleToggleDGT2}
                    />
                </div>
                <div className="field col-8 md:col-2">
                    <label htmlFor="dgt3" className="mr-2 font-bold">
                        DGT3
                    </label>
                    <InputSwitch
                        id="dgt3"
                        checked={isDgt3}
                        onChange={handleToggleDGT3}
                    />
                </div>
                <div className="field col-8 md:col-2">
                    <label htmlFor="dgt4" className="mr-2 font-bold">
                        DGT4
                    </label>
                    <InputSwitch
                        id="dgt4"
                        checked={isDgt4}
                        onChange={handleToggleDGT4}
                    />
                </div>
                <div className="field col-8 md:col-2">
                    <label htmlFor="dgt12" className="mr-2 font-bold">
                        DGT12
                    </label>
                    <InputSwitch
                        id="dgt12"
                        checked={isDgt12}
                        onChange={handleToggleDGT12}
                    />
                </div>
            </div>

            <div className="p-fluid formgrid grid justify-content-end">
                <div className="field col-6 md:col-1">
                    <Button severity="info" label="Generar" icon="pi pi-save" />
                </div>
            </div>
        </>
    );
};

export default DGT;
