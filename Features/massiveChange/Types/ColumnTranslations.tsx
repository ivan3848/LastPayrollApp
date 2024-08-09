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
};
const getTableColumnName = (columnName: string): string => {
    return columnTranslations[columnName] || columnName;
};
export { getTableColumnName };
