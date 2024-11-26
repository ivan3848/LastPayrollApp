import { z } from 'zod';

const FilterDGTFormSchema = () => {
    const filterDGTFormSchema = z.object({
        idZone: z.number({ required_error: "El campo es requerido" }),
        year: z.any().optional(),
        start: z.date({ required_error: "El campo es requerido" }),
        end: z.any().optional(),
        identification: z.any().optional(),
        isDgt2: z.boolean().optional(),
        isDgt3: z.boolean().optional(),
        isDgt4: z.boolean().optional(),
        isDgt12: z.boolean().optional(),
        isDgt5: z.boolean().optional()
    });

    return { filterDGTFormSchema };
}

export default FilterDGTFormSchema