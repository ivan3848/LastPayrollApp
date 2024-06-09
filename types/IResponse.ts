export default interface IResponse<T> {
    items: T[];
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    page?: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
    firstRow?: number;
}