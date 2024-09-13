import React, { useEffect } from "react";
import { PickList } from "primereact/picklist";
import { Card } from "primereact/card";

interface PickUpListProps<T> {
    source: T[];
    target: T[];
    onChange: (e: {}) => void;
    itemTemplate: (item: T) => React.ReactNode;
    isLoading?: boolean;
    error?: string;
    dataKey: string;
    sourceHeader?: string;
    targetHeader?: string;
    filterBy?: string;
}

export default function PickUpList<T>({
    source,
    target,
    onChange,
    itemTemplate,
    isLoading = false,
    error,
    dataKey,
    sourceHeader = "Available",
    targetHeader = "Selected",
    filterBy = "name",
}: PickUpListProps<T>) {
    useEffect(() => {}, [source, target]);

    return (
        <Card>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!isLoading && !error && (
                <PickList
                    source={source}
                    target={target}
                    onChange={onChange}
                    dataKey={dataKey}
                    itemTemplate={itemTemplate}
                    filter
                    filterBy={filterBy}
                    sourceHeader={sourceHeader}
                    targetHeader={targetHeader}
                    sourceStyle={{ height: "24rem" }}
                    targetStyle={{ height: "24rem" }}
                    sourceFilterPlaceholder="Search..."
                    targetFilterPlaceholder="Search..."
                />
            )}
        </Card>
    );
}
