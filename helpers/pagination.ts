export const paginationHelper = (objectPagination, query, countRecord)  => {
    if (query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    if (query.limit){
        objectPagination.limitItems = parseInt(query.limit);
    }
    objectPagination.skip = (objectPagination.currentPage-1)*objectPagination.limitItems;
    const totalPages = Math.ceil(countRecord/objectPagination.limitItems);
    objectPagination.totalPages = totalPages;
    return objectPagination;
}