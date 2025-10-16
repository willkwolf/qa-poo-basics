export class TestData {

    static readonly URL = 'https://www.saucedemo.com/v1/';

    static readonly USERS = {
        STANDARD_USER: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        LOCKED_OUT_USER: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        },
        PROBLEM_USER: {
            username: 'problem_user',
            password: 'secret_sauce'
        }
    }

    static readonly VALIDATIONS_TEXTS = {
        PRODUCTS_HEADER: 'Products',
        LOGIN_SUYCCES: 'Swag Labs'
    }   

}