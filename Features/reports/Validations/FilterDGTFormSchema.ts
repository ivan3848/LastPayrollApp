import { z } from 'zod';

const FilterDGTFormSchema = () => {
    const filterDGTFormSchema = z.object({
        idZone: z.number({ required_error: "El campo es requerido" }),
        year: z.any().optional(),
        start: z.date({ required_error: "El campo es requerido" }),
        end: z.any().optional(),
        companyId: z.any().optional(),
    });

    return { filterDGTFormSchema };
}

export default FilterDGTFormSchema