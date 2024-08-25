class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;  // MongoDB query method (e.g., Model.find())
        this.queryStr = queryStr; // Query string parameters from URL
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",  // Case-insensitive search
            },
        } : {};

        this.query = this.query.find({...keyword});
        return this; // Allow method chaining -- return with all method properties

    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Fields to remove from the query string
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        // Convert query parameters to MongoDB operators
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;




