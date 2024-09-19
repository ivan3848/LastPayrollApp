import React, { useState } from "react";
import { PickList } from "primereact/picklist";
import { Card } from "primereact/card";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

interface PickUpListProps<T> {
    source: T[];
    target: T[] | T[];
    onChange: (e: { source: T[]; target: T[] }) => void;
    itemTemplate: (item: T, onToggle: (item: T) => void) => React.ReactNode;
    isLoading?: boolean;
    error?: string;
    dataKey?: string;
    sourceHeader?: string;
    targetHeader?: string;
    filterBy?: string;
    pageSize?: number;
}

export default function PickUpList<T extends { canWrite: boolean }>({
    source,
    target,
    onChange,
    itemTemplate,
    isLoading = false,
    error,
    dataKey,
    sourceHeader = "Disponible",
    targetHeader = "Seleccionado",
    filterBy = "name",
    pageSize = 10,
}: PickUpListProps<T>) {
    const [sourcePage, setSourcePage] = useState(0);
    const [targetPage, setTargetPage] = useState(0);

    const getPaginatedData = (list: T[], page: number) =>
        list.slice(page * pageSize);

    const sourceSlice = getPaginatedData(source, sourcePage);
    const targetSlice = getPaginatedData(target, targetPage);

    const handleListChange = (event: { source: T[]; target: T[] }) => {
        onChange({
            source: event.source,
            target: event.target,
        });
    };

    const onSourcePageChange = (e: PaginatorPageChangeEvent) => {
        setSourcePage(e.page);
    };

    const onTargetPageChange = (e: PaginatorPageChangeEvent) => {
        setTargetPage(e.page);
    };

    const handleToggleCanWrite = (item: T) => {
        const updatedSource = source.map((sourceItem) =>
            sourceItem === item
                ? { ...sourceItem, canWrite: !sourceItem.canWrite }
                : sourceItem
        );

        const updatedTarget = target.map((targetItem) =>
            targetItem === item
                ? { ...targetItem, canWrite: !targetItem.canWrite }
                : targetItem
        );

        onChange({ source: updatedSource, target: updatedTarget });
    };

    return (
        <Card>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!isLoading && !error && (
                <>
                    <PickList
                        source={sourceSlice}
                        target={targetSlice}
                        onChange={handleListChange}
                        dataKey={dataKey}
                        itemTemplate={(item) =>
                            itemTemplate(item, handleToggleCanWrite)
                        }
                        filter
                        filterBy={filterBy}
                        sourceHeader={sourceHeader}
                        targetHeader={targetHeader}
                        sourceStyle={{ height: "24rem" }}
                        targetStyle={{ height: "24rem" }}
                        sourceFilterPlaceholder="Buscar..."
                        targetFilterPlaceholder="Buscar..."
                    />

                    <Paginator
                        first={sourcePage * pageSize}
                        rows={pageSize}
                        totalRecords={source.length}
                        onPageChange={onSourcePageChange}
                        className="p-mt-3"
                    />
                    <Paginator
                        first={targetPage * pageSize}
                        rows={pageSize}
                        totalRecords={target.length}
                        onPageChange={onTargetPageChange}
                        className="p-mt-3"
                    />
                </>
            )}
        </Card>
    );
}
