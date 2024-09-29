import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import ReactPDF, {
    Page,
    Text,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import React from "react";
import { IEmployeeForReport } from "./Types/IEmployeeForReport";
import IResponse from "@/types/IResponse";
interface Props {
    data: IResponse<IEmployeeForReport>;
}
export const Quixote = ({ data }: Props) => (
    <Document>
        {data.items.map((item, index) => (
            <Page key={index} style={styles.text}>
                <Text style={styles.text}>{item.idEmployee}</Text>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        ))}

        {/* <Text style={styles.title}>Don Quijote de la Mancha</Text>
            <Text style={styles.author}>Miguel de Cervantes</Text>
            <Text style={styles.subtitle}>
                Capítulo I: Que trata de la condición y ejercicio del famoso
                hidalgo D. Quijote de la Mancha
            </Text> */}
    </Document>
);

Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Oswald",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: "Oswald",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});
