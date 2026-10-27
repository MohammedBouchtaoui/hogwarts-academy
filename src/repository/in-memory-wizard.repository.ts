
import type { NewWizard, Wizard } from "../shared/types";
import type { WizardRepository } from "./wizard.repository";

export class InMemoryWizardRepository implements WizardRepository {
    private readonly wizards = new Map<number, Wizard>();
    private nextId = 1;

    add(wizard: NewWizard): Wizard {
        const savedWizard: Wizard = {
            ...wizard,
            id: this.nextId++
        };

        this.wizards.set(savedWizard.id, savedWizard);

        return savedWizard;
    }

    getAll(): Wizard[] {
        return Array.from(this.wizards.values());
    }
}
