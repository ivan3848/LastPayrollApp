
export interface IMassiveEmployee {
    employeeList: IMassiveEmployeeData[];
    repeatedEmployees?: number[];
    repeatedIdentifications?: string[];
}

export interface IMassiveEmployeeData {
    idEmployee: number;
    name: string;
    lastName: string;
    gender: string;
    birthDay: Date;
    nationality: string;
    educationLevel: string;
    ubication: string;
    ocupation: string;
    position: string;
    department: string;
    payrollArea: string;
    documentType: string;
    identification: string;
    startDate: Date;
    address: string;
    salary: number;
    paymentMethod: string;
    bankAccount: string;
    costCenter: string;
    workScheduler: string;
}


const massiveEmployeechema: Object = {
    idEmployee: 0,
    Name: "",
    lastName: "",
    gender: "",
    birthDay: new Date(),
    nationality: "",
    educationLevel: "",
    ubication: "",
    ocupation: "",
    position: "",
    department: "",
    payrollArea: "",
    identification: "",
    startDate: new Date(),
    address: "",
    salary: 0,
    paymentMethod: "",
    bankAccount: "",
    costCenter: "",
    workScheduler: ""
};

export { massiveEmployeechema };