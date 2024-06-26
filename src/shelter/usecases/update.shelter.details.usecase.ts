import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.input";
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import ShelterTokens from "../shelter.tokens";
import { ShelterRepository } from "../shelter.repository";
import IShelterRepository from "../interfaces/shelter.repository.interface";

@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateShelterDetailsUseCaseInput,
    UpdateShelterDetailsUseCaseOutput> {

    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository: IShelterRepository
    ) { }



    async run(input: UpdateShelterDetailsUseCaseInput): Promise<UpdateShelterDetailsUseCaseOutput> {
        await this.shelterRepository.update(input)

        const shelter = await this.shelterRepository.get()

        return new UpdateShelterDetailsUseCaseOutput({
            name: shelter.name,
            phone: shelter.phone,
            whatsapp: shelter.whatsApp,
            email: shelter.email,
            updatedAt: shelter.updatedAt,
            createdAt: shelter.createdAt
        })

    }
}
