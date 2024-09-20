import { CACHE_KEY_PAYROLLPAY_DETAIL, CACHE_KEY_PAYROLLPAY_DETAIL_NOTPAID } from '@/constants/cacheKeys';
import DialogFooterButtonPayrollPayDetails from '@/Features/PayrollHistory/Components/DialogFooterButtonPayrollPayDetails';
import PayrollPayDetailTable from '@/Features/PayrollHistory/Components/PayrollPayDetailTable';
import usePayrollPayDetailQuery from '@/Features/PayrollHistory/Hooks/usePayrollPayDetailQuery';
import payrollPayDetailService, { payrollPayDetailNotPaidService } from '@/Features/PayrollHistory/Services/payrollPayDetailService';
import { IPayrollPay } from '@/Features/payrollPay/types/IPayrollPay';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import React, { useState } from 'react'
import SecondContabilizationTable from './SecondContabilizationTable';

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
    const {
        params,
    } = useParamFilter(6);

    const payrollResumeService = activeIndex == 0
        ? payrollPayDetailService
        : payrollPayDetailNotPaidService;

    const cachekey = activeIndex == 0
        ? CACHE_KEY_PAYROLLPAY_DETAIL
        : CACHE_KEY_PAYROLLPAY_DETAIL_NOTPAID;

    const { data } = usePayrollPayDetailQuery(
        params,
        [],
        cachekey,
        payrollResumeService,
        entity.idPayrollPay
    );

    const [resume, setResume] = React.useState({
        totalDeduction: 0,
        totalProfit: 0,
        totalPay: 0,
    });

    React.useEffect(() => {
        data.items?.forEach((item) => {
            setResume({
                totalDeduction: item.totalDeduction ?? 0,
                totalProfit: item.totalProfit ?? 0,
                totalPay: entity.totalPay ?? 0,
            });
        });

    }, [entity]);

    const hideDialog = () => {
        setEditEntityDialog(false);
    };
    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "60vw" }}
            header="Detalles de Nómina"
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
                        <h4>RD${resume.totalProfit}</h4>
                        <i>Total de Ingresos</i>
                    </div>
                    <div className="p-col-12">
                        <h4>RD${resume.totalDeduction}</h4>
                        <i>Total Deducciones</i>
                    </div>
                    <div className="p-col-12">
                        <h4>RD${resume.totalPay}</h4>
                        <i>Total Pagado</i>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className="flex mb-2 gap-2 justify-content-end">
                    <Button
                        onClick={() => setActiveIndex(0)}
                        className="w-2rem h-2rem p-0" rounded
                        outlined={activeIndex !== 0} label="1" />
                    <Button onClick={() => setActiveIndex(1)}
                        className="w-2rem h-2rem p-0"
                        rounded outlined={activeIndex !== 1}
                        label="2" />
                </div>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Nomina Liquidada">
                        <PayrollPayDetailTable
                            entity={data.items}
                        />
                    </TabPanel>
                    <TabPanel header="Nomina Con Saldo Cero">
                        <SecondContabilizationTable
                            entity={data.items}
                            index={activeIndex}
                        />
                    </TabPanel>
                </TabView>
            </div>
            <DialogFooterButtonPayrollPayDetails hideDialog={hideDialog} />
        </Dialog>
    )
}

export default SecondContabilization