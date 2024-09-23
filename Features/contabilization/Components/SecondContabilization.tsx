import DialogFooterButtonPayrollPayDetails from '@/Features/PayrollHistory/Components/DialogFooterButtonPayrollPayDetails';
import PayrollPayDetailTable from '@/Features/PayrollHistory/Components/PayrollPayDetailTable';
import { IPayrollPay } from '@/Features/payrollPay/types/IPayrollPay';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import React, { useState } from 'react'
import SecondContabilizationTable from './SecondContabilizationTable';
import useContabilizationById from '@/Features/payrollPay/Hook/useContabilizationById';

interface Props {
    entity: IPayrollPay;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const SecondContabilization = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const { params } = useParamFilter(6);
    const { data } = useContabilizationById(params, [], entity.idPayrollPay);

    const hideDialog = () => {
        setEditEntityDialog(false);
    };
    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "60vw" }}
            header="Contabilización #2"
            modal
            className="p-fluid"
            onHide={hideDialog}
            maximizable
        >
            <div className="card">
                <Divider align="center">
                    <h5>Periodo de Nómina # {entity.payrollNumber} - {entity.payrollName} </h5>
                </Divider>
                <div className='flex gap-3 justify-content-evenly'>
                    <div className="p-col-12">
                        <h4>RD${data.totalProfit}</h4>
                        <i>Total de Ingresos</i>
                    </div>
                    <div className="p-col-12">
                        <h4>RD${data.totalDeduction}</h4>
                        <i>Total Deducciones</i>
                    </div>
                    <div className="p-col-12">
                        <h4>RD${data.totalPay}</h4>
                        <i>Total Pagado</i>
                    </div>
                </div>
            </div>
            <div className='card'>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Contabilization #2">
                        <SecondContabilizationTable
                            entity={data}
                        />
                    </TabPanel>
                </TabView>
            </div>
            <DialogFooterButtonPayrollPayDetails hideDialog={hideDialog} />
        </Dialog>
    )
}

export default SecondContabilization