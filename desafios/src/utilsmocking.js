import { faker } from "@faker-js/faker/locale/es";
global.counter = 0


// export const generateProducts = () => {
//   let numOfProducts = faker.number.int({ min: 0, max: 15 });

//   let products = [];

//   for (let i = 0; i < numOfProducts; i++) {
//     products.push(generateProduct());
//   }

//   return {
//     id: faker.database.mongodbObjectId(),
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     email: faker.internet.email(),
//     phone: faker.phone.number(),
//     job: faker.person.jobTitle(),
//     sex: faker.person.sex(),
//     image: faker.internet.avatar(),
//     birthDate: faker.date.birthdate(),
//     premium: faker.datatype.boolean(),
//     // role,
//     // products,
//   };
// };

export const generateProduct = () => {

    return {
    id: faker.database.mongodbObjectId(),
    code: faker.string.alphanumeric(8),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({min:1,max:300,precision:0.01}),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),
    thumbnails: [faker.image.url()]
  };
};