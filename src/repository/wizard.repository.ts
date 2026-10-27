
import type { NewWizard, Wizard } from "../shared/types";

export interface WizardRepository {
    add(wizard: NewWizard): Wizard;

    getAll(): Wizard[];
}
