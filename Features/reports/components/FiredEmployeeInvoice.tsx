import {
    Document,
    Font,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import { IGetFiredEmployee } from "@/Features/employee/Components/FiredEmployee/Types/IGetFiredEmployee";

const groupByEmployee = (
    data: IGetFiredEmployee[]
): Record<number, IGetFiredEmployee[]> => {
    const groupedByEmployee: Record<number, IGetFiredEmployee[]> = {};
    const uniqueItems: Record<number, Set<string>> = {};

    data.forEach((item) => {
        const idEmployee = item.idEmployee!;
        const itemIdentifier = JSON.stringify(item);

        if (!groupedByEmployee[idEmployee]) {
            groupedByEmployee[idEmployee] = [];
            uniqueItems[idEmployee] = new Set();
        }

        if (!uniqueItems[idEmployee].has(itemIdentifier)) {
            groupedByEmployee[idEmployee].push(item);
            uniqueItems[idEmployee].add(itemIdentifier);
        }
    });

    return groupedByEmployee;
};

interface Props {
    data: IGetFiredEmployee[];
}

export const FiredEmployeeInvoice = ({ data }: Props) => {
    const groupedData = groupByEmployee(data);
    return (
        <Document>
            {Object.entries(groupedData).map(([idEmployee, items], index) => (
                <Page key={index} style={styles.body}>
                    <View style={[styles.table]}>
                        <View
                            style={[
                                styles.marginTop,
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.textAlignLeft,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                    { paddingLeft: 20 },
                                ]}
                            >
                                Fecha/Hora
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Comprobante
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                    { paddingRight: 20 },
                                ]}
                            >
                                Fecha de pago
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                styles.lastTableCol,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                    { paddingLeft: 20 },
                                ]}
                            >
                                {new Date(items[index].firedDate!)
                                    .toLocaleDateString("en-GB")
                                    .replace(" ", "/")}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Terminación Laboral
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                    { paddingRight: 20 },
                                ]}
                            >
                                {new Date(
                                    items[index].firedDate!
                                ).toLocaleDateString("en-GB")}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.marginTop,
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginLeft: 14,
                                    marginBottom: 0,
                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.textAlignLeft,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Nombre : {items[index].employeeName}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            ></Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Cédula : {items[index].identification}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginLeft: 14,

                                    marginBottom: 0,
                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Sucursal : {items[index].costCenter}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeRightLine,
                                    { flexWrap: "wrap" },
                                ]}
                            ></Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Código : {items[index].idEmployee}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginBottom: 0,
                                    marginLeft: 14,

                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Departamento : {items[index].departmentName}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeRightLine,
                                    { flexWrap: "wrap" },
                                ]}
                            >
                                {"                                          "}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Centro de costo : {items[index].costCenter}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginBottom: 0,
                                    marginLeft: 14,

                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Posición : {items[index].position}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeRightLine,
                                    { flexWrap: "wrap" },
                                ]}
                            >
                                {"                                          "}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Salario Mens : {items[index].employeeSalary}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginBottom: 0,
                                    marginLeft: 14,

                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Fecha Ingreso :{" "}
                                {new Date(
                                    items[index].employeeStartDate
                                ).toLocaleDateString("en-GB")}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeRightLine,
                                    { flexWrap: "wrap" },
                                ]}
                            >
                                {"                                          "}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Salario diario : {items[index].dailySalary}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginLeft: 14,
                                    marginBottom: 0,
                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Fecha Salida :{" "}
                                {new Date(
                                    items[index].firedDate
                                ).toLocaleDateString("en-GB")}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeRightLine,
                                    { flexWrap: "wrap" },
                                ]}
                            >
                                {"                                          "}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Comis./Ot Ing : {"0.00"}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginLeft: 14,
                                    marginBottom: 0,
                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Motivo Salia : {items[index].description}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeRightLine,
                                    { flexWrap: "wrap" },
                                ]}
                            >
                                {"                                          "}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.textAlignRight,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                C./O Ing Diario : {"0.00"}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.textColor,
                                styles.withOurBorderRight,
                                {
                                    marginLeft: 14,
                                    marginBottom: 0,
                                    marginRight: 58,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.marginBottomPositive,
                                    styles.textAlignLeft,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Tiempo Serv : {items[index].timeWork}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.marginTopMinus,
                                    styles.textColor,
                                    styles.removeRightLine,

                                    { flexWrap: "wrap" },
                                ]}
                            >
                                {"                                          "}
                            </Text>
                        </View>

                        <View style={[styles.tableRow, styles.addTopline]}>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        paddingRight: 40,
                                        height: 10,
                                    },
                                ]}
                            >
                                INGRESOS
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        width: "33.33%",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        borderLeftWidth: 0,
                                        borderTopWidth: 0,
                                        fontSize: 8,
                                        marginRight: 95,
                                        borderRightWidth: 0,
                                        marginBottom: 4,
                                        height: 10,
                                    },
                                ]}
                            >
                                Cantidad
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        marginRight: 20,
                                    },
                                ]}
                            >
                                Importe
                            </Text>
                        </View>
                        {items.map((item, itemIndex) => (
                            <View key={itemIndex} style={styles.tableRow}>
                                <Text
                                    style={[
                                        {
                                            width: "33.33%",
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderLeftWidth: 0,
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                            textAlign: "left",
                                            fontSize: 8,
                                            fontWeight: "bold",
                                            borderRightWidth: 0,
                                            paddingLeft: 20,
                                        },
                                        styles.textColor,
                                    ]}
                                >
                                    {item.isProfit !== false
                                        ? " — " + item.conceptName
                                        : ""}
                                </Text>
                                <Text
                                    style={[
                                        {
                                            width: "33.33%",
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderLeftWidth: 0,
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                            textAlign: "left",
                                            fontSize: 8,
                                            fontWeight: "bold",
                                            borderRightWidth: 0,
                                            paddingLeft: 15,
                                        },
                                        styles.textColor,
                                    ]}
                                >
                                    {item.isProfit !== false
                                        ? (() => {
                                              switch (item.conceptName) {
                                                  case "Vacaciones":
                                                      return item.vacationDay;
                                                  case "PREAVISO":
                                                      return item.noticeDay;
                                                  case "CESANTIA":
                                                      return item.unemploymentDay;
                                                  case "Navidad":
                                                      return item.royaltiesDay;
                                                  default:
                                                      return "";
                                              }
                                          })()
                                        : ""}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        styles.textColor,
                                        {
                                            marginRight: 4,
                                        },
                                    ]}
                                >
                                    {item.isProfit !== false
                                        ? (() => {
                                              const amount = items
                                                  .filter(
                                                      (x) =>
                                                          x.conceptName ===
                                                          item.conceptName
                                                  )
                                                  .reduce(
                                                      (total, x) =>
                                                          total + x.amount,
                                                      0
                                                  );
                                              return amount;
                                          })()
                                        : ""}
                                </Text>
                            </View>
                        ))}
                        <View
                            style={[styles.tableRow, styles.removeBottonLine]}
                        >
                            <Text
                                style={[
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        fontSize: 8,
                                        textAlign: "right",
                                        paddingLeft: 335,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                    },
                                ]}
                            >
                                Total de Ingresos :{items[index].totalProfit}
                            </Text>
                        </View>

                        <View style={[styles.tableRow, styles.addTopline]}>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        paddingRight: 40,
                                        height: 10,
                                    },
                                ]}
                            >
                                DEDUCCIONES
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        width: "33.33%",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        borderLeftWidth: 0,
                                        borderTopWidth: 0,
                                        fontSize: 8,
                                        marginRight: 95,
                                        borderRightWidth: 0,
                                        marginBottom: 4,
                                        height: 10,
                                    },
                                ]}
                            >
                                Cantidad
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        marginRight: 20,
                                    },
                                ]}
                            >
                                Importe
                            </Text>
                        </View>
                        {items.map((item, itemIndex) => (
                            <View key={itemIndex} style={styles.tableRow}>
                                <Text
                                    style={[
                                        {
                                            width: "33.33%",
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderLeftWidth: 0,
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                            textAlign: "left",
                                            fontSize: 8,
                                            fontWeight: "bold",
                                            borderRightWidth: 0,
                                            paddingLeft: 20,
                                        },
                                        styles.textColor,
                                    ]}
                                >
                                    {item.isProfit === false
                                        ? " — " + item.conceptName
                                        : ""}
                                </Text>
                                <Text
                                    style={[
                                        {
                                            width: "33.33%",
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            borderLeftWidth: 0,
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                            textAlign: "left",
                                            fontSize: 8,
                                            fontWeight: "bold",
                                            borderRightWidth: 0,
                                            paddingLeft: 15,
                                        },
                                        styles.textColor,
                                    ]}
                                >
                                    {item.isProfit === false
                                        ? (() => {
                                              switch (item.conceptName) {
                                                  case "Vacaciones":
                                                      return item.vacationDay;
                                                  case "PREAVISO":
                                                      return item.noticeDay;
                                                  case "CESANTIA":
                                                      return item.unemploymentDay;
                                                  case "Navidad":
                                                      return item.royaltiesDay;
                                                  default:
                                                      return "";
                                              }
                                          })()
                                        : ""}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        styles.textColor,
                                        {
                                            marginRight: 4,
                                        },
                                    ]}
                                >
                                    {item.isProfit === false
                                        ? (() => {
                                              const amount = items
                                                  .filter(
                                                      (x) =>
                                                          x.conceptName ===
                                                          item.conceptName
                                                  )
                                                  .reduce(
                                                      (total, x) =>
                                                          total + x.amount,
                                                      0
                                                  );
                                              return amount;
                                          })()
                                        : ""}
                                </Text>
                            </View>
                        ))}
                        <View
                            style={[styles.tableRow, styles.removeBottonLine]}
                        >
                            <Text
                                style={[
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        fontSize: 8,
                                        textAlign: "right",
                                        paddingLeft: 335,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                    },
                                ]}
                            >
                                Total Deducciones :{items[index].missLease}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableRow,
                                styles.removeBottonLine,
                                styles.addTopline,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.textColor,
                                    styles.removeBottonLine,
                                    {
                                        fontSize: 8,
                                        textAlign: "right",
                                        paddingLeft: 335,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                    },
                                ]}
                            >
                                Total Neto a Pagar :
                                {items[index].totalProfit -
                                    items[index].missLease}
                            </Text>
                        </View>
                        <View style={styles.addTopline}>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.colWidthTwentyP,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            ></Text>
                        </View>
                        <View style={[styles.tableRow, styles.removeTopLine]}>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.colWidthTwentyP,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            ></Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.addTopline,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Fecha y firma Rec. Humanos
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.colWidthTwentyP,
                                ]}
                            ></Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.colWidthTwentyP,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            ></Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.addTopline,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                Fecha y firma Finanzas
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.colWidthTwentyP,
                                ]}
                            ></Text>
                        </View>
                    </View>
                    <Text
                        style={[
                            styles.tableRow,
                            styles.pageNumber,
                            styles.textColor,
                        ]}
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                        fixed
                    />
                </Page>
            ))}
        </Document>
    );
};

