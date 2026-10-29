
import type { Spell } from "../shared/types";
import { ValidateSpellPower } from "../decorator/decorators";

export class SpellRepository {
    private readonly spells = new Map<number, Spell>();

    @ValidateSpellPower
    add(spell: Spell): void {
        this.spells.set(spell.id, spell);
    }

    getAll(): Spell[] {
        return Array.from(this.spells.values());
    }
}
