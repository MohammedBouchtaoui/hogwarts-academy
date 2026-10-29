
import { InMemoryWizardRepository } from "./repository/in-memory-wizard.repository";
import { WizardService } from "./service/wizard.service";

import { handleSpellCast } from "./events/spell-cast.handler";
import   {SpellRepository} from "./repository/spell.repository"


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

console.log("********* exercice  4");




const spells = new SpellRepository();

// Test 1 : sort valide
spells.add({
    id: 102,
    name: "Protego",
    category: "defense",
    power: 50
});

console.log("Sorts enregistrés :", spells.getAll());

// Test 2 : sort invalide
try {
    spells.add({
        id: 103,
        name: "Invalid Spell",
        category: "attack",
        power: -10
    });
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
}

console.log("Nombre final de sorts :", spells.getAll().length);