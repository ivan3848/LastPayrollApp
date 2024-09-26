import DialogFooterButtonPayrollPayDetails from '@/Features/PayrollHistory/Components/DialogFooterButtonPayrollPayDetails';
import { IPayrollPay } from '@/Features/payrollPay/types/IPayrollPay';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import React, { useState } from 'react'
import FirstContabilizationTable from './FirstContabilizationTable';
import useContabilizationById from '@/Features/payrollPay/Hook/useContabilizationById';
import { CACHE_KEY_PAYROLLPAY_DETAIL } from '@/constants/cacheKeys';
import usePayrollPayDetailQuery from '@/Features/PayrollHistory/Hooks/usePayrollPayDetailQuery';
import payrollPayDetailService from '@/Features/PayrollHistory/Services/payrollPayDetailService';
import TotalsCard from '../../PayrollHistory/Components/TotalsCard';

interface Props {
    entity: IPayrollPay;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const FirstContabilization = ({
    entity,
    setEditEntityDialog,
    editEntityDialog,
}: Props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const { params } = useParamFilter(6);
    const { data } = useContabilizationById(params, [], entity.idPayrollPay);

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
            header="Contabilización #1"
            modal
            className="p-fluid"
            onHide={hideDialog}
            maximizable
        >
            <TotalsCard data={payrollResume} entity={entity} />
            {/* 
            {isVisible && (
                <>
                    <ContabilizationDifference
                        idPayrollPay={entity.idPayrollPay}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                    />
                </>
            )} */}

            <div className='card'>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Contabilization #1">
                        <FirstContabilizationTable
                            entity={data}
                        />
                    </TabPanel>
                </TabView>
            </div>
            <DialogFooterButtonPayrollPayDetails hideDialog={hideDialog} />
        </Dialog>
    )
}

export default FirstContabilization