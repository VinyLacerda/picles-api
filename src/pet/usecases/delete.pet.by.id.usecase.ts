import { IUseCase } from "src/domain/iusecase.interface";
import DeletePetByIdUseCaseInput from "./dtos/delete.pet.id.usecase.input";
import DeletePetByIdUseCaseOutput from "./dtos/delete.pet.by.id.usecase.output";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import IPetRepository from "src/pet/interface/pet.repository.interface";
import PetTokens from "src/pet/pet.tokens";
import { Inject } from "@nestjs/common";
import { Pet } from "src/pet/schemas/pet.schema";

export default class DeletePetByIdUseCase implements IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
    ) { }

    async run(input: DeletePetByIdUseCaseInput): Promise<DeletePetByIdUseCaseOutput> {
        const pet = await this.getPetById(input.id)

        if (!pet) {
            throw new PetNotFoundError()
        }

        await this.petRepository.deletePetById(input.id)

        return new DeletePetByIdUseCaseOutput()
    }

    private async getPetById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.deletePetById(id)
        } catch (error) {
            return null
        }
    }
}