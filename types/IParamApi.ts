export default interface IParamsApi {
    filter: {
        page?: number;
        pageSize?: number;
        allData?: boolean;
        globalFilter?: string;
        filters?:
        {
            column: string,
            value: any
        }[]
        sorts?:
        {
            sortBy: string,
            isAsc: boolean
        }[]

    }
}