import { Employee } from "../../MassiveIncrease/Types/IMassiveIncrease";

export interface IMassiveEmployee {
    idMassiveEmployee: number;
    name: string;
    chargeDate: string;
    employees: Employee[]
    isPaid: boolean;
    idPayrollPay?: number;
}

const massiveEmployeechema: Object = {
    idEmployee: 0,
    Name: "",
    firstLastName: "",
    secondLastName: "",
    gender: "",
    birthDay: new Date(),
    nationality: "",
    educationLevel: "",
    ubication: "",
    position: "",
    ocupation: "",
    payrollArea: "",
    documentType: "",
    identification: "",
    startDate: new Date(),
    address: "",
    salary: 0,
    paymentMethod: "",
    bankAccount: "",
    costCenter: "",
    department: "",
    workScheduler: ""
};

export { massiveEmployeechema };