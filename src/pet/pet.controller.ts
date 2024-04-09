import { Body, Controller, Inject, Post } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { promises } from 'dns';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutPut from './usecases/dtos/create.pet.usecase.output';
import { IUseCase } from 'src/domain/iusecase.interface';
import PetTokens from './pet.tokens';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase:
        IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutPut>

    @Post()
    async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutPut> {
        const useCaseInput = new CreatePetUseCaseInput({ ...input })
        return await this.createPetUseCase.run(useCaseInput)
    }
}
