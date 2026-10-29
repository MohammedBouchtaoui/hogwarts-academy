
import type { House, NewWizard, Wizard } from "../shared/types";
export interface WizardRepository {

    add(wizard: NewWizard): Wizard;

    getAll(): Wizard[];

    findByHouse(house: House): Wizard[];
}
