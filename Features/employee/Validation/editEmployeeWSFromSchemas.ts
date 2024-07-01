import { z } from "zod";

const editEmployeeWSFromSchemas = () => {
    const editEntityFormSchema = z.object({
        idWorkScheduler:
        z.number()
        .min(1, { message: "Debe Seleccionar una opción" }),
        dateChange:  z.date({message: "This has to have a date of type 6/28/2024"})

    })


    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        workSchedulerCode: z.string().optional()
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default editEmployeeWSFromSchemas;
