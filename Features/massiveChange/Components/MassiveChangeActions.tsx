"use client";
import { useState } from "react";
import { MassiveChangeOptionsEnum } from "../Enums/MassiveChangeOptionsEnum";
import MassiveChangeOptions from "./MassiveChangeOptions";
import MassiveIncrease from "./MassiveIncrease/Components/MassiveIncrease";
import ComplementaryData from "./ComplementaryData/Components/ComplementaryData";

const MassiveChangeAction = ({ }) => {
    const [openAction, setOpenAction] = useState<MassiveChangeOptionsEnum>(
        MassiveChangeOptionsEnum.NoOption
    );

    return (
        <>
            <div>
                {openAction === MassiveChangeOptionsEnum.NoOption && (
                    <MassiveChangeOptions setAction={setOpenAction} />
                )}
                {openAction === MassiveChangeOptionsEnum.MassiveIncrease && (
                    <MassiveIncrease />
                )}
                {openAction ===
                    MassiveChangeOptionsEnum.ExtraHourLatenessFile && (
                        <MassiveIncrease />
                    )}
                {openAction === MassiveChangeOptionsEnum.ComplementaryData && (
                    <ComplementaryData />
                )}
                {openAction === MassiveChangeOptionsEnum.MassiveEmployee && (
                    <ComplementaryData />
                )}
            </div>
        </>
    );
};

export default MassiveChangeAction;
