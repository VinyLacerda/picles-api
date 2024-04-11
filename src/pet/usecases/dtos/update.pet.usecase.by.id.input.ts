import CreatePetUseCaseInput from "./create.pet.usecase.input";

// orientado objetos 'extends' clona o createPetUseCaseInput.

export default class UpdatePetByIdUseCaseInput extends CreatePetUseCaseInput {
    id: string

    constructor(data: Partial<UpdatePetByIdUseCaseInput>) {
        super(data)
        Object.assign(this, data)
    }
}