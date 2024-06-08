export default interface IParamsApi {
    filter: {
        page?: number;
        pageSize?: number;
        globalFilter?: string;
        filters?:
        {
            column: string,
            value: string | number
        }[]
        sorts?:
        {
            sortBy: string,
            isAsc: boolean
        }[]

    }
}