import { IGetPayrollExecution } from "@/Features/payrollPay/types/IGetPayrollExecution";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import React from "react";

const groupByEmployee = (
    data: IGetPayrollExecution[]
): Record<number, IGetPayrollExecution[]> => {
    return data.reduce((acc, item) => {
        const idEmployee = item.idEmployee!;
        if (!acc[idEmployee]) {
            acc[idEmployee] = [];
        }
        acc[idEmployee].push(item);
        return acc;
    }, {} as Record<number, IGetPayrollExecution[]>);
};

const formatDate = (date?: string | null, options?: Intl.DateTimeFormatOptions) => {
    return date ? new Date(date).toLocaleDateString("en-GB", options) : "N/A";
};

interface Props {
    data: IGetPayrollExecution[];
}

export const Invoice = ({ data }: Props) => {
    const groupedData = groupByEmployee(data);

    return (
        <Document>
            {Object.entries(groupedData).map(([idEmployee, items], index) => {
                const firstItem = items[0];
                const {
                    payrollPeriodStart,
                    payrollPeriodEnd,
                    payrollPayDate,
                    employeeName,
                    accountNumber,
                    departmentName,
                    idCostCenter,
                    totalProfit,
                    totalDeduction,
                    totalPay,
                    creditIsrRemain,
                    creditIsrSustracted
                } = firstItem;

                return (
                    <Page key={index} style={styles.body}>
                        <View style={[styles.table]}>
                            <View style={[styles.marginTop, styles.tableRow, styles.textColor, styles.withOurBorderRight]}>
                                <Text style={[styles.tableCol, styles.textColor, styles.textAlignLeft, styles.removeLeftLine, styles.removeRightLine]}>
                                    Recibo de Nomina
                                </Text>
                                <Text style={[styles.tableCol, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    Comprobante
                                </Text>
                                <Text style={[styles.tableCol, styles.textColor, styles.textAlignRight, styles.removeLeftLine, styles.removeRightLine]}>
                                    Fecha de pago
                                </Text>
                            </View>

                            <View style={[styles.tableRow, styles.textColor, styles.withOurBorderRight, styles.lastTableCol]}>
                                <Text style={[styles.tableCol, styles.marginTopMinus, styles.marginBottomPositive, styles.textAlignLeft, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    Periodo {formatDate(payrollPeriodStart, { month: "2-digit", year: "numeric" })}
                                </Text>
                                <Text style={[styles.tableCol, styles.marginTopMinus, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    Desde {formatDate(payrollPeriodStart)} Hasta {formatDate(payrollPeriodEnd)}
                                </Text>
                                <Text style={[styles.tableCol, styles.marginTopMinus, styles.textColor, styles.textAlignRight, styles.removeLeftLine, styles.removeRightLine]}>
                                    {formatDate(payrollPayDate)}
                                </Text>
                            </View>

                            <View style={[styles.marginTop, styles.tableRow, styles.textColor, styles.withOurBorderRight]}>
                                <Text style={[styles.tableCol, styles.textColor, styles.textAlignLeft, styles.removeLeftLine, styles.removeRightLine]}>
                                    Nombre: {employeeName || "N/A"}
                                </Text>
                                <Text style={[styles.tableCol, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}></Text>
                                <Text style={[styles.tableCol, styles.textColor, styles.textAlignRight, styles.removeLeftLine, styles.removeRightLine]}>
                                    Codigo: {idEmployee}
                                </Text>
                            </View>

                            <View style={[styles.tableRow, styles.textColor, styles.withOurBorderRight, styles.lastTableCol]}>
                                <Text style={[styles.tableCol, styles.marginTopMinus, styles.marginBottomPositive, styles.textAlignLeft, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    Cta: {accountNumber || "N/A"}
                                </Text>
                                <Text style={[styles.tableCol, styles.marginTopMinus, styles.textColor, styles.removeRightLine, { flexWrap: "wrap" }]}>
                                    Ing: {formatDate(payrollPayDate)} {departmentName || "N/A"}
                                </Text>
                                <Text style={[styles.tableCol, styles.marginTopMinus, styles.textColor, styles.textAlignRight, styles.removeLeftLine, styles.removeRightLine]}>
                                    CC: {idCostCenter || "N/A"}
                                </Text>
                            </View>
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableCol, styles.addBottomline, styles.withBorderRight, styles.textAlignLeft, styles.textColor]}>
                                    Nombre
                                </Text>
                                <Text style={[styles.tableCol, styles.addBottomline, styles.withBorderRight, styles.colWidthTenP, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                    Cantidad
                                </Text>
                                <Text style={[styles.tableCol, styles.addBottomline, styles.withBorderRight, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                    Ingresos
                                </Text>
                                <Text style={[styles.tableCol, styles.addBottomline, styles.withBorderRight, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                    Deducciones
                                </Text>
                                <Text style={[styles.tableCol, styles.addBottomline, styles.textAlignRight, styles.textColor]}>
                                    Acumulados
                                </Text>
                            </View>
                            {items.map((item, itemIndex) => (
                                <View key={itemIndex} style={styles.tableRow}>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.textAlignLeft, styles.textColor]}>
                                        {item.name}
                                    </Text>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.colWidthTenP, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                        {item.quantity}
                                    </Text>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                        {item.conceptDefinition !== "false" && item.totalAmount?.toLocaleString("es-DO", { style: "currency", currency: "DOP" })}
                                    </Text>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                        {item.conceptDefinition === "false" && item.totalAmount?.toLocaleString("es-DO", { style: "currency", currency: "DOP" })}
                                    </Text>
                                    <Text style={[styles.tableCol, styles.textAlignRight, styles.textColor]}>
                                        {item.accrued?.toLocaleString("es-DO", { style: "currency", currency: "DOP" })}
                                    </Text>
                                </View>
                            ))}
                            {creditIsrSustracted && (<>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.textAlignLeft, styles.textColor]}>
                                        ISR a favor
                                    </Text>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.colWidthTenP, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                    </Text>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                    </Text>
                                    <Text style={[styles.tableCol, styles.withBorderRight, styles.textAlignRight, styles.textColor, styles.colWidthTwentyP]}>
                                        {creditIsrSustracted?.toLocaleString("es-DO", { style: "currency", currency: "DOP" }) || "N/A"}
                                    </Text>
                                    <Text style={[styles.tableCol, styles.textAlignRight, styles.textColor]}>
                                        {creditIsrRemain?.toLocaleString("es-DO", { style: "currency", currency: "DOP" }) || "N/A"}
                                    </Text>
                                </View>
                            </>)}
                            <View style={[styles.tableRow, styles.addTopline]}>
                                <Text style={[styles.tableCol, styles.textColor, styles.colWidthTwentyP, styles.removeLeftLine, styles.removeRightLine]}>
                                    INGRESOS
                                </Text>
                                <Text style={[styles.tableCol, styles.colWidthTwentyP, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    {totalProfit?.toLocaleString("es-DO", { style: "currency", currency: "DOP" }) || "N/A"}
                                </Text>
                                <Text style={[styles.tableCol, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    DEDUCCIONES
                                </Text>
                                <Text style={[styles.tableCol, styles.colWidthTwentyP, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    {totalDeduction?.toLocaleString("es-DO", { style: "currency", currency: "DOP" }) || "N/A"}
                                </Text>
                                <Text style={[styles.tableCol, styles.textColor, styles.removeLeftLine, styles.removeRightLine]}>
                                    PAGO NETO
                                </Text>
                                <Text style={[styles.tableCol, styles.textColor, styles.removeLeftLine, styles.colWidthTwentyP]}>
                                    {totalPay?.toLocaleString("es-DO", { style: "currency", currency: "DOP" }) || "N/A"}
                                </Text>
                            </View>
                        </View>

                        <Text style={[styles.tableRow, styles.pageNumber, styles.textColor]} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
                    </Page>
                );
            })}
        </Document>
    );
};

Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
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
    },
    tableRow: {
        flexDirection: "row",
    },
    addTopline: {
        borderTopWidth: 1,
    },
    addBottomline: {
        borderBottomWidth: 1,
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
    paddingZero: {
        padding: 0,
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
});
