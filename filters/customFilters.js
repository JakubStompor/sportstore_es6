angular.module("customFilters", []).filter("unique", () => {
    const isAorS = (d, p) => angular.isArray(d) && angular.isString(p);
    return (data, propertyName) => {
        let unqiueData = data.map((i) => {
            return i[propertyName];
        }).filter((value, index, self) => self.indexOf(value) === index);
        return isAorS(data, propertyName) ? unqiueData : data;
    }
}).filter("range", ($filter) => {
    const isAorN = (d, p, s) => angular.isArray(d) && angular.isNumber(p) && angular.isNumber(s);
    return (data, page, size) => {
        if (isAorN(data, page, size)) {
            let startIndex = (page - 1) * size;
            return data.length < startIndex ? [] : $filter("limitTo")(data.splice(startIndex), size);
        } else {
            return data;
        }
    }
}).filter("pageCount", () => {
    return (data, size) => {
        if (angular.isArray(data)) {
            return data.filter((i, ind) => {
               return ind < Math.ceil(data.length / size);
            });
        } else {
            return data;
        }
    }
})