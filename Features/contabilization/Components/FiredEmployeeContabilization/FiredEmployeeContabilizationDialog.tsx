'use client';
import DialogFooterButtonPayrollPayDetails from '@/Features/PayrollHistory/Components/DialogFooterButtonPayrollPayDetails';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';
import React, { useState } from 'react';
import useSecondContabilizationQuery from '../../Hooks/useSecondContabilizationQuery';
import FiredEmployeeContabilizationTable from './FiredEmployeeContabilizationDialogTable';
import { IFireEmployee } from '@/Features/employee/Components/FiredEmployee/Types/IFiredEmployee';
import useFiredEmployeeForContabilizationQuery from '../../Hooks/useFiredEmployeeForContabilizationQuery';

interface Props {
    entity: IFireEmployee;
    firedEmployeeEntityDialog: boolean;
    setFiredEmployeeEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const FiredEmplyeeContabilization = ({
    entity,
    setFiredEmployeeEntityDialog,
    firedEmployeeEntityDialog,
}: Props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const { params } = useParamFilter(6);
    const { data } = useFiredEmployeeForContabilizationQuery(
        params,
        [],
        entity.idEmployee);

    const hideDialog = () => {
        setFiredEmployeeEntityDialog(false);
    };

    return (
        <Dialog
            visible={firedEmployeeEntityDialog}
            style={{ width: "60vw" }}
            header="Desvincular empleado"
            modal
            className="p-fluid"
            onHide={hideDialog}
            maximizable
        >
            <div className='card'>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Desvincular">
                        <FiredEmployeeContabilizationTable
                            entity={data}
                        />
                    </TabPanel>
                </TabView>
            </div>
            <DialogFooterButtonPayrollPayDetails hideDialog={hideDialog} />
        </Dialog>
    )
}

export default FiredEmplyeeContabilization