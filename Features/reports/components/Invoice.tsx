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
    const groupedByEmployee: Record<number, IGetPayrollExecution[]> = {};
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
    data: IGetPayrollExecution[];
}

export const Invoice = ({ data }: Props) => {
    const groupedData = groupByEmployee(data);
    return (
        <Document>
            {Object.entries(groupedData).map(([idEmployee, items], index) => (
                < Page key={index} style={styles.body} >
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
                                ]}
                            >
                                Recibo de Nomina
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
                                ]}
                            >
                                Periodo{" "}
                                {items[index] && items[index].payrollPeriodStart ? (
                                    new Date(items[index].payrollPeriodStart!)
                                        .toLocaleDateString("en-GB", {
                                            month: "2-digit",
                                            year: "numeric",
                                        })
                                ) : (
                                    "N/A"
                                )}
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
                                Desde{" "}
                                {items[index] && items[index].payrollPeriodStart ? (
                                    new Date(items[index].payrollPeriodStart!)
                                        .toLocaleDateString("en-GB")
                                ) : (
                                    "N/A"
                                )}{" "}
                                Hasta{" "}
                                {items[index] && items[index].payrollPeriodEnd ? (
                                    new Date(items[index].payrollPeriodEnd!)
                                        .toLocaleDateString("en-GB")
                                ) : (
                                    "N/A"
                                )}
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
                                {items[index] && items[index].payrollPayDate ? (
                                    new Date(items[index].payrollPayDate!)
                                        .toLocaleDateString("en-GB")
                                ) : (
                                    "N/A"
                                )}
                            </Text>
                        </View>
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
                                ]}
                            >
                                Nombre : {items[index] && items[index].employeeName ? (
                                    items[index].employeeName
                                ) : (
                                    "N/A"
                                )}
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
                                Codigo : {idEmployee}
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
                                ]}
                            >
                                Cta : {items[index] && items[index].accountNumber ? (
                                    items[index].accountNumber
                                ) : (
                                    "N/A"
                                )}
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
                                Ing{" "}
                                {items[index] && items[index].payrollPayDate ? (
                                    new Date(items[index].payrollPayDate!)
                                        .toLocaleDateString("en-GB")
                                ) : (
                                    "N/A"
                                )}{items[index] && items[index].departmentName ? (
                                    items[index].departmentName
                                ) : (
                                    "N/A"
                                )}
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
                                CC : {items[index] && items[index].idCostCenter ? (
                                    items[index].idCostCenter
                                ) : (
                                    "N/A"
                                )}
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.withBorderRight,
                                ]}
                            >
                                Descripción
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.colWidthTenP,
                                    styles.textColor,
                                    styles.withBorderRight,
                                ]}
                            >
                                Cant
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.withBorderRight,
                                    styles.colWidthTwentyP,
                                ]}
                            >
                                Ingresos
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                    styles.withBorderRight,
                                    styles.colWidthTwentyP,
                                ]}
                            >
                                Deducciones
                            </Text>
                            <Text
                                style={[
                                    styles.tableColHeader,
                                    styles.textColor,
                                ]}
                            >
                                Bces / Acum
                            </Text>
                        </View>
                        {items.map((item, itemIndex) => (
                            <View key={itemIndex} style={styles.tableRow}>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        styles.withBorderRight,
                                        styles.textAlignLeft,
                                        styles.textColor,
                                    ]}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        styles.withBorderRight,
                                        styles.colWidthTenP,
                                        styles.textAlignRight,
                                        styles.textColor,
                                    ]}
                                >
                                    {item.quantity}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        styles.withBorderRight,
                                        styles.textAlignRight,
                                        styles.textColor,
                                        styles.colWidthTwentyP,
                                    ]}
                                >
                                    {item.conceptDefinition != "false"
                                        ? item.totalAmount?.toLocaleString(
                                            "es-DO",
                                            {
                                                style: "currency",
                                                currency: "DOP",
                                            }
                                        )
                                        : ""}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        styles.withBorderRight,
                                        styles.textAlignRight,
                                        styles.textColor,
                                        styles.colWidthTwentyP,
                                    ]}
                                >
                                    {item.conceptDefinition === "false"
                                        ? item.totalAmount?.toLocaleString(
                                            "es-DO",
                                            {
                                                style: "currency",
                                                currency: "DOP",
                                            }
                                        )
                                        : ""}
                                </Text>
                                <Text
                                    style={[
                                        styles.tableCol,
                                        styles.textAlignRight,
                                        styles.textColor,
                                    ]}
                                >
                                    {item.accrued?.toLocaleString("es-DO", {
                                        style: "currency",
                                        currency: "DOP",
                                    })}
                                </Text>
                            </View>
                        ))}

                        <View style={[styles.tableRow, styles.addTopline]}>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.colWidthTwentyP,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                INGRESOS
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.colWidthTwentyP,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                {items[index] && items[index].totalProfit ? items[index].totalProfit?.toLocaleString(
                                    "es-DO",
                                    {
                                        style: "currency",
                                        currency: "DOP",
                                    }
                                ) : (
                                    "N/A"
                                )}

                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                DEDUCCIONES
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.colWidthTwentyP,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                {items[index] && items[index].totalDeduction ? items[index].totalDeduction?.toLocaleString(
                                    "es-DO",
                                    {
                                        style: "currency",
                                        currency: "DOP",
                                    }
                                ) : (
                                    "N/A"
                                )}
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.removeRightLine,
                                ]}
                            >
                                PAGO NETO
                            </Text>
                            <Text
                                style={[
                                    styles.tableCol,
                                    styles.textColor,
                                    styles.removeLeftLine,
                                    styles.colWidthTwentyP,
                                ]}
                            >
                                {items[index] && items[index].totalPay ? items[index].totalPay?.toLocaleString(
                                    "es-DO",
                                    {
                                        style: "currency",
                                        currency: "DOP",
                                    }
                                ) : (
                                    "N/A"
                                )}
                            </Text>
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
            ))
            }
        </Document >
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
