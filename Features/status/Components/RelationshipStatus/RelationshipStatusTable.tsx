import { TABLE_NAME_RELATIONSHIP } from "@/constants/StatusTableName";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import { useParamFilterByTableName } from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useStatusQuery from "../../Hooks/useStatusQuery";
import { IStatus } from "../../Types/IStatus";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IStatus) => void;
    handleDelete: (entity: IStatus) => void;
}

const RelationshipStatusTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
}: Props) => {
    const {
        setPage,
        setPageSize,
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilterByTableName({
        tableName: TABLE_NAME_RELATIONSHIP,
    });

    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useStatusQuery(params, listOfDependencies);

    const onPage = (event: DataTablePageEvent) => {
        setPage(event.page! + 1);
        setPageSize(event.rows);
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

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Parentescos</h3>

            <AddSingleButton
                handleAdd={handleAdd}
                accessName="INFORMACION_PERSONAL"
            />
        </div>
    );

    return (
        <DataTable
            id="RelationshipStatus-Table"
            dataKey="idStatus"
            value={data?.items}
            lazy
            paginator
            loading={isLoading}
            onSort={onSort}
            removableSort
            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
            sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
            sortMode="single"
            totalRecords={data?.totalCount}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            emptyMessage="No hay registros para mostrar."
            header={header}
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25]}
            rows={data?.pageSize!}
            first={data.firstRow!}
            currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
        >
            <Column
                field="description"
                header="Parentesco"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="description"
                filterPlaceholder="Buscar por parentesco"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IStatus>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        accessName="INFORMACION_PERSONAL"
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default RelationshipStatusTable;
