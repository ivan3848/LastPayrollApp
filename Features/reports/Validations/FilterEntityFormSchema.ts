import { z } from 'zod';

const FilterEntityFormSchema = () => {
    const filterEntityFormSchema = z.object({
        idPayrollPay: z.any().optional(),
        conceptCode: z.any().array().optional(),
        idCostCenter: z.any().array().optional(),
        idsEmployee: z.any().array().optional(),
        start: z.any().optional(),
        end: z.any().optional(),
        idAccountingAccount: z.any().optional(),
        idDepartment: z.any().optional(),
        position: z.any().array().optional(),
        idPayrollPayCompare: z.any().optional(),
        idIncentive: z.any().optional(),
    });

    return { filterEntityFormSchema };
}

export default FilterEntityFormSchema