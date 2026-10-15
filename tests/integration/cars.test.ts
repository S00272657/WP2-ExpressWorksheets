import request from "supertest";
import { app } from "../../src/app";


describe('GET /cars', () => {

    it('returns all cars', async () => {

        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);

    });

    it('creates a new car', async () => {

        const response = await request(app)
            .post('/api/v1/cars')
            .send({
                make: 'CreateTestCar',
                model: 'CreateTestCar',
                year: 2022,
            });

        expect(response.status).toBe(201);
        expect(response.body.make).toBe('CreateTestCar');
        expect(response.body.model).toBe('CreateTestCar');
        expect(response.body.year).toBe(2022);
    });

    it('gets a car by id', async () => {

        const createdCar = await request(app)
            .post('/api/v1/cars')
            .send({
                make: 'ByIdTestCar',
                model: 'ByIdTestCar',
                year: 2021,
            });

        const response = await request(app)
            .get(`/api/v1/cars/${createdCar.body._id}`);

        expect(response.status).toBe(200);
        expect(response.body.make).toBe('ByIdTestCar');
        expect(response.body.model).toBe('ByIdTestCar');
        expect(response.body.year).toBe(2021);

    });

    it('deletes a car by id', async () => {
        const createdCar = await request(app)
            .post('/api/v1/cars')
            .send({
                make: 'DeleteTestCar',
                model: 'DeleteTestCar',
                year: 2019,
            });

        const response = await request(app)
            .delete(`/api/v1/cars/${createdCar.body._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Car deleted.');

        const getResponse = await request(app)
            .get(`/api/v1/cars/${createdCar.body._id}`);

        expect(getResponse.status).toBe(404);
    });

    it('updates a car by id', async () => {
        const createdCar = await request(app)
            .post('/api/v1/cars')
            .send({
                make: 'UpdateBefore',
                model: 'UpdateBefore',
                year: 2018,
            });

        const response = await request(app)
            .put(`/api/v1/cars/${createdCar.body._id}`)
            .send({
                make: 'UpdateAfter',
                model: 'UpdateAfter',
                year: 2024,
            });

        expect(response.status).toBe(200);
        expect(response.body.make).toBe('UpdateAfter');
        expect(response.body.model).toBe('UpdateAfter');
        expect(response.body.year).toBe(2024);
    });
});
