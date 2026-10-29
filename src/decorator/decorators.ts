
export function ValidateSpellPower(
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
): void {
    const originalMethod = descriptor.value as (
        ...args: unknown[]
    ) => unknown;

    descriptor.value = function (
        this: unknown,
        ...args: unknown[]
    ): unknown {
        const spell = args[0];

        if (
            typeof spell === "object" &&
            spell !== null &&
            "power" in spell &&
            typeof spell.power === "number" &&
            spell.power < 0
        ) {
            throw new Error("Spell power cannot be negative");
        }

        return originalMethod.apply(this, args);
    };
}
