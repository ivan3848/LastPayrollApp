import { z } from "zod";

const PersonInsuranceFormSchema = () => {
    const editEntityFormSchema = z.object({
        idPersonInsurance: z.number().optional(),
        idEmployee: z.number().optional(),
        idPerson: z.number().optional(),
        idConcept: z.number({ message: "Debe de seleccionar una opción." }),
        idEmployeeAuthorize: z.number().optional(),
        percentDiscount: z.number({ message: "Debe agregar descuento..." }),
        amount: z.number().optional(),
        startDate: z.date({ message: "El campo debe de tener una fecha." }),
        endDate: z.date({ message: "El campo debe de tener una fecha." }),
        person: z.object({}).optional(),
    });

    const addEntityFormSchema = z.object({
        idEmployee: z.number().optional(),
        idPerson: z.number().optional(),
        idConcept: z.number({ message: "Debe de seleccionar una opción." }),
        idEmployeeAuthorize: z.number().optional(),
        percentDiscount: z.number({ message: "Debe agregar descuento..." }),
        amount: z.number().optional(),
        startDate: z.date({ message: "El campo debe de tener una fecha." }),
        endDate: z.date({ message: "El campo debe de tener una fecha." }),
        person: z.object({}).optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default PersonInsuranceFormSchema;
