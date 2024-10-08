import { z } from 'zod';

const FilterTSSFormSchema = () => {
    const filterTSSFormSchema = z.object({
        start: z.date({ required_error: "El campo es requerido" }),
        end: z.any().optional(),
        // selectedValue: z.string({ required_error: "El campo es requerido" }),
    });

    return { filterTSSFormSchema };
}

export default FilterTSSFormSchema