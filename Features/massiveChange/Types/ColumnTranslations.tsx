const columnTranslations: { [key: string]: string } = {
    Name: "Nombre",
    Age: "Edad",
    Address: "Dirección",
    Phone: "Teléfono",
    Email: "Correo",
    IdEmployee: "Empleado",
    Salary: "Salario",
    DateChange: "Fecha de cambio",
    Reason: "Razón",
    ChargeDate: "Fecha de cargo",
    Amount: "Cantidad",
    IdPayrollPay: "Código de nómina",
    Date: "Fecha",
    IdConcept: "Código Concepto",
    ConceptCode: "Codigo Concepto Normal",
    DateExecuted: "Fecha de carga",
};
const getTableColumnName = (columnName: string): string => {
    return columnTranslations[columnName] || columnName;
};
export { getTableColumnName };
