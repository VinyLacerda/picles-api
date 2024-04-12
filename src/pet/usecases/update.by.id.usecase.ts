import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetByIdUseCaseInput from "./dtos/update.pet.usecase.by.id.input";
import UpdatePetByIdUseCaseOutput from "./dtos/update.pet.by.id.usecase,output";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Inject } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interface/pet.repository.interface";
import { Pet } from "../schemas/pet.schema";
import IFileService from "src/interfaces/file.service.interface";
import AppTokens from "src/app.tokens";

export default class UpdatePetByIdUseCase implements IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,
    ) { }

    async run(input: UpdatePetByIdUseCaseInput): Promise<UpdatePetByIdUseCaseOutput> {
        let pet = await this.getPetById(input.id)

        if (!pet) {
            throw new PetNotFoundError()
        }

        await this.petRepository.updatePetById({
            ...input,
            _id: input.id
        });

        pet = await this.getPetById(input.id);

        return new UpdatePetByIdUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: null,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt,

        })
    }


    private async getPetById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.getById(id)
        } catch (error) {
            return null
        }
    }
}
