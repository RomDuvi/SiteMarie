import { IBaseModel } from './IBaseModel';

export interface ICommand extends IBaseModel {
    picture: any,
    buyerEmail: string,
    buyerLastName: string,
    buyerFirstName: string,
    buyerAddress: string,
    price: number
}