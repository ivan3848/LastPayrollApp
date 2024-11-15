'use client';
import PayrollPayDetails from '@/Features/PayrollHistory/Components/PayrollPayDetails';
import usePayrollPayQuery from '@/Features/payrollPay/Hook/usePayrollPayQuery';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import React from 'react';

const PayrollDetailPage = () => {
    const { params } = useParamFilter(25);
    const { data } = usePayrollPayQuery(params, []);

    const [isVisible, setIsVisible] = React.useState(true);

    const payrollItem = React.useMemo(() => {
        return data.items[data.items.length - 1];
    }, [data]);

    return (
        <div>
            {payrollItem && (
                <PayrollPayDetails
                    editEntityDialog={isVisible}
                    setEditEntityDialog={setIsVisible}
                    entity={payrollItem}
                />
            )}
        </div>
    );
};

export default PayrollDetailPage;