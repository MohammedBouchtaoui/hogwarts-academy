
import type { WizardRepository } from "../repository/wizard.repository";

import type { House, NewWizard, Wizard } from "../shared/types";



export class WizardService {
    constructor(
        private readonly wizardRepository: WizardRepository
    ) {}


    createWizard(wizard: NewWizard): Wizard {
        return this.wizardRepository.add(wizard);
    }

    getAllWizards(): Wizard[] {
        return this.wizardRepository.getAll();
    }
    // À ajouter dans la classe WizardService :
    findByHouse(house: House): Wizard[] {
        return this.wizardRepository.findByHouse(house);
    }
}