Font.register({
    family: "Arial",
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/arial/v11/arial.ttf",
        },
    ],
});

const styles = StyleSheet.create({
    body: {
        padding: 35,
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
    },
    table: {
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderBottomWidth: 1,
        margin: 5,
        backgroundColor: "#E9F0F6",
    },
    tableRow: {
        flexDirection: "row",
    },
    addTopline: {
        borderTopWidth: 1,
    },
    marginBottom: {
        marginBottom: 0,
    },
    withBorderRight: {
        borderRightWidth: 1,
    },
    withOurBorderRight: {
        borderRightWidth: 0,
    },
    tableColHeader: {
        width: "33.33%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: "center",
        padding: 5,
        fontSize: 8,
        borderRightWidth: 0,
        marginBottom: 4,
    },
    tableCol: {
        width: "33.33%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        textAlign: "center",
        padding: 5,
        fontSize: 8,
        borderRightWidth: 0,
        marginBottom: 4,
    },
    colWidthTenP: {
        width: "10%",
    },
    colWidthTwentyP: {
        width: "15%",
    },
    marginTopMinus: {
        marginTop: -8,
    },
    marginTop: {
        marginTop: 6,
        borderRightWidth: 1,
    },
    marginBottomPositive: {
        marginBottom: 6,
    },
    textAlignRight: {
        textAlign: "right",
    },
    textAlignLeft: {
        textAlign: "left",
    },
    textAlignCenter: {
        textAlign: "center",
    },
    lastTableCol: {
        borderBottomWidth: 1,
    },
    removeLeftLine: {
        borderLeftWidth: 0,
    },
    removeRightLine: {
        borderRightWidth: 0,
    },
    removeBottonLine: {
        borderBottomWidth: 0,
    },
    removeTopLine: {
        borderTopWidth: 0,
    },
    paddingZero: {
        padding: 0,
    },
    paddingFive: {
        padding: 5,
    },
    makeBold: {
        fontWeight: "bold",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
    },
    textColor: {
        color: "#006BD7",
    },
    marginRigth: {
        marginLeft: 5,
    },
    paddingLeftSixty: {
        paddingLeft: 60,
    },
    paddingTop: {
        paddingTop: 10,
    },
});
