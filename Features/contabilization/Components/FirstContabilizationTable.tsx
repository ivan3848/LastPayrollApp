import React from 'react'
import { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { TreeNode } from 'primereact/treenode';

interface Props {
    entity: IAllPayrollPay;
}


const FirstContabilizationTable = ({ entity }: Props) => {

    const [nodes, setNodes] = useState<TreeNode[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

    const toggleApplications = () => {
        let _expandedKeys = { ...expandedKeys };

        if (_expandedKeys['0']) delete _expandedKeys['0'];
        else _expandedKeys['0'] = true;

        setExpandedKeys(_expandedKeys);
    };

    useEffect(() => {
        const treeNodes: TreeNode[] = transformToTreeNodes(entity);
        setNodes(treeNodes);
    }, [entity]);

    const transformToTreeNodes = (entity: IAllPayrollPay): TreeNode[] => {
        const treeNodes: TreeNode[] = [];

        if (Array.isArray(entity.payrollPayDetailConcept)) {
            entity.payrollPayDetailConcept.forEach((concept) => {
                const node: TreeNode = {
                    data: {
                        idEmployee: concept.idEmployee,
                        debit: concept.isProfit ? concept.amount : 0,
                        credit: !concept.isProfit ? concept.amount : 0,
                        difference: 0
                    },
                    children: []
                };
                treeNodes.push(node);
            });
        }

        return treeNodes;
    };


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
                <Column field="idEmployee" header="Codigo Empleado" expander></Column>
                <Column field="debit" header="Credito"></Column>
                <Column field="credit" header="Debito"></Column>
                <Column field="difference" header="Diferencia"></Column>
            </TreeTable>
        </div>
    );
}



export default FirstContabilizationTable