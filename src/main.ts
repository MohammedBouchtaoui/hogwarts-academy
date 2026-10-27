
import { InMemoryWizardRepository } from "./repository/in-memory-wizard.repository";
import { WizardService } from "./service/wizard.service";

import { handleSpellCast } from "./events/spell-cast.handler";



const repository = new InMemoryWizardRepository();
const wizardService = new WizardService(repository);

const harry = wizardService.createWizard({
    name: "Harry Potter",
    house: "Gryffindor",
    level: 1,
    active: true
});

const hermione = wizardService.createWizard({
    name: "Hermione Granger",
    house: "Gryffindor",
    level: 1,
    active: true
});

console.log("Premier sorcier :", harry);
console.log("Deuxième sorcière :", hermione);
console.log("Tous les sorciers :", wizardService.getAllWizards());

console.log(
    "Sorciers de Gryffindor :", wizardService.findByHouse("Gryffindor")
);
handleSpellCast({
    type: "spell-cast",
    wizardId: 1,
    spellName: "Expelliarmus"
});