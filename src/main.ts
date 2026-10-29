
import { InMemoryWizardRepository } from "./repository/in-memory-wizard.repository";
import { WizardService } from "./service/wizard.service";

import { handleSpellCast } from "./events/spell-cast.handler";
import   {SpellRepository} from "./repository/spell.repository"
import { Cache } from "./decorator/decorators";


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

// l'ajjout  d'exercie  5    ((cache)

class SpellCalculator {
    @Cache
    calculatePower(basePower: number, multiplier: number): number {
        console.log("Calculating...");

        return basePower * multiplier;
    }
}

const calculator = new SpellCalculator();

console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));

//********** exercice 6*****

//Un Type Guard est une fonction qui vérifie à l'exécution si une valeur correspond à un type donné,
// et permet à TypeScript de comprendre ce type lorsque la vérification réussit.

//Pourquoi utiliser unknown ?
// Parce que les données reçues peuvent être de n'importe quel type : une chaîne, un nombre, un objet ou même null.
//
//unknown nous oblige à vérifier la valeur avant de l'utiliser. C'est plus sûr que any. !!!!!!!



        import type { House, Wizard } from "./shared/types";

        const validHouses: readonly House[] = [
            "Gryffindor",
            "Slytherin",
            "Ravenclaw",
            "Hufflepuff"
        ];

        function isHouse(value: unknown): value is House {
            return (
                typeof value === "string" &&
                validHouses.some(house => house === value)
            );
        }
        function isWizard(value: unknown): value is Wizard {
        if (typeof value !== "object" || value === null) {
            return false;
        }

        const candidate = value as Record<string, unknown>;

        return (
            typeof candidate.id === "number" &&
            typeof candidate.name === "string" &&
            isHouse(candidate.house) &&
            typeof candidate.level === "number" &&
            typeof candidate.active === "boolean"
        );
    }


const validData: unknown = {
    id: 1,
    name: "Harry Potter",
    house: "Gryffindor",
    level: 5,
    active: true
};

const invalidData: unknown = {
    id: 2,
    name: "Viktor",
    house: "Durmstrang",
    level: 5,
    active: true
};

console.log("Sorcier valide :", isWizard(validData));
console.log("Sorcier invalide :", isWizard(invalidData));