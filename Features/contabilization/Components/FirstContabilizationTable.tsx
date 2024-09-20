import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { DataTableSortEvent } from 'primereact/datatable';
import React from 'react'
import { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { NodeService } from '@/demo/service/NodeService';
import { TreeNode } from 'primereact/treenode';

interface Props {
    entity: IPayrollPayResume[];
    index?: number;
}

const FirstContabilizationTable = ({ entity, index }: Props) => {

    const [nodes, setNodes] = useState<TreeNode[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

    const {
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
    };

    const onSort = (event: DataTableSortEvent) => {
        switch (event.sortOrder) {
            case 1:
                setSorts([{ sortBy: event.sortField, isAsc: true }]);
                break;
            case -1:
                setSorts([{ sortBy: event.sortField, isAsc: false }]);
                break;
            default:
                clearSorts();
                break;
        }
    };

    const toggleApplications = () => {
        let _expandedKeys = { ...expandedKeys };

        if (_expandedKeys['0']) delete _expandedKeys['0'];
        else _expandedKeys['0'] = true;

        setExpandedKeys(_expandedKeys);
    };

    useEffect(() => {
        NodeService.getFilesystem().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card">
            <Button
                onClick={toggleApplications}
                label="Toggle Applications"
                className="flex justify-start"
                style={{ width: "30%", gap: "5px", marginRight: "auto" }}
            />
            <TreeTable
                value={nodes}
                expandedKeys={expandedKeys}
                onToggle={(e) => setExpandedKeys(e.value)}
                className="mt-4"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
            </TreeTable>
        </div>
    );
}



export default FirstContabilizationTable