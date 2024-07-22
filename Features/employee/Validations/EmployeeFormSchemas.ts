import { z } from "zod";

const employeeFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idEmployee: z.number({ required_error: "El campo es requerido" }),
        idHierarchyPosition: z.number().optional(),
        idEmployeeManager: z.number().optional(),
        idWorkScheduler: z.number({ required_error: "El campo es requerido" }),
        idPayrollArea: z.number({ required_error: "El campo es requerido" }),
        startDate: z.date({ required_error: "El campo es requerido" }),
        endWorkDate: z.date().optional(),
        salary: z.number({ required_error: "El campo es requerido" }),
        email: z.string().email().optional(),
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
    });

    const addEntityFormSchema = z.object({
        idEmployee: z.number({ required_error: "El campo es requerido" }),
        idHierarchyPosition: z.number().optional(),
        idEmployeeManager: z.number().optional(),
        idWorkScheduler: z.number({ required_error: "El campo es requerido" }),
        idPayrollArea: z.number({ required_error: "El campo es requerido" }),
        startDate: z.date({ required_error: "El campo es requerido" }),
        endWorkDate: z.date().optional(),
        salary: z.number({ required_error: "El campo es requerido" }),
        email: z.string().email().optional(),
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
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default employeeFormSchemas;