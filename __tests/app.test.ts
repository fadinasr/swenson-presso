import request from 'supertest';
import app from '../src/app';
import * as dbHandler from './dbHandler';
import Machine from '../src/models/CoffeeMachine';
import machines from './data/machines.json';
import pods from './data/pods.json';
import Pod from '../src/models/CoffeePods';

describe('App Test', () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(() => dbHandler.connect());

  /**
   * Remove and close the db and server.
   */
  afterAll(() => dbHandler.closeDatabase());

  /**
   * Product test suite.
   */
  describe('Add data', () => {
    test('Machines can be created correctly', async () => {
      expect(() => Machine.create(machines))
        .not
        .toThrow();
    });
    test('Machines can be created correctly', async () => {
      expect(() => Pod.create(pods))
        .not
        .toThrow();
    });
  });

  test('GET /random-url - should return 404', done => {
    request(app).get('/reset')
      .expect(404, done);
  });

  // Coffee Machines Tests

  test('GET /coffee-machines - should return 200', done => {
    request(app).get('/api/coffee-machines').expect(200, done);
  });

  test('GET /coffee-machines - should return 404 because of an unknown url', done => {
    request(app).get('/coffee-machines').expect(404, done);
  });

  test('GET /coffee-machines with one filter - should return 200', async done => {
    const response = await request(app).get('/api/coffee-machines').query({ product_type: 'COFFEE_MACHINE_LARGE' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeeMachines.length).toEqual(3);
    expect(response.body.coffeeMachines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product_type: 'COFFEE_MACHINE_LARGE'
        })
      ])
    );
    return done();
  });

  test('GET /coffee-machines with multiple filters - should return 200', async done => {
    const response = await request(app)
      .get('/api/coffee-machines')
      .query({ product_type: 'COFFEE_MACHINE_LARGE', water_line_compatible: false });
    expect(response.status).toEqual(200);
    expect(response.body.coffeeMachines.length).toEqual(1);
    expect(response.body.coffeeMachines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product_type: 'COFFEE_MACHINE_LARGE',
          water_line_compatible: false
        })
      ])
    );
    return done();
  });

  test('GET /coffee-machines with no filters - should return 200', async done => {
    const response = await request(app).get('/api/coffee-machines');
    expect(response.status).toEqual(200);
    expect(response.body.coffeeMachines.length).toEqual(9);
    return done();
  });

  test('GET /coffee-machines, large - should return 200 and contain three values', async done => {
    const response = await request(app)
      .get('/api/coffee-machines')
      .query({ product_type: 'COFFEE_MACHINE_LARGE' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeeMachines.length).toEqual(3);
    expect(response.body.coffeeMachines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ refID: 'CM101' }),
        expect.objectContaining({ refID: 'CM102' }),
        expect.objectContaining({ refID: 'CM103' }),
        expect.not.objectContaining({ refID: 'CM001' })
      ])
    );
    return done();
  });

  test('GET /coffee-machines, Espresso - should return 200 and contain three values', async done => {
    const response = await request(app)
      .get('/api/coffee-machines')
      .query({ product_type: 'ESPRESSO_MACHINE' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeeMachines.length).toEqual(3);
    expect(response.body.coffeeMachines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ refID: 'EM001' }),
        expect.objectContaining({ refID: 'EM002' }),
        expect.objectContaining({ refID: 'EM003' }),
        expect.not.objectContaining({ refID: 'CM001' })
      ])
    );
    return done();
  });

  // Coffee Pods Tests

  test('GET /coffee-pods - should return 200', done => {
    request(app).get('/api/coffee-pods').expect(200, done);
  });

  test('GET /coffee-pods - should return 404 because of an unknown url', done => {
    request(app).get('/coffee-pods').expect(404, done);
  });

  test('GET /coffee-pods with one filter - should return 200', async done => {
    const response = await request(app).get('/api/coffee-pods').query({ product_type: 'COFFEE_POD_SMALL' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeePods.length).toEqual(10);
    expect(response.body.coffeePods).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product_type: 'COFFEE_POD_SMALL'
        })
      ])
    );
    return done();
  });

  test('GET /coffee-pods with multiple filters - should return 200', async done => {
    const response = await request(app)
      .get('/api/coffee-pods')
      .query({ product_type: 'COFFEE_POD_LARGE', coffee_flavor: 'COFFEE_FLAVOR_VANILLA' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeePods.length).toEqual(2);
    expect(response.body.coffeePods).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product_type: 'COFFEE_POD_LARGE',
          coffee_flavor: 'COFFEE_FLAVOR_VANILLA'
        })
      ])
    );
    return done();
  });

  test('GET /coffee-pods with no filters - should return 200', async done => {
    const response = await request(app).get('/api/coffee-pods');
    expect(response.status).toEqual(200);
    expect(response.body.coffeePods.length).toEqual(26);
    return done();
  });

  test('GET /coffee-pods, Large - should return 200 and contain ten values', async done => {
    const response = await request(app)
      .get('/api/coffee-pods')
      .query({ product_type: 'COFFEE_POD_LARGE' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeePods.length).toEqual(10);
    expect(response.body.coffeePods).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ refID: 'CP101' }),
        expect.objectContaining({ refID: 'CP103' }),
        expect.objectContaining({ refID: 'CP111' }),
        expect.objectContaining({ refID: 'CP113' }),
        expect.objectContaining({ refID: 'CP121' }),
        expect.objectContaining({ refID: 'CP123' }),
        expect.objectContaining({ refID: 'CP131' }),
        expect.objectContaining({ refID: 'CP133' }),
        expect.objectContaining({ refID: 'CP141' }),
        expect.objectContaining({ refID: 'CP143' }),
        expect.not.objectContaining({ refID: 'EP003' })
      ])
    );
    return done();
  });

  test('GET /coffee-pods, Espresso Vanilla - should return 200 and contain three values', async done => {
    const response = await request(app)
      .get('/api/coffee-pods')
      .query({ product_type: 'ESPRESSO_POD', coffee_flavor: 'COFFEE_FLAVOR_VANILLA' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeePods.length).toEqual(3);
    expect(response.body.coffeePods).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ refID: 'EP003' }),
        expect.objectContaining({ refID: 'EP005' }),
        expect.objectContaining({ refID: 'EP007' }),
        expect.not.objectContaining({ refID: 'CP113' })
      ])
    );
    return done();
  });

  test('GET /coffee-pods, Small - should return 200 and contain ten values', async done => {
    const response = await request(app)
      .get('/api/coffee-pods')
      .query({ product_type: 'COFFEE_POD_SMALL' });
    expect(response.status).toEqual(200);
    expect(response.body.coffeePods.length).toEqual(10);
    expect(response.body.coffeePods).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ refID: 'CP001' }),
        expect.objectContaining({ refID: 'CP003' }),
        expect.objectContaining({ refID: 'CP011' }),
        expect.objectContaining({ refID: 'CP013' }),
        expect.objectContaining({ refID: 'CP021' }),
        expect.objectContaining({ refID: 'CP023' }),
        expect.objectContaining({ refID: 'CP031' }),
        expect.objectContaining({ refID: 'CP033' }),
        expect.objectContaining({ refID: 'CP041' }),
        expect.objectContaining({ refID: 'CP043' }),
        expect.not.objectContaining({ refID: 'CP113' })
      ])
    );
    return done();
  });

  test('GET /coffee-pods, 7 dozen Packs - should return 200 and contain two values', async done => {
    const response = await request(app)
      .get('/api/coffee-pods')
      .query({ pack_size: 84 });
    expect(response.status).toEqual(200);
    expect(response.body.coffeePods.length).toEqual(2);
    expect(response.body.coffeePods).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ refID: 'EP007' }),
        expect.objectContaining({ refID: 'EP017' }),
        expect.not.objectContaining({ refID: 'CP113' })
      ])
    );
    return done();
  });
});
