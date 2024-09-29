import { CACHE_KEY_PAYROLLPAY_DETAIL } from '@/constants/cacheKeys';
import DialogFooterButtonPayrollPayDetails from '@/Features/PayrollHistory/Components/DialogFooterButtonPayrollPayDetails';
import TotalsCard from '@/Features/PayrollHistory/Components/TotalsCard';
import usePayrollPayDetailQuery from '@/Features/PayrollHistory/Hooks/usePayrollPayDetailQuery';
import payrollPayDetailService from '@/Features/PayrollHistory/Services/payrollPayDetailService';
import { IPayrollPay } from '@/Features/payrollPay/types/IPayrollPay';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';
import React, { useState } from 'react';
import SecondContabilizationTable from './SecondContabilizationTable';
import useSecondContabilizationQuery from '../Hooks/useSecondContabilizationQuery';

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
    editEntityDialog,
}: Props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const { params } = useParamFilter(6);
    const { data } = useSecondContabilizationQuery(params, [], entity.idPayrollPay);

    const { data: payrollResume } = usePayrollPayDetailQuery(
        params,
        [],
        CACHE_KEY_PAYROLLPAY_DETAIL,
        payrollPayDetailService,
        entity.idPayrollPay
    );

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
            <TotalsCard data={payrollResume} entity={entity} />

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