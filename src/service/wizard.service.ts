
import type { NewWizard, Wizard } from "../shared/types";
import type { WizardRepository } from "../repository/wizard.repository";

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
}
