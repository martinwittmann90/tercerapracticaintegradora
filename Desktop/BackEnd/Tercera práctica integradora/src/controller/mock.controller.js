import ServiceMock from "../services/mock.service.js";
const serviceMock = new ServiceMock();

class MockController {
    async getMockingProducts(req, res) {
        try {
            const response = await serviceMock.getAllProductsMock();
            return res.status(response.status).json(response.result, null, 1000);
        } catch (err) {
            console.error("Error getMockingProducts:", err);  
            res.status(500).json("Error getMockingProducts");
        }
    }
}

export const mockController = new MockController();

