import { z } from "zod";

const LeaseDetailFormSchema = () => {
    const addPaymentEntityFormSchema = z.object({
        idLease: z.number().optional(),
        amount: z.number({
            message: "Debe de seleccionar un monto de cuota",
        }),
        date: z.date({ message: "El campo debe de tener una fecha." }),
        paymentMethod: z
            .boolean({
                message: "Debe de seleccionar un método de pago",
            })
            .optional(),
    });

    return { addPaymentEntityFormSchema };
};

export default LeaseDetailFormSchema;
