export class Command {
    public id: number;
    constructor(
        public pictureId: number,
        public buyerEmail: string,
        public buyerLastName: string,
        public buyerFirstName: string,
        public buyerAddress: string,
        public price: number
    ) {}
}
