import React from "react";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Props {
    items: string[];
}

export default function TableSkeletonTemplate({ items }: Props) {
    const dataTableItems = items.map((item) => ({ value: item }));

    const columns = items.map((item) => {
        return (
            <Column
                key={item}
                field={item}
                header={item}
                style={{ width: "25%" }}
                body={<Skeleton />}
            ></Column>
        );
    });

    return (
        <div className="card">
            <DataTable value={dataTableItems} className="p-datatable-striped">
                {columns}
            </DataTable>
        </div>
    );
}
