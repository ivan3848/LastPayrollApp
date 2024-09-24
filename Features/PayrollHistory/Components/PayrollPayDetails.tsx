import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import React, { useState } from 'react'
import PayrollPayDetailTable from './PayrollPayDetailTable';
import { IPayrollPay } from '@/Features/payrollPay/types/IPayrollPay';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { CACHE_KEY_PAYROLLPAY_DETAIL, CACHE_KEY_PAYROLLPAY_DETAIL_NOTPAID } from '@/constants/cacheKeys';
import usePayrollPayDetailQuery from '../Hooks/usePayrollPayDetailQuery';
import payrollPayDetailService, { payrollPayDetailNotPaidService } from '../Services/payrollPayDetailService';
import DialogFooterButtonPayrollPayDetails from './DialogFooterButtonPayrollPayDetails';
import Link from 'next/link';
import TotalsCard from './TotalsCard';

interface Props {
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    entity: IPayrollPay;
}

const PayrollPayDetails = ({
    editEntityDialog,
    setEditEntityDialog,
    entity,
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
            <TotalsCard data={data} entity={entity} />

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
                        <PayrollPayDetailTable
                            entity={data.items}
                            index={activeIndex}
                        />
                    </TabPanel>
                </TabView>
            </div>
            <Link href="/payrollHistory">
                <DialogFooterButtonPayrollPayDetails hideDialog={hideDialog} />
            </Link>
        </Dialog>
    )
}

export default PayrollPayDetails