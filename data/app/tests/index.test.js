/*
Code Analysis

Objective:
The objective of the 'index' function is to retrieve all the jobs from the database and return them as a JSON response with a status code of 200. 

Inputs:
- req: the request object containing information about the HTTP request
- res: the response object used to send the HTTP response

Flow:
1. The function calls the 'find' method on the 'Jobs' model to retrieve all the jobs from the database.
2. The second argument of the 'find' method is an object that specifies which fields to include or exclude from the result. In this case, the '_id' field is excluded.
3. The 'exec' method is called to execute the query and return a promise.
4. The 'await' keyword is used to wait for the promise to resolve and assign the result to the 'jobs' variable.
5. The function returns a JSON response with the 'jobs' variable as the data and a status code of 200.

Outputs:
- JSON response containing all the jobs from the database
- Status code of 200

Additional aspects:
- The function is asynchronous and uses the 'await' keyword to wait for the promise to resolve.
- If an error occurs during the execution of the function, it is caught and logged to the console.
*/

// const jest = require("jest");
const { Jobs } = require("../model/Jobs");
const { index } = require("../controller/app-controller");

describe('index_function', () => {

    // Tests that the function successfully finds and returns jobs as JSON with status 200. 
    it("test_jobs_found_successfully", async () => {
        const mockJobs = [{title: "Job 1"}, {title: "Job 2"}];
        const mockFind = jest.spyOn(Jobs, "find").mockReturnValueOnce(mockJobs);
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnValueOnce({json: mockJson});

        const req = {};
        const res = {json: mockJson, status: mockStatus};

        await index(req, res);

        expect(mockFind).toHaveBeenCalledWith({}, {_id: 0});
        expect(mockJson).toHaveBeenCalledWith(mockJobs);
        expect(mockStatus).toHaveBeenCalledWith(200);
    });

    // Tests that the function logs an error message when an error occurs during execution. 
    it("test_error_handling", async () => {
        const mockError = new Error("Error message");
        const mockFind = jest.spyOn(Jobs, "find").mockRejectedValueOnce(mockError);
        const mockConsoleError = jest.spyOn(console, "error").mockImplementationOnce(() => {});

        const req = {};
        const res = {json: jest.fn(), status: jest.fn()};

        await index(req, res);

        expect(mockFind).toHaveBeenCalledWith({}, {_id: 0});
        expect(mockConsoleError).toHaveBeenCalledWith("Erreur lors de la récupération.\n" + mockError);
    });

    // Tests that the function returns an empty array with status 200 when no jobs are found. 
    it("test_jobs_not_found", async () => {
        const mockJobs = [];
        const mockFind = jest.spyOn(Jobs, "find").mockReturnValueOnce(mockJobs);
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnValueOnce({json: mockJson});

        const req = {};
        const res = {json: mockJson, status: mockStatus};

        await index(req, res);

        expect(mockFind).toHaveBeenCalledWith({}, {_id: 0});
        expect(mockJson).toHaveBeenCalledWith(mockJobs);
        expect(mockStatus).toHaveBeenCalledWith(200);
    });

    // Tests that the function handles empty responses correctly.  
    it("test_empty_response_handling", async () => {
        const mockFind = jest.spyOn(Jobs, "find").mockResolvedValue([]);
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnThis();
        const res = { json: mockJson, status: mockStatus };
        await index(null, res);
        expect(mockFind).toHaveBeenCalled();
        expect(mockJson).toHaveBeenCalledWith([]);
        expect(mockStatus).toHaveBeenCalledWith(200);
    });

    // Tests that the function returns a JSON response.  
    it("test_json_response", async () => {
        const mockFind = jest.spyOn(Jobs, "find").mockResolvedValue([{ title: "Job 1" }]);
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnThis();
        const res = { json: mockJson, status: mockStatus };
        await index(null, res);
        expect(mockFind).toHaveBeenCalled();
        expect(mockJson).toHaveBeenCalledWith([{ title: "Job 1" }]);
    });

    // Tests that the function sets the status code of the response to 200.  
    it("test_status_code", async () => {
        const mockFind = jest.spyOn(Jobs, "find").mockResolvedValue([{ title: "Job 1" }]);
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnThis();
        const res = { json: mockJson, status: mockStatus };
        await index(null, res);
        expect(mockFind).toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(200);
    });
});
