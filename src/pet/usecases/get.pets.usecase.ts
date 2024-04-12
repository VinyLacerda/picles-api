import { IUseCase } from "src/domain/iusecase.interface";
import GetPetsUseCaseInput from "./dtos/get.pets.usecase.input";
import { Inject, Injectable } from "@nestjs/common";
import GetPetsUseCaseOutput from "./dtos/get.pets.usecase.output";
import PetTokens from "../pet.tokens";
import PetRepository from "../pet.repository";
import IPetRepository from "../interface/pet.repository.interface";
import AppTokens from "src/app.tokens";
import IFileService from "src/interfaces/file.service.interface";
import petResponse from "../dtos/pet.response";
import PetResponse from "../dtos/pet.response";


@Injectable()
export default class GetPetsUseCase implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly PetRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ) { }

    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
        const queryResponse = await this.PetRepository.findByFilter(input);

        const petResponseList: PetResponse[] = [];

        for (const currentPet of queryResponse.items) {
            if (currentPet.photo) {
                const photoInBase64 = await this.fileService.readFile(currentPet.photo);
                currentPet.photo = photoInBase64.toString('base64');
            }

            petResponseList.push(petResponse.fromPet(currentPet));
        }

        const totalPages = Math.ceil(queryResponse.total / input.itemsPerPage)

        return new GetPetsUseCaseOutput({
            currentPage: input.page,
            totalPages,
            items: petResponseList,
        });
    }
}