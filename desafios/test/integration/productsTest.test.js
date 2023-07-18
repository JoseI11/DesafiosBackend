import chai from 'chai'
import supertest from 'supertest'

//import config from '../../src/config'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Integration Test suite for Products router', function () {
  this.timeout(10000)
  this.productId = ''
  //this.cookie = {}

  before(async function () {
    // const adminUser = {
    //   email: config.admin.ADMIN_EMAIL,
    //   password: config.admin.ADMIN_PASSWORD
    // }

    // const result = await requester.post('/api/v1/users/login').send(adminUser)
    // const cookieResult = result.headers['set-cookie'][0]

    // this.cookie = {
    //   name: cookieResult.split('=')[0],
    //   value: cookieResult.split('=')[1]
    // }
  })

//   it('Endpoint /api/v1/products/mockingproducts (GET) returns an array of 50 fake products', async function () {
//     const { statusCode, ok, _body } = await requester
//       .get('/api/v1/products/mockingproducts')
//       .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

//     expect(statusCode).to.be.ok.and.eq(200)
//     expect(_body.payload.length).to.be.eq(50)
//     expect(ok).to.be.ok
//   })

//   it('/api/products/ (POST) creates new product with valid input', async function () {
//     const productMock = {
//       title: 'Test Product',
//       description: 'This is a Test Product',
//       code: "pr333",
//       price: 10,
//       stock: 5,
//       status:true,
//       owner: 'admin',
//       category: 'GPU',
//       thumbnails: ['image1.jpg', 'image2.jpg']
//     }

//     const { statusCode, ok, _body } = await requester
//       .post('/api/products').send(productMock)
//      // .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
     
//     console.log(_body)
//     this.productId = _body.payload._id.toString()

//     expect(statusCode).to.be.ok.and.eq(201)
//     expect(_body.payload).to.have.property('_id')
//     expect(ok).to.be.ok
//   })

//   it('/api/products/ (GET) returns an array of products', async function () {
//     const { statusCode, ok, _body } = await requester.get('/api/products')

//     expect(statusCode).to.be.ok.and.eq(200)
//     expect(_body.payload).to.have.property('docs')
//     expect(ok).to.be.ok
//   })

//   it('Endpoint /api/products/:pid (GET) returns expected product with valid product ID input', async function () {
//     const { statusCode, ok, _body } = await requester.get(
//       `/api/products/${this.productId}`
//     )

//     expect(statusCode).to.be.ok.and.eq(200)
//     expect(_body.payload._id).to.be.eq(this.productId)
//     expect(ok).to.be.ok
//   })

//   it('Endpoint /api/products/:pid (PUT) updates a product successfully with valid product ID input', async function () {
//     const productUpdate = {
//       category: 'TEST'
//     }

//     const { statusCode, ok, _body } = await requester
//       .put(`/api/products/${this.productId}`)
//    //   .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
//       .send(productUpdate)

//     expect(statusCode).to.be.ok.and.eq(200)
//     expect(_body.payload).to.have.property('modifiedCount').eq(1)
//     expect(ok).to.be.ok
//   })

//   it('Endpoint /api/products/:pid (DELETE) deletes a product successfully with valid product ID input', async function () {
//     const { statusCode, ok, _body } = await requester
//       .delete(`/api/v1/products/${this.productId}`)
//     //  .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

//     expect(statusCode).to.be.ok.and.eq(200)
//     expect(_body.payload).to.have.property('deletedCount').eq(1)
//     expect(ok).to.be.ok
//   })
})