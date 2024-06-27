import { z } from "zod";

export const positionSalaryEntityFormSchema = z.object({
    idDepartment: z.number({
        required_error: "El campo es requerido",
    }),
    idPosition: z.number({
        required_error: "El campo es requerido",
    }),
    salary: z.number({
        required_error: "El campo es requerido",
    }),
    idHierarchyPositionManager: z.number({
        required_error: "El campo es requerido",
    }),
    IdNewStatus: z.number({
        required_error: "El campo es requerido",
    }),
    DateChange: z.date({
        required_error: "El campo es requerido",
    }),
    Description: z.string().optional(),
});

     

