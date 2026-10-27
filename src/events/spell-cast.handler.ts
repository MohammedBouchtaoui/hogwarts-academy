import type { SpellCastEvent } from "../shared/types";

export function handleSpellCast(event: SpellCastEvent): void {
    console.log(
        `Le sorcier ${event.wizardId} a lancé le sort ${event.spellName}.`
    );
}