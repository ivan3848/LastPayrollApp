import { z } from "zod";

const employeeFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idEmployee: z.string({ required_error: "El campo es requerido" }),
        idHierarchyPosition: z.number().optional(),
        idEmployeeManager: z.number().optional(),
        idWorkScheduler: z.number({ required_error: "El campo es requerido" }),
        idPayrollArea: z.number({ required_error: "El campo es requerido" }),
        startDate: z.date({ required_error: "El campo es requerido" }),
        endWorkDate: z.date().optional(),
        salary: z.number({ required_error: "El campo es requerido" }),
        email: z.string().optional(),
        employeeImage: z.string().optional(),
        idStatusActionClass: z.number().optional(),
        functionDescription: z.string().optional(),
        idContractType: z.number().optional(),
        idDisability: z.number().optional(),
        idGroupManager: z.number().optional(),
        idPerson: z.number().optional(),
        idDepartment: z.number({ required_error: "El campo es requerido" }),
        idPosition: z.number({ required_error: "El campo es requerido" }),
        sindicate: z.boolean().optional(),
        extraHours: z.boolean().optional(),
        workRelation: z.boolean().optional(),
        idStatusRelationship: z.number({ required_error: "El campo es requerido" }),
        contactName: z.string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        contactNumber: z.string({ required_error: "El campo es requerido" })
            .length(12, { message: "El campo es requerido" }),

    });

    const addEntityFormSchema = z.object({
        idEmployee: z.string({ required_error: "El campo es requerido" }),
        idHierarchyPosition: z.number().optional(),
        idEmployeeManager: z.number().optional(),
        idWorkScheduler: z.number({ required_error: "El campo es requerido" }),
        idPayrollArea: z.number({ required_error: "El campo es requerido" }),
        startDate: z.date({ required_error: "El campo es requerido" }),
        endWorkDate: z.date().optional(),
        salary: z.number({ required_error: "El campo es requerido" }),
        email: z.string().optional(),
        employeeImage: z.string().optional(),
        idStatusActionClass: z.number().optional(),
        functionDescription: z.string().optional(),
        idContractType: z.number().optional(),
        idDisability: z.number().optional(),
        idGroupManager: z.number().optional(),
        sindicate: z.boolean().optional(),
        extraHours: z.boolean().optional(),
        workRelation: z.boolean().optional(),
        idDepartment: z.number({ required_error: "El campo es requerido" }),
        idPosition: z.number({ required_error: "El campo es requerido" }),
        idPerson: z.number().optional(),
        idStatusRelationship: z.number({ required_error: "El campo es requerido" }),
        contactName: z.string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        contactNumber: z.string({ required_error: "El campo es requerido" }).length(12, { message: "El campo es requerido" }),

    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default employeeFormSchemas;