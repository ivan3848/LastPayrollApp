import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';

const useExpireSessionQuery = (queryKey: string | string[]) => {
    const queryClient = useQueryClient();

    const invalidateQuery = () => {
        queryClient.invalidateQueries(queryKey as InvalidateQueryFilters);
    };

    return invalidateQuery;
};

export default useExpireSessionQuery;