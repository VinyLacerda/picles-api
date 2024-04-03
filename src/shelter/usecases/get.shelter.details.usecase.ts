import { IUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usercases.output";

export default class GetShelterDetailsUseCase implements IUseCase<null, GetShelterDetailsUseCaseOutput> {
    run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
        return Promise.resolve(new GetShelterDetailsUseCaseOutput({

            shelterName: 'Abrigo da Vida',
            shelterEmail: 'ab@gmail.com',
            shelterPhone: '19998736235',
            shelterWhatsApp: '19998896235',
            createAt: new Date(),
            updatedAt: new Date()
        }))
    }

}