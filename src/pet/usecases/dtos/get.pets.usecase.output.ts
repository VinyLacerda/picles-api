import PetResponse from "src/pet/dtos/pet.response";

export default class GetPetByIdUseCaseOutput {
    currentPage: number;
    totalPages: number;
    items: PetResponse[];

    constructor(data: Partial<GetPetByIdUseCaseOutput>) {
        Object.assign(this, data);
    }
}