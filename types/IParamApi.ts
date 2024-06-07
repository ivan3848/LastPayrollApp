export default interface IParamsApi {
    filter: {
        page?: number;
        pageSize?: number;
        globalFilter?: string;
        sortBy?: {
            sorts?: [
                {
                    sortBy: string,
                    sortDirection: string
                }
            ]
        },
        filters?:
        {
            column: string,
            value: string | number
        }[]

    }
}